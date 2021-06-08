import { Card, Button, Container, Row, Col } from 'react-bootstrap'

const ProductCard = (props)=>
{
    return(
        <>
            <Container>
                <Row>
                {              
                    props.products.map((product, index)=>
                    {
                        return(
                            <Col key={index}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            {product.description}
                                        </Card.Text>
                                        <Button variant="primary">CLICK TO BID</Button>
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

export default ProductCard;