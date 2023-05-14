import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"
import { Form, Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { useContext, useState } from "react"

const firebaseConfig = {
    apiKey: "AIzaSyCaj2yp6o3IUmnuEqtrrYjwitTElPe6AMY",
    authDomain: "zerin-labs.firebaseapp.com",
    projectId: "zerin-labs",
    storageBucket: "zerin-labs.appspot.com",
    messagingSenderId: "7317186784",
    appId: "1:7317186784:web:2bc91b599ed45c92498885"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default function LoginForm() {
    const navigate = useNavigate()
    const [user, setUser] = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async(e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const response = await signInWithEmailAndPassword(auth, email, password)
            .catch(err => alert(err))
            setUser(response.user);
            console.log(email)
        navigate("/home")
    }

    
    
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        
        try {
            const result = await signInWithPopup(auth, provider)
            setUser(result.user)
            navigate('/home')
            console.log(user)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <Container>
            <h2>Login</h2>
            <p>Not an user? <span onClick={() => navigate('/signup')}>Sign up!</span></p>
            <Form onSubmit={handleLogin}>
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
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Keep me logged in" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <p>
                    Or Login with 
                    <Button onClick={signInWithGoogle}>Google</Button>
                </p>
            </Form>
        </Container>
    )
}