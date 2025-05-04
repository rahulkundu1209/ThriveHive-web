import { handleAutomaticWorksheetResponseSubmit } from "../controllers/worksheetResponse";

export default async function handler(req, res) {
  try {
    // Call the function for each section
    await handleAutomaticWorksheetResponseSubmit(1);
    await handleAutomaticWorksheetResponseSubmit(2);
    // Add more sections as needed

    console.log('Automatic worksheet response submission completed for all sections.');
    res.status(200).json({ success: true, message: 'Automatic submission completed.' });
  } catch (error) {
    console.error('Error in automatic worksheet response submission:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error: ' + error.message });
  }
}