import React from 'react';
import Post from '../components/Post';
import {connect} from 'react-redux';


class PostGrid extends React.Component {
    render () {
            const dataPosts = this.props.data.posts || [];
            const posts = dataPosts.map((post, i) => {
                return <Post id={post._id} currentUser={this.props.flags.loggedUsername} thumbnail={post.thumbnail} category={post.category} title={post.title} author={post.author} key={post._id}/>
            });
        return (
            <div className="post-grid">
                {posts}                
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        flags: state.flags
    }
}

PostGrid = connect(mapStateToProps)(PostGrid);


module.exports = PostGrid;