import React from 'react'

const PizzaForm = (props) => {
    const {formData, submit, change, errors} = props;

    const onChange = event => {
        const {name, value, checked, type} = event.target
        const useValue = type === 'checkbox' ? checked: value
        change (name, useValue)
    }

    return(
        <div>
            <h1>Build a pizza!</h1>
            <form id="pizza-form" onSubmit={submit}>
                <label>Name
                    <input
                        name='name'
                        type='text'
                        id='input_name'
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

        </div>
    )
}

export default PizzaForm;