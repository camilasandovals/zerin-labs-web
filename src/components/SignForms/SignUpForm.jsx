import { Form, Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { useContext, useState } from "react"


export default function SignUpForm() {
    const navigate = useNavigate()
    const [user, setUser] = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleAddUser = async(e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        try {
            const response = await fetch("http://3.95.14.19:3001/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });
        
            const data = await response.json();
        
            if (data.message) {
              alert(data.message);
              return;
            }
        
            setUser(data);
            console.log(data)
            localStorage.setItem("user", JSON.stringify(data))
            navigate('/home')
            
          } catch (err) {
            alert(err);
          }
        };


    return(
        <Container>
            <h2>Sign Up</h2>
            <p>Already an user? <span onClick={() => navigate('/login')}>Login!</span></p>
            <Form onSubmit={handleAddUser}>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} required={true}
                    onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter email" />
                    <Form.Text>
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} required={true}
                    onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" />
                    <Form.Text>
                    Minimun 8 characters.
                    </Form.Text>
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Keep me logged in" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                    Sign up
                </Button>
            </Form>
        </Container>
    )
}