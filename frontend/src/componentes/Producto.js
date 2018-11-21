import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Menu from '../layout/Menu';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    dense: {
        marginTop: 19,
    },
    button: {
        margin: theme.spacing.unit,
    },
});


class Producto extends Component {


    constructor(props) {
        super(props);
            this.state = {
                datos : [],
                producto: {
                    id: 0,
                    codProducto: "",
                    tipoProducto: "",
                    saldoMinimo: "",
                    estado: 1
                },
                codProducto : 0
        };

        //obtener
        this.cargarProductos();
    }

    cargarProductos = ()=>{
        axios.get("http://localhost:4000/api/v1/productos/")
            .then((data)=>{
                this.setState({datos: data.data});
                console.log(this.state.datos);
            });
    }

    ingresar = ()=>{
        // crear json
        let json = JSON.stringify(this.state.producto)
        console.log(json);
        axios.post('http://localhost:4000/api/v1/productos/', this.state.producto)
          .then((resp) => {
            console.log(resp);
            this.cargarProductos();
            this.resetProducto();
          })
          .catch((err)=>{
            console.log(err);
          });
    }

    leer = ()=>{
        let codigo = this.state.producto.codProducto;
        //buscar producto
        //http://localhost:4000/api/v1/productos/46
        axios.get("http://localhost:4000/api/v1/productos/"+codigo)
            .then((data)=>{
                let productoBuscado = data.data;
                this.setState({producto: productoBuscado});
            });

    }

    borrar = (codProducto)=>{
        axios.delete("http://localhost:4000/api/v1/productos/"+codProducto)
            .then(data=>{
                console.log('borrado: '+codProducto);
                this.cargarProductos();
            });
        console.log(codProducto);
    }

    resetProducto = ()=>{
        let productoAux = Object.assign({}, this.state.producto);
        productoAux.codProducto = "";
        productoAux.tipoProducto = "";
        productoAux.saldoMinimo = "";
        this.setState({producto: productoAux});
    }

    handleChange = (e)=>{
        let id = e.target.id;
        let valor = e.target.value;
        //copiar producto
        let productoAux = Object.assign({}, this.state.producto);
        //modificar 
        switch(id){
            case "codigoProducto":
                productoAux.codProducto = Number(valor);
                break;
            case "tipoProducto":
                productoAux.tipoProducto = valor;
                break;
            case "saldoMinimo":
                productoAux.saldoMinimo = Number(valor);
                break;
            default:
                break;
        }

        // asignar nuevo
        this.setState({producto: productoAux});

    }
    // obtener productos


    render () {
        const { classes } = this.props;
        return (
            <div>
                <Menu/> 
                <h1>Componente de productos</h1>
                <h3>Agregar nuevo producto</h3>
                <div>
                    <Paper className={classes.paper}>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    id="codigoProducto"
                                    label="Código producto"
                                    value={this.state.producto.codProducto}
                                    onChange={e => this.handleChange(e)}
                                    type="number"
                                    className={classNames(classes.textField, classes.dense)}
                                    // InputLabelProps={{
                                    //     shrink: true,
                                    // }}
                                    margin="normal"
                                />
                                <TextField
                                    id="tipoProducto"
                                    label="Tipo procucto"
                                    className={classes.textField}
                                    value={this.state.producto.tipoProducto}
                                    onChange={e => this.handleChange(e)}
                                    margin="normal"
                                />
                                 <TextField
                                    id="saldoMinimo"
                                    label="Saldo minimo"
                                    value={this.state.producto.saldoMinimo}
                                    onChange={e => this.handleChange(e)}
                                    type="number"
                                    className={classNames(classes.textField, classes.dense)}
                                    // InputLabelProps={{
                                    //     shrink: true,
                                    // }}
                                    margin="normal"
                                />
                            </FormControl>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.ingresar}>
                                Ingresar
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.leer}>
                                Leer 
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.resetProducto}>
                                Limpiar 
                            </Button>
                        </form>
                    </Paper>
                </div>

                <div>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Código producto</TableCell>
                                    <TableCell>Tipo producto</TableCell>
                                    <TableCell>Saldo Mínimo</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Borrar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.datos.map((producto) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{producto.id}</TableCell>
                                            <TableCell>{producto.codProducto}</TableCell>
                                            <TableCell>{producto.tipoProducto}</TableCell>
                                            <TableCell>{producto.saldoMinimo}</TableCell>
                                            <TableCell>{producto.estado}</TableCell>
                                            <TableCell>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={()=>{this.borrar(producto.codProducto)}}>
                                                Borrar 
                                            </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
            
        );
    }
}

Producto.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Producto);