import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { SelectedMedicationContext, UserContext } from "../App"
import EditModal from '../components/EditModal';
import DateModal from '../components/DateModal';
import UserModal from "../components/UserModal";
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
            <Container>
                <Row> 
                    <Row>
                        <Col >
                            <h1>{user?.fullname}</h1>
                            <img src={user?.img} height={100}/>
                            <p>Email: {user?.email}</p>
                            <p>Points: {user?.points}</p>
                            <p>Age: {user?.age}</p>
                            <p>Height: {user?.height}</p>
                            <p>Weight: {user?.weight}</p>
                            <p>Created at: {(new Date(user?.createdAt)).toLocaleDateString('en-US')} </p>
                        
                        <UserModal />
                        <Button onClick={
                            () => {
                                navigate('/login');
                                localStorage.removeItem('user');}
                        }>Logout</Button> 
                        </Col>
                    </Row>
                </Row>
            </Container>
        </>
    )
}