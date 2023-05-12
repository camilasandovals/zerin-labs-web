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
    const [medImg, setMedImg] = useState("")

    const image =""
    const image2 =""

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
        console.log(medImg)
        fetch("http://localhost:3001/api/medications", {
            method:"POST",
            headers: {"Content-Type": "application/json"},   //added this line for token 
            body: JSON.stringify({nameMed, dosage, quantity, unit, frequency, medImg})
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
    

    return(
        <>
        <Container>
        <h2 className="mb-4">Add medication</h2>
        <Form  onSubmit={handleAddMed}>
            <Form.Group className="mb-3">
                <Form.Label>Medication Name</Form.Label>
                <Select options={options} required={true}
                    onChange={ (e) => {setName(e.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Dosage</Form.Label>
                <Form.Control type="text" value={dosage} required={true} placeholder="Ex: 200" onChange={(e) => {setDosage(e.target.value)}}/>
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
                    <img src={image}  />
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
                    <img src={image2}  />
                </label>
                </div>
            {/* Radio ends */}
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