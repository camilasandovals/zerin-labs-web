import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { SelectedMedicationContext, UserContext } from "../App"
import EditModal from '../components/Modal/EditModal';
import DateModal from '../components/Modal/DateModal';
import UserModal from "../components/Modal/UserModal";
import { useNavigate } from "react-router-dom"

export default function MedDetails() {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {  
          fetch(`http://3.95.14.19:3001/api/users/?email=${user.email}`)
            .then((resp) => resp.json())
            .then(setUser)
            .catch(alert);
        }
      }, []);
    return(
        <>
            <Container className="section-user">

                <Row className="justify-content-center"> 
                        <Col md={4} className="form-user">
                            <h1>{user?.fullname}</h1>
                            <img className="image-user" src={user?.img}/>
                            <p>Email: {user?.email}</p>
                            <p>Points: {user?.points}</p>
                            <p>Age: {user?.age}</p>
                            <p>Gender: {user?.gender}</p>
                            <p>Height: {user?.height}</p>
                            <p>Weight: {user?.weight}</p>
                            <p>Created at: {(new Date(user?.createdAt)).toLocaleDateString('en-US')} </p>
                            <Row>
                                <Col>
                                    <UserModal />
                                </Col>
                                <Col>
                                    <button className="button-landing-form" onClick={
                                    () => {
                                        navigate('/');
                                        localStorage.removeItem('user');}
                                    }>Logout</button> 
                                </Col>
                            </Row>
                        
                        </Col>
                </Row>
            </Container>
        </>
    )
}