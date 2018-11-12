import React from 'react';
//import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';

import Cliente from './componentes/Cliente';
import NotFound from './componentes/NotFound';

const Root = () => {
    return (
        <Router basename="/sonda">
            <Switch>
                <Route exact path="/" component={Cliente} />
                <Route exact path="/cliente" component={Cliente} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

render(<Root/>, document.querySelector('#main'));




//ReactDOM.render(<App />, document.getElementById('root'));

//serviceWorker.unregister();
