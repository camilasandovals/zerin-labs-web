import { useState } from "react";

export default function TestAddMedication(){
    const [nameMed, setName ] = useState('');
    const [dosage, setDosage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [frequency, setFrequency] = useState('');
    const [medication, setMedication] = useState('');

    const handleAddMed = (e) => {
        e.preventDefault()
        fetch("http://54.234.48.173:3001/api/medications", {
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
               setMedication(data);
           })
        .catch(alert) 
    }

    return(
    <>
            <h2>Add medication</h2>
            <form onSubmit={handleAddMed}>
                <label htmlFor="name">Name
                    <input
                        type="text"
                        value={nameMed}
                        onChange={ (e) => {setName(e.target.value)}}/>
                </label>
                <br />
                <label htmlFor="dosage">Dosage
                <input
                    type="text"
                    value={dosage}
                    onChange={ (e) => {setDosage(e.target.value)}} />
                </label>
                <br/>
                <label htmlFor="quantity"> Quantity
                    <input 
                    type='text'
                    value={quantity}
                    onChange={ (e) => {setQuantity(e.target.value)}} />
                </label>
                <br/>
                <br/>
                <label htmlFor="unit"> Unit
                    <input 
                    type='text'
                    value={unit}
                    onChange={ (e) => {setUnit(e.target.value)}} />
                </label>
                <br/><br/>
                <label htmlFor="frequency"> Frequency
                    <input 
                    type='text'
                    value={frequency}
                    onChange={ (e) => {setFrequency(e.target.value)}} />
                </label>
                <br/>
                <input type="submit" value="Add medication" />
            </form>
        </>
    )
} 