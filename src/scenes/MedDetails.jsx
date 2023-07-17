import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { SelectedMedicationContext } from "../App"
import { useNavigate } from "react-router-dom"
import EditModal from '../components/Modal/EditModal';
import DateModal from '../components/Modal/DateModal';


export default function MedDetails() {
    const { id } = useParams();
    const [selectedMedication, setSelectedMedication] = useContext(SelectedMedicationContext);
    const navigate = useNavigate();
    
    useEffect(()=>{
       
        fetch(`${process.env.REACT_APP_APIENDPOINT}/api/medications/${id}`)
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
                <Row className="d-flex justify-content-center m-0">
                    <Col md={6}className="section-med-details-image">
                    &nbsp;
                    </Col>
                    
                    <Col md={6} className="section-med-details-content d-flex justify-content-center">
                            <div className="text-start">
                                <h1>{selectedMedication.nameMed}</h1>
                                {/* <p>Total taken: {selectedMedication.totalTaken}</p> */}
                                {/* <img className="pl-4" src={selectedMedication.medImg} height={100}/> */}
                                <p><strong>   Taking since: </strong>{(new Date(selectedMedication.createdAt)).toLocaleDateString('en-US')} </p>
        
                                <p><EditModal variable="dosage" value={selectedMedication.dosage}/> <strong>Dosage: </strong>{selectedMedication.dosage}   </p>
                                <p><EditModal variable="unit" value={selectedMedication.unit}/>  <strong>Unit: </strong> {selectedMedication.unit}  </p>
                                <p><EditModal variable="quantity" value={selectedMedication.quantity} /> <strong>Quantity taking per day:</strong> {selectedMedication.quantity}  </p>
                                <p><EditModal variable="frequency" value={selectedMedication.frequency}/> <strong>Frequency: </strong>{selectedMedication.frequency}   </p>
                                <p><EditModal variable="doctor" value={selectedMedication.doctor}/> <strong>Prescribed by: </strong>{selectedMedication.doctor} </p>
                                <p><EditModal variable="reactions" value={selectedMedication.reactions}/> <strong>Reactions: </strong>{selectedMedication.reactions}   </p>
                                <p><EditModal variable="notes" value={selectedMedication.notes}/> <strong> Notes: </strong>{selectedMedication.notes} </p>
                                <p><DateModal /> <strong>Refill Date: </strong>{(new Date(selectedMedication.endDate)).toLocaleDateString('en-US')} </p>
                            </div>
                        </Col>
                        
                </Row>
            </Container>
        </>
    )
}