import React, { useState } from 'react';
import { profile as initialData } from '../data/profile';

const AdminPanel = () => {
  const [profiles, setProfiles] = useState(initialData);
  const [newProfile, setNewProfile] = useState({
    id: '',
    name: '',
    description: '',
    image: '',
    lat: '',
    lng: '',
    address: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const handleDelete = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  const handleChange = (e) => {
    setNewProfile({
      ...newProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const validateInputs = () => {
    if (!newProfile.name || !newProfile.description || !newProfile.image || !newProfile.address || !newProfile.lat || !newProfile.lng) {
      setError('Please fill in all fields.');
      return false;
    }
    if (isNaN(newProfile.lat) || isNaN(newProfile.lng)) {
      setError('Latitude and Longitude must be numbers.');
      return false;
    }
    setError('');
    return true;
  };

  const handleAddOrUpdate = () => {
    if (!validateInputs()) return;

    if (editingId) {
      // Update existing profile
      const updated = profiles.map(p =>
        p.id === editingId ? { ...newProfile, id: editingId } : p
      );
      setProfiles(updated);
      setEditingId(null);
    } else {
      // Add new profile
      const newId = Date.now();
      setProfiles([...profiles, { ...newProfile, id: newId }]);
    }

    // Reset form
    setNewProfile({
      id: '',
      name: '',
      description: '',
      image: '',
      lat: '',
      lng: '',
      address: '',
    });
  };

  const handleEdit = (profile) => {
    setNewProfile(profile);
    setEditingId(profile.id);
    setError('');
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Panel - Manage Profiles</h2>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or address..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Add or Edit Form */}
      <div className="card p-3 mb-4">
        <h4>{editingId ? 'Edit Profile' : 'Add New Profile'}</h4>
        <input className="form-control my-2" name="name" placeholder="Name" value={newProfile.name} onChange={handleChange} />
        <input className="form-control my-2" name="description" placeholder="Description" value={newProfile.description} onChange={handleChange} />
        <input className="form-control my-2" name="image" placeholder="Image URL" value={newProfile.image} onChange={handleChange} />
        <input className="form-control my-2" name="address" placeholder="Address" value={newProfile.address} onChange={handleChange} />
        <input className="form-control my-2" name="lat" placeholder="Latitude" value={newProfile.lat} onChange={handleChange} />
        <input className="form-control my-2" name="lng" placeholder="Longitude" value={newProfile.lng} onChange={handleChange} />
        <button className="btn btn-success mt-2" onClick={handleAddOrUpdate}>
          {editingId ? 'Update Profile' : 'Add Profile'}
        </button>
      </div>

      {/* Profiles List */}
      {filteredProfiles.length > 0 ? (
        filteredProfiles.map(profile => (
          <div key={profile.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{profile.name}</h5>
              <p>{profile.description}</p>
              <button className="btn btn-warning me-2" onClick={() => handleEdit(profile)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(profile.id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No profiles match your search.</p>
      )}
    </div>
  );
};

export default AdminPanel;
