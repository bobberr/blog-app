import React from 'react';
import {Button, Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import * as actions from '../actionCreators/actionCreator';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

class SignIn extends React.Component {
    constructor () {
        super ();
        this.submitHandler = this.submitHandler.bind(this);
        this.exitHandler = this.exitHandler.bind(this);
    }
    submitHandler (e) {
        e.preventDefault();
        this.props.actions.logIn(this.userNameInput.value, this.passInput.value);
    }
    exitHandler () {
        browserHistory.push('/');
        this.props.actions.resetState();
    }
    render () {
        return (
            <Grid>
                <Row>
                    <Col md={6} mdOffset={3} lg={6} lgOffset={3} sm={8} smOffset={2} xs={8} xsOffset={2}>
                        <div className="sign-in-block">
                            <h3 className="sign-in-block__title">Sign In</h3>
                            <Form onSubmit={this.submitHandler} horizontal>
                                <FormGroup validationState={this.props.state.unLogIn ? 'error' : null}>
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl type="text" inputRef={ref => {this.userNameInput = ref}} placeholder="Username" />
                                </FormGroup>
                                <FormGroup validationState={this.props.state.unLogIn ? 'error' : null}>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl type="password" inputRef={ref => {this.passInput = ref}} placeholder="Password" />
                                    {this.props.state.unLogIn ? <HelpBlock>User doesnt exist or wrong password</HelpBlock> : null}
                                </FormGroup>
                                <div className="flex-button-wrap">
                                    <Button type='submit' bsSize="large" bsStyle='primary'>Submit</Button>
                                    <Button bsSize="large" bsStyle="danger" onClick={this.exitHandler}>Exit</Button>                                
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.flags
    }
}

SignIn = connect(mapStateToProps, mapDispatchToProps)(SignIn);

module.exports = SignIn;
