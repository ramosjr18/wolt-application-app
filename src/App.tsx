import React, { useState } from 'react';
import './App.css';

function App() {

  // Input from the user 
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [amountItems, setAmountItems] = useState<number>(0);
  const [time, setTime] = useState(new Date());

  // Default values to be used in the if-statements
  const MinCartValue = 10;
  const additionalItemsFee = 0.50;
  const friday_rush = time.getDay() === 5;
  const rush_time = friday_rush && time.getHours() >= 15 && time.getHours() < 19;
  let rush_fee = 'No';
  let MinDistanceFee = 0;
  let cart_fee = 0;
  let ItemsCharge = 0;
  let addExtraItemPrice = 0;
  let total_fees = 0;

  // Statement defining if an extra fee is to be charged
  // only if the cart value is less than the default value 
  if (cartValue < MinCartValue) {
    // if cart fee is less than 10 euros then the reasult of the substraction of both is going to be taken as a fee
    cart_fee = MinCartValue - cartValue
  }

  // Statement to check if a Distance fee is to be charged
  if (deliveryDistance < 500) {
    // if distance is less than 500 meters the 1 euro is to be charged
    MinDistanceFee = 1
  } else if (deliveryDistance >= 500 && deliveryDistance <= 1000) {
    // if distance is between 500 meters and 100 meters, 2 euros are to be charged
    MinDistanceFee = 2
  } else if (deliveryDistance > 1000) {
    // after the first 1000 meters every additional 500 meters are going to be charged (+1euro)
    // Distance is subtracted to 1000m and the divided by 500 to calculate the extra distance
    // then is rounded up to the biggest number and added to the basis fee of 2 euros
    const additional_fee = Math.ceil((deliveryDistance - 1000) / 500)
    MinDistanceFee = additional_fee + 2
  }

  // Statement to check if an extra item fee is to be charged
  if (amountItems === 5) {
    // starting from the fith item an extra .5 cents are set to becharged
    addExtraItemPrice = 0.5
  } else if (amountItems > 5) {
    // since the first 4 are free we substract tyhe exceess to 4 
    ItemsCharge = amountItems - 4
    // the multiply it by the extra item fee to have a total
    const addExtraPrice = ItemsCharge * additionalItemsFee
    addExtraItemPrice = addExtraPrice
    // if there more tha 12 items then and extra 'BULK' is to be charged
    if (amountItems > 12) {
      addExtraItemPrice = addExtraPrice + 1.20
    }
  }

  //statement to set values on the display bill to 0 
  if (cartValue === 0 && deliveryDistance === 0 && amountItems === 0) {
    cart_fee = 0;
    MinDistanceFee = 0;
  }

  // total fees value
  total_fees = cart_fee + MinDistanceFee + addExtraItemPrice

  // if the day is friday between 15h-19h, total delivery fees as multiplied by 1.2
  if (rush_time) {
    total_fees *= 1.2
    rush_fee = 'Yes';
  }

  // Statement to prevent the delivery fee from exceeding the total of 15 euros
  if (total_fees > 15) {
    total_fees = 15
    // but if the total value to purchase is gretaer than 200 euros the delivery fee is free
  } else if (cartValue >= 200) {
    total_fees = 0
  }

  //to display total amount to be paid
  const total_charge = total_fees + cartValue

  return (
    // container having all content 
    <div className="App">

      {/* Div used to get inputs from the user */}
      <div className="Questionary">
        <h1>Delivery Fee Calculator</h1>
        <br />

        <p>Please don't leave empty spaces otherwise a NaN value is going to be returned</p>

        {/* div used to add style */}
        <div className="quest_inside">

          {/* Input showing cart value and its description */}
          <label htmlFor="cart_value">Cart Value</label>
          <input
            type="number"
            step="0.01"
            name="cart_value"
            id="cart_value"
            value={cartValue}
            onChange={(e) => setCartValue(parseFloat(e.target.value))}
          />
          €
          <p>For decimals use a coma (,) If the dot (.) isn't working</p>

          <br />


          {/* Input showing Delivery distance and its description */}
          <label htmlFor="delivery_distance">Delivery Distance</label>
          <input
            type="number"
            name="delivery_distance"
            id="delivery_distance"
            value={deliveryDistance}
            onChange={(e) => setDeliveryDistance(parseInt(e.target.value))}
          />
          m


          <br />
          <br />

          {/* Input showing amount of items and its description */}
          <label htmlFor="amount_items">Amount of Items</label>
          <input
            type="number"
            name="amount_items"
            id="amount_items"
            value={amountItems}
            onChange={(e) => setAmountItems(parseInt(e.target.value))}
          />

          <br />
          <br />

          {/* Input showing time and its description */}
          <label htmlFor="time">Time</label>
          <input
            type="datetime-local"
            name="time"
            id="time"
            value={new Date(time.getTime() - time.getTimezoneOffset() * 60000).toISOString().split('.')[0]}
            onChange={(e) => setTime(new Date(e.target.value))}
          />
        </div>
      </div>

      {/* Div used to get show results to the user */}
      <div className="Bill">

        <h1>Bill</h1>

        {/* details' div is used to give style on css */}
        <div className="details">
          {/* description and value's span tags are used to display info to the user*/}
          <span className="description">Cart Value:</span>
          <span className="value">{cartValue} €</span>
        </div>

        <div className="details">
          <span className="description">Delivery Distance:</span>
          <span className="value">{deliveryDistance} m</span>
        </div>

        <div className="details">
          <span className="description">Amount Of items:</span>
          <span className="value">{amountItems} </span>
        </div>

        <div className="details">
          <span className="description">Time:</span>
          <span className="value">{time.toISOString().split('T')[0]} / {time.toLocaleTimeString()}</span>
        </div>

        <h2>Fees</h2>

        <div className="details">
          <span className="description">Cart's Fee:</span>
          <span className="value">{cart_fee} €</span>
        </div>

        <div className="details">
          <span className="description">Distance's fee:</span>
          <span className="value">{MinDistanceFee} €</span>
        </div>

        <div className="details">
          <span className="description">Extra Item:</span>
          <span className="value">{addExtraItemPrice} €</span>
        </div>

        <div className="details">
          <span className="description">Rush time fee applies:</span>
          <span className="value">{rush_fee}</span>
        </div>

        <h2>Total fee</h2>

        <div className="details">
          <span className="description">Delivery Fee:</span>
          <span className="value">{total_fees} €</span>
        </div>

        <div className="details">
          <span className="h2">Total:</span>
          <span className="value">{total_charge} €</span>
        </div>

      </div>

    </div>


  );
}

export default App;
