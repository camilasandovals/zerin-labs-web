import ReactPannellum from "react-pannellum";
import { useNavigate } from "react-router-dom";
import bg from "../images/ZerinLabs.webp";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <section className="section-landing-360-container">
      <div style={{ position: "relative", width: "100%", height: "880px" }}>
      <ReactPannellum
          id="1"
          sceneId="firstScene"
          imageSource={bg}
          style={{ width: '100%', height: '100%' }}
          config={{
            autoLoad: true,
            autoRotate: -2,
          }}
        />
      </div>
    </section>
  );
}
