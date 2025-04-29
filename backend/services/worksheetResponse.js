import supabase from "../config/db.js";
import { getUserInformation } from "./userInformation.js";

//Save responses to the database for cache
const saveWorksheetResponse = async ({uid, section_id, date, userResponses}) => {
  try {
    // Generate the table name dynamically based on the section_id
    const tableName = `cache_response_${section_id}`;

    // Check if a row with the same uid and date already exists in the table
    const { data: existingRow, error: selectError } = await supabase
      .from(tableName)
      .select('uid, date')
      .eq('uid', uid)
      .eq('date', date)
      .single();
    
      // console.log("SelectError: ", selectError, "ExistingRow: ", existingRow);

    // Handle any errors that occur while fetching the existing row
    if (selectError && selectError.code !== 'PGRST116') {
      throw new Error(`Error fetching existing row: ${selectError.message}`);
    }

    if (existingRow) {
      // If the row exists, update the response for the given uid and date
      const { error: updateError } = await supabase
        .from(tableName)
        .update({ response: userResponses })
        .eq('uid', uid)
        .eq('date', date);

      // Handle any errors that occur while updating the row
      if (updateError) {
        throw new Error(`Error updating response: ${updateError.message}`);
      }
    } else {
      // If the row does not exist, insert a new row with the provided data
      const { error: insertError } = await supabase
        .from(tableName)
        .insert({ uid, date, response: userResponses });

      // Handle any errors that occur while inserting the new row
      if (insertError) {
        throw new Error(`Error inserting response: ${insertError.message}`);
      }
    }
  } catch (error) {
    // Log and rethrow any errors that occur during the process
    console.error(`Failed to save worksheet response: ${error.message}`);
    throw error;
  }
};

const fetchCacheWorksheetResponse = async ({uid, section_id, date}) => {
  try {
    // console.log("uid: ", uid, "section_id: ", section_id, "date: ", date);
    // Generate the table name dynamically based on the section_id
    const tableName = `cache_response_${section_id}`;

    // Fetch the response for the given uid and date from the table
    const { data: response, error } = await supabase
      .from(tableName)
      .select('response')
      .eq('uid', uid)
      .eq('date', date)
      .single();

    // Handle any errors that occur while fetching the response
    if (error) {
      throw new Error(`Error fetching response: ${error.message}`);
    }

    return response;
  } catch (error) {
    // Log and rethrow any errors that occur during the process
    console.error(`Failed to fetch worksheet response: ${error.message}`);
    throw error;
  }
}

const submitWorksheetResponse = async ({uid, section_id, date, userResponses}) => {
  try {
    // Generate the table name dynamically based on the section_id
    const tableName = `response_${section_id}`;

    // Check if a response already exists for the user on the given date
    const { data, error: error1 } = await supabase.from(tableName).select().eq('uid', uid).eq('date', date);

    if (data.length > 0) {
      throw { statusCode: 401, message: 'Response already submitted' };
    }

    // Insert the response into the table
    const { error } = await supabase
      .from(tableName)
      .insert({ uid, date, response: userResponses });

    // Handle any errors that occur while inserting the response
    if (error) {
      console.log(error);
      throw new Error(`Error submitting response: ${error.message}`);
    }
  } catch (error) {
    // Log and rethrow any errors that occur during the process
    console.log(error);
    console.error(`Failed to submit worksheet response: ${error.message}`);
    throw error;
  }
}

// Delete cache response
const deleteCacheWorksheetResponse = async ({uid, section_id, date}) => {
  try {
    // Generate the table name dynamically based on the section_id
    const tableName = `cache_response_${section_id}`;

    // Delete the response for the given uid and date from the table
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('uid', uid)
      .eq('date', date);

    // Handle any errors that occur while deleting the response
    if (error) {
      throw new Error(`Error deleting response: ${error.message}`);
    }
  } catch (error) {
    // Log and rethrow any errors that occur during the process
    console.error(`Failed to delete worksheet response: ${error.message}`);
    throw error;
  }
};

const adminFetchWorksheetResponse = async ({userId, sectionId, startDate, endDate}) => {
  try {
    // console.log("Params", userId, sectionId, startDate, endDate);
    // Generate the table name dynamically based on the section_id
    const tableName = `response_${sectionId}`;

    // Fetch the response for the given userId and date from the table
    let responsesResult;
    if (userId === "All" || userId === "") {
      const { data, error } = await supabase
      .from(tableName)
      .select()
      .gte('date', startDate)
      .lte('date', endDate);

      if (error) {
      throw new Error(`Error fetching responses: ${error.message}`);
      }
      responsesResult = data;
    } else {
      const { data, error } = await supabase
      .from(tableName)
      .select()
      .eq('uid', userId)
      .gte('date', startDate)
      .lte('date', endDate);

      if (error) {
      throw new Error(`Error fetching responses: ${error.message}`);
      }
      responsesResult = data;
    }
    // console.log("Responses: ", responsesResult);

    // Fetch user details (name and email) for each unique user ID
    const userIds = [...new Set(responsesResult.map(response => response.uid))];
    const users = {};
    for (const uid of userIds) {
      const response = await getUserInformation({ userId: uid });
      users[uid] = response;
    }

    // Add user details to the responses
    const responses = responsesResult.map(response => ({
      ...response,
      name: users[response.uid]?.displayName || null,
      email: users[response.uid]?.email || null,
    }));
    // console.log("Responses with user details: ", responses);

    return responses;
  } catch (error) {
    // Log and rethrow any errors that occur during the process
    console.error(`Failed to fetch worksheet response: ${error.message}`);
    throw error;
  }
}

const getCacheWorksheetResponseByDate = async ({section_id, date}) => {
  try {
    // Generate the table name dynamically based on the section_id
    const tableName = `cache_response_${section_id}`;

    // Fetch the response for the given uid and date from the table
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('date', date);

    // console.log("Response: ", data, "Error: ", error);
    // Handle any errors that occur while fetching the response
    if (error && error.code !== 'PGRST116') { // PGRST116 indicates no rows found
      throw new Error(`Error fetching response: ${error.message}`);
    }

    // Return null if no rows are found
    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    // Log and rethrow any errors that occur during the process
    console.error(`Failed to fetch worksheet response: ${error.message}`);
    throw error;
  }
}

export {
  saveWorksheetResponse,
  fetchCacheWorksheetResponse,
  submitWorksheetResponse,
  deleteCacheWorksheetResponse,
  adminFetchWorksheetResponse,
  getCacheWorksheetResponseByDate
};