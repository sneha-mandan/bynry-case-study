// pages/ProfileSummary.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSummary = ({ profiles }) => {
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      <h3>Summary View of All Profiles</h3>
      <ul className="list-group">
        {profiles.map(profile => (
          <li
            key={profile.id}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            onClick={() => navigate(`/profile/${profile.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <span>
              <strong>{profile.name}</strong> - {profile.description}
            </span>
            <span className="badge bg-primary">{profile.address}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileSummary;
