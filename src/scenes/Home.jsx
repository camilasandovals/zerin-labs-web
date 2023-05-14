import { useContext, useEffect } from "react"
import { MedicationsContext, UserContext } from "../App"
import { Button, Col, Container, Row } from "react-bootstrap"
import Grid from "../components/MedicationGrid/Grid"
import { useNavigate } from "react-router-dom"
import Modal from "../components/AddModal";
import User from "../components/User";
import Motivation from "../components/Motivation";


export default function Home(){
    const [medications, setMedications] = useContext(MedicationsContext)
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate();

    const token = localStorage.getItem("token") //get our JWT local Storage

    useEffect(() => {
        if(!token) {
            navigate('/login')
        }
    }, [])


    useEffect(()=>{
        fetch("http://3.95.14.19:3001/api/medications")
        .then(resp => resp.json())
        .then(setMedications)
        .catch(alert)
        
    },[])
  
    return(
        
        <Container>
            <Row>
                <Col md = {3}>
                    Welcome {user.displayName? user.displayName : 'User'}
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
