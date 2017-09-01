import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actionCreators/actionCreator';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import PostGrid from './PostGrid';

class Welcome extends React.Component {
    constructor (props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    signIn () {
        browserHistory.push('sign-in')
    }
    signUp () {
        browserHistory.push('sign-up')
    }
    componentWillMount () {
         this.props.actions.getPostsCategories();
    }
    render () {
        return (
            <Grid>
                <Row>
                    <Col mdOffset={9} smOffset={8} lgOffset={10} smOffset={8} xsOffset={5} className="button-container">
                        <Button bsStyle="primary" onClick={this.signIn}>Sign In</Button>                    
                        <Button bsStyle="info" className="button-container__sign-up" onClick={this.signUp}>Sign Up</Button>                    
                    </Col>
                </Row>
                <Row>
                    <PostGrid/>                    
                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.reducers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch) 
    }
}

Welcome = connect(mapStateToProps, mapDispatchToProps)(Welcome);
module.exports = Welcome;