import supabase from "../config/db.js";

// Function to get all the approved learners from the database
const fetchApprovedLearners = async () =>{
  try{
    const { data, error } = await supabase
      .from('approved_learners')
      .select('*');

    if (error) {
      const statusCode = error.status || 500; // Default to 500 if no status code is provided
      const errorMessage = `Error fetching approved learners: ${error.message}`;
      const errorWithStatus = new Error(errorMessage);
      errorWithStatus.statusCode = statusCode;
      throw errorWithStatus;
    }

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get approved learners');
  }
}

// function to get learner information from the database
const getApprovedLearnerInformation = async (db, uid) => {

}

export {fetchApprovedLearners};