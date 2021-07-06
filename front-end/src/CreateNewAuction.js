import React, {useEffect, useState} from 'react'; 
import { Button, Container, Row, Col, Form, Image, InputGroup, Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';


const CreateNewAuction= (props)=>
{
    const [newAuction, setNewAuction] = useState({
        productName: "",
        productDescription: "",
        category: "",  // not working
        startDate: "",  
        endDate: "",  // not working
        title: "",
        status: "",
        description: "", // not working
        initialPrice: 0 // not working
    })

    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {

        return function cleanup() {
            console.log("CLEAN UP")
        };
    },[errorMessage])

    const handleChange =(event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        setNewAuction({ ...newAuction, [name]: value });
        console.log(newAuction)
    }

    const createNewAuctionFunc =(event) =>
    {
        event.preventDefault();

        if(!newAuction.productName || !newAuction.productDescription || !newAuction.category || !newAuction.startDate || !newAuction.endDate || !newAuction.title || !newAuction.status || !newAuction.description || !newAuction.initialPrice)
        {
            setErrorMessage("ERROR: Please fill all the fields!")
        }
        else 
        {
            console.log("CREATED LOCALLY NEW AUCTION !!!")
            const auctionToSend =
            {
                product:{
                    name: newAuction.productName,
                    description: newAuction.productDescription
                },
                auctCategory: newAuction.category,
                startDate: newAuction.startDate,
                endDate: newAuction.endDate,
                title: newAuction.title,
                status: newAuction.status,
                description: newAuction.description,
                price: newAuction.initialPrice
            }

            fetch('https://happybiddingserve.herokuapp.com/api/auction', {
                method: "POST",
                body: JSON.stringify(auctionToSend),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => {
                console.log(json)
                props.history.push("/profile")
            })
            .catch(err => console.log(err));
        }

        console.log(newAuction)
    }

    if(sessionStorage.getItem("userName")){
        return (
            <>
                { errorMessage && 
                    (<Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
                        <Alert.Heading>OH NO !</Alert.Heading>
                        <p> {errorMessage} </p>
                    </Alert>)
                }
                <Container>
                    <Form onSubmit={createNewAuctionFunc}>
                        <Row>
                            <h3>Auction's Product</h3>
                            <Col>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control name="productName" type="text" placeholder="type the name" onChange={handleChange} />
                            </Col>
    
                            <Col>
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control name="productDescription" type="text" placeholder="type the description" onChange={handleChange} />
                            </Col>
                        </Row>
                        <Row>
                            <h3>Auction's Details</h3>
                            <Col>
                                <Form.Label>Auction's Title</Form.Label>
                                <Form.Control name="title" type="text" placeholder="type the title" onChange={handleChange} />
                                <Form.Label>Auction's Start Date</Form.Label>
                                <Form.Control name="startDate" type="date" placeholder="choose start date" onChange={handleChange} />
                                <Form.Label>Auction's Status</Form.Label>
                                <Form.Control name="status" as="select" defaultValue="Choose..." onChange={handleChange}>
                                    <option>Choose...</option>
                                    <option>Ongoing</option>
                                    <option>Done</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Auction's Category</Form.Label>
                                <Form.Control name="category" type="text" placeholder="type the category" onChange={handleChange} />
                                <Form.Label>Auction's End Date</Form.Label>
                                <Form.Control name="endDate" type="date" placeholder="type the title" onChange={handleChange} />
                            </Col>
    
                            <Col>
                                <Form.Label>Auction's Description</Form.Label>
                                <Form.Control name="description" type="text" placeholder="type the description" onChange={handleChange} />
                                <Form.Label>Auction's Initial Price</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control name="initialPrice" aria-label="Amount (to the nearest dollar)" onChange={handleChange} />
                                    <InputGroup.Append>
                                        <InputGroup.Text>.00</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
    
                        </Row>
            
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </>
        )
    }
    else{
        return(<>{props.history.push('/login')}</>) 
    }
}

export default withRouter(CreateNewAuction);