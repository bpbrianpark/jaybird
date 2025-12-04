"""
Data preparation script to organize training data.

This script:
- Scans folder-based image organization (one folder per tag)
- Detects images that appear in multiple folders (multi-label support)
- Creates metadata JSON/CSV mapping images to all their tags
- Splits data into train/validation/test sets
- Validates data integrity
- Generates statistics about the dataset
Run: python scripts/prepare_data.py
"""

