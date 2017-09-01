import React from 'react';
import {Button, Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actionCreators/actionCreator';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

class SignUp extends React.Component {
    constructor () {
        super ();
        this.submitHandler = this.submitHandler.bind(this);
        this.exitHandler = this.exitHandler.bind(this);
        this.state = {
            emailError: null,
            usernameError: null,
            passwordError: null,
            dateError: null
        }
    }
    exitHandler () {
        browserHistory.push('/');
        this.props.actions.resetState();
    }
    submitHandler (e) {
        e.preventDefault();
        const email = this.email.value;
        const username = this.username.value;
        const password = this.password.value;
        const dateOfBirth = this.date.value;
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(emailReg)) {
            this.setState({
                emailError: false
            });
            if (username.length > 5) {
                this.setState({
                    usernameError: false
                });
                if (dateOfBirth) {
                    this.setState({
                        dateError: false
                    });
                    if (password == this.passwordConfirm.value && password.length > 3) {
                        this.setState({
                            passwordError: false
                        });
                        this.props.actions.register(email, username, dateOfBirth, password);
                        browserHistory.push('/successfull-registration');
                    } else {
                        this.setState({
                            passwordError: true
                        });
                        this.props.actions.successFalse();
                    }
                } else {
                    this.setState({
                        dateError: true
                    });
                }
            } else {
                this.setState({
                    usernameError: true
                });
                this.props.actions.successFalse();
            }
        } else {
            this.setState({
                emailError: true
            });
            this.props.actions.successFalse();
        }
    }
    render () {
        const emailCheck = this.props.flags.wrongEmail || this.state.emailError;
        const usernameCheck = this.props.flags.wrongUsername || this.state.usernameError;
        const dateCheck = this.state.dateError;
        const passwordCheck = this.state.passwordError;
        const emailInUseCheck = this.props.flags.existedEmail;
        const usernameUseCheck = this.props.flags.existedUsername;
        return (
            <Grid>
                <Row>
                    <Col lg={8} md={8} sm={8} xs={10} lgOffset={2} mdOffset={2} smOffset={2} xsOffset={1}>
                        <div className="sign-up-block">
                            <h3 className="sign-up-block__title">Sign Up</h3>
                            <Form onSubmit={this.submitHandler} horizontal>
                                <FormGroup validationState={emailCheck || emailInUseCheck ? 'error' : null}>
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl type="text" placeholder="Email" inputRef={ref => {this.email = ref}}/>
                                    {emailCheck ? <HelpBlock>Enter please correct email</HelpBlock> : null}
                                    {emailInUseCheck ? <HelpBlock>Email already in use</HelpBlock> : null}
                                </FormGroup>
                                <FormGroup validationState={usernameCheck || usernameUseCheck ? 'error' : null}>
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl type="text" placeholder="Username" inputRef={ref => {this.username = ref}}/>
                                    {usernameCheck ? <HelpBlock>Enter please more than 5 characters for username</HelpBlock> : null}
                                    {usernameUseCheck ? <HelpBlock>Username already in use</HelpBlock> : null}
                                </FormGroup>
                                <FormGroup validationState={dateCheck ? 'error' : null}>
                                    <ControlLabel>Date of birth</ControlLabel>
                                    <FormControl type="date" placeholder="Date of birth" inputRef={ref => {this.date = ref}}/>
                                    {dateCheck ? <HelpBlock>Please enter the date</HelpBlock> : null}
                                </FormGroup>
                                <FormGroup validationState={passwordCheck ? 'error' : null}>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl type="password" placeholder="Password" inputRef={ref => {this.password = ref}}/>
                                </FormGroup>
                                <FormGroup validationState={passwordCheck ? 'error' : null}>
                                    <ControlLabel>Password confirm</ControlLabel>
                                    <FormControl type="password" placeholder="Password confirm" inputRef={ref => {this.passwordConfirm = ref}}/>
                                    {passwordCheck ? <HelpBlock>Please enter same password with more than 3 characters</HelpBlock> : null}
                                </FormGroup>
                                <div className="flex-button-wrap">
                                    <Button type="submit" bsSize="large" bsStyle="primary">Submit</Button>
                                    <Button bsStyle="danger" bsSize="large" onClick={this.exitHandler}>Exit</Button>                                
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        flags: state.flags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}


SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUp);


module.exports = SignUp;