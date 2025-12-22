import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  maxWidth: 1920, // Max width for images
  quality: 85, // JPEG quality (80-90 is good)
  progressive: true, // Progressive JPEG for better loading
  optimizeForWeb: true, // Extra web optimizations
  backupOriginals: true, // Keep backup of originals
};

console.log("🖼️  PEC Image Optimization Tool\n");
console.log("⚙️  Configuration:");
console.log(`   Max Width: ${CONFIG.maxWidth}px`);
console.log(`   Quality: ${CONFIG.quality}%`);
console.log(`   Backup Originals: ${CONFIG.backupOriginals}\n`);

// Get all image folders
const imagesDir = path.join(__dirname, "public", "images");

async function getAllImageFiles(dir) {
  const files = [];

  async function scan(currentDir) {
    const items = await fs.readdir(currentDir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(currentDir, item.name);

      if (item.isDirectory()) {
        await scan(fullPath);
      } else if (/\.(jpg|jpeg|png)$/i.test(item.name)) {
        files.push(fullPath);
      }
    }
  }

  await scan(dir);
  return files;
}

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size;
}

async function optimizeImage(filePath) {
  const originalSize = await getFileSize(filePath);
  const originalSizeKB = (originalSize / 1024).toFixed(2);

  // Skip if already optimized (< 300KB)
  if (originalSize < 300 * 1024) {
    console.log(
      `⏭️  Skipping ${path.basename(
        filePath
      )} (${originalSizeKB} KB - already optimized)`
    );
    return { skipped: true, originalSize, newSize: originalSize };
  }

  try {
    // Create backup if enabled
    if (CONFIG.backupOriginals) {
      const backupPath = filePath + ".original";
      const backupExists = await fs
        .access(backupPath)
        .then(() => true)
        .catch(() => false);

      if (!backupExists) {
        await fs.copyFile(filePath, backupPath);
      }
    }

    // Optimize image
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if needed
    if (metadata.width > CONFIG.maxWidth) {
      image.resize(CONFIG.maxWidth, null, {
        withoutEnlargement: true,
        fit: "inside",
      });
    }

    // Optimize based on format
    if (metadata.format === "jpeg" || metadata.format === "jpg") {
      image.jpeg({
        quality: CONFIG.quality,
        progressive: CONFIG.progressive,
        mozjpeg: true,
      });
    } else if (metadata.format === "png") {
      image.png({
        quality: CONFIG.quality,
        progressive: CONFIG.progressive,
        compressionLevel: 9,
      });
    }

    // Save optimized image (overwrite original)
    const tempPath = filePath + ".tmp";
    await image.toFile(tempPath);

    // Replace original with optimized
    await fs.unlink(filePath);
    await fs.rename(tempPath, filePath);

    const newSize = await getFileSize(filePath);
    const newSizeKB = (newSize / 1024).toFixed(2);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`✅ ${path.basename(filePath)}`);
    console.log(
      `   ${originalSizeKB} KB → ${newSizeKB} KB (${savings}% smaller)\n`
    );

    return { skipped: false, originalSize, newSize };
  } catch (error) {
    console.error(
      `❌ Error optimizing ${path.basename(filePath)}:`,
      error.message
    );
    return { skipped: true, originalSize, newSize: originalSize };
  }
}

async function main() {
  try {
    console.log("📁 Scanning for images...\n");

    const imageFiles = await getAllImageFiles(imagesDir);
    console.log(`Found ${imageFiles.length} images\n`);
    console.log("🔄 Starting optimization...\n");

    let totalOriginal = 0;
    let totalNew = 0;
    let optimizedCount = 0;
    let skippedCount = 0;

    for (const filePath of imageFiles) {
      const result = await optimizeImage(filePath);

      totalOriginal += result.originalSize;
      totalNew += result.newSize;

      if (result.skipped) {
        skippedCount++;
      } else {
        optimizedCount++;
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log("📊 OPTIMIZATION COMPLETE!\n");
    console.log(`✅ Optimized: ${optimizedCount} images`);
    console.log(`⏭️  Skipped: ${skippedCount} images (already optimal)`);
    console.log(`\n📉 Total size reduction:`);
    console.log(`   Before: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   After: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
    console.log(
      `   Saved: ${((totalOriginal - totalNew) / 1024 / 1024).toFixed(
        2
      )} MB (${((1 - totalNew / totalOriginal) * 100).toFixed(1)}%)`
    );

    if (CONFIG.backupOriginals) {
      console.log(`\n💾 Original images backed up with .original extension`);
      console.log(
        `   Delete backups to save space: Remove-Item .\\public\\images\\* -Include *.original -Recurse`
      );
    }

    console.log("\n✨ Your images are now optimized for web!");
    console.log("   Refresh your browser to see faster loading.\n");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

main();
