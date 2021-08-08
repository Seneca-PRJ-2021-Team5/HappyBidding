
import React, {useState} from 'react';              //read react
import Carousel from 'react-bootstrap/Carousel'

import pic1 from '../../img/test/ferrari812_1.jpg';
import pic2 from '../../img/test/ferrari812_2.jpg';

function  Description(props){ 
    return(
            <div id="descriptionContainer">
                <h3 class="top-margin-10">{props.descriptionInfo.product.name}</h3>
                <Carousel class="top-margin-10" controls={false}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={pic1}
                            alt="Ferrari 812 GTS - 1"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={pic2}
                            alt="Ferrari 812 GTS - 2"
                        />
                    </Carousel.Item>
                </Carousel>
                <div id="productDiscription" class="top-margin-10">
                    Product Description: <br />
                    {props.descriptionInfo.product.description}
                    <br/>
                    Auction description: <br />
                    {props.descriptionInfo.title}
                    <br/>
                    {props.descriptionInfo.description}
                </div>
            </div>
    );
}

export default Description;