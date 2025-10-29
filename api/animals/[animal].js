import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "dream_animal_135.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    const { dream } = req.query;
    const decodedDream = decodeURIComponent(dream).toLowerCase();

    const found = data.find(
      (item) => item.dream.toLowerCase() === decodedDream
    );

    if (!found) {
      res.status(404).json({ error: "Dream not found" });
      return;
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(found);
  } catch (error) {
    console.error("Error reading dream_animal_135.json:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
}
