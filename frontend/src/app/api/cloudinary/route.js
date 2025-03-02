import { NextResponse } from "next/server";
import "dotenv/config";

export async function GET() {
    try {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        console.log("🛠️ Cloudinary Config:");
        console.log("CLOUD_NAME:", cloudName);
        console.log("API_KEY:", apiKey);
        console.log("API_SECRET:", apiSecret ? "Exists ✅" : "Missing ❌");

        if (!cloudName || !apiKey || !apiSecret) {
            throw new Error("Missing Cloudinary environment variables");
        }

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`;
        const authHeader = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Cloudinary API request failed. Status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json({ images: data.resources.map((img) => img.secure_url) });
    } catch (error) {
        console.error("❌ Cloudinary API Error:", error);
        return NextResponse.json({ error: "Failed to fetch images from Cloudinary" }, { status: 500 });
    }
}
