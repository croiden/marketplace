import React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './index.css'
import Main from './views/'
import Theme from './theme/'
import Product from './views/product/'

const App = () => {
    return (
        <Router>
            {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
            <Theme>
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>
                    <Route exact path="/:mode/:productId">
                        <Product />
                    </Route>
                </Switch>
            </Theme>
        </Router>
    )
}

ReactDOM.render(
    <div className="App">
        <App />
    </div>,
    document.getElementById('root')
)
