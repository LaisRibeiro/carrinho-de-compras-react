import React from 'react';
import {
	AppBar,
	CssBaseline,
	Toolbar,
	Badge,
	IconButton,
	Link
} from '@material-ui/core/';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import logoFood from '../../image/logofood.png'
import { useStyles } from './style';

export const drawerWidth = 280;

export default function MenuBar() {

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="absolute" className={classes.appBar}>
				<Toolbar>
					<Link to={{ pathname: '/' }} className={classes.link}>
						<img src={logoFood} alt="logo" className={classes.logo} style={{ alignItems: 'center' }} />
					</Link>
					<div className={classes.toolbarButtons}>
						<IconButton aria-label="show 11 new notifications" color="inherit">
							<Badge badgeContent={3} color="secondary">
								<ShoppingCartIcon />
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
