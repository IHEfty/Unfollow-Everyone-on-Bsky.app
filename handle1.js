const fs = require("fs");

const inputFile = "new.txt";
const outputFile = "handle.txt";

// Handles to ignore (case-insensitive)
const EXCLUDED_HANDLES = new Set([
    // "example.bsky.social",
    // "friend.bsky.social",
    // "my-alt.bsky.social",

].map(h => h.toLowerCase()));

const text = fs.readFileSync(inputFile, "utf8");

const matches = text.match(/@[a-zA-Z0-9._-]+\.[a-zA-Z0-9.-]+/g) || [];

const seen = new Set();
const handles = [];

for (const match of matches) {
    const handle = match.substring(1).trim(); // Remove @

    if (EXCLUDED_HANDLES.has(handle.toLowerCase())) {
        console.log(`Skipped: ${handle}`);
        continue;
    }

    if (!seen.has(handle.toLowerCase())) {
        seen.add(handle.toLowerCase());
        handles.push(handle);
    }
}

fs.writeFileSync(outputFile, handles.join("\n"), "utf8");

console.log(`Extracted ${handles.length} unique handles.`);
