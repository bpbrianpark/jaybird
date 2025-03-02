"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Minimize2Icon } from "lucide-react";

const Gallery = () => {
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch("/api/cloudinary");
                if (!res.ok) {
                    throw new Error(`Failed to fetch images. Status: ${res.status}`);
                }

                const data = await res.json();
                console.log("Cloudinary API Response:", data);

                setImages(data.images);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true);
    };

    return (
        <div className="p-4">
            {model && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-500 ease-in-out z-50">
                    <div className="relative max-w-[90%] max-h-[90%]">
                        {tempImgSrc && (
                            <div className="bg-[#ef983f] p-2 rounded-lg shadow-lg">
                                <Image
                                    src={tempImgSrc}
                                    width={800}
                                    height={600}
                                    alt="Enlarged Image"
                                    className="rounded-lg shadow-lg transition-transform duration-500 ease-in-out scale-100"
                                />
                            </div>
                        )}
                        <Minimize2Icon
                            className="absolute top-4 right-4 text-black bg-white bg-opacity-50 p-2 rounded-full text-5xl cursor-pointer hover:bg-opacity-100 transition-all duration-300"
                            onClick={() => setModel(false)}
                        />
                    </div>
                </div>
            )}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-4">
                {images.length > 0 ? (
                    images.map((imgSrc, index) => (
                        <div
                            key={index}
                            onClick={() => getImg(imgSrc)}
                            className="mb-4 break-inside-avoid cursor-pointer transition-transform duration-300 hover:opacity-80 hover:scale-105"
                        >
                            <div className="bg-[#ef983f] p-2 rounded-lg shadow-lg">
                                <Image
                                    src={imgSrc}
                                    width={500} 
                                    height={500} 
                                    alt={`Gallery image ${index + 1}`}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Loading images...</p>
                )}
            </div>
        </div>
    );
};

export default Gallery;
