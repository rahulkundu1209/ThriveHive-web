import { fetchApprovedLearners } from "../services/learnerInformation.js";
import { getAdminInformation } from "../services/userInformation.js";

const handleGetAllApprovedLearners = async (req, res) => {
  //Check for authorization header that the user in admin
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  const token = req.headers.authorization.split(' ')[1];
  // Verify user token and fetch user ID
  const response = await getAdminInformation({ token });
  const isAdmin = response.isAdmin;
  if (!isAdmin) {
    return res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });
  }
  // Fetch learner information from the database
  try {
    const approvedLearners = await fetchApprovedLearners();
    return res.status(200).json({ success: true, approvedLearners });
  } catch (error) {
    console.error('Error fetching approved learners:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

export { handleGetAllApprovedLearners };