import React, { useState } from 'react';
import MapComponent from './MapComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const ProfileCard = ({ profile }) => {
  const [showMap, setShowMap] = useState(false);

  const handleSummaryClick = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img src={profile.image} className="card-img-top" alt={profile.name} />
      <div className="card-body">
        <h5 className="card-title">{profile.name}</h5>
        <p className="card-text">{profile.description}</p>

        <button className="btn btn-primary me-2" onClick={handleSummaryClick}>
          {showMap ? "Hide Map" : "Summary"}
        </button>

        <Link to={`/profile/${profile.id}`} className="btn btn-outline-secondary">
          View Details
        </Link>

        {showMap && (
          <div className="mt-3">
            <MapComponent lat={profile.lat} lng={profile.lng} name={profile.name} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
