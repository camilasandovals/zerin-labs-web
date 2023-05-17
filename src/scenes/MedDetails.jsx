import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { SelectedMedicationContext } from "../App"
import EditModal from '../components/EditModal';
import DateModal from '../components/DateModal';


export default function MedDetails() {
    const { id } = useParams();
    const [selectedMedication, setSelectedMedication] = useContext(SelectedMedicationContext);
    useEffect(()=>{
        fetch(`http://3.95.14.19:3001/api/medications/${id}`)
        .then(resp => resp.json())
        .then(setSelectedMedication)
        .catch(alert)
        
    },[])

    const handleDelete = async (id) => {
        const response = await fetch(`http://3.95.14.19:3001/api/medications/${id}`, {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endDate: "put code here" }), 
        });
        const data = await response.json();
        setSelectedMedication(data);
      };

    if (!selectedMedication) {
        return <div>Loading...</div>;
      }

    return(
        <>
            <Container>
                <Row> 
                    <Row>
                        <Col md={4}>
                            <h1>{selectedMedication.nameMed}</h1>
                            <p>Total taken: {selectedMedication.totalTaken}</p>
                            <p>Taking since: {(new Date(selectedMedication.createdAt)).toLocaleString('en-us')} </p>
                            <img src={selectedMedication.medImg} height={150}/>
                            <p>Dosage: {selectedMedication.dosage}  <EditModal variable="dosage" value={selectedMedication.dosage}/> </p>
                            <p>Unit: {selectedMedication.unit}  <EditModal variable="unit" value={selectedMedication.unit}/> </p>
                            <p>Quantity taking per day: {selectedMedication.quantity}  <EditModal variable="Quantity" value={selectedMedication.quantity} /> </p>
                            <p>Frequency: {selectedMedication.frequency}   <EditModal variable="frequency" value={selectedMedication.frequency}/></p>
                            <p>Prescribed by: {selectedMedication.doctor} <EditModal variable="doctor" value={selectedMedication.doctor}/> </p>
                            <p>Reactions: {selectedMedication.reactions}  <EditModal variable="reactions" value={selectedMedication.reactions}/> </p>
                            <p>Notes: {selectedMedication.notes} <EditModal variable="notes" value={selectedMedication.notes}/> </p>
                            <p>End Date: {selectedMedication.endDate}  <DateModal /> </p>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </>
    )
}