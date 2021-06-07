import { Carousel } from 'react-bootstrap'

const SliderItem = (props)=>
{
    return(
        <Carousel fade>
            {
                props.products.map((product, index)=>{
                    return(
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={product.image}
                                alt={product.title}
                            />
                            <Carousel.Caption>
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })
            }
            
        </Carousel>
    );
}

export default SliderItem;