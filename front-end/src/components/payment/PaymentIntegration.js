import React, {useState, useEffect} from "react";
import ReactDOM, { render } from "react-dom"
import { withRouter, useHistory } from 'react-router-dom';


const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

function PaymentIntegration(props) {

  const history = useHistory()
  const [amount, setAmount] = useState("")

  useEffect(() => {
    console.log("The props: " + props.auctionId)
    fetch(`https://happybiddingserve.herokuapp.com/api/auctions/${props.auctionId}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
      setAmount(data.auction.price)
    })
  })

  const createOrder = (data, actions) =>{
    console.log(amount)
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log("OnApprove: " + details);
      history.push("/profile")
    });
  };

  return (
    <PayPalButton
      style={{color:'blue'}}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default withRouter(PaymentIntegration);