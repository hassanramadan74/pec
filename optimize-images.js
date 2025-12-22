// Image Optimization Script
// Run with: node optimize-images.js

const fs = require("fs");
const path = require("path");

console.log("\n📸 Image Optimization Guide for PEC Project\n");
console.log("Your images are loading slowly because they are likely:");
console.log("1. Too large in file size (uncompressed)");
console.log("2. Too high resolution for web use");
console.log("3. Using unoptimized JPG format\n");

console.log("🔧 SOLUTIONS:\n");

console.log("Option 1: Online Tools (Easiest)");
console.log("─────────────────────────────────");
console.log("1. Visit: https://tinypng.com or https://squoosh.app");
console.log("2. Upload your images from public/images/ folders");
console.log("3. Download compressed versions");
console.log("4. Replace original files\n");

console.log("Option 2: Install image optimization package");
console.log("────────────────────────────────────────────");
console.log("Run these commands:");
console.log("  npm install sharp");
console.log("  npm install imagemin imagemin-mozjpeg imagemin-pngquant");
console.log("\nThen create a script to batch optimize all images.\n");

console.log("Option 3: Use WebP format (Recommended)");
console.log("────────────────────────────────────────");
console.log("Convert JPG to WebP for better compression:");
console.log("1. Install: npm install sharp");
console.log("2. Run conversion script (see below)\n");

console.log("📊 Target Image Sizes:");
console.log("─────────────────────");
console.log("• Main project images: 800-1200px wide, < 200KB");
console.log("• Thumbnail images: 400-600px wide, < 100KB");
console.log("• Quality: 80-85% (good balance)\n");

console.log("🚀 Quick Fix:");
console.log("Use this PowerShell command to check image sizes:");
console.log(
  "Get-ChildItem -Path .\\public\\images -Recurse -Include *.jpg,*.jpeg,*.png | Select-Object Name, Length, Directory | Format-Table -AutoSize\n"
);

// Function to scan and report image sizes
const imagesDir = path.join(__dirname, "public", "images");

try {
  if (fs.existsSync(imagesDir)) {
    console.log("📁 Analyzing your image files...\n");

    const getAllImages = (dir, fileList = []) => {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          getAllImages(filePath, fileList);
        } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
          const stats = fs.statSync(filePath);
          fileList.push({
            path: filePath,
            size: stats.size,
            sizeKB: (stats.size / 1024).toFixed(2),
          });
        }
      });
      return fileList;
    };

    const images = getAllImages(imagesDir);

    console.log(`Found ${images.length} images\n`);
    console.log("Images larger than 500KB (need optimization):");
    console.log("─────────────────────────────────────────────");

    const largeImages = images.filter((img) => img.size > 500 * 1024);

    if (largeImages.length === 0) {
      console.log("✅ All images are under 500KB - Good!\n");
    } else {
      largeImages.forEach((img) => {
        console.log(
          `❌ ${path.relative(imagesDir, img.path)}: ${img.sizeKB} KB`
        );
      });
      console.log(`\nTotal large images: ${largeImages.length}`);
      console.log("These images MUST be optimized!\n");
    }

    const totalSize = images.reduce((sum, img) => sum + img.size, 0);
    console.log(
      `\n📊 Total images size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`
    );
    console.log(
      `Average per image: ${(totalSize / images.length / 1024).toFixed(2)} KB\n`
    );
  }
} catch (error) {
  console.log(
    "⚠️  Could not analyze images. Make sure public/images folder exists.\n"
  );
}

console.log("💡 Recommendation:");
console.log("Visit https://tinypng.com and compress ALL your images now!");
console.log(
  "This will reduce load time by 60-80% without visible quality loss.\n"
);
