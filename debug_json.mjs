
import { open } from 'node:fs/promises';

async function debug() {
  try {
    const file = await open('../src/data/content.json', 'r');
    const buffer = Buffer.alloc(200);
    // Read 200 bytes around position 43961
    // 43961 - 100 = 43861
    const { bytesRead } = await file.read(buffer, 0, 200, 43861);
    
    console.log("Bytes read:", bytesRead);
    console.log("Context around 43961:");
    console.log(buffer.toString('utf8'));
    
    // Mark the position
    console.log("-".repeat(100) + "^ (43961)");
    
    await file.close();
  } catch (err) {
    console.error("Error:", err);
  }
}

debug();
