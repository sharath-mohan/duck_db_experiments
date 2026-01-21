import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
const app = express();

app.get("/get-data", (req: Request, res: Response) => {
  try {
    const file = path.join(__dirname, "assets", "netflix_daily_top_10.parquet");
    console.log(file);

    const data = fs.readFileSync(file);

    res.set("Content-Type", "application/octet-stream");
    res.set("Content-Disposition", "attachment; filename=data.parquet");
    return res.send(data);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return res.status(404).send("File not found");
    }
    return res.status(500).send("Internal Server Error");
  }
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server started on port http://localhost:3000");
});
