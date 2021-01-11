import {
    makeStyles
  } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formControl: {
      margin: theme.spacing(1),
      width: 300,
    },
    link: {
      textDecoration: 'none',
      color: '#000',
    },
}));