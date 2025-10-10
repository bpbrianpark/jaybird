"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./gallery.css";

const Gallery = () => {
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/cloudinary");
                if (!res.ok) {
                    throw new Error(`Failed to fetch images. Status: ${res.status}`);
                }

                const data = await res.json();
                console.log("Cloudinary API Response:", data);

                setImages(data.images);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true);
    };

    const closeModal = () => {
        setModel(false);
        setTempImgSrc(null);
    };

    if (loading) {
        return (
            <div className="gallery-loading">
                <div className="gallery-loading-content">
                    <div className="gallery-spinner"></div>
                    <p className="gallery-loading-text">Loading gallery...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="gallery-container">
            <AnimatePresence>
                {model && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="gallery-modal"
                        onClick={closeModal}
                    >
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="gallery-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {tempImgSrc && (
                                <div className="relative">
                                    <Image
                                        src={tempImgSrc}
                                        width={1200}
                                        height={800}
                                        alt="Enlarged Image"
                                        className="gallery-modal-image"
                                    />
                                    
                                    <div className="gallery-modal-actions">
                                        <button 
                                            onClick={closeModal}
                                            className="gallery-modal-button"
                                        >
                                            <X className="gallery-modal-button-icon" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="gallery-masonry">
                {images.length > 0 ? (
                    images.map((imgSrc, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => getImg(imgSrc)}
                            className="gallery-item"
                        >
                            <div className="gallery-image-container">
                                <Image
                                    src={imgSrc}
                                    width={400} 
                                    height={600} 
                                    alt={`Wildlife photography ${index + 1}`}
                                    className="gallery-image"
                                />
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="gallery-empty">
                        <div className="gallery-empty-content">
                            <p className="gallery-empty-title">No images found</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
