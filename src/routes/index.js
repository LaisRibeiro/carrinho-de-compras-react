import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TelaInicial from '../views/Categorias';
import FinalizarPedido from '../views/FinalizarPedido';

export default function Routes() {
    return (
      <Router>
        <Switch>
            <Route exact path="/" component={TelaInicial}/>
            <Route path="/finalizar-pedido" component={FinalizarPedido}/>
        </Switch>
    </Router>
  );
}
