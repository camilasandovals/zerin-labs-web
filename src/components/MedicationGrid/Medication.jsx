import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Medication({data}){

    // const handleDelete = async (id) => {
    //     const response = await fetch(`http://54.234.48.173:3001/api/medications/${id}`, {
    //         method: "DELETE",
    //     })
    // }

    return (
    <Col key={data.id}>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://i0.wp.com/vitalrecord.tamhsc.edu/wp-content/uploads/2017/01/pills-tamhsc.jpg?fit=1100%2C625&ssl=1" />
        <Card.Body>
            <Card.Title>{data.nameMed}</Card.Title>
            <Card.Text>{data.quantity}</Card.Text>
            <Card.Text>{data.dosage} {data.unit}</Card.Text>
            <Card.Text>{data.frequency}</Card.Text>
            <Button variant="primary" 
            // onClick={() => handleDelete(data._id)}
            >Taken!</Button>
        </Card.Body>
        </Card>
    </Col>
  );
}