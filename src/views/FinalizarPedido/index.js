import React, { useEffect, useState } from 'react';
import { useStyles } from './style';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import RemoveCircle from '@material-ui/icons/RemoveCircleRounded';
import AddCircle from '@material-ui/icons/AddCircleRounded';
import Menu from '../../components/AppBar/index';

import {
	Grid,
	Paper,
	Typography,
	Table,
	TableCell,
	TableRow,
	Button,
	IconButton, 
	Fade,
	Modal
} from "@material-ui/core";

export default function FinalizarPedido(props) {

	const classes = useStyles();
	const carrinho = props.location.state.carrinho;
	const [open, setOpen] = React.useState(false);

	let total = 0;

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		for(let i = carrinho.length; i != 0; i--){
			carrinho.pop();
		}
	};

	const handleChangeRemove = (event, qtdProd) => {
		event.preventDefault();
		qtdProd --;
		formatarNewQtd(qtdProd);
	};

	const handleChangeAdd = (event, qtdProd) => {
		event.preventDefault();
		qtdProd ++;
		formatarNewQtd(qtdProd);
	};

	function formatarNewQtd(qtdProd){
		let newQtdProd = qtdProd;
		return newQtdProd;
	}

	function formatarReal(num) {
		total = total + num;

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

	function formatarTotal(num) {
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
						<Typography variant='h4' gutterBottom>
							Finalizar Pedido
                        </Typography>
					</Grid>
					<Grid item style={{ display: 'flex', marginTop: '20px' }}>
						<Grid item xs={2}>
							<FastfoodIcon style={{ fontSize: 80, width: '80px', height: '80px' }} />
						</Grid>
						<Grid item xs={5}>
							<Typography variant='h6' gutterBottom>
								Armazém do Seu Zé
                            </Typography>
						</Grid>
					</Grid>
					<Grid item style={{ display: 'flex', marginTop: '20px' }}>
						<Grid item xs={12}>
							<Typography variant='subtitle1' gutterBottom style={{ fontWeight: 'bold' }}>
								Revise seus itens
                            </Typography>
							{carrinho.map(final => (
								<Table className={classes.table} key={final.idProduto}>
									<TableRow>
										<TableCell style={{ width: '10px' }} align='center'>
											<IconButton onClick={event => handleChangeRemove(event, final.qtdProd)} className={classes.margin}>
												<RemoveCircle fontSize="large" style={{ color: '#fbb040' }} />
											</IconButton>
										</TableCell>
										<TableCell style={{ width: '10px' }} align='center'>
											<Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold' }}>
												{formatarNewQtd(final.qtdProd)}
											</Typography>
										</TableCell>
										<TableCell style={{ width: '10px' }} align='center'>
											<IconButton onClick={event => handleChangeAdd(event, final.qtdProd)} className={classes.margin}>
												<AddCircle fontSize="large" style={{ color: '#fbb040' }} />
											</IconButton>
										</TableCell>
										<TableCell style={{ width: 'flex', height: '50px' }} align='left'>
											{final.name}
										</TableCell>
										<TableCell style={{ width: 'flex', height: '50px' }} align='left'>
											{final.descripition}
										</TableCell>
										<TableCell style={{ width: 'flex', height: '50px' }} align='right'>
											{formatarReal(final.price * final.qtdProd)}
										</TableCell>
									</TableRow>
								</Table>
							))}
							<Table>
								<TableRow>
									<TableCell rowSpan={'flex'} />
									<TableCell align='right' colSpan={5}>
										<Typography variant='subtitle1' style={{ fontWeight: 'bold' }}>
											Total:
                                        </Typography>
									</TableCell>
									<TableCell align="right" colSpan={2}>{formatarTotal(total)}</TableCell>
								</TableRow>
								<TableCell rowSpan={'flex'} />
								<TableCell colSpan={6} align='right'>
									<Button
										style={{
											margin: '17px',
											width: 'auto',
											height: '45px',
											fontWeight: 'bold',
											backgroundColor: '#fbb040',
										}}
										aria-controls='simple-menu'
										aria-haspopup='true'
										onClick={handleOpen}>
										Finalizar Compra
                                    </Button>
									<Modal
										aria-labelledby="spring-modal-title"
										aria-describedby="spring-modal-description"
										className={classes.modal}
										open={open}
										onClose={handleClose}
										closeAfterTransition
									>
										<Fade in={open}>
											<div className={classes.paperModal}>
												<Grid>
													<h2 id="spring-modal-title">Compra Finalizada!</h2>
													<p id="spring-modal-description">Sua compra foi finalizada com sucesso!</p>
													<Grid item>
														<Button
															style={{
																margin: '17px',
																width: 'auto',
																height: '45px',
																fontWeight: 'bold',
																backgroundColor: '#fbb040',
															}}
															aria-controls='simple-menu'
															aria-haspopup='true'
															onClick={handleClose}>
															Fechar
														</Button>
													</Grid>
												</Grid>
											</div>
										</Fade>
									</Modal>
								</TableCell>
							</Table>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</div>
	)
}
