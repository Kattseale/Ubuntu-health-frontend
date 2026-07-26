import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";

// Fix missing marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});
function FitBounds({ clinics }) {
    const map = useMap();

    useEffect(() => {

        if (clinics.length === 0) return;

        const bounds = clinics.map(c => [
            Number(c.latitude),
            Number(c.longitude)
        ]);

        map.fitBounds(bounds, {
            padding: [50, 50]
        });

    }, [clinics, map]);

    return null;
}
export default function ClinicMap({ clinics }) {

    const hospitalIcon = new L.Icon({
        iconUrl:
            "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
        iconSize: [35,35],
        iconAnchor:[17,35],
        popupAnchor:[0,-35]
    });

    return (

        <MapContainer className="clinic-map"
            style={{
                height: window.innerWidth < 768 ? "350px" : "500px",
                width: "100%",
                borderRadius: "12px"
            }}
        >

            <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds clinics={clinics} />
            {clinics.map((clinic) => (

                <Marker
                    icon={hospitalIcon}
                    key={clinic.id}
                    position={[
                        Number(clinic.latitude),
                        Number(clinic.longitude)
                    ]}
                >

                    <Popup>

                        <h3>{clinic.clinicName}</h3>

                        <p><strong>City:</strong> {clinic.city}</p>

                        <p><strong>Province:</strong> {clinic.province}</p>

                        <p><strong>Address:</strong> {clinic.address}</p>

                        <p><strong>Phone:</strong> {clinic.phoneNumber}</p>

                        <p><strong>Email:</strong> {clinic.email}</p>

                    </Popup>
                    <a
                        href={`https://www.google.com/maps?q=${clinic.latitude},${clinic.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        🧭 Get Directions
                    </a>

                </Marker>

            ))}

        </MapContainer>

    );
}