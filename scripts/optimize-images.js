#!/usr/bin/env node
/**
 * Image Optimization Script
 * Compresses all images to WebP format for faster loading
 * Run: node scripts/optimize-images.js
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, "../src/assets/Images");
const OUTPUT_DIR = path.join(__dirname, "../src/assets/Compressed-Images");

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
}

// Get all subdirectories in Images folder
const getSubdirectories = (dir) => {
  return fs.readdirSync(dir).filter((file) => {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
};

const subdirs = getSubdirectories(SOURCE_DIR);

let processedCount = 0;
let errorCount = 0;

// Process each subdirectory
subdirs.forEach((subdir) => {
  const subdirPath = path.join(SOURCE_DIR, subdir);
  const outputSubdir = path.join(OUTPUT_DIR, subdir);

  // Create output subdirectory
  if (!fs.existsSync(outputSubdir)) {
    fs.mkdirSync(outputSubdir, { recursive: true });
  }

  // Get all image files in subdirectory
  const files = fs.readdirSync(subdirPath).filter((file) => {
    return /\.(jpg|jpeg|png|webp)$/i.test(file);
  });

  files.forEach((file) => {
    const inputPath = path.join(subdirPath, file);
    const outputPath = path.join(
      outputSubdir,
      file.replace(/\.[^.]+$/, ".webp"),
    );

    // Skip if already a high-quality WebP
    if (file.endsWith(".webp")) {
      console.log(`⏭️  Skipping (already WebP): ${subdir}/${file}`);
      return;
    }

    sharp(inputPath)
      .resize(2400, 1600, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 75, effort: 6 })
      .toFile(outputPath)
      .then((info) => {
        const originalSize = fs.statSync(inputPath).size / 1024;
        const compressedSize = info.size / 1024;
        const reduction = (
          (1 - info.size / fs.statSync(inputPath).size) *
          100
        ).toFixed(1);

        console.log(
          `✅ ${subdir}/${file}: ${originalSize.toFixed(1)}KB → ${compressedSize.toFixed(1)}KB (-${reduction}%)`,
        );
        processedCount++;
      })
      .catch((err) => {
        console.error(`❌ Error processing ${subdir}/${file}:`, err.message);
        errorCount++;
      });
  });
});

// Summary
setTimeout(() => {
  console.log(
    `\n📊 Summary: ${processedCount} images compressed, ${errorCount} errors`,
  );
  if (errorCount === 0) {
    console.log("✨ All images optimized successfully!");
    console.log(
      '💡 Tip: Update your images paths to use "/src/assets/Compressed-Images/" instead of "/src/assets/Images/"',
    );
  }
}, 2000);
