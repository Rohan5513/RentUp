import React from "react";
import { price } from "../../data/Data";
import { useUser } from "../../common/UserProvider"; 
import { useHistory } from "react-router-dom";
import axios from "axios";

const PriceCard = () => {
  const user = useUser();
  const history = useHistory();
  const createOrder = async (price) => {
    try {
      const response = await fetch('http://localhost:8080/users/create_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price: price })
    });
      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handlePayment = async (price,plan) => {
    if(user.user == null) {
        history.push("/login");
    }
    else{
      try {
        const order = await createOrder(price);
        const options = {
          key: "rzp_test_c3HAknCruxSgid", 
          amount: price * 100, 
          name: 'Smart Payment Method',
          theme: {color: '#F37254'},
          currency: "INR",
          order_id: order,
          handler: function (response) {
            rzp.close();

            try{
              const response =  axios.put(`http://localhost:8080/users/subscription/${user.user.contactNumber}/${plan}`)
              // console.log(`http://localhost:8080/users/subscription/${user.user.contactNumber}/${plan}`);
            }
            catch(error){
              console.log(error);
            }
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Error handling payment:", error);
      }
    }
  };

  return (
    <>
      <div className='content flex mtop'>
        {price.map((item, index) => (
          <div className='box shadow' key={index}>
            <div className='topbtn'>
              <button className='btn3'>{item.best}</button>
            </div>
            <h3>{item.plan}</h3>
            <h1>
              <span>₹</span>
              {item.price}
            </h1>
            <p>{item.ptext}</p>

            <ul>
              {item.list.map((val, idx) => (
                <li key={idx}>
                  <label
                    style={{
                      background: val.change === "color" ? "#dc35451f" : "#27ae601f",
                      color: val.change === "color" ? "#dc3848" : "#27ae60",
                    }}
                  >
                    {val.icon}
                  </label>
                  <p>{val.text}</p>
                </li>
              ))}
            </ul>
            <button
              id="payment_field"

              onClick={() => handlePayment(item.price,item.plan)}

              className='btn5'
              style={{
                background: item.plan === "Standard" ? "#27ae60" : "#fff",
                color: item.plan === "Standard" ? "#fff" : "#27ae60",
              }}
            >
              Start {item.plan}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PriceCard;



