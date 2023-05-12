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
    const [img, setImg] = useState('')

    const radios = [
        { name: 'Active', value: '1' },
        { name: 'Radio', value: '2' },
        { name: 'Radio', value: '3' },
      ];

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
            {/* Radio starts*/}
              <div>
                <label className="btn">
                  <input type="radio" name="test" id="option1" autocomplete="off" checked />
                  <img src="data:image/jpeg;base64,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" height={50}/>
                  
                </label>

                <label className="btn">
                  <input type="radio" name="test" id="option2" autocomplete="off" checked />
                  <img src="https://www.drugs.com/images/pills/mmx/t109769b/metoprolol-tartrate.jpg" height={50}/>
                  
                </label>

                <label className="btn">
                  <input type="radio" name="test" id="option3" autocomplete="off" checked />
                  <img src="https://media.istockphoto.com/id/1209626287/photo/herb-capsule-orange-herbal-isolated-white-background.jpg?s=612x612&w=is&k=20&c=2nomhUVZKPEPbSpe5nzYCi42SGBq_2A6i-Z-3a2VYvI=" height={50}/>
                  
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