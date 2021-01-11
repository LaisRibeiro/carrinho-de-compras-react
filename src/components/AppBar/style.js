import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      position: 'relative',
      boxShadow: 'none',
      width: 'flex',
      background: '#c42729',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      //alignItems: 'center',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    logo: {
      width: 'flex',
      height: '40px',
      marginRight: '25px'
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    shoppingCart: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    toolbarButtons: {
      marginLeft: 'auto',
      position: 'left',
    },
    link: {
      textDecoration: 'none',
      color: '#000',
    },
}));