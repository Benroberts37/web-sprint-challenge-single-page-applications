import React, {useState, useEffect} from "react";
import {Route, Switch} from 'react-router-dom'
import {BrowserRouter as Router, Link} from 'react-router-dom'

import pizzaForm from './Components/PizzaForm'
import FormSchema from './Components/FormSchema'

import axios from 'axios'
import * as yup from 'yup'

const initialvalues = {
  name: '',
  size: '',
  sauce: '',
  bacon: false,
  chicken: false,
  grilled_onions: false,
  grilled_peppers: false,
}

const initialFormErrors = {
  name:'',
  size:'',
  sauce:'',
}

const initialOrders=[]

const App = () => {

  const [formData, setFormData] = useState(initialvalues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [orders, setOrders] = useState (initialOrders);


  const getOrder = getOrder => {
    axios.post('https://reqres.in/api/orders', getOrder)
    .then(res => {
      setOrders(res.data)
    })
    .catch(err => {
      console.error(err)
    })
  }


    const validate = (name, value) => {

    }

    const inputChange = (name, value) => {
      validate(name, value)
      setFormData({...formData, [name]: value})
    }

    const formSubmit = () => {
      const newPizza = {
        name: formData.name,
        size: formData.size,
        sauce: formData.sauce,
        toppings: [
          'chicken',
          'bacon',
          'grilled_peppers',
          'grilled_onions'
        ].filter(topping => formData[topping])
      }
      getOrder(newPizza)
    }

  return (
    <>
    <Router>
      <nav>
        <Link id='order-pizza' to='/'>Home</Link>
        <Link to='/pizza'>Form</Link>
      </nav>
        <Route exact path='/'>
          <div>
            <h1>Lambda Eats</h1>
          </div>
        </Route>
        <Route path='/pizza'>
          <pizzaForm
          formData={formData}
          change={inputChange}
          submit={formSubmit}
          errors={formErrors}
          />
        </Route>
    </Router>
    </>
  );
};
export default App;
