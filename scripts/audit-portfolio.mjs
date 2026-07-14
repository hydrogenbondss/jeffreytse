#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsRoot = path.join(root, "assets");
const indexPath = path.join(root, "index.html");
const indexHtml = readFileSync(indexPath, "utf8");
const directBundleName = indexHtml.match(/\.\/assets\/(index-[^?"']+\.js)/)?.[1];
const loaderName = indexHtml.match(/\.\/assets\/(portfolio-loader\.js)/)?.[1];
const loader = loaderName ? readFileSync(path.join(assetsRoot, loaderName), "utf8") : "";
const bundleName = directBundleName || loader.match(/\.\/(index-[^?"']+\.js)/)?.[1];

if (!bundleName) {
  console.error("Portfolio audit failed: index.html does not reference a production bundle.");
  process.exit(1);
}

const bundlePath = path.join(assetsRoot, bundleName);

if (!existsSync(bundlePath)) {
  console.error(`Portfolio audit failed: missing bundle assets/${bundleName}.`);
  process.exit(1);
}

const bundle = readFileSync(bundlePath, "utf8");
const mediaExtension = String.raw`(?:png|jpe?g|webp|gif|mp4|webm|svg|pdf)`;
const localMedia = new Set();
const errors = [];
const warnings = [];

function collectMatches(source, expression, group = 1) {
  for (const match of source.matchAll(expression)) {
    const value = match[group];
    if (value) localMedia.add(value.replace(/^\//, ""));
  }
}

collectMatches(bundle, new RegExp(String.raw`mt\+"(\/[^"?]+\.${mediaExtension})"`, "g"));
collectMatches(bundle, new RegExp(String.raw`\`\$\{mt\}(\/[^\`?]+\.${mediaExtension})\``, "g"));
collectMatches(bundle, new RegExp(String.raw`["'](\/[^"'?]+\.${mediaExtension})["']`, "g"));

for (const relativePath of localMedia) {
  const target = path.join(assetsRoot, relativePath);
  if (!existsSync(target)) errors.push(`Missing local media: assets/${relativePath}`);
}

for (const match of indexHtml.matchAll(/(?:src|href)=["']\.\/([^"'?]+)[^"']*["']/g)) {
  const relativePath = match[1];
  if (!existsSync(path.join(root, relativePath))) errors.push(`Missing page dependency: ${relativePath}`);
}

function findClosingBracket(source, openingIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = openingIndex; index < source.length; index += 1) {
    const character = source[index];

    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = null;
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }

    if (character === "[") depth += 1;
    if (character === "]") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  return -1;
}

function collectGalleryMatches(source, expression, destination) {
  for (const match of source.matchAll(expression)) destination.push(match[1]);
}

function gallerySources(source) {
  const sources = [];
  collectGalleryMatches(source, new RegExp(String.raw`src:mt\+"(\/[^"?]+\.${mediaExtension})"`, "g"), sources);
  collectGalleryMatches(source, new RegExp(String.raw`src:\`\$\{mt\}(\/[^\`?]+\.${mediaExtension})\``, "g"), sources);
  collectGalleryMatches(source, new RegExp(String.raw`src:["'](\/[^"'?]+\.${mediaExtension})["']`, "g"), sources);
  return sources.map((item) => item.replace(/^\//, ""));
}

let searchIndex = 0;
let galleriesChecked = 0;

while ((searchIndex = bundle.indexOf("media:[", searchIndex)) !== -1) {
  const openingIndex = searchIndex + "media:".length;
  const closingIndex = findClosingBracket(bundle, openingIndex);
  if (closingIndex === -1) {
    errors.push(`Could not parse media gallery near bundle offset ${searchIndex}.`);
    break;
  }

  const objectPrefix = bundle.slice(Math.max(0, searchIndex - 2400), searchIndex);
  const titleMatches = [...objectPrefix.matchAll(/title:"((?:\\.|[^"])*)"/g)];
  const title = titleMatches.at(-1)?.[1] ?? `Gallery at offset ${searchIndex}`;
  const gallery = gallerySources(bundle.slice(openingIndex, closingIndex + 1));
  const duplicates = [...new Set(gallery.filter((item, index) => gallery.indexOf(item) !== index))];

  if (duplicates.length) errors.push(`${title} repeats gallery media: ${duplicates.join(", ")}`);
  const sourceCount = [...bundle.slice(openingIndex, closingIndex + 1).matchAll(/src:/g)].length;
  if (!sourceCount) warnings.push(`${title} has an empty media array.`);

  galleriesChecked += 1;
  searchIndex = closingIndex + 1;
}

const assetCount = readdirSync(assetsRoot, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .length;

if (warnings.length) {
  console.log("Warnings:");
  for (const warning of warnings) console.log(`  - ${warning}`);
}

if (errors.length) {
  console.error("Portfolio audit failed:");
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `Portfolio audit passed: ${localMedia.size} referenced media files, ${galleriesChecked} galleries, ${assetCount} asset files.`,
);
