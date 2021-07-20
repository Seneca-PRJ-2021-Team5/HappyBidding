import { useState, useEffect } from 'react'
import { Alert, Button} from 'react-bootstrap'
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
        .then(auctions => {
            setProducts(auctions)
        })

    }, []);

    return(
        <>
            <Alert show={sessionStorage.getItem('userStatus')} variant="success" className="text-center">
                <Alert.Heading>WELCOME {sessionStorage.getItem("userFirstName")} {sessionStorage.getItem("userLastName")}</Alert.Heading>
                <hr />
                <p>
                    Now you are allowed to select some auctions to participate.<br/>
                    Feel free to chose one and let's help the people in need!<br/>
                    <b>HAPPY BIDDING!</b>
                </p>
            </Alert>

            {props.userStatus && props.setLogOut()}
            <Slider products={products}/>
            <ProductCard products={products}/>
        </>
    )
}

export default HomePage;