import { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap"
import { UserMedications } from "../../App"
import Select from "react-select";
import options from "../../converter/drugsconverted.json";

export default function AddMedForm({setShowModal}){
    const [nameMed, setName ] = useState('');
    const [dosage, setDosage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [frequency, setFrequency] = useState('');
    const [medications, setMedications] = useContext(UserMedications)
    
    console.log(setMedications)

    const handleAddMed = (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/api/medications", {
            method:"POST",
            headers: {"Content-Type": "application/json"},   //added this line for token 
            body: JSON.stringify({nameMed, dosage, quantity, unit, frequency})
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

    return(
        <>
        
        <Container>
        <h2 className="mb-4">Add medication</h2>
        <Form  onSubmit={handleAddMed}>
            <Form.Group className="mb-3">
                <Form.Label>Medication Name</Form.Label>
                <Select options={options} 
                    onChange={ (e) => {setName(e.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Dosage</Form.Label>
                <Form.Control type="text" value={dosage} required={true} placeholder="Enter dosage" onChange={(e) => {setDosage(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="text" value={quantity} required={true} placeholder="Enter quantity" onChange={(e) => {setQuantity(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Unit</Form.Label>
                <Form.Control type="text" value={unit} required={true} placeholder="Enter unit" onChange={(e) => {setUnit(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Frequency</Form.Label>
                <Form.Control type="text" value={frequency} required={true} placeholder="Enter frequency" onChange={(e) => {setFrequency(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={1} />
            </Form.Group>

            <Button variant="primary" type="submit">Add</Button>
    
        </Form>
    </Container>  
        </>
    )
} 