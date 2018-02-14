const LOGGED_IN = 'LOGGED_IN';
const LOGOUT = 'LOGOUT';
const SEARCH = 'SEARCH';

const initialState = {
    user: {},
    results: [],
}

export function login(user){
    return {
        type: LOGGED_IN,
        payload: user
    }
}

export function logout(){
    return {
        type: LOGOUT,
        payload: {}
    }
}

export function searchResults(results){
    console.log('Reducer', results.data)
    return {
        type: SEARCH,
        payload: results.data
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case LOGGED_IN: 
        console.log('Action Received:', action)
            return {...state, user: action.payload};
        case LOGOUT:
            return {...state, user: action.payload};
        case SEARCH:
            return {...state, results: action.payload}
        default: 
            return state;
    }
}
