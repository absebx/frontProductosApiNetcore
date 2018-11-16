import React, { Component } from 'react';

import Menu from '../layout/Menu';

class Producto extends Component {

    constructor(props) {
        super(props);
            this.state = {
        };
    }

    render () {
        const { classes } = this.props;
        return (
            <div>
                <Menu/>               
                <p>Esta es la componnete producto</p>
            </div>
        );
    }
}

export default Producto;