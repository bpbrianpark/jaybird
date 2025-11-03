"use client";
import { useState, useEffect } from "react";
import { Upload, CheckCircle, AlertCircle, Image as ImageIcon, LogOut, Maximize2, X, Trash2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./dashboard.css";
import "../../components/image-modal.css";

export default function DashboardContent() {
    const [uploadMode, setUploadMode] = useState("single"); // "single" or "multiple"
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [previewType, setPreviewType] = useState(null); // 'image' or 'video'
    const [imageTitle, setImageTitle] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
    const [images, setImages] = useState([]);
    const [loadingImages, setLoadingImages] = useState(true);
    const [expandedImage, setExpandedImage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setLoadingImages(true);
            const res = await fetch("/api/cloudinary");
            if (!res.ok) {
                throw new Error(`Failed to fetch images. Status: ${res.status}`);
            }
            const data = await res.json();
            setImages(data.images || []);
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoadingImages(false);
        }
    };

    const handleFileChange = (e) => {
        if (uploadMode === "single") {
            const file = e.target.files[0];
            if (file) {
                setSelectedFile(file);
                setSelectedFiles([]);
                setUploadSuccess(false);
                setUploadError("");
                setImageTitle("");
                
                // Detect if it's a video
                const isVideo = file.type.startsWith('video/');
                setPreviewType(isVideo ? 'video' : 'image');
                
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setSelectedFile(null);
                setImagePreview(null);
                setPreviewType(null);
            }
        } else {
            const files = Array.from(e.target.files || []);
            if (files.length > 0) {
                const limitedFiles = files.slice(0, 50);
                setSelectedFiles(limitedFiles);
                setSelectedFile(null);
                setImagePreview(null);
                setPreviewType(null);
                setUploadSuccess(false);
                setUploadError("");
                if (limitedFiles.length < files.length) {
                    setUploadError(`Only the first 50 files will be uploaded (selected ${files.length})`);
                }
            } else {
                setSelectedFiles([]);
            }
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        
        if (uploadMode === "single") {
            if (!selectedFile) {
                setUploadError("Please select a file");
                return;
            }

            setUploading(true);
            setUploadError("");
            setUploadSuccess(false);

            try {
                const formData = new FormData();
                formData.append("file", selectedFile);
                if (imageTitle.trim()) {
                    formData.append("title", imageTitle.trim());
                }

                const response = await fetch("/api/cloudinary/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Upload failed");
                }

                setUploadSuccess(true);
                setSelectedFile(null);
                setImagePreview(null);
                setPreviewType(null);
                setImageTitle("");
                const fileInput = document.getElementById("file-upload");
                if (fileInput) {
                    fileInput.value = "";
                }
                fetchImages();
            } catch (error) {
                setUploadError(error.message || "Failed to upload image");
            } finally {
                setUploading(false);
            }
        } else {
            if (selectedFiles.length === 0) {
                setUploadError("Please select at least one file");
                return;
            }

            setUploading(true);
            setUploadError("");
            setUploadSuccess(false);
            setUploadProgress({ current: 0, total: selectedFiles.length });

            try {
                let successCount = 0;
                let errorCount = 0;
                const errors = [];

                for (let i = 0; i < selectedFiles.length; i++) {
                    const file = selectedFiles[i];
                    setUploadProgress({ current: i + 1, total: selectedFiles.length });

                    try {
                        const formData = new FormData();
                        formData.append("file", file);

                        const response = await fetch("/api/cloudinary/upload", {
                            method: "POST",
                            body: formData,
                        });

                        const data = await response.json();

                        if (!response.ok) {
                            throw new Error(data.error || "Upload failed");
                        }
                        successCount++;
                    } catch (error) {
                        errorCount++;
                        errors.push(`${file.name}: ${error.message}`);
                    }
                }

                if (errorCount > 0) {
                    setUploadError(`Uploaded ${successCount}/${selectedFiles.length} files. Errors: ${errors.slice(0, 3).join("; ")}${errors.length > 3 ? "..." : ""}`);
                } else {
                    setUploadSuccess(true);
                }

                setSelectedFiles([]);
                const fileInput = document.getElementById("file-upload");
                if (fileInput) {
                    fileInput.value = "";
                }
                fetchImages();
            } catch (error) {
                setUploadError(error.message || "Failed to upload images");
            } finally {
                setUploading(false);
                setUploadProgress({ current: 0, total: 0 });
            }
        }
    };

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/admin/login");
        router.refresh();
    };

    const handleDeleteImage = async (image, e) => {
        e.stopPropagation(); // Prevent expanding the image when clicking delete
        
        if (!image.publicId) {
            setUploadError("Cannot delete: Image missing public ID");
            return;
        }

        if (!confirm(`Are you sure you want to delete this image? This action cannot be undone.`)) {
            return;
        }

        try {
            const resourceType = image.resourceType || 'image';
            const response = await fetch(`/api/cloudinary/delete?publicId=${encodeURIComponent(image.publicId)}&resourceType=${encodeURIComponent(resourceType)}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to delete image");
            }

            // Refresh the images list
            fetchImages();
        } catch (error) {
            console.error("Error deleting image:", error);
            setUploadError(error.message || "Failed to delete image");
        }
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-header">
                <div>
                    <h1 className="admin-dashboard-title">Admin Dashboard</h1>
                    <p className="admin-dashboard-subtitle">Upload and manage images</p>
                </div>
                <button onClick={handleLogout} className="admin-dashboard-logout">
                    <LogOut className="admin-dashboard-logout-icon" />
                    <span>Logout</span>
                </button>
            </div>

            <div className="admin-dashboard-content">
                <div className="admin-dashboard-upload-section">
                    <h2 className="admin-dashboard-section-title">Upload Media</h2>
                    
                    <div className="admin-dashboard-upload-mode-selector">
                        <button
                            type="button"
                            onClick={() => {
                                setUploadMode("single");
                                setSelectedFile(null);
                                setSelectedFiles([]);
                                setImagePreview(null);
                                setImageTitle("");
                                const fileInput = document.getElementById("file-upload");
                                if (fileInput) {
                                    fileInput.value = "";
                                }
                            }}
                            className={`admin-dashboard-mode-button ${uploadMode === "single" ? "active" : ""}`}
                        >
                            Single File
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setUploadMode("multiple");
                                setSelectedFile(null);
                                setSelectedFiles([]);
                                setImagePreview(null);
                                setImageTitle("");
                                const fileInput = document.getElementById("file-upload");
                                if (fileInput) {
                                    fileInput.value = "";
                                }
                            }}
                            className={`admin-dashboard-mode-button ${uploadMode === "multiple" ? "active" : ""}`}
                        >
                            Multiple
                        </button>
                    </div>

                    <form onSubmit={handleUpload} className="admin-dashboard-upload-form">
                        <div className="admin-dashboard-file-input-wrapper">
                            {uploadMode === "single" && imagePreview ? (
                                <div className="admin-dashboard-preview-wrapper">
                                    {previewType === 'video' ? (
                                        <video
                                            src={imagePreview}
                                            controls
                                            className="admin-dashboard-preview-image"
                                        />
                                    ) : (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="admin-dashboard-preview-image"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setImagePreview(null);
                                            setPreviewType(null);
                                            const fileInput = document.getElementById("file-upload");
                                            if (fileInput) {
                                                fileInput.value = "";
                                            }
                                        }}
                                        className="admin-dashboard-preview-remove"
                                        aria-label="Remove preview"
                                    >
                                        <X />
                                    </button>
                                </div>
                            ) : (
                                <label htmlFor="file-upload" className="admin-dashboard-file-label">
                                    <ImageIcon className="admin-dashboard-file-icon" />
                                    <span>
                                        {uploadMode === "single"
                                            ? "Choose an image or video file"
                                            : selectedFiles.length > 0
                                            ? `${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""} selected`
                                            : "Choose image or video files (up to 50)"}
                                    </span>
                                </label>
                            )}
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*,video/*"
                                multiple={uploadMode === "multiple"}
                                onChange={handleFileChange}
                                className="admin-dashboard-file-input"
                            />
                        </div>

                        {uploadMode === "single" && (
                            <div className="admin-dashboard-title-input-wrapper">
                                <label htmlFor="image-title" className="admin-dashboard-title-label">
                                    Photo Title (Optional)
                                </label>
                                <input
                                    id="image-title"
                                    type="text"
                                    value={imageTitle}
                                    onChange={(e) => setImageTitle(e.target.value)}
                                    placeholder="Enter a title for this photo..."
                                    className="admin-dashboard-title-input"
                                    maxLength={100}
                                />
                            </div>
                        )}

                        {uploadMode === "multiple" && selectedFiles.length > 0 && (
                            <div className="admin-dashboard-files-list">
                                <p className="admin-dashboard-files-count">
                                    {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""} selected
                                </p>
                            </div>
                        )}

                        {uploadSuccess && (
                            <div className="admin-dashboard-status success">
                                <CheckCircle className="admin-dashboard-status-icon" />
                                <span>
                                    {uploadMode === "single"
                                        ? "Image uploaded successfully!"
                                        : `All images uploaded successfully!`}
                                </span>
                            </div>
                        )}

                        {uploading && uploadMode === "multiple" && uploadProgress.total > 0 && (
                            <div className="admin-dashboard-upload-progress">
                                <p>Uploading {uploadProgress.current} of {uploadProgress.total} files...</p>
                            </div>
                        )}

                        {uploadError && (
                            <div className="admin-dashboard-status error">
                                <AlertCircle className="admin-dashboard-status-icon" />
                                <span>{uploadError}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={uploading || (uploadMode === "single" ? !selectedFile : selectedFiles.length === 0)}
                            className="admin-dashboard-submit"
                        >
                            {uploading ? (
                                <>
                                    <div className="admin-dashboard-spinner"></div>
                                    <span>
                                        {uploadMode === "multiple" && uploadProgress.total > 0
                                            ? `Uploading ${uploadProgress.current}/${uploadProgress.total}...`
                                            : "Uploading..."}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Upload className="admin-dashboard-submit-icon" />
                                    <span>
                                        {uploadMode === "single"
                                            ? "Upload Image"
                                            : `Upload ${selectedFiles.length || ""} Image${selectedFiles.length !== 1 ? "s" : ""}`}
                                    </span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="admin-dashboard-images-section">
                    <h2 className="admin-dashboard-section-title">
                        Uploaded Images ({images.length})
                    </h2>
                    {loadingImages ? (
                        <div className="admin-dashboard-loading">
                            <div className="admin-dashboard-spinner"></div>
                            <span>Loading images...</span>
                        </div>
                    ) : images.length === 0 ? (
                        <div className="admin-dashboard-empty">
                            <ImageIcon className="admin-dashboard-empty-icon" />
                            <p>No images uploaded yet</p>
                        </div>
                    ) : (
                        <div className="admin-dashboard-images-grid">
                            {images.map((image, index) => {
                                const isVideo = image.resourceType === 'video' || image.url.match(/\.(mp4|webm|mov|avi)$/i);
                                return (
                                    <div key={index} className="admin-dashboard-image-card">
                                        {isVideo ? (
                                            <video
                                                src={image.url}
                                                className="admin-dashboard-image"
                                                muted
                                                playsInline
                                            />
                                        ) : (
                                            <img
                                                src={image.url}
                                                alt={image.title || `Uploaded image ${index + 1}`}
                                                className="admin-dashboard-image"
                                            />
                                        )}
                                        <button
                                            onClick={() => setExpandedImage(image)}
                                            className="admin-dashboard-expand-button"
                                            aria-label="Expand media"
                                        >
                                            <Maximize2 className="admin-dashboard-expand-icon" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteImage(image, e)}
                                            className="admin-dashboard-delete-button"
                                            aria-label="Delete media"
                                        >
                                            <Trash2 className="admin-dashboard-delete-icon" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {expandedImage && (
                        <div className="image-modal" style={{ zIndex: 1000 }} onClick={() => setExpandedImage(null)}>
                            <div className="image-modal-content dashboard" onClick={(e) => e.stopPropagation()}>
                                <div className="image-modal-wrapper">
                                    <div className="image-modal-image-container">
                                        {(() => {
                                            const imageUrl = typeof expandedImage === 'object' ? expandedImage.url : expandedImage;
                                            const isVideo = typeof expandedImage === 'object' && (expandedImage.resourceType === 'video' || expandedImage.url.match(/\.(mp4|webm|mov|avi)$/i));
                                            
                                            return isVideo ? (
                                                <video
                                                    src={imageUrl}
                                                    className="image-modal-image"
                                                    controls
                                                    autoPlay
                                                />
                                            ) : (
                                                <img
                                                    src={imageUrl}
                                                    alt={typeof expandedImage === 'object' ? (expandedImage.title || "Expanded") : "Expanded"}
                                                    className="image-modal-image"
                                                />
                                            );
                                        })()}
                                        <button
                                            className="image-modal-close"
                                            onClick={() => setExpandedImage(null)}
                                            aria-label="Close"
                                        >
                                            <X className="image-modal-close-icon" />
                                        </button>
                                    </div>
                                    {typeof expandedImage === 'object' && expandedImage.title && (
                                        <div className="image-modal-title">
                                            <p>{expandedImage.title}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

