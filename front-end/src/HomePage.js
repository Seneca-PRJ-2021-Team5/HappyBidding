import { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import Slider from './components/homepage/Slider'
import ProductCard from './components/homepage/ProductCard'


const HomePage = (props)=>
{
    const [ products, setProducts ] = useState([
        { 'title': 'Special Makeup',    'image': 'https://images.pexels.com/photos/2253833/pexels-photo-2253833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'description': 'Beautiful Special makeup for powerful wommen who wants to conquer the power of life !' },
        { 'title': 'Trip to Bahamas',    'image': 'https://images.pexels.com/photos/3309201/pexels-photo-3309201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'description': 'Very special trip to bahamas where you will find the piece of mind that you want from your own world !' },
        { 'title': 'Opra`s Handmade Cloth',    'image': 'https://images.pexels.com/photos/6461522/pexels-photo-6461522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'description': 'Very rare piece of cloth from Opra`s handmade !' },
        { 'title': 'Special Makeup',    'image': 'https://images.pexels.com/photos/2253833/pexels-photo-2253833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'description': 'Beautiful Special makeup for powerful wommen who wants to conquer the power of life !' },
        { 'title': 'Trip to Bahamas',    'image': 'https://images.pexels.com/photos/3309201/pexels-photo-3309201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'description': 'Very special trip to bahamas where you will find the piece of mind that you want from your own world !' },
        { 'title': 'Opra`s Handmade Cloth',    'image': 'https://images.pexels.com/photos/6461522/pexels-photo-6461522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'description': 'Very rare piece of cloth from Opra`s handmade !' },
        { 'title': 'Special Makeup',    'image': 'https://images.pexels.com/photos/2253833/pexels-photo-2253833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'description': 'Beautiful Special makeup for powerful wommen who wants to conquer the power of life !' },
        { 'title': 'Trip to Bahamas',    'image': 'https://images.pexels.com/photos/3309201/pexels-photo-3309201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'description': 'Very special trip to bahamas where you will find the piece of mind that you want from your own world !' },
        { 'title': 'Opra`s Handmade Cloth',    'image': 'https://images.pexels.com/photos/6461522/pexels-photo-6461522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'description': 'Very rare piece of cloth from Opra`s handmade !' },
        { 'title': 'Special Makeup',    'image': 'https://images.pexels.com/photos/2253833/pexels-photo-2253833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'description': 'Beautiful Special makeup for powerful wommen who wants to conquer the power of life !' },
        { 'title': 'Trip to Bahamas',    'image': 'https://images.pexels.com/photos/3309201/pexels-photo-3309201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'description': 'Very special trip to bahamas where you will find the piece of mind that you want from your own world !' },
        { 'title': 'Opra`s Handmade Cloth',    'image': 'https://images.pexels.com/photos/6461522/pexels-photo-6461522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'description': 'Very rare piece of cloth from Opra`s handmade !' }
    ]);

    // Similar to componentDidMount for react class
    // useEffect will run once the component is loaded
    useEffect(() => {
        // Load data from API
         fetch(`https://happybiddingserve.herokuapp.com/api/auctions`)
        .then((res) => {
            return res.json();
        })
        .then(data => {
            //setProducts(data)
            console.log(data)
        })

    }, []);

    return(
        <>
            {props.userStatus && props.setLogOut()}
            <h1> THIS IS THE HOME PAGE !</h1>
            <Slider products={products}/>
            <ProductCard products={products}/>
        </>
    )
}

export default HomePage;