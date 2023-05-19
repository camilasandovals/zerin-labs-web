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

    if (!selectedMedication) {
        return <div>Loading...</div>;
      }

    return(
        <>
            <Container>
                <Row> 
                    <Row>
                        <Col >
                            <h1>{selectedMedication.nameMed}</h1>
                            <p>Total taken: {selectedMedication.totalTaken}</p>
                            <p>Taking since: {(new Date(selectedMedication.createdAt)).toLocaleDateString('en-US')} </p>
                            <img src={selectedMedication.medImg} height={150}/>
                            <p>Dosage: {selectedMedication.dosage}  <EditModal variable="dosage" value={selectedMedication.dosage}/> </p>
                            <p>Unit: {selectedMedication.unit}  <EditModal variable="unit" value={selectedMedication.unit}/> </p>
                            <p>Quantity taking per day: {selectedMedication.quantity}  <EditModal variable="Quantity" value={selectedMedication.quantity} /> </p>
                            <p>Frequency: {selectedMedication.frequency}   <EditModal variable="frequency" value={selectedMedication.frequency}/></p>
                            <p>Prescribed by: {selectedMedication.doctor} <EditModal variable="doctor" value={selectedMedication.doctor}/> </p>
                            <p>Reactions: {selectedMedication.reactions}  <EditModal variable="reactions" value={selectedMedication.reactions}/> </p>
                            <p>Notes: {selectedMedication.notes} <EditModal variable="notes" value={selectedMedication.notes}/> </p>
                            <p>End Date: {(new Date(selectedMedication.endDate)).toLocaleDateString('en-US')} <DateModal /></p>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </>
    )
}