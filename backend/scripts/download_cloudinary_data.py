"""
Script to download images and tags from Cloudinary for training.

This script:
- Connects to Cloudinary using API credentials
- Downloads all images from the gallery folder
- Extracts tags associated with each image
- Organizes images into folder structure (one folder per tag)
- Creates metadata files for multi-label scenarios
- Handles large datasets with progress tracking
Note: Only used for initial training data collection, not in production.
Run: python scripts/download_cloudinary_data.py
"""

