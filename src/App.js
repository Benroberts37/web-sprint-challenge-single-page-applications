import React from 'react'
import {BrowserRouter as Route, Link} from 'react-router-dom'

import Pizza from "./Components/Pizza";


const App = () => {

  return (
    <div>
      <Route exact path ='/'>
        <div>
          <h1>Lambda Eats</h1>
        </div>
        <Link to='/pizza'>
          <button id='order-pizza'>Want some pizza?</button>
        </Link>
      </Route>
      <Route path='/pizza'>
        <Pizza></Pizza>
      </Route>
    </div>
  
  )
};

export default App;
