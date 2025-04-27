import { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RootLayout from './components/RootLayout';
import Home from './components/Home/Home';
import Worksheet from './components/Worksheet/Worksheet';
import ViewWorksheetSubmissions from './components/Admin/ViewWorksheetSubmissions';
import Submissions from './components/Submissions/Submissions';
import AdminDashboard from './components/Admin/AdminDashboard';
import Profile from './components/ProfilePage/ProfilePage';
import ProfileEdit from './components/ProfileEdit/ProfileEdit';
import Login from './components/Login';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState(null);

  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn, isAdmin, setIsAdmin, userName, setUserName }}>
      <Router>
        <RootLayout />
        <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<ProfileEdit />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/worksheet" element={<Worksheet />} />
          {(signedIn && isAdmin) && <Route path="/view-worksheet-submissions" element={<ViewWorksheetSubmissions />} />}
          {(signedIn && isAdmin) && <Route path="/admin-dashboard" element={<AdminDashboard />} />}
          {signedIn && <Route path="/worksheet-submissions" element={<Submissions />} />}
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
