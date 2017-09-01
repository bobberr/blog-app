import React from 'react';
import {Col, Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';

class Post extends React.Component {
    render () {
        const props = this.props;
        return (
            <Col className="blogpost" onClick={() => {browserHistory.push(`/post?id=${props.id}`)}}>
                <div className="blogpost__image-container">
                    <img className="blogpost__thumbnail" src={props.thumbnail ? 
                        props.thumbnail : 
                        'http://epaper2.mid-day.com/images/no_image_thumb.gif'} 
                        alt="thumbnail"
                    />
                    <p className="blogpost__category">{props.category ? props.category : 'no category'}</p>    
                </div> 
                <h3 className="blogpost__title">{props.title ? props.title : <p>No title</p>}</h3>                
            </Col>  
        )
    }
}






module.exports = Post;