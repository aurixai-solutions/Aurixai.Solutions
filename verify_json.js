
const fs = require('fs');

try {
  const content = fs.readFileSync('src/data/content.json', 'utf8');
  JSON.parse(content);
  console.log("JSON is valid");
} catch (e) {
  console.log("Error parsing JSON:", e.message);
  // Extract position from error message if available, or just use the position I know
  const match = e.message.match(/position (\d+)/);
  if (match) {
    const pos = parseInt(match[1]);
    const start = Math.max(0, pos - 100);
    const end = Math.min(content.length, pos + 100);
    console.log("Context:");
    console.log(content.substring(start, end));
    console.log("Error at:");
    console.log(content.substring(pos, pos + 1));
  } else {
      // If position 43961 is suspected
      const pos = 43961;
      const start = Math.max(0, pos - 100);
      const end = Math.min(content.length, pos + 100);
      console.log("Context around 43961:");
      console.log(content.substring(start, end));
  }
}
