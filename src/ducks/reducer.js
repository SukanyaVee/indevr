const initialState = {
    user: {
        id: 0,
        auth0ID: '',
        username: '',
        firstName: '',
        lastName: '', 
        email: '',
        picture: ''
    },
    projects: {
        id: 0,
        projectName: '',
        description: '',
        public: true,
        repo: ''
    }
};

const LOGIN = 'LOGIN';
// const REFRESHPROJECTS = 'REFRESH PROJECTS';

export const login = (user) => {
    return {
        type: LOGIN,
        payload: user
    }
}
// export const getProjects = (projects) => {
//     return {
//         type: REFRESHPROJECTS,
//         payload: projects
//     }
// }

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN: 
            return {...initialState, user: action.payload};
        // case REFRESHPROJECTS:
        //     return {...initialState, projects: action.payload}
        default: 
            return initialState;
    }
};

export default reducer;