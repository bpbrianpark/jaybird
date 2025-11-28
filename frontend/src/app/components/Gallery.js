"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./gallery.css";
import "./image-modal.css";

const Gallery = ({ enableTagFilter = true }) => {
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState(null);
    const [tempImgTitle, setTempImgTitle] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTag, setActiveTag] = useState("all");

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/cloudinary");
                if (!res.ok) {
                    throw new Error(`Failed to fetch images. Status: ${res.status}`);
                }

                const data = await res.json();
                setImages(Array.isArray(data.images) ? data.images : []);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const availableTags = useMemo(() => {
        if (!enableTagFilter) {
            return [];
        }

        const tagSet = new Set();

        images.forEach((image) => {
            if (image && typeof image === "object" && Array.isArray(image.tags)) {
                image.tags.forEach((tag) => {
                    if (tag) {
                        tagSet.add(tag);
                    }
                });
            }
        });

        return Array.from(tagSet).sort();
    }, [images, enableTagFilter]);

    const filteredImages = useMemo(() => {
        if (!enableTagFilter || activeTag === "all") {
            return images;
        }

        return images.filter(
            (image) =>
                image &&
                typeof image === "object" &&
                Array.isArray(image.tags) &&
                image.tags.includes(activeTag)
        );
    }, [images, activeTag, enableTagFilter]);

    const formatTagLabel = (tag) =>
        tag
            ?.split("-")
            .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
            .join(" ");

    const displayedImages = enableTagFilter ? filteredImages : images;

    const getImg = (image) => {
        let imageUrl;
        let title;
        
        if (typeof image === 'string') {
            imageUrl = image;
            title = null;
        } else {
            imageUrl = image.url;
            title = image.title;
        }


        setTempImgSrc(imageUrl);
        setTempImgTitle(title);
        setModel(true); 
    };

    const closeModal = () => {
        setModel(false);
        setTempImgSrc(null);
        setTempImgTitle(null);
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
                        className="image-modal"
                        onClick={closeModal}
                    >
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="image-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {tempImgSrc && (
                                <div className="image-modal-wrapper">
                                    <div className="image-modal-image-container">
                                        <img
                                            src={tempImgSrc}
                                            alt={tempImgTitle || "Enlarged Image"}
                                            className="image-modal-image"
                                            style={{ display: 'block' }}
                                        />
                                        <button 
                                            onClick={closeModal}
                                            className="image-modal-close"
                                            aria-label="Close"
                                        >
                                            <X className="image-modal-close-icon" />
                                        </button>
                                    </div>
                                    {tempImgTitle && (
                                        <div className="image-modal-title">
                                            <p>{tempImgTitle}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {enableTagFilter && availableTags.length > 0 && (
                <div className="gallery-filter-bar">
                    <div className="gallery-filter-scroll">
                        <button
                            type="button"
                            className={`gallery-filter-button ${activeTag === "all" ? "active" : ""}`}
                            onClick={() => setActiveTag("all")}
                        >
                            All
                        </button>
                        {availableTags.map((tag) => (
                            <button
                                type="button"
                                key={tag}
                                className={`gallery-filter-button ${activeTag === tag ? "active" : ""}`}
                                onClick={() => setActiveTag(tag)}
                            >
                                {formatTagLabel(tag)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="gallery-masonry">
                {displayedImages.length > 0 ? (
                    displayedImages.map((image, index) => {
                        const imgSrc = typeof image === 'string' ? image : image.url;
                        const imgAlt = typeof image === 'string' ? `Wildlife photography ${index + 1}` : (image.title || `Wildlife photography ${index + 1}`);
                        const imageTags = typeof image === "object" && Array.isArray(image.tags) ? image.tags : [];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => getImg(image)}
                                onMouseEnter={() => {
                                    // Preload the full image when hovering
                                    const preloadImg = new window.Image();
                                    preloadImg.src = imgSrc;
                                }}
                                className="gallery-item"
                            >
                                <div className="gallery-image-container">
                                    <Image
                                        src={imgSrc}
                                        width={400} 
                                        height={600} 
                                        alt={imgAlt}
                                        className="gallery-image"
                                    />
                                    {enableTagFilter && imageTags.length > 0 && (
                                        <div className="gallery-image-meta">
                                            {imageTags.map((tag) => (
                                                <span key={tag} className="gallery-tag-chip">
                                                    {formatTagLabel(tag)}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <div className="gallery-empty">
                        <div className="gallery-empty-content">
                            <p className="gallery-empty-title">
                                {enableTagFilter && activeTag !== "all"
                                    ? `Nothing tagged "${formatTagLabel(activeTag)}" yet.`
                                    : "No images found"}
                            </p>
                            {enableTagFilter && activeTag !== "all" && (
                                <button
                                    type="button"
                                    className="gallery-filter-reset"
                                    onClick={() => setActiveTag("all")}
                                >
                                    Reset filter
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
