import express from "express";
// import pool from "../config/db.js";
import supabase from "../config/db.js";

const router = express.Router();

// Get All Sections
router.get("/sections", async (req, res) => {
  try {
    const {data, error} = await supabase.from('worksheet_sections').select();
    // console.log("Data",data);
    // console.log("Error",error);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Insert a New Section
// router.post("/", async (req, res) => {
//   try {
//     const { section_title, type, questions } = req.body;
//     const query = `
//       INSERT INTO worksheet_sections (section_title, type, questions)
//       VALUES ($1, $2, $3) RETURNING *;
//     `;
//     const values = [section_title, type, JSON.stringify(questions)];
//     const result = await pool.query(query, values);
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Delete All Sections
// router.delete("/", async (req, res) => {
//   try {
//     await pool.query("DELETE FROM worksheet_sections");
//     res.json({ message: "All sections deleted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

export default router;
