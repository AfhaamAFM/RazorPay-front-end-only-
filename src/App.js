import logo from './logo.svg';
import './App.css';
import axios from 'axios';



const loadRazorPay=(src)=>{
  return new Promise(resolve=>{
  const script = document.createElement('script')
  script.src=src
  document.body. appendChild(script)

  script.onload=()=>{
    resolve(true)
  }
  script.onerror=()=>{

    resolve(false)
  }
  })
}

async function showRazorPAy(){


const result =await loadRazorPay('https://checkout.razorpay.com/v1/checkout.js')
if(!result){
  alert('fail')
  return
}


const {data} = await axios.get('http://localhost:5000/order/razorpay/payAmount')
console.log(data)

var options = {
  "key": "rzp_test_ZanWOoH710Fanr", // Enter the Key ID generated from the Dashboard
  "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  "currency": data.currency,
  "name": "Acme Corp",
  "description": "Test Transaction",
  "image": "https://example.com/your_logo",
  "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  "handler": function (response){
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
  },
  "prefill": {
      "name": "Gaurav Kumar",
      "email": "gaurav.kumar@example.com",
      "contact": "9999999999"
  },
  "notes": {
      "address": "Razorpay Corporate Office"
  },
  "theme": {
      "color": "#3399cc"
  }
};
var paymentObject = new window.Razorpay(options);
paymentObject.open();
}






function App() {
  return (
    <div className="App">
<button onClick={showRazorPAy}>
  Hi 
</button>
    </div>
  );
}

export default App;
