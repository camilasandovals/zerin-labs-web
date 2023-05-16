import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { SelectedMedicationContext } from "../App"
import EditModal from '../components/EditModal';

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
                        <Col md={4}>
                            <h1>{selectedMedication.nameMed}</h1>
                            <img src={selectedMedication.medImg} height={150}/>
                            <p>{selectedMedication.dosage}{selectedMedication.unit}</p>
                            <p>{selectedMedication.quantity}</p>
                            <p>{selectedMedication.frequency}</p>
                            <p>Date added: {selectedMedication.createdAt}</p>
                            <p>End Date: {selectedMedication.endDate}</p>
                            <p>Prescribed by: {selectedMedication.doctor}</p>
                            <p>Reactions: {selectedMedication.reactions}</p>
                            <p>Taken weekly or daily: {selectedMedication.takingPerDayOrWeek}</p>
                            <p>Total taken: {selectedMedication.totalTaken}</p>
                            {selectedMedication.notes}
                        </Col>
                    </Row>
                    <Row>
                        <Button>Delete</Button>
                    </Row>
                    <Row>
                        <EditModal />
                    </Row>
                </Row>
            </Container>
        </>
    )
}