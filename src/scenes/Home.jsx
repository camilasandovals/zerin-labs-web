import { Button, Col, Container, Row } from "react-bootstrap"
import Grid from "../components/MedicationGrid/Grid"
import { useNavigate } from "react-router-dom"
import AddMed from "../components/AddMed/Modal";
import User from "../components/User";
import Motivation from "../components/Motivation";


export default function Home(){
    const navigate = useNavigate();

  
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
                        <AddMed />
                    </Row>
                    <Row>
                        <Button onClick={() => navigate('/login')}>Logout</Button> 
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
