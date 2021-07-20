const initialState = {
    loading: false,
    createErrors: [],
    totalUserPost:[]
}

const PostReducer = (state = initialState, action) => {
    if (action.type === "POST_CREATE_ERROR") {
        return {...state,createErrors:[action.payload]}
    } else if (action.type==="CREATE_POST") {
        return { ...state, totalPost:[ ...state.totalPost,action.payload]}
    } else if (action.type==="GET_POST") {
        console.log(action.payload);
        return {...state,totalPost:action.payload}
    }else {
        return state;
    }
   
}
export default PostReducer;