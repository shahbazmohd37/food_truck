import React, {Component} from 'react';
import truckIcon from './truckIcon.png';
import './TruckDetail.scss';
 

class TruckDetails extends Component {
  constructor(props) {
    super(props);
  }
  showFoodDetails(item) {
   alert(`Food Description : \n  ${item.fooditems}`);
  }
  render() {
    console.log('Truck details component');
    if (typeof this.props.truckData === 'undefined' || this.props.truckData.length === 0) {
      return (
             <div className="row truck-detail m-0 p-1">
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                    <p>There is NO truck found for your location</p>
                 </div>
             </div>
      )
    }
    return (
        <div>
            {this.props.truckData.map((item) => {
                return (
                    <div className="row truck-detail m-0 p-1" key={item.objectid}>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 col-2 p-0">
                                <img src={truckIcon} width={'100%'} />
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 col-7 truck-description">
                                <p>{item.applicant}</p>
                                <p className="location"><i className="material-icons">location_on</i>{item.address}</p>
                                <p className="truck-timing">{item.dayshours}</p>
                        </div>
                        <div 
                        className="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3 p-0 food-details" 
                        role="button"
                        onClick={() => {this.showFoodDetails(item);}}>
                                <span>Food Details</span>
                        </div>
                        <div className="divider" />
                    </div>
                    );
            })}
        </div>       
    );
  }
}

export default TruckDetails;
