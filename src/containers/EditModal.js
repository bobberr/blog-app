import React from 'react';
import {Modal, Form, FormGroup, ControlLabel, FormControl, Button, Checkbox, DropdownButton, MenuItem} from 'react-bootstrap';
import ReactFilestack from 'filestack-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actionCreators/actionCreator';
import MapCompon from '../components/MapCompon';

class EditModal extends React.Component {
    constructor () {
        super();
        this.imageUpload = this.imageUpload.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.hideModalUser = this.hideModalUser.bind(this);
        this.state = {
            imageUrl: ''
        }
    }
    imageUpload (result) {
        this.setState({
            imageUrl: result.filesUploaded[0].url
        });
    }
    closeHandler () {
        this.props.hideModal();
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
    submitHandler (e) {
        e.preventDefault();
        this.props.actions.editPost(
            this.props.id,
            localStorage.getItem('token'),  
            this.title.value,    
            this.text.value,                              
            this.state.imageUrl,
            this.selectedCategory.value,
            this.state.markers,
            this.date
        );
    }
    hideModalUser () {
        this.props.hideModal();
        this.setState({
            showMap: false
        });
    }
    componentWillReceiveProps () {
        this.setState({
            imageUrl: this.props.thumbnail,
            markers: this.props.markers
        });
    }
    editHandler (e) {
        e.preventDefault();
        this.props.actions.editPost(this.props.id, localStorage.getItem('token'), this.title.value);
    }
    render () {
        const myDate = new Date();
        const months = ['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];
        this.date = `${months[myDate.getMonth()]} ${myDate.getDate()}, ${myDate.getFullYear()}`; 
        const postIndex = this.props.state.posts.findIndex(post => {
            return post._id === this.props.id
        });
        const postData = this.props.state.posts[postIndex] || [];
        const markers = postData.markers || [];
        return (
            <Modal className="modal" show={this.props.showModal} onHide={this.hideModalUser}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitHandler}>
                        <FormGroup>
                            <ControlLabel>Title</ControlLabel>
                            <FormControl type="text" placeholder="Title" defaultValue={postData.title} inputRef={el => this.title = el}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Text</ControlLabel>
                            <FormControl type="text" componentClass="textarea" defaultValue={postData.content} placeholder="Text" inputRef={el => this.text = el}/>
                        </FormGroup>
                        <div className="thumbnail-container">
                            <img className="thumbnail-container__thumbnail" src={this.state.imageUrl} alt="thumbnail"/>
                            <ReactFilestack
                                apikey={'AkZomiRPmRnZSPYpuTAmvz'}
                                buttonText="Upload new image"
                                buttonClass="thumbnail-container__change-button"
                                onSuccess={this.imageUpload}
                            />
                        </div>
                        <FormGroup>
                            <ControlLabel>Category</ControlLabel>
                            <FormControl defaultValue={postData.category} inputRef={ref => {this.selectedCategory = ref}} type="text" placeholder="category"/>
                        </FormGroup>
                        {markers.length !== 0 ? <MapCompon 
                            lat={postData.markers[0].key.lat}
                            lng={postData.markers[0].key.lng}
                            markers={this.state.markers} 
                            onMapClick={this.handleMapClick} 
                            onMarkerRightClick={this.handleMarkerRightClick}
                            containerElement={<div className="modal__map-container" style={{height: `200px`}}/>} 
                            mapElement={<div className="modal__map-container" style={{height: `200px`}}/>}
                        /> : null} 
                        <Button className="modal__add-button" bsStyle="primary" type="submit">Edit post</Button>
                        <Button bsStyle="danger" onClick={this.closeHandler}>Close</Button>
                    </Form>
                    {this.props.flags.editted ? <p className="modal__success-posted">Editted successfully</p> : null}
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

EditModal = connect(mapStateToProps, mapDispatchToProps)(EditModal);

module.exports = EditModal;

