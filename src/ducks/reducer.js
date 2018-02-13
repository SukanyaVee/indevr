const LOGGED_IN = 'LOGGED_IN';
const LOGOUT = 'LOGOUT';

const initialState = {
    user: {},
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

export default function reducer(state = initialState, action){
    switch(action.type){
        case LOGGED_IN: 
        console.log('Action Received:', action)
            return {...state, user: action.payload};
        case LOGOUT:
            return {...state, user: action.payload};
        default: 
            return state;
    }
}
