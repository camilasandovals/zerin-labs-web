import { useContext, useEffect } from "react"
import { MedicationsContext, UserContext } from "../App"
import { Button, Col, Container, Row } from "react-bootstrap"
import Grid from "../components/MedicationGrid/Grid"
import { useNavigate } from "react-router-dom"
import Modal from "../components/Modal/AddModal";
import User from "../components/UserHomeInfo/UserInfo";
import Motivation from "../components/Header/Motivation";


export default function Home(){
    const [medications, setMedications] = useContext(MedicationsContext)
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {  
          fetch(`http://3.95.14.19:3001/api/medications/?email=${user.email}`)
            .then((resp) => resp.json())
            .then(setMedications)
            .catch(alert);
        }
      }, [user]);
  
    if(!user) {
        navigate('/login')
    }

    return(
        
        <Container>
            <Row>
                <Col sm = {12} md = {12} lg={3} >
                    <User />    
                </Col>
                <Col >
                    <Row>
                        <Motivation />
                    </Row>
                    <Row>
                        <Grid />
                    </Row>
                    <Row>
                        <Modal />
                    </Row>
                </Col>
            </Row>
        </Container>
    ) 
}
