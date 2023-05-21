import { useState, useContext } from "react";
import { MedicationsContext, UserContext } from "../../App"
import { Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import "./styles.css";

export default function HistoryCard({data}){
    const [medications, setMedications] = useContext(MedicationsContext)
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate();
    
    const handleDelete = async (id) => {
        const response = await fetch(`http://3.95.14.19:3001/api/medications/${id}`, {
          method: "PATCH", // Use the PATCH method instead of DELETE
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ show: false }), // Set the deleted flag to true
        });
        const data = await response.json();
        setMedications(data);
      };

    return (
    // <Col >
    //     <Card style={{ width: '18rem' }} >
    //     <Card.Img variant="top" src={data.medImg} onClick={() => navigate(`/medications/${data._id}`) }/> 
    //     <Card.Body>
    //         <Card.Title>{data.nameMed}</Card.Title>
    //         <Card.Text>Quantity taking per day: {data.quantity}</Card.Text>
    //         <Card.Text>Dosage: {data.dosage} {data.unit}</Card.Text>
    //         <Card.Text>Frequency: {data.frequency}</Card.Text>
    //         <Card.Text>Notes: {data.notes}</Card.Text>
    //     </Card.Body>
    //     </Card>
    // </Col>

    <Col className="d-flex justify-content-center ">
      <div className="card-history-wrapper" onClick={() => navigate(`/medications/${data._id}`)}>
        <img
          className="medication-card-history-image"
          src={data.medImg}
          alt="Overlay"
        />

        <div className="medication-card-content">
          <h2>{data.nameMed}</h2>
          <p>
            <span>Quantity:</span> {data.quantity}
          </p>
          <p>
            <span>Dosage:</span> {data.dosage} {data.unit}
          </p>
          <p>
            <span>Frecuency:</span> {data.frequency}
          </p>
        </div>
      </div>
      </Col>
    
  );
}