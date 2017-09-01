import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";



class MapCompon extends React.Component {
    render () {
        const markers = this.props.markers || [];
        const props = this.props;
        return (
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={3}
                defaultCenter={{ lat: this.props.lat, lng: this.props.lng }} 
                onClick={this.props.onMapClick}
                style={{display: 'none'}}
            >
                {markers.map((marker, index) => (
                        <Marker {...marker}
                            key={index}
                            onRightClick={() => {props.onMarkerRightClick(marker)}}
                        />                
                    )
                )}
            </GoogleMap>
        )
    }
}

module.exports = withGoogleMap(MapCompon);