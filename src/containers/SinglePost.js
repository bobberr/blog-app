import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actionCreators/actionCreator';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import MapCompon from '../components/MapCompon';
import EditModal from './EditModal';



class SinglePost extends React.Component {
    constructor () {
        super();
        this.deleteHandler = this.deleteHandler.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.state = {
            showModal: false
        }
    }
    deleteHandler (id) {
        this.props.actions.removePost(id, localStorage.getItem('token'));
        browserHistory.push(`/logged?user=${this.props.flags.loggedUsername}`);
    }
    showModal () {
        this.setState ({
            showModal: true
        });
    }
    hideModal () {
        this.setState ({
            showModal: false
        });
    }
    render () {
        const postIndex = this.props.data.posts.findIndex(post => {
            return post._id === this.props.location.query.id
        });
        const postData = this.props.data.posts[postIndex] || [];
        const markers = postData.markers || [];
        return (
            <Grid className="single-post">
                <Row>
                    <Col lg={10} lgOffset={1} md={10} mdOffset={1}>
                        <img className="single-post__image" src={postData.thumbnail ? postData.thumbnail : 'http://epaper2.mid-day.com/images/no_image_thumb.gif'} alt="post thumbnail"/>
                        <p className="single-post__category">{postData.category ? postData.category : 'No category'}</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8} lgOffset={2} md={8} mdOffset={2} sm={8} smOffset={2} xs={10} xsOffset={1}>
                        <p className="single-post__title">{postData.title}</p>
                        <p className="single-post__date">{postData.dateOfCreation}</p>
                        <p className="single-post__author">By: {postData.author}</p>
                        <p className="single-post__content">{postData.content}</p>
                        {markers.length !== 0 ? 
                            <MapCompon
                                markers={postData.markers} 
                                lat={postData.markers[0].key.lat}
                                lng={postData.markers[0].key.lng}
                                onMapClick={() => {}}
                                onMarkerRightClick={() => {}}
                                containerElement={<div className="modal__map-container" style={{height: `200px`}}/>} 
                                mapElement={<div className="modal__map-container" style={{height: `200px`}}/>}/> : 
                            null
                        }
                        {this.props.flags.loggedUsername == postData.author ? 
                        <div className="button-flex">
                            <Button bsStyle="danger" onClick={this.deleteHandler.bind(null, postData._id)}>Delete post</Button>
                            <Button className="edit-button" bsStyle="warning" onClick={this.showModal}>Edit Post</Button>
                        </div> :
                            null
                        }       
                        <div className="button-flex">
                            <Button bsStyle="primary" className="back-button"
                                onClick={() => {browserHistory.push(this.props.flags.loggedUsername == null ? '/' : `/logged?user=${this.props.flags.loggedUsername}`)}}>
                                Back
                            </Button> 
                        </div>                
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EditModal 
                            thumbnail={postData.thumbnail} 
                            showModal={this.state.showModal} 
                            hideModal={this.hideModal}
                            markers={postData.markers}
                            id={this.props.location.query.id}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        data: state.data,
        flags: state.flags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

SinglePost = connect(mapStateToProps, mapDispatchToProps)(SinglePost);


module.exports = SinglePost;