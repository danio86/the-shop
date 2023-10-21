import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      console.log("Fetching property data for ID:", id);
      try {
        const { data } = await axiosReq.get(`/property/${id}`);
        console.log("Received property data:", data);
        setProperty(data);
      } catch (err) {
        console.log("Error fetching property data:", err);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Price: {property.price}</p>
      <p>Size: {property.size}</p>
      <p>Number of rooms: {property.num_rooms}</p>
      <p>Location: {property.location}</p>
      <p>Status: {property.status}</p>
      <p>Type: {property.property_type}</p>
      <p>Number of interests: {property.num_interests}</p>
      <img src={property.image} alt={property.title} />
    </div>
  );
}

export default PropertyDetails;