import types from './types';
import axios from 'axios';
import {browserHistory} from 'react-router';

const rootUrl = 'https://myblogappp.herokuapp.com'

export const register = (email, username, dateOfBirth, password) => {
    return (dispatch) => {
        axios.post(`${rootUrl}/sign-up`, {
            email,
            username,
            dateOfBirth,
            password
        }).then((returnedData) => {
            switch (returnedData.data.response) {
                case 'emailInUse': 
                    return dispatch({
                        type: types.EXISTED_EMAIL
                    });
                case 'usernameInUse':
                    return dispatch({
                        type: types.EXISTED_USERNAME
                    });
                case 'success':
                    return dispatch({
                        type: types.SUCCESS
                    });
                case 'wrongUserName':
                    return dispatch({
                        type: types.WRONG_USERNAME
                    });
                case 'wrongEmail':
                    return dispatch({
                        type: types.WRONG_EMAIL
                    });
            }
        });
    }
}

export const successFalse = () => {
    return {
        type: types.SUCCESS_FALSE
    }
}

export const logIn = (username, password) => {
    return (dispatch) => {
        axios.post(`${rootUrl}/log-in`, {username, password}).then((returnedData) => {
            if (returnedData.data.success) {
                dispatch({
                    type: types.LOG_IN,
                    username: returnedData.data.loggedUser,
                });
                localStorage.setItem('token', returnedData.data.token);
                return browserHistory.push(`/logged?user=${returnedData.data.loggedUser}`);
            } else {
                return dispatch({
                    type: types.UNSUCCESSFULL_LOG_IN
                });
            }
        });
    }
}

export const logOut = () => {
    return {
        type: types.LOG_OUT
    }
}

export const resetState = () => {
    return {
        type: types.RESET_STATE
    }
}

export const postBlog = (author, title, thumbnail, category, content, markers, token, dateOfCreation) => {
    return (dispatch) => {
        axios.post(`${rootUrl}/post-blog`, {author, title, thumbnail, category, content, markers, token, dateOfCreation}).then((returnedData) => {
            if (returnedData.data.success) {
                dispatch({
                    type: types.POSTED,
                    categories: returnedData.data.allCategories,
                    posts: returnedData.data.foundPosts
                });
            }
        });
    }
}

export const resetPosted = () => {
    return {
        type: types.RESET_POSTED
    }
}

export const getPostsCategories = (token) => {
    return (dispatch) => {
        axios.post(`${rootUrl}/get-posts`, {token: token}).then((returnedData) => {
            dispatch({
                type: types.SET_POSTS_CATEGORIES,
                categories: returnedData.data.categories,
                posts: returnedData.data.posts
            });
        });
    }
}

export const filterPosts = (filterValue, token) => {
    return (dispatch) => {
        axios.post(`${rootUrl}/filter-posts`, {filterValue, token}).then((returnedData) => {
            dispatch({
                type: types.SET_POSTS,
                posts: returnedData.data.posts
            });
        });
    }
}

export const removePost = (id, token) => {
    return (dispatch) => {
        axios.post(`${rootUrl}/remove-post`, {id, token}).then((returnedData) => {
            dispatch({
                type: types.SET_POSTS,
                posts: returnedData.data.posts
            });
        });
    }
}

export const editPost = (id, token, title, text, imageUrl, category, markers, dateOfCreation) => {
    return (dispatch) => {
        axios.post(`${rootUrl}/update-post`, {id, token, title, text, imageUrl, category, markers, dateOfCreation}).then((returnedData) => {
            dispatch({
                type: types.SET_POSTS,
                posts: returnedData.data.posts
            });
        });
    }
}