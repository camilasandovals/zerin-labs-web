import { useState, useContext } from "react";
import {  Button, Modal, Container, Form  } from "react-bootstrap"
import { MedicationsContext, UserContext } from "../App"
import { PlusCircleFill } from "react-bootstrap-icons"
import Select from "react-select";
import options from "../converter/drugsconverted.json"

export default function EditModal({id}) {
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

    const units =  
    [
        { value: "mcg", label: "mcg" },
        { value: "mg", label: "mg" },
        { value: "g", label: "g" },
        { value: "ml", label: "ml" },
        { value: "l", label: "l" },
        { value: "%", label: "%" }
    ];

    const handleEditMed = (e) => {
        e.preventDefault()
        const uid = user.email
        console.log(endDate)
        fetch(`http://3.95.14.19:3001/api/medications/${id}`, {
            method:"PATCH",
            headers: {"Content-Type": "application/json"},   //added this line for token 
            body: JSON.stringify({nameMed, dosage, quantity, unit, frequency, 
                medImg, notes, show:true, uid, doctor, endDate, reactions})
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
    <Button size={60} color={"violet"} onClick={() => setShowModal(true)}> Edit</Button>
    <Modal show={showModal} onHide={() => setShowModal(false) } >
    
        <Modal.Body>
            <Container>
                {/* <h2 className="mb-4 mt-4">Add medication</h2> */}
                    <Form onSubmit={handleEditMed}> 
                    <Form.Group className="mb-3" >
                        <Form.Label>Dosage</Form.Label>
                        <Form.Control type="text" value={dosage}  
                        placeholder="Ex: 200" onChange={(e) => {setDosage(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Unit</Form.Label>
                        <Select options={units} 
                            onChange={ (e) => {setUnit(e.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" value={quantity}  placeholder="Ex: 1 tablet" onChange={(e) => {setQuantity(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Frequency</Form.Label>
                        <Form.Control type="text" value={frequency}  placeholder="Ex: Three times daily" onChange={(e) => {setFrequency(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" value={endDate}
                        onChange={(e) => {setEndDate(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Notes</Form.Label>
                        <Form.Control type="text" value={notes} placeholder="Ex: Take at night, with a meal" 
                        onChange={(e) => {setNotes(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Reactions:</Form.Label>
                        <Form.Control type="text" value={reactions} placeholder="Symptoms include cough, nausea, and headaches..." 
                        onChange={(e) => {setReactions(e.target.value)}}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">Save</Button>
                    </Form>
            </Container> 
        </Modal.Body>
    </Modal >
    </>
  );
}
