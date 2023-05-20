import { Pannellum } from 'pannellum-react';
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import bg from "../images/bg.jpg";
import { useState } from "react"
import SignUpForm from '../components/SignForms/SignUpForm';
import LoginForm from '../components/SignForms/LoginForm';

export default function Landing(){
    const navigate = useNavigate()
    const [isVisibleLogin, setIsVisibleLogin] = useState(false);
    const [isVisibleSignUp, setIsVisibleSignUp] = useState(false);


    
    return(
        <section className='section-landing-360-container'>
            <div style={{ position: 'relative', width: '100%', height: '880px' }}>
            <Pannellum
                width="100%"
                height="100%"
                image={bg}
                yaw={180}
                hfov={110}
                autoLoad
                autoRotate={-5}
                compass={false}
                showZoomCtrl={false}
                mouseZoom={false}
            />
           {/* <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: "white"}}>{text}</span> */}
            <SignUpForm />
            <LoginForm />
    

            </div>

            
        
        </section>
    )
}