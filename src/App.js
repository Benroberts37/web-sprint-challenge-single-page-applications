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
const initialDisabled = true;

const App = () => {

  const [formData, setFormData] = useState(initialvalues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [orders, setOrders] = useState (initialOrders);
  const [disabled, setDisabled] = useState(initialDisabled)


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
      yup.reach(FormSchema, name)
        .validate(value)
        .then(() => setFormErrors({...formErrors, [name]: ''}))
        .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
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

    useEffect(() => {
      FormSchema.isValid(formData).then(valid => setDisabled(!valid))
    }, [formData])

  return (
    <>
    <Router>
      <nav>
        <Link id='order-pizza' to='/'>Home</Link>
        <Link to='/pizza'>Form</Link>
      </nav>
        <Route exact path='/pizza'>
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
          disabled={disabled}
          />
        </Route>
    </Router>
    </>
  );
};
export default App;
