import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import "dotenv/config";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const publicId = searchParams.get("publicId");

        if (!publicId) {
            return NextResponse.json(
                { error: "No public ID provided" },
                { status: 400 }
            );
        }

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === "ok" || result.result === "not found") {
            return NextResponse.json({
                success: true,
                message: "Image deleted successfully",
            });
        } else {
            return NextResponse.json(
                { error: "Failed to delete image" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error deleting image:", error);
        return NextResponse.json(
            { error: "Failed to delete image from Cloudinary" },
            { status: 500 }
        );
    }
}

