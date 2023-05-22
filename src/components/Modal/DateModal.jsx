import { useState, useContext } from "react";
import {  Button, Modal, Container, Form  } from "react-bootstrap"
import { useParams } from 'react-router-dom';
import { MedicationsContext, UserContext } from "../../App"
import { CalendarDate } from 'react-bootstrap-icons';

export default function DateModal() {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [medications, setMedications] = useContext(MedicationsContext)
    const [user, setUser] = useContext(UserContext)
    const [endDate, setEndDate] = useState("")



    const handleEditMed = (e) => {
        e.preventDefault()
        console.log(endDate)
        fetch(`${process.env.REACT_APP_APIENDPOINT}:3001/api/medications/${id}`, {
            method:"PATCH",
            headers: {"Content-Type": "application/json"},   //added this line for token 
            body: JSON.stringify({ endDate })
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
    <CalendarDate size={30} color={"purple"} onClick={() => setShowModal(true)}></CalendarDate>
    <Modal show={showModal} onHide={() => setShowModal(false) } className="class-modal">
    
        <Modal.Body>
            <div className="form-modal">
            
                {/* <h2 className="mb-4 mt-4">Add medication</h2> */}
                    <Form className="form-modal" onSubmit={handleEditMed}> 
                    <Form.Group className="mb-3" >
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" value={endDate}  
                        onChange={(e) => {setEndDate(e.target.value)}}/>
                    </Form.Group>
                    <div className="button-modal">
                    <button className="button-landing-form" type="submit">Save</button>
                    </div>
                    </Form>
            </div> 
        </Modal.Body>
    </Modal >
    </>
  );
}
