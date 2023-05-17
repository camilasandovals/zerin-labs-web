import { useState, useContext } from "react";
import {  Button, Modal, Container, Form  } from "react-bootstrap"
import { MedicationsContext, UserContext } from "../App"
import { CalendarDate } from 'react-bootstrap-icons';

export default function DateModal({id}) {
    const [showModal, setShowModal] = useState(false);
    const [medications, setMedications] = useContext(MedicationsContext)
    const [user, setUser] = useContext(UserContext)
    const [nameMed, setName ] = useState('');
    const [dosage, setDosage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [frequency, setFrequency] = useState('');
    const [medImg, setMedImg] = useState("")
    const [notes, setNotes] = useState("")
    const [endDate, setEndDate] = useState("")
    const [doctor, setDoctor] = useState("")
    const [reactions, setReactions] = useState("")

    const image ="/images/MED1.png"
    const image2 ="/images/MED2.png"


    const handleEditMed = (e) => {
        e.preventDefault()
        const uid = user.email
        console.log(endDate)
        fetch(`http://3.95.14.19:3001/api/medications/${id}`, {
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


    const handleImageChange = (event) => {
        setMedImg(event.target.value);
      };

  return (
    <>
    <CalendarDate size={30} color={"purple"} onClick={() => setShowModal(true)}></CalendarDate>
    <Modal show={showModal} onHide={() => setShowModal(false) } >
    
        <Modal.Body>
            <Container>
                {/* <h2 className="mb-4 mt-4">Add medication</h2> */}
                    <Form onSubmit={handleEditMed}> 
                    <Form.Group className="mb-3" >
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" value={endDate}  
                        onChange={(e) => {setEndDate(e.target.value)}}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">Save</Button>
                    </Form>
            </Container> 
        </Modal.Body>
    </Modal >
    </>
  );
}
