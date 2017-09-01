import types from '../actionCreators/types';

const initialState = {
    categories: [],
    posts: []
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.POSTED: 
            return Object.assign({}, state, {categories: action.categories, posts: action.posts});
        case types.SET_POSTS_CATEGORIES:
            return Object.assign({}, state, {categories: action.categories, posts: action.posts});
        case types.SET_POSTS:
            return Object.assign({}, state, {posts: action.posts});
        default:
            return state;
    }
}

module.exports = dataReducer;