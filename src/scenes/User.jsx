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
          fetch(`${process.env.REACT_APP_APIENDPOINT}:3001/api/users/?email=${user.email}`)
            .then((resp) => resp.json())
            .then(setUser)
            .catch(alert);
        }
      }, []);
    return(
        <>
            <Container className="section-user">

                <Row className="justify-content-center m-0"> 
                        <Col sm={5} md={3} lg={4} className="form-user">
                        
                            <h1>{user?.fullname}</h1>
                            <img className="image-user" src={user?.img}/>
                            <div className="text-start" style={{paddingLeft:100}}>
                            <p><strong>Email: </strong>{user?.email}</p>
                            <p><strong>Points: </strong>{user?.points}</p>
                            <p><strong>Age: </strong>{user?.age}</p>
                            <p><strong>Gender: </strong>{user?.gender}</p>
                            <p><strong>Height: </strong>{user?.height}</p>
                            <p><strong>Weight: </strong>{user?.weight}</p>
                            <p><strong>Created at: </strong>{(new Date(user?.createdAt)).toLocaleDateString('en-US')} </p>
                            </div>
                            <Row>
                                <Col>
                                    <UserModal />
                                </Col>
                                <Col>
                                    <button className="button-landing-form" onClick={
                                    () => {
                                        navigate('/');
                                        localStorage.removeItem('user');
                                        setUser(null)}
                                    }>Logout</button> 
                                </Col>
                            </Row>
                        
                        </Col>
                </Row>
            </Container>
        </>
    )
}

<Container className="section-user" style={{ padding: 0, margin: 0, width: '100%', maxWidth: '100vw' }}>
  {/* Content */}
</Container>
