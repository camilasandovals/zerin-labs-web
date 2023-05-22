import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "firebase/auth"

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

 // await createUserWithEmailAndPassword(auth, email, password);
            // const result = await signInWithEmailAndPassword(auth, email, password)
            // // const user = result.user;
            // // const token = await user.getIdToken();
            // // localStorage.setItem("token", token)
            // // console.log(token)
            // .then(resp => resp.json())
            // .then(_user => {
            //     setUser(_user)
            //     localStorage.setItem("user", JSON.stringify(_user))
            // })

            const signInWithGoogle = async () => {
                const provider = new GoogleAuthProvider()
                try {
                    const response = await signInWithPopup(auth, provider)
                    const { email, uid } = auth.currentUser
                    console.log(email, uid)
                    // const _user = response.user;
                    // const token = await _user.getIdToken();
                    // localStorage.setItem("token", token)
                    fetch(`${process.env.REACT_APP_APIENDPOINT}:3001/api/users`, {
                        method:"POST",
                        headers: {"Content-Type": "application/json"},   
                        body: JSON.stringify({email, uid})  // I AM NOT SENDING THE CORRECT UID
                    })
                    .then(resp => resp.json())
                    .then(_user => {
                        setUser(_user)
                        localStorage.setItem("user", JSON.stringify(_user))
                        navigate('/home')
                    })
                } catch (error) {
                    console.error(error)
                }
            }
export default function Google() {
    return(
        <>
            <p>
                    Or sign up with 
                    <Button onClick={signInWithGoogle}>Google</Button>
                </p>
        </>
    )
}