import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const GeoMap = ({ logs }) => {
  return (
    <MapContainer center={[20, 77]} zoom={2} className="h-96 w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {logs.map((log, index) => (
        log.lat && log.lng && (
          <Marker key={index} position={[log.lat, log.lng]}>
            <Popup>
              {log.ip} - {new Date(log.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default GeoMap;
