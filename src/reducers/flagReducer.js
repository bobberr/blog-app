import types from '../actionCreators/types';
const initialState = {};

const flagReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.WRONG_EMAIL:
            return Object.assign({}, state, {wrongEmail: true, existedEmail: false, success: false});
        case types.EXISTED_EMAIL:
            return Object.assign({}, state, {existedEmail: true, wrongEmail: false, success: false});
        case types.WRONG_USERNAME:
            return Object.assign({}, state, {wrongUsername: true, existedUsername: false, success: false});    
        case types.EXISTED_USERNAME:
            return Object.assign({}, state, {existedUsername: true, wrongUsername: false, success: false});   
        case types.NOT_MATCHED_PASS:
            return Object.assign({}, state, {notMatchedPass: true, wrongEmail: false, existedEmail: false, wrongUsername: false, existedUsername: false, success: false}); 
        case types.SUCCESS:
            return Object.assign({}, state, {success: true, notMatchedPass: false, wrongEmail: false, existedEmail: false, wrongUsername: false, existedUsername: false});
        case types.SUCCESS_FALSE:
            return Object.assign({}, state, {success: false, existedEmail: false});
        case types.LOG_IN:
            return Object.assign({}, state, {logged: true, loggedUsername: action.username, unLogIn: false});      
        case types.UNSUCCESSFULL_LOG_IN:
            return Object.assign({}, state, {unLogIn: true, logged: false});                        
        case types.LOG_OUT:
            return Object.assign({}, state, {logged: false, loggedUsername: null, token: null}); 
        case types.RESET_STATE:
            return Object.assign({}, state, {wrongEmail: false, existedEmail: false, wrongUsername: false, existedUsername: false, unLogIn: false});
        case types.POSTED:
            return Object.assign({}, state, {posted: true});
        case types.RESET_POSTED:
            return Object.assign({}, state, {posted: false});            
        default: 
            return state
    }
}

module.exports = flagReducer;