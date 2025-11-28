import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import "dotenv/config";

const normalizeTags = (input) => {
    if (!input) {
        return [];
    }

    const values = Array.isArray(input) ? input : [input];

    const slugified = values
        .flatMap((value) =>
            value
                ?.toString()
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean) || []
        )
        .map((tag) =>
            tag
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
        )
        .filter(Boolean);

    return Array.from(new Set(slugified));
};

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const formData = await req.formData();
        const file = formData.get("file");
        const title = formData.get("title");
        const tags = normalizeTags(formData.getAll("tags"));

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
        const validVideoTypes = ["video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/webm", "video/x-matroska"];
        const isValidImage = validImageTypes.includes(file.type);
        const isValidVideo = validVideoTypes.includes(file.type);

        if (!isValidImage && !isValidVideo) {
            return NextResponse.json(
                { error: "Invalid file type. Only images and videos are allowed." },
                { status: 400 }
            );
        }

        const resourceType = isValidVideo ? "video" : "image";

        let fileSize = file.size || 0;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        if (!fileSize) {
            fileSize = buffer.length;
        }

        const LARGE_FILE_THRESHOLD = 50 * 1024 * 1024; // 50MB
        const isLargeFile = fileSize > LARGE_FILE_THRESHOLD;

        const uploadOptions = {
            resource_type: resourceType,
            folder: "gallery",
        };

        if (tags.length) {
            uploadOptions.tags = tags;
        }

        if (resourceType === "video") {
            uploadOptions.eager = "mp4"; 
            uploadOptions.eager_async = false;
        }

        if (title && title.trim()) {
            uploadOptions.context = `title=${title.trim()}`;
        }

        let uploadResult;
        let tempFilePath = null;

        try {
            if (isLargeFile) {

                const tempDir = tmpdir();
                const fileExtension = file.name.split('.').pop() || (resourceType === "video" ? "mp4" : "jpg");
                tempFilePath = join(tempDir, `cloudinary-upload-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`);
                
                await writeFile(tempFilePath, buffer);
                
                uploadOptions.chunk_size = 20000000; 
                
                uploadResult = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_large(
                        tempFilePath,
                        uploadOptions,
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                });
            } else {
                uploadResult = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        uploadOptions,
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    uploadStream.end(buffer);
                });
            }
        } finally {
            if (tempFilePath) {
                try {
                    await unlink(tempFilePath);
                } catch (cleanupError) {
                }
            }
        }

        return NextResponse.json({
            success: true,
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: `Failed to upload file to Cloudinary: ${error.message}` },
            { status: 500 }
        );
    }
}

