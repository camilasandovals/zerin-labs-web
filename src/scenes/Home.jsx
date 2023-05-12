import { useContext, useEffect } from "react"
import { MedicationsContext } from "../App"
import { Button, Col, Container, Row } from "react-bootstrap"
import Grid from "../components/MedicationGrid/Grid"
import { useNavigate } from "react-router-dom"
import Modal from "../components/AddMed/AddModal";
import User from "../components/User";
import Motivation from "../components/Motivation";


export default function Home(){
    const [medications, setMedications] = useContext(MedicationsContext)
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:3001/api/medications")
        .then(resp => resp.json())
        .then(setMedications)
        .catch(alert)
        
    },[])
  
    return(
        <Container>
            <Row>
                <Col md = {3}>
                    <User />
                </Col>
                <Col>
                    <Row>
                        <Motivation />
                    </Row>
                    <Row>
                        <Grid />
                    </Row>
                    <Row>
                        <Modal />
                    </Row>
                    <Row>
                        <Button onClick={() => navigate('/login')}>Logout</Button> 
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
