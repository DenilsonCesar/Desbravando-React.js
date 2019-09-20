import React from 'react';

import  { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Main from './pages/main'
import Products from './pages/products/'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Main}/>
            <Route exact path='/products/:id' component={Products}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;

//BrowserRouter: para infomar ao react-router-dom que a navegação esta sendo feita pelo navegador 
//Switch: para não abri mais de uma rota