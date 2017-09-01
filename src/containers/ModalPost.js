import React from 'react';
import {Modal, Form, FormGroup, ControlLabel, FormControl, Button, Checkbox, DropdownButton, MenuItem} from 'react-bootstrap';
import ReactFilestack from 'filestack-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actionCreators/actionCreator';
import MapCompon from '../components/MapCompon';

class ModalPost extends React.Component {
    constructor () {
        super();
        this.imageUpload = this.imageUpload.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
        this.mapEnable = this.mapEnable.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.hideModalUser = this.hideModalUser.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
            imageUrl: '',
            markers: [],
            showMap: false
        }
    }
    imageUpload (result) {
        this.setState({
            imageUrl: result.filesUploaded[0].url
        });
    }
    closeHandler () {
        this.props.hideModal();
        this.props.actions.resetPosted();
        this.setState({
            imageUrl: '',
            markers: [],
            showMap: false
        });
    }
    handleMapClick (event) {
        const nextMarkers = [
            ...this.state.markers,
            {
                position: event.latLng,
                defaultAnimation: 2,
                key: event.latLng, 
            },
        ];
        this.setState({
            markers: nextMarkers,
        });
    }
    handleMarkerRightClick(targetMarker) {
        const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
        this.setState({
            markers: nextMarkers,
        });
    }
    mapEnable () {
        this.setState({
            showMap: !this.state.showMap
        });
    }
    submitHandler (e) {
        e.preventDefault();
        this.props.actions.postBlog(
            this.props.username,
            this.title.value,
            this.state.imageUrl,
            this.selectedCategory.value,
            this.text.value,
            this.state.markers,
            localStorage.getItem('token'),
            this.date
        );
        this.setState({
            imageUrl: '',
            markers: [],
            showMap: false
        });
        this.title.value = '';
        this.text.value = '';
    }
    hideModalUser () {
        this.props.hideModal();
        this.props.actions.resetPosted();
        this.setState({
            imageUrl: '',
            markers: [],
            showMap: false
        });
    }
    changeHandler (e) {
        console.log(e.target.value)
    }
    render () {
        const myDate = new Date();
        const months = ['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];
        this.date = `${months[myDate.getMonth()]} ${myDate.getDate()}, ${myDate.getFullYear()}`; 
        return (
            <Modal className="modal" show={this.props.showModal} onHide={this.hideModalUser}>
                <Modal.Header closeButton>
                    <Modal.Title>Add post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitHandler}>
                        <FormGroup>
                            <ControlLabel>Title</ControlLabel>
                            <FormControl type="text" placeholder="Title" inputRef={el => this.title = el}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Text</ControlLabel>
                            <FormControl type="text" componentClass="textarea" placeholder="Text" inputRef={el => this.text = el}/>
                        </FormGroup>
                        {this.state.imageUrl ? null : 
                            <ReactFilestack
                                apikey={'AkZomiRPmRnZSPYpuTAmvz'}
                                buttonText="Upload post image"
                                buttonClass="modal__upload-button"
                                onSuccess={this.imageUpload}
                            />
                        }
                        {this.state.imageUrl ? <p className="modal__success">Image uploaded successfully </p> : null}
                        <FormGroup>
                            <ControlLabel>Category</ControlLabel>
                            <FormControl inputRef={ref => {this.selectedCategory = ref}} type="text" placeholder="category"/>
                        </FormGroup>
                        <Checkbox onChange={this.mapEnable}>
                            Location
                        </Checkbox>
                        {this.state.showMap ? <MapCompon 
                            lat={45.363882}
                            lng={17.044922}
                            markers={this.state.markers} 
                            onMapClick={this.handleMapClick} 
                            onMarkerRightClick={this.handleMarkerRightClick}
                            containerElement={<div className="modal__map-container" style={{height: `200px`}}/>} 
                            mapElement={<div className="modal__map-container" style={{height: `200px`}}/>}
                        /> : null} 
                        <Button className="modal__add-button" bsStyle="primary" type="submit">Add post</Button>
                        <Button bsStyle="danger" onClick={this.closeHandler}>Close</Button>
                    </Form>
                    {this.props.flags.posted ? <p className="modal__success-posted">Posted successfully</p> : null}
                </Modal.Body>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.data,
        flags: state.flags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

ModalPost = connect(mapStateToProps, mapDispatchToProps)(ModalPost);

module.exports = ModalPost;