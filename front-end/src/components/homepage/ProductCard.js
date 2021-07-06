import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

const ProductCard = (props)=>
{

    const registerUserToAuction =(productID) =>
    {
        if(sessionStorage.getItem("emailAddress"))
        {
            fetch(`https://happybiddingserve.herokuapp.com/api/user/auction?id=${productID}&emailAddress=${sessionStorage.getItem("emailAddress")}`, {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => {
                console.log(json)
                props.history.push("/profile")
            })
            .catch(err => console.log(err));
        }
        else 
        {
            props.history.push("/login")
        }
    }

    return(
        <>
            <Container>
                <Row>
                {              
                    props.products.map((product, index)=>
                    {
                        return(
                            <Col key={product._id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            {product.description}
                                        </Card.Text>
                                        <Button variant="primary" onClick={()=>{registerUserToAuction(product._id)}}>CLICK TO BID</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
                </Row>
            </Container>
        </>
    )
}

export default withRouter(ProductCard);