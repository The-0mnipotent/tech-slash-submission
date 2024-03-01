import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { connection } from "./src/dbConnect";
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to fetch all favorites
// Route to fetch all favorites
app.get("/api/favorites", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM favorites", (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to handle POST request to add to favorites
app.post("/api/favorites", (req, res) => {
  const university = req.body;

  // Insert the university data into the MySQL database
  connection.query("INSERT INTO favorites SET ?", university, (err, result) => {
    if (err) {
      console.error("Error adding to favorites:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(201).json({ message: "Added to favorites successfully" });
  });
});

// Route to remove a favorite by ID
app.delete("/api/favorites/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM favorites WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error("Error removing favorite:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(200).json({ message: "Favorite removed successfully" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
  });
});
