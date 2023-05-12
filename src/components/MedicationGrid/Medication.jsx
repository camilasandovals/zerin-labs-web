import { useState, useContext } from "react";
import { UserMedications } from "../../App"
import { Col, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddMed from '../AddMed/AddMedForm'

export default function Medication({data}){
    const [medications, setMedications] = useContext(UserMedications)
    const [showModal, setShowModal] = useState(false);
    console.log(setMedications)

    // const handleUpdate = async (id) => {
    //     const modifiedMed = {

    //     }
    //     const update = await fetch(`http://54.234.48.173:3001/api/medications/${id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json" 
    //         },
    //         body: JSON.stringify(modifiedMed)
    //     })
    // }
    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3001/api/medications/${id}`, {
            method: "DELETE",
        })
        const data = await response.json();
        setMedications(data);
    }

    return (
    <Col key={data.id}>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://i0.wp.com/vitalrecord.tamhsc.edu/wp-content/uploads/2017/01/pills-tamhsc.jpg?fit=1100%2C625&ssl=1" />
        <Card.Body>
            <Card.Title>{data.nameMed}</Card.Title>
            <Card.Text>{data.quantity}</Card.Text>
            <Card.Text>{data.dosage} {data.unit}</Card.Text>
            <Card.Text>{data.frequency}</Card.Text>
            <Button variant="primary" 
            onClick={() => handleDelete(data._id)}
            >Taken!</Button>
            <Button variant="primary" 
            onClick={() => setShowModal(true)}
            >Update!</Button>
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