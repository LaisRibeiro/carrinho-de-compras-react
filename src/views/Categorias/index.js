import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './style';
import { Link } from 'react-router-dom';
import Menu from '../../components/AppBar/index';

import {
	Grid,
	Paper,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Table,
	TableBody,
	TableContainer,
	TableRow,
	TableFooter,
	TablePagination,
	TableCell,
	Button
} from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';
export default function Categorias(carrinho, qtnProd) {

	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [catSelecionada, setCatSelecionada] = useState('');
	const [categorias, setCategorias] = useState([]);
	const [prodAux, setProdAux] = useState([]);
	const [produtos, setProdutos] = useState([]);
	
	const quinzeMinutos = 900000;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeCategoria = (event) => {
		setCatSelecionada(event.target.value);
		getFilterProd(catSelecionada);
	};

	carrinho = [];
	qtnProd = [];

	let qtnArrayCar = 0;
	let novoProd = true;

	const handleChangeAddCarinho = (event, idProduto, name, descripition, price) => {
		event.preventDefault();
		qtnProd.push(1);

		if (qtnArrayCar === 0) {
			carrinho.push({
				idProduto: idProduto,
				name: name,
				descripition: descripition,
				price: price,
				qtdProd: 1
			});

			qtnArrayCar = 1;

			setTimeout(() => {
				for(let i = carrinho.length; i != 0; i--){
					carrinho.pop();
				}
				alert("O tempo de compra acabou, seu carrinho será zerado!");
			}, quinzeMinutos);

		} else {
			for (let i = 0; i < qtnArrayCar; i++) {
				if (carrinho[i].idProduto === idProduto) {
					carrinho[i].qtdProd = carrinho[i].qtdProd + 1;
					novoProd = false
				} else {
					novoProd = true;
				}
			}

			if (novoProd) {
				carrinho.push({
					idProduto: idProduto,
					name: name,
					descripition: descripition,
					price: price,
					qtdProd: 1
				});
				
				qtnArrayCar++;
				novoProd = false;
			}
		}
	};

	const getFilterProd = (categorias) => {
		fetch('./produtos.json', {
			headers: {
				Accept: "application/json"
			}
		})
		.then(res => res.json())
		.then(res => setProdAux(res.produto))

		var arrayFilter = prodAux.filter(value => {
			return value.idCategoria === categorias;
		});

		setProdutos(arrayFilter);
	}

	useEffect(() => {
		fetch('./categorias.json', {
			headers: {
				Accept: "application/json"
			}
		})
		.then(res => res.json())
		.then(res => setCategorias(res.categoria))
	}, []);

	useEffect(() => {
		fetch('./produtos.json', {
			headers: {
				Accept: "application/json"
			}
		})
		.then(res => res.json())
		.then(res => setProdutos(res.produto))
	}, []);

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, produtos.length - page * rowsPerPage);

	function formatarReal(num) {
		if (typeof num === 'undefined') {
			return 'R$ 0,00';
		} else {
			let formatted = new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			}).format(parseFloat(num));
			return formatted;
		}
	}

	return (
		<div>
			<Menu />
			<Grid item xs={12} style={{ margin: '20px' }}>
				<Paper className={classes.paper}>
					<Grid item style={{ display: 'flex' }}>
						<Grid item xs sm={12}>
							<FormControl variant='outlined' className={classes.formControl} style={{ marginTop: '15px', marginLeft: '15px' }}>
								<InputLabel id='demo-simple-select-label'>Selecione a categoria</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select-label'
									value={categorias}
									onChange={handleChangeCategoria}
									label='Selecione a categoria'>

									{categorias.map(cat => (
										<MenuItem key={cat.id} value={cat.id}>
											{cat.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs sm={3}>
							<Link to={{ pathname: '/finalizar-pedido', state: { carrinho: carrinho, qtnProd: qtnProd } }} className={classes.link}>
								<Button
									style={{
										margin: '17px',
										width: 'auto',
										height: '45px',
										fontWeight: 'bold',
										backgroundColor: '#fbb040',
									}}
									aria-controls='simple-menu'
									aria-haspopup='true'>
									Finalizar Compra
								</Button>
							</Link>
						</Grid>
					</Grid>
					<Grid item style={{ display: 'flex', marginTop: '20px' }}>
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label='custom pagination table'>
								<TableBody>
									{(rowsPerPage > 0
										? produtos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										: produtos
									).map((prod) => (
										<TableRow key={prod.id}>
											<TableCell component='th' style={{ width: 'flex' }} scope='row'>
												{prod.name}
											</TableCell>
											<TableCell style={{ width: 'flex', height: '100px' }} align='left'>
												{prod.descripition}
											</TableCell>
											<TableCell style={{ width: 'flex', height: '100px' }} align='right'>
												{formatarReal(prod.price)}
											</TableCell>
											<TableCell style={{ width: 'flex' }} align='right'>
												<Button
													style={{
														margin: '17px',
														width: 'auto',
														backgroundColor: '#fbb040'
													}}
													aria-controls='simple-menu'
													aria-haspopup='true'
													onClick={event => handleChangeAddCarinho(event, prod.id, prod.name, prod.descripition, prod.price)}>
													Adicionar ao carrinho
                          						</Button>
											</TableCell>
										</TableRow>
									))}

									{emptyRows > 0 && (
										<TableRow style={{ height: 53 * emptyRows }}>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											rowsPerPageOptions={[10, 15, 25]}
											colSpan={8}
											count={produtos.length}
											rowsPerPage={rowsPerPage}
											page={page}
											SelectProps={{
												inputProps: { 'aria-label': 'rows per page' },
												native: true,
											}}
											onChangePage={handleChangePage}
											onChangeRowsPerPage={handleChangeRowsPerPage}/>
									</TableRow>
								</TableFooter>
							</Table>
						</TableContainer>
					</Grid>
				</Paper>
			</Grid>
		</div>
	);
}

Categorias.propTypes = {
	carrinho: PropTypes.arrayOf(PropTypes.shape([{
		idProduto: PropTypes.string,
		name: PropTypes.string,
		descripition: PropTypes.string,
		price: PropTypes.number,
		qtdProd: PropTypes.number
	}])),
	qtnProd: PropTypes.arrayOf(PropTypes.shape([{
		quantidade: PropTypes.number,
	}]))
}
