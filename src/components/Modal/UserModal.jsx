import { useState, useContext } from "react";
import {  Button, Modal, Container, Form  } from "react-bootstrap"
import { UserContext } from "../../App"
import { PencilSquare } from "react-bootstrap-icons"
import Select from "react-select";


export default function UserModal() {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useContext(UserContext)
    const [fullname, setFullname ] = useState('');
    const [age, setAge ] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [img, setImg] = useState("")

    

    const handleUpdateUser = (e) => {
        e.preventDefault();
      
        const updatedFields = {};
      
        if (fullname) {
          updatedFields.fullname = fullname;
        }
        if (gender) {
          updatedFields.gender = gender;
        }
        if (age) {
          updatedFields.age = age;
        }
        if (height) {
          updatedFields.height = height;
        }
        if (weight) {
          updatedFields.weight = weight;
        }
        if (img) {
          updatedFields.img = img;
        }
      
        fetch(`${process.env.REACT_APP_APIENDPOINT}:3001/api/users/?email=${user.email}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFields),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.message) {
              alert(data.message);
              return;
            }
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data))
            setShowModal(false);

          })
          .catch(alert);
      };
    
    const units =  
    [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        
    ];

    function convertFile(files) {
        if (files) {
          // picks the first file from all the files selected
          const fileRef = files[0] || "";
          // picks the type so that it can send the right one to the database
          const fileType = fileRef.type || "";
          // sets reader as a new FileReader instance
          const reader = new FileReader();
          // converts fileref (the File) to a binary string
          reader.readAsBinaryString(fileRef);
          reader.onload = (ev) => {
            // convert it to base64
            setImg(`data:${fileType};base64,${window.btoa(ev.target.result)}`);
          };
        }
      }

  return (
    <>
    <button className="button-landing-form" size={30} color={"violet"} onClick={() => setShowModal(true)}>Edit</button>
    <Modal show={showModal} onHide={() => setShowModal(false) } className="class-modal">
    
        <Modal.Body>
          <div className="form-modal">
                <h2>Add your information</h2>
                  <Form className="form-modal" onSubmit={handleUpdateUser}> 
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={fullname}  
                        placeholder="Ex: David Smith" onChange={(e) => {setFullname(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Profile picture</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => convertFile(e.target.files)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" value={age}  
                         onChange={(e) => {setAge(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Gender</Form.Label>
                        <Select options={units} 
                            onChange={ (e) => {setGender(e.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Height</Form.Label>
                        <Form.Control type="text" value={height}  placeholder="Ex: 162cm" onChange={(e) => {setHeight(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="text" value={weight}  placeholder="Ex: 150 pounds" onChange={(e) => {setWeight(e.target.value)}}/>
                    </Form.Group>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                      <button className="button-landing-form" type="submit">Save</button>
                    </div>
                    </Form>
            </div> 
        </Modal.Body>
    </Modal >
    </>
  );
}
