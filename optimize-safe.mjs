import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  maxWidth: 1920,
  quality: 85,
  outputFolder: "optimized", // Save to new folder instead of overwriting
};

console.log("🖼️  PEC Image Optimization Tool\n");

const imagesDir = path.join(__dirname, "public", "images");
const outputDir = path.join(__dirname, "public", CONFIG.outputFolder);

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

async function optimizeImage(filePath) {
  const stats = await fs.stat(filePath);
  const originalSize = stats.size;
  const originalSizeKB = (originalSize / 1024).toFixed(2);

  // Skip if already small
  if (originalSize < 300 * 1024) {
    console.log(
      `⏭️  Skipping ${path.basename(filePath)} (${originalSizeKB} KB)`
    );
    return { skipped: true, originalSize, newSize: originalSize };
  }

  try {
    // Get relative path from images dir
    const relativePath = path.relative(imagesDir, filePath);
    const outputPath = path.join(outputDir, relativePath);

    // Create output directory
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Optimize
    const image = sharp(filePath);
    const metadata = await image.metadata();

    if (metadata.width > CONFIG.maxWidth) {
      image.resize(CONFIG.maxWidth, null, {
        withoutEnlargement: true,
        fit: "inside",
      });
    }

    image.jpeg({
      quality: CONFIG.quality,
      progressive: true,
      mozjpeg: true,
    });

    await image.toFile(outputPath);

    const newStats = await fs.stat(outputPath);
    const newSize = newStats.size;
    const newSizeKB = (newSize / 1024).toFixed(2);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`✅ ${relativePath}`);
    console.log(
      `   ${originalSizeKB} KB → ${newSizeKB} KB (${savings}% reduction)\n`
    );

    return { skipped: false, originalSize, newSize, relativePath };
  } catch (error) {
    console.error(`❌ ${path.basename(filePath)}:`, error.message);
    return { skipped: true, originalSize, newSize: originalSize };
  }
}

async function main() {
  try {
    console.log("📁 Scanning...\n");

    const imageFiles = await getAllImageFiles(imagesDir);
    console.log(`Found ${imageFiles.length} images\n`);

    let totalOriginal = 0;
    let totalNew = 0;
    let optimized = [];

    for (const filePath of imageFiles) {
      const result = await optimizeImage(filePath);
      totalOriginal += result.originalSize;
      totalNew += result.newSize;

      if (!result.skipped) {
        optimized.push(result.relativePath);
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("✅ COMPLETE!\n");
    console.log(`Optimized: ${optimized.length} images`);
    console.log(`Before: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`After: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
    console.log(
      `Saved: ${((totalOriginal - totalNew) / 1024 / 1024).toFixed(2)} MB (${(
        (1 - totalNew / totalOriginal) *
        100
      ).toFixed(1)}% smaller)\n`
    );

    console.log("📝 NEXT STEPS:");
    console.log("1. Stop your dev server (Ctrl+C)");
    console.log("2. Run this PowerShell command:\n");
    console.log(
      "   Remove-Item .\\public\\images\\* -Recurse -Force -Exclude LOGO.jpg"
    );
    console.log(
      "   Move-Item .\\public\\optimized\\* .\\public\\images\\ -Force"
    );
    console.log("   Remove-Item .\\public\\optimized -Recurse\n");
    console.log("3. Restart dev server: npm run dev\n");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

main();
