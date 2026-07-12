const fs = require("fs");
const csv = require("csv-parser");

const inputFile = "new.txt";
const outputFile = "handles.txt";

const handles = [];

fs.createReadStream(inputFile)
    .pipe(csv())
    .on("data", (row) => {
        if (row.handle) {
            handles.push(row.handle);
        }
    })
    .on("end", () => {
        fs.writeFileSync(outputFile, handles.join("\n"), "utf8");
        console.log(`Extracted ${handles.length} handles.`);
    });
