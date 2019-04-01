import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './src/Components/Header/Header';
import Home from './src/Components/Home/Home';

class App extends Component{
    constructor(props) {
        super(props);
      }
   render(){
       console.log('In render of  App');
      return(
         <div>
            <Header />
            <Switch>
               <Route exact path="" component={Home} />
            </Switch>
         </div>
      );
   }
}
export default App;