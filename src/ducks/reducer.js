const LOGGED_IN = 'LOGGED_IN';
const LOGOUT = 'LOGOUT';
const SEARCHUSERS = 'SEARCHUSERS';
const SEARCHPROJ = 'SEARCHPROJ';
const SEARCHPOSTS = 'SEARCHPOSTS';
const SEARCHING = 'SEARCHING';

const initialState = {
    user: {},
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
    return {
        type: LOGOUT,
        payload: {}
    }
}

export function searchUsers(results){
    // console.log('Reducer', results.data)
    return {
        type: SEARCHUSERS,
        payload: results.data
    }
}
export function searchProj(results){
    console.log('Reducer Proj', results.data)
    let pro = results.data.filter(elem => {
        if(elem.public === true){
            return elem;
        }
        return null
    })
    
    console.log('Pro', pro)
    return {
        type: SEARCHPROJ,
        payload: pro
    }
}
export function searchPosts(results){
    console.log('Reducer Post', results.data)
    return {
        type: SEARCHPOSTS,
        payload: results.data
    }
}

export function searching(term){
    return {
        type: SEARCHING,
        payload: term,
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case LOGGED_IN:
        console.log('Action Received:', action)
            return {...state, user: action.payload};
        case LOGOUT:
            return {...state, user: action.payload};
        case SEARCHUSERS:
            return {...state, results: action.payload};
        case SEARCHPROJ:
            return {...state, projects: action.payload};
        case SEARCHPOSTS:
            return {...state, posts: action.payload};
        case SEARCHING:
            return {...state, term: action.payload};
        default:
            return state;
    }
}
