import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapComponent = ({ profiles }) => {
  const defaultCenter = [19.076, 72.8777]; // Default center (Mumbai)

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={defaultCenter} zoom={4} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {profiles.map(profile => (
          <Marker
            key={profile.id}
            position={[parseFloat(profile.lat), parseFloat(profile.lng)]}
          >
            <Popup>
              <strong>{profile.name}</strong><br />
              {profile.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
