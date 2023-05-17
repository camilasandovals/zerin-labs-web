import { useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import {  Modal, Container, Form  } from "react-bootstrap"
import { MedicationsContext, UserContext, SelectedMedicationContext } from "../App"
import { PencilSquare } from 'react-bootstrap-icons';

export default function EditModal({ variable, value }) {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [medications, setMedications] = useContext(MedicationsContext)
    const [user, setUser] = useContext(UserContext)
    const [selectedMedication, setSelectedMedication] = useContext(SelectedMedicationContext)
    

    const handleEditMed = (e) => {
        e.preventDefault()
        
        fetch(`http://3.95.14.19:3001/api/medications/${id}`, {
            method:"PATCH",
            headers: {"Content-Type": "application/json"},   //added this line for token 
            body: JSON.stringify({ variable} )
       })
           .then(resp => resp.json())
           .then( data => {
               if(data.message) {
                   alert(data.message)
                   return
               }
               setMedications(data);
               setShowModal(false)
           })
        .catch(alert) 
    }


  return (
    <>
    <PencilSquare size={30} color={"purple"} onClick={() => setShowModal(true)}></PencilSquare>
    <Modal show={showModal} onHide={() => setShowModal(false) } >
    
        <Modal.Body>
            <Container>
                    <Form onSubmit={handleEditMed}> 
                    <Form.Group className="mb-3" >
                        <Form.Label>{variable}</Form.Label>
                        <Form.Control type="text" value={value}  
                        onChange={(e) => {setSelectedMedication({...selectedMedication, [variable]: e.target.value })}}/>
                    </Form.Group>

                    
                    </Form>
            </Container> 
        </Modal.Body>
    </Modal >
    </>
  );
}
