import { NextResponse } from "next/server";
import "dotenv/config";

export async function GET() {
    try {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        if (!cloudName || !apiKey || !apiSecret) {
            throw new Error("Missing Cloudinary environment variables");
        }

        // Fetch both images and videos
        const [imagesResponse, videosResponse] = await Promise.all([
            fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image?type=upload&prefix=gallery/&context=true&tags=true&max_results=500`, {
                method: "GET",
                headers: {
                    Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
                    "Content-Type": "application/json",
                },
            }),
            fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/video?type=upload&prefix=gallery/&context=true&tags=true&max_results=500`, {
                method: "GET",
                headers: {
                    Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
                    "Content-Type": "application/json",
                },
            })
        ]);

        if (!imagesResponse.ok && !videosResponse.ok) {
            throw new Error(`Cloudinary API request failed`);
        }

        const processResources = (resources) => {
            return resources.map((resource) => {
                let title = null;
                if (resource.context) {
                    if (typeof resource.context === 'string') {
                        const titleMatch = resource.context.match(/title=([^|]+)/);
                        if (titleMatch) {
                            title = titleMatch[1].trim();
                        }
                    } else if (resource.context.custom && typeof resource.context.custom === 'string') {
                        const titleMatch = resource.context.custom.match(/title=([^|]+)/);
                        if (titleMatch) {
                            title = titleMatch[1].trim();
                        }
                    } else if (resource.context.custom && typeof resource.context.custom === 'object' && resource.context.custom.title) {
                        title = resource.context.custom.title;
                    } else if (resource.context.title) {
                        title = resource.context.title;
                    }
                }
                return {
                    url: resource.secure_url,
                    title: title,
                    publicId: resource.public_id,
                    resourceType: resource.resource_type || (resource.format ? 'video' : 'image'),
                    tags: Array.isArray(resource.tags) ? resource.tags : []
                };
            });
        };

        const imagesData = imagesResponse.ok ? await imagesResponse.json() : { resources: [] };
        const videosData = videosResponse.ok ? await videosResponse.json() : { resources: [] };

        const allResources = [
            ...processResources(imagesData.resources || []),
            ...processResources(videosData.resources || [])
        ];

        return NextResponse.json({ 
            images: allResources.map((resource) => ({
                ...resource,
                tags: resource.tags || []
            }))
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch images from Cloudinary" }, { status: 500 });
    }
}
