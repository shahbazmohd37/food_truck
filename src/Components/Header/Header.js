import React, { Component } from 'react';
import  './Header.scss';

class Header extends Component{
    constructor(props) {
        super(props);
      }
   render(){
       console.log('In render of  Header');
      return(
        <div className="row header">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6">
               <div className="row left-menu">
                   <div className="col-lg-1 col-md-2 col-sm-2 col-xs-2 col-2"><i className="material-icons icon-menu">menu</i></div>
                   <div className="col-lg-11 col-md-10 col-sm-10 col-xs-10 col-10 title">Food Truck Locator</div>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 right-menu">
               <span><i className="material-icons">account_circle</i></span>
               <span>contact</span>
               <span>
                   <input type="text" name="name" />
                   <i className="material-icons">search</i></span>
            </div>
        </div> 
      );
   }
}
export default Header;
