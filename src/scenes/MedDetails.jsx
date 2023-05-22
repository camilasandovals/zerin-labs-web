import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { SelectedMedicationContext } from "../App"
import EditModal from '../components/Modal/EditModal';
import DateModal from '../components/Modal/DateModal';


export default function MedDetails() {
    const { id } = useParams();
    const [selectedMedication, setSelectedMedication] = useContext(SelectedMedicationContext);
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_APIENDPOINT}:3001/api/medications/${id}`)
        .then(resp => resp.json())
        .then(setSelectedMedication)
        .catch(alert)
        
    },[])

    if (!selectedMedication) {
        return <div>Loading...</div>;
      }

    return(
        <>
            <Container className="section-med-details">
                <Row className="justify-content-center m-0">
                    <Col className="section-med-details-image">
                    
                    </Col>
                    
                    <Col md={6} className="section-med-details-content">
                            <h1>{selectedMedication.nameMed}</h1>
                            {/* <p>Total taken: {selectedMedication.totalTaken}</p> */}
                            <p>Taking since: {(new Date(selectedMedication.createdAt)).toLocaleDateString('en-US')} </p>
                            {/* <img src={selectedMedication.medImg} height={150}/> */}
                            <p>Dosage: {selectedMedication.dosage}  <EditModal variable="dosage" value={selectedMedication.dosage}/> </p>
                            <p>Unit: {selectedMedication.unit}  <EditModal variable="unit" value={selectedMedication.unit}/> </p>
                            <p>Quantity taking per day: {selectedMedication.quantity}  <EditModal variable="quantity" value={selectedMedication.quantity} /> </p>
                            <p>Frequency: {selectedMedication.frequency}   <EditModal variable="frequency" value={selectedMedication.frequency}/></p>
                            <p>Prescribed by: {selectedMedication.doctor} <EditModal variable="doctor" value={selectedMedication.doctor}/> </p>
                            <p>Reactions: {selectedMedication.reactions}  <EditModal variable="reactions" value={selectedMedication.reactions}/> </p>
                            <p>Notes: {selectedMedication.notes} <EditModal variable="notes" value={selectedMedication.notes}/> </p>
                            <p>Refill Date: {(new Date(selectedMedication.endDate)).toLocaleDateString('en-US')} <DateModal /></p>
                        </Col>
                        
                </Row>
            </Container>
        </>
    )
}