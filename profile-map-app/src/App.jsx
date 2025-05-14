import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { profile as profileData } from "./data/profile";
import ProfileCard from "./components/ProfileCard";
import ProfileDetails from "./pages/ProfileDetails";
import Navbar from "./components/Navbar";
import AdminPanel from './pages/AdminPanel';
import ProfileSummary from './pages/ProfileSummary';
import MapComponent from './components/MapComponent'; // ✅ Import the map component

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      try {
        const fail = false;
        if (fail) throw new Error("Failed to fetch profiles");

        setProfiles(profileData);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }, 1500);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h1 className="text-center mb-4">Profile</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {loading && <div className="text-center">Loading profiles...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {!loading && !error && (
                  <>
                    <MapComponent profiles={profiles} /> {/* ✅ Show map */}
                    <ProfileSummary profiles={profiles} />
                    <div className="d-flex flex-wrap justify-content-center mt-4">
                      {profiles.map((p) => (
                        <ProfileCard key={p.id} profile={p} />
                      ))}
                    </div>
                  </>
                )}
              </>
            }
          />
          <Route path="/profile/:id" element={<ProfileDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
