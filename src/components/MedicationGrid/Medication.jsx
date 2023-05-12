import { useState, useContext } from "react";
import { MedicationsContext } from "../../App"
import { Col, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddMed from '../AddMed/AddMedForm'
import { CheckCircleFill } from "react-bootstrap-icons";

export default function Medication({data}){
    const [medications, setMedications] = useContext(MedicationsContext)
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3001/api/medications/${id}`, {
            method: "DELETE",
        })
        const data = await response.json();
        setMedications(data);
    }

    return (
    <Col key={data.id}>
        <Card style={{ width: '18rem' }} onClick={() => navigate('/medication')}>
        <Card.Img variant="top" src={data.medImg} /> 
        <Card.Body>
            <Card.Title>{data.nameMed}</Card.Title>
            <Card.Text>{data.quantity}</Card.Text>
            <Card.Text>{data.dosage} {data.unit}</Card.Text>
            <Card.Text>{data.frequency}</Card.Text>
            <CheckCircleFill size={60} color={"green"} variant="primary" 
            onClick={() => handleDelete(data._id)}
            >Taken!</CheckCircleFill>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Body>
                <AddMed setMedications={setMedications} showModal={showModal} setShowModal={setShowModal}/>
                </Modal.Body>
            </Modal >
        </Card.Body>
        </Card>
    </Col>
  );
}