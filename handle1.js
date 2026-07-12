const fs = require("fs");
const csv = require("csv-parser");

const inputFile = "new.txt";
const outputFile = "handles.txt";

// Optional: Add handles here to exclude.
// Leave this array empty ([]) if you don't want to exclude anyone.
const EXCLUDED_HANDLES = new Set([
    // "example.bsky.social",
    // "friend.bsky.social",
    // "my-alt.bsky.social",
].map(h => h.toLowerCase()));

const handles = [];

fs.createReadStream(inputFile)
    .pipe(csv())
    .on("data", (row) => {
        if (!row.handle) return;

        const handle = row.handle.trim();

        // Skip excluded handles (only if any exist)
        if (EXCLUDED_HANDLES.has(handle.toLowerCase())) {
            console.log(`Skipped: ${handle}`);
            return;
        }

        handles.push(handle);
    })
    .on("end", () => {
        fs.writeFileSync(outputFile, handles.join("\n"), "utf8");

        console.log(`Extracted ${handles.length} handles.`);

        if (EXCLUDED_HANDLES.size > 0) {
            console.log(`Excluded ${EXCLUDED_HANDLES.size} handle(s).`);
        }
    });
