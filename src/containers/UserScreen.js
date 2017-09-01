import React from 'react';
import {Button, Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actionCreators/actionCreator';
import Autosuggest from 'react-autosuggest';
import ModalPost from './ModalPost';
import PostGrid from './PostGrid';

let categories;

const escapeRegexCharacters = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const getSuggestions = (value) => {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return categories.filter(categories => regex.test(categories.name));
}

const getSuggestionValue = (suggestion) => {
  return suggestion.name;
}

const renderSuggestion = (suggestion) => {
  return (
    <span>{suggestion.name}</span>
  );
}

class UserScreen extends React.Component {
    constructor () {
        super();
        this.logOut = this.logOut.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            value: '',
            suggestions: [],
            showModal: false
        }
    }
    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    logOut () {
        browserHistory.push('/');
        this.props.actions.logOut();
    }
    componentWillMount () {
        this.props.actions.getPostsCategories();
    }
    showModal () {
        this.setState({
            showModal: true
        });
    }
    hideModal () {
        this.setState({
            showModal: false
        });
    }
    submitHandler (e) {
        e.preventDefault();
        this.props.actions.filterPosts(this.state.value, localStorage.getItem('token'));
    }
    render () {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Category",
            value,
            onChange: this.onChange
        };
        categories = this.props.data.categories;
        return ( 
            <Grid>
                <Row>
                    <Col lg={3} lgOffset={9} md={4} mdOffset={8} sm={6} smOffset={6} xs={8} xsOffset={2} className="user-screen">
                        <p className="user-screen__name">Hello {this.props.state.loggedUsername}</p>
                        <Form onSubmit={this.submitHandler}>
                            <FormGroup>
                                <ControlLabel>Filter posts by category</ControlLabel>
                                <div className="filter-container">
                                    <Autosuggest 
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                        getSuggestionValue={getSuggestionValue}
                                        renderSuggestion={renderSuggestion}
                                        inputProps={inputProps} 
                                    />
                                    <Button bsStyle="warning" type="submit">Filter</Button>                            
                                </div>
                            </FormGroup>
                        </Form>
                        <Button className="user-screen__log-out-button" bsStyle="danger" onClick={this.logOut}>Log out</Button>
                        <Button bsStyle="primary" onClick={this.showModal}>Add post</Button>
                        <ModalPost username={this.props.state.loggedUsername} showModal={this.state.showModal} hideModal={this.hideModal} category={this.state.value}/>
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
        state: state.flags,
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

UserScreen = connect(mapStateToProps, mapDispatchToProps)(UserScreen);

module.exports = UserScreen;