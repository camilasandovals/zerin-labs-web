import { useState, useContext } from "react";
import {  Button, Modal, Container, Form  } from "react-bootstrap"
import { MedicationsContext, UserContext } from "../../App"
import { PlusCircleFill } from "react-bootstrap-icons"
import Select from "react-select";
import options from "../../converter/drugsconverted.json"
import "./styles.css";

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
    const [endDate, setEndDate] = useState("")
    const [doctor, setDoctor] = useState("")
    
    const image ="https://cdn.shopify.com/s/files/1/0582/3453/6088/files/product-pill-golden-hour.png?v=1635445184"
    const image2 ="https://cdn.shopify.com/s/files/1/0582/3453/6088/files/product-pill-moonlight.png?v=1635445265"
    const image3 = "https://cdn.shopify.com/s/files/1/0582/3453/6088/files/product-pill-sunbeam.png?v=1635445293"

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
        const email = user.email
        console.log(endDate)
        fetch(`${process.env.REACT_APP_APIENDPOINT}:3001/api/medications/?email=${user.email}`, {
            method:"POST",
            headers: {"Content-Type": "application/json"},   //added this line for token 
            body: JSON.stringify({nameMed, dosage, quantity, unit, frequency, 
                medImg, notes, show:true, email, doctor, endDate})
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
    
    <PlusCircleFill className="plus-sign" onClick={() => setShowModal(true)} />
    <Modal show={showModal} onHide={() => setShowModal(false) } className="class-modal">
    
        <Modal.Body>
            <div className="form-modal">
                <h2>Add medication</h2>
                    <Form className="form-modal" onSubmit={handleAddMed}> 
                    <Form.Group className="mb-3">
                        <Form.Label>Medication Name</Form.Label>
                        <Select options={options} required={true}
                            onChange={ (e) => {setName(e.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Dosage</Form.Label>
                        <Form.Control type="Number" value={dosage} required={true} 
                         onChange={(e) => {setDosage(e.target.value)}}/>
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
                        <Form.Control type="text" value={frequency} required={true} placeholder="Ex: Three times daily" onChange={(e) => {setFrequency(e.target.value)}}/>
                    </Form.Group>
                    {/* Radio starts*/}
                    <div >
                        <label className="radio-med-img">
                            <input
                            type="radio"
                            name="test"
                            id="option1"
                            value={image}
                            checked={medImg === image}
                            onChange={handleImageChange}
                            />
                            <img src={image}  width={30}/>
                        </label>

                        <label className="radio-med-img">
                            <input
                            type="radio"
                            name="test"
                            id="option2"
                            value={image2}
                            checked={medImg === image2}
                            onChange={handleImageChange}
                            />
                            <img src={image2}  width={30}/>
                        </label>

                        <label className="radio-med-img">
                            <input
                            type="radio"
                            name="test"
                            id="option3"
                            value={image3}
                            checked={medImg === image3}
                            onChange={handleImageChange}
                            />
                            <img src={image3}  width={30}/>
                        </label>
                        </div>
                    {/* Radio ends */}
                    <Form.Group className="mb-3" >
                        <Form.Label>Prescribed by:</Form.Label>
                        <Form.Control type="text" value={doctor} placeholder="Ex: Dr. Smith" 
                        onChange={(e) => {setDoctor(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Refill Date</Form.Label>
                        <Form.Control type="date" value={endDate}
                        onChange={(e) => {setEndDate(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Notes</Form.Label>
                        <Form.Control type="text" value={notes} placeholder="Ex: Take at night, with a meal" 
                        onChange={(e) => {setNotes(e.target.value)}}/>
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
