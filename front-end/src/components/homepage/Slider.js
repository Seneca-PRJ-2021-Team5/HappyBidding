import { Carousel } from 'react-bootstrap'

const SliderItem = (props)=>
{
    return(
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={props.image}
                alt={props.title}
            />
            <Carousel.Caption>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </Carousel.Caption>
        </Carousel.Item>
    );
}

export default SliderItem;