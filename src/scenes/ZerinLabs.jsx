import { Pannellum } from 'pannellum-react';
import { useNavigate, useLocation } from "react-router-dom";
import bg from "../images/ZerinLabs.webp";

export default function Landing(){
    const navigate = useNavigate()


    
    
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
                showFullscreenCtrl={false}
                mouseZoom={false}
            />
            </div>
            
        
        </section>
    )
}