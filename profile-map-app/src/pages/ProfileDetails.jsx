import React from 'react';
import { useParams } from 'react-router-dom';
import { profile } from '../data/profile';

const ProfileDetails = () => {
  const { id } = useParams();
  const selectedProfile = profile.find((p) => p.id === parseInt(id));

  if (!selectedProfile) {
    return <div className="text-center mt-5">Profile not found</div>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <img src={selectedProfile.image} className="card-img-top" alt={selectedProfile.name} />
        <div className="card-body text-center">
          <h3 className="card-title">{selectedProfile.name}</h3>
          <p className="card-text">{selectedProfile.description}</p>
          <p className="card-text"><strong>Address:</strong> {selectedProfile.address}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
