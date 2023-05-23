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
          fetch(`${process.env.REACT_APP_APIENDPOINT}:3001/api/medications/?email=${user.email}`)
            .then((resp) => resp.json())
            .then(setMedications)
            .catch(alert);
        }
        // if(!user) {
        //     navigate('/')
        // }
      }, [user]);
  

    return(
        
        <section className="home-container">
            <Row>
                <Col className="section-user-home" sm = {12} md = {12} lg={3} >
                    <User />    
                </Col>
                <Col className = "home-add-medication ">
                    {/* <Row className="mt-4">
                        <Motivation />
                    </Row> */}
                    <Row>
                        <Grid />
                    </Row>
                    <Row>
                        <Modal />
                    </Row>
                </Col>
            </Row>
        </section>
    ) 
}
