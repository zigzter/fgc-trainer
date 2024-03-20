const fs = require("fs")

const result = [];

// Used to generate arrays of static character data
// Modify as needed, run it and pipe results to xclip -selection clipboard
function process() {
    const file = fs.readFileSync("./input.txt");
    const lines = file.toString().split("\n").filter(Boolean)
    for (const line of lines) {
        const [, , , filename] = line.split(/[ ,]+/);
        const id = filename.slice(0, filename.length - 4)
        const name = id.split("_").map((val) => val.charAt(0).toUpperCase() + val.slice(1)).join(" ");
        result.push({ id, name });
    }
    console.log(result)
}

process();
