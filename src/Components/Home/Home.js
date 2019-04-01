import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getTruckDataByDistance} from '../../action/index';
import mockTruckData from '../../mock/mock.json';
import GoogleMap from '../GoogleMaps/googleMap';
import TruckDetails from '../TruckDetails/TruckDetail';
import './Home.scss';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {
                lat: 37.721461838724,
                lng:-122.389993465976
            }
        }
        this.openSuggestionBox = this.openSuggestionBox.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchLocation = this.searchLocation.bind(this);
      }

    componentDidMount(){
        this.props.getTruckDetails(mockTruckData, this.state.currentLocation);
    }

    handleChange(event) {
        console.log('handle change called ' + event.target.value);
        const lat = +event.target.value.split(',')[0];
        const lng = +event.target.value.split(',')[1];
        this.setState({
            currentLocation:{
                lat: lat,
                lng: lng
            }
        });
        event.preventDefault();
    }

    openSuggestionBox() {
     document.getElementById('suggestion-box').style.display = 'block';
    }

    searchLocation() {
        document.getElementById('suggestion-box').style.display = 'none';
        // Fetching truck data for radius 1 km 
        // can take the distance as input from user and change function in action to include distance
        this.props.getTruckDetails(mockTruckData, this.state.currentLocation);
    }

    getLocation(event) {
        console.log('get curretn location');
        document.getElementById('suggestion-box').style.display = 'none';
        console.dir(event);
        // get the div selected and search with that string but now just fixing the current locaiton
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('CURRENT positon found');
                console.dir(position);
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                this.setState({
                    currentLocation: location
                })
            });
          } else {
              alert('Your browser does not support the type of geolocator');
          }
          // Fetching truck data for radius 1 km 
          // can take the distance as input from user and change function in action to include distance
          this.props.getTruckDetails(mockTruckData, location);
          
    }
   render(){
       console.log('In render of HOme component');
       console.dir(this.props.truckData);
       console.log('state valueis ');
       console.dir(this.state);
      return(
         <div className="home">
            <div className="row" >
                <div className="col-lg-6 col-md-8 col-sm-10 col-xs-10 mx-auto search-location">
                  <input 
                  type="text" name="name" placeholder="current  in lat,long (37.7214618, -122.389993)"
                  onKeyPress={this.openSuggestionBox}
                  onChange={this.handleChange} />
                    <i 
                    className="material-icons" role="button" 
                     onClick={this.searchLocation}>search</i>
                    <div className="col-lg-12" id="suggestion-box" onClick={() => {this.getLocation(event); }}>
                            <div role="button" className="text-center" >Current Location</div>
                     </div> 
                </div>
            </div>
            <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-12 mx-auto container">
                        <div className="row p-1">
                                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-12 p-0 map-container">
                                    <GoogleMap 
                                    currentLocation={this.state.currentLocation}
                                    truckData={this.props.truckData} />
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 col-12 truck-detail-container">
                                    <TruckDetails truckData={this.props.truckData} />
                                </div>
                        </div>
                    </div>
            </div>                    
         </div>
      );
   }
}

function mapStateToProps(state) {
    return {truckData: state.truckDetails};
}

function mapDispatchToProps(dispatch) {
    return {
        getTruckDetails: (data, currentLocation) => {dispatch(getTruckDataByDistance(data, currentLocation))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
