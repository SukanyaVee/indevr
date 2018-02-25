const axios = require('axios');
const LOGGED_IN = 'LOGGED_IN';
const LOGOUT = 'LOGOUT';
const CHECK_SESSION = 'CHECK_SESSION';

const initialState = {
    user: null,
    results: [],
    projects: [],
    posts: [],
}

export function login(user){
    return {
        type: LOGGED_IN,
        payload: user
    }
}

export function logout(){
    console.log('We out')
    return {
        type: LOGOUT,
        payload: null
    }
}

export function checkLoggedIn(){
    console.log('Checking login...');
    return {
        type: CHECK_SESSION,
        payload: ''
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case LOGGED_IN:
        console.log('Action Received:', action)
            return {...state, user: action.payload};
        case LOGOUT:
        console.log('Action Received:', action)
            return {...state, user: action.payload };
        case CHECK_SESSION:
        console.log('Action Received:', action)
            return state;

        default:
            return state;
    }
}
