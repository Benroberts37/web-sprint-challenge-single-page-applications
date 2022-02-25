import React, {useState} from 'react';
import axios from 'axios'
import * as yup from 'yup'

const formSchema = yup.object().shape({
        name: yup
        .string()
        .required('Must enter a name')
        .min(2, "name must be at least 2 characters"),
    sauce: yup
        .string()
        .oneOf(['red sauce', 'buffalo', 'garlic']),
    size: yup
        .string()
        .oneOf(['small', 'medium', 'large', 'extra large']),
    chicken: yup.boolean(),
    bacon: yup.boolean(),
    grilled_peppers: yup.boolean(),
    grilled_onions: yup.boolean(),
    specialInstructions: yup.string()
})

const Pizza = props => {

    const initialValues = {
        name: '',
        size: '',
        sauce: '',
        bacon: false,
        chicken: false,
        grilled_onions: false,
        grilled_peppers: false,
        specialInstructions: '',
      }

      const [formData, setFormData] = useState(initialValues);
      const [formErrors, setFormErrors] = useState(initialValues);

      const onChange = evt => {
          const {name, value, type, checked } = evt.target
          const useValue = type === 'checkbox' ? checked : value

          yup
          .reach(formSchema, name)
          .validate(useValue)
          .then(valid => {
              setFormErrors({...formErrors, [name]: ''})
          })
          .catch(err => {
              setFormErrors({
                  ...formErrors, [name]: err.errors[0]
              })
          })

          setFormData({...formData, [name]: useValue})
      }

      const handleSubmit = evt => {
          const newOrder = {
              name: formData.name,
              size: formData.size,
              sauce: formData.sauce,
              bacon: formData.bacon,
              chicken: formData.chicken,
              grilled_onions: formData.grilled_onions,
              grilled_peppers: formData.grilled_peppers,
              specialInstructions: formData.specialInstructions
          }
          evt.preventDefault()

          axios.post('https://reqres.in/api/orders', newOrder)
          .then(response => console.log(response.data))
          .catch(err => console.error(err))
        setFormData(initialValues)
      }

      return (
        <div>
        <h1>Build a pizza!</h1>
        <form id="pizza-form" onSubmit={handleSubmit}>
            {formErrors.name.length > 0 && <p className='error'>{formErrors.name}</p>}
            <label>Name
                <input
                    name='name'
                    type='text'
                    id='name-input'
                    onChange={onChange}
                    value={formData.name}
                    placeholder='Name'
                    />
            </label>
            <label>Size
                <select
                id = 'size-dropdown'
                name = 'size'
                value = {formData.size}
                onChange={onChange}
                >
                    <option value = ''>--Pick a size==</option>
                    <option value = 'Small'>Small</option>
                    <option value = 'Medium'>Medium</option>
                    <option value = 'Large'>Large</option>
                    <option value = 'Extra Large'>Extra Large</option>
                </select>
            </label>
            <h2>Choose a sauce</h2>
            <label>Red Sauce
                <input
                    type = 'radio'
                    name = 'sauce'
                    value = 'red sauce'
                    checked = {formData.sauce === 'red sauce'}
                    onChange={onChange}
                    />
            </label>
            <label>Buffalo
                <input
                    type = 'radio'
                    name = 'sauce'
                    value = 'buffalo'
                    checked = {formData.sauce === 'buffalo'}
                    onChange={onChange}
                    />
            </label>
            <label>Garlic
                <input
                    type = 'radio'
                    name = 'sauce'
                    value = 'garlic'
                    checked = {formData.sauce === 'garlic'}
                    onChange={onChange}
                    />
            </label>
            <h2>Pick some toppings</h2>
            <label>Bacon
                 <input
                    name = 'bacon'
                    type = 'checkbox'
                    checked = {formData.bacon}
                    onChange = {onChange}
                />
            </label>
            <label>Chicken
                 <input
                    name = 'chicken'
                    type = 'checkbox'
                    checked = {formData.chicken}
                    onChange = {onChange}
                />
            </label>
            <label>Grilled Peppers
                 <input
                    name = 'grilled_peppers'
                    type = 'checkbox'
                    checked = {formData.grilled_peppers}
                    onChange = {onChange}
                />
            </label>
            <label>Grilled Onions
                 <input
                    name = 'grilled_onions'
                    type = 'checkbox'
                    checked = {formData.grilled_onions}
                    onChange = {onChange}
                />
            </label>
            <h2>Submit your order here</h2>
            <input id='order-button' type = 'submit' />
            </form>
            <label>Special instructions
                <input 
                type ='text'
                name = 'specialInstructions'
                value = {formData.specialInstructions}
                id = 'special-text'
                onChange={onChange}
                />
            </label>

    </div>
      )
}


export default Pizza