 import React from 'react';
import {compose, withProps, withStateHandlers} from 'recompose';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox';
import truckIcon from './truckIcon.png';
import pinIcon from './pinIcon.png';
import truckMarker from './truckMarker.png'

const defaultMapOptions = {
  // styles: mapStyles
};
const MyMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{height: '100%'}} />,
    containerElement: <div style={{height: '100%'}} />,
    mapElement: <div style={{height: '100%'}} />
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({isOpen}) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props => 
  <GoogleMap
    defaultZoom={16}
    center={{lat: props.currentLocation.lat, lng: props.currentLocation.lng}}
    defaultOptions={defaultMapOptions}
    >
            <Marker
                key="current0"
                position={{lat: props.currentLocation.lat,
                lng: props.currentLocation.lng}}
                label="Currentlocation"
                icon={pinIcon}
            />
                        {props.truckData.map((data) => {
                            const latval = data.location.coordinates[1];
                            const longval = data.location.coordinates[0];
                                return (
                                      <CustomMarker
                                          key={data.storeid}
                                          data={data}
                                          latval={latval}
                                          longval={longval}
                                      />
                                );
                            }
                        )}
</GoogleMap>
);

class CustomMarker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      show: false
    };
  }
  render() {
    console.dir(this.props);
    const {props: { data, latval, longval }} = this;
    return (
       <Marker 
       key={data.applicant}
       position={{lat: latval, lng: longval}} label={data.applicant} 
       icon={truckMarker}
       onClick={() => this.setState({open: !this.state.open})} >
   
            {this.state.open && <InfoBox
                                    onCloseClick={() => this.setState({open: !this.state.open})}
                                    options={{enableEventPropagation: true}} >
              <div style={{backgroundColor: 'white', opacity: 1, padding: '12px'}}>
                    <div style={{fontSize: '16px', fontColor: '#08233B'}}>
                              <div className="row truck-detail m-0 p-1">
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 col-2 p-0">
                                            <img src={truckIcon} width={'100%'} height={'80px'} />
                                    </div>
                                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 col-7">
                                        <p>{data.applicant}</p>
                                        <p>{data.address}</p>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3 p-0">
                                        <span>Food Details</span>
                                    </div>
                                    <div className="divider" />
                            </div>
                      </div>
              </div>
            </InfoBox>}
     </Marker>  
    );
  }
}

export default MyMapComponent; 