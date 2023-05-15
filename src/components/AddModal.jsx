import { useState, useContext } from "react";
import {  Button, Modal, Container, Form  } from "react-bootstrap"
import { MedicationsContext, UserContext } from "../App"
import { PlusCircleFill } from "react-bootstrap-icons"
import Select from "react-select";
import options from "../converter/drugsconverted.json"

export default function AddModal() {
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

    const handleAddMed = (e) => {
        e.preventDefault()
        const uid = user.email
        console.log(uid)
        fetch("http://3.95.14.19:3001/api/medications", {
            method:"POST",
            headers: {"Content-Type": "application/json"},   //added this line for token 
            body: JSON.stringify({nameMed, dosage, quantity, unit, frequency, medImg, notes, show:true, uid})
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
    <PlusCircleFill size={60} color={"violet"} onClick={() => setShowModal(true)} />
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
            <Container>
                <h2 className="mb-4 mt-4">Add medication</h2>
                    <Form onSubmit={handleAddMed}> 
                    <Form.Group className="mb-3">
                        <Form.Label>Medication Name</Form.Label>
                        <Select options={options} required={true}
                            onChange={ (e) => {setName(e.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Dosage</Form.Label>
                        <Form.Control type="text" value={dosage} required={true} 
                        placeholder="Ex: 200" onChange={(e) => {setDosage(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Unit</Form.Label>
                        <Select options={units} required={true}
                            onChange={ (e) => {setUnit(e.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" value={quantity} required={true} placeholder="Ex: 1 tablet" onChange={(e) => {setQuantity(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Frequency</Form.Label>
                        <Form.Control type="text" value={frequency} required={true} placeholder="Ex: Twice per day" onChange={(e) => {setFrequency(e.target.value)}}/>
                    </Form.Group>
                    {/* Radio starts*/}
                    <div>
                        <label className="btn">
                            <input
                            type="radio"
                            name="test"
                            id="option1"
                            value={image}
                            checked={medImg === image}
                            onChange={handleImageChange}
                            />
                            <img src={image}  width={50}/>
                        </label>

                        <label className="btn">
                            <input
                            type="radio"
                            name="test"
                            id="option2"
                            value={image2}
                            checked={medImg === image2}
                            onChange={handleImageChange}
                            />
                            <img src={image2}  width={50}/>
                        </label>
                        </div>
                    {/* Radio ends */}
                    <Form.Group className="mb-3" >
                        <Form.Label>Notes</Form.Label>
                        <Form.Control type="text" value={notes}  
                        onChange={(e) => {setNotes(e.target.value)}}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">Save</Button>
                    </Form>
            </Container> 
        </Modal.Body>
    </Modal >
    </>
  );
}
