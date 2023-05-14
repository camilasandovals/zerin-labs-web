import { useState, useContext } from "react";
import { MedicationsContext } from "../../App"
import { Col, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import { CheckCircleFill } from "react-bootstrap-icons";

export default function MedicationCard({data}){
    const [medications, setMedications] = useContext(MedicationsContext)
    const [showModal, setShowModal] = useState(false);
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


    // const handleDelete = async (id) => {
    //     const response = await fetch(`http://3.95.14.19:3001/api/medications/${id}`, {
    //         method: "DELETE",
    //     })
    //     const data = await response.json();
    //     setMedications(data);
    // }


    return (
    <Col >
        <Card style={{ width: '18rem' }} >
        <Card.Img variant="top" src={data.medImg} onClick={() => navigate(`/medications/${data._id}`) }/> 
        <Card.Body>
            <Card.Title>{data.nameMed}</Card.Title>
            <Card.Text>{data.quantity}</Card.Text>
            <Card.Text>{data.dosage} {data.unit}</Card.Text>
            <Card.Text>{data.frequency}</Card.Text>
            
            <CheckCircleFill size={60} color={"green"} variant="primary" 
            onClick={() => handleDelete(data._id)}
            >Taken!</CheckCircleFill>
        </Card.Body>
        </Card>
    </Col>
  );
}