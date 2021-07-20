import jwtDecode from "jwt-decode";
const initialState = {
    loading: false,
    registerErrors: [],
    loginErrors: [],
    token: "",
    user:""
}

const verifyToken = token => {
    const decodeToken = jwtDecode(token);
    const expiresIn = new Date(decodeToken.exp * 1000)
    if (new Date() > expiresIn) {
        localStorage.removeItem("myToken")
    } else {
        return decodeToken;
    }
}

const token = localStorage.getItem("myToken")
// console.log(token);
if (token) {
    const decoded = verifyToken(token)
    initialState.token = token;
    if (decoded.user) {
        const { user } = decoded;
        initialState.user = user;
    }
}

const AuthReducer = (state = initialState, action) => {
    if (action.type === "SET_LOADER") {
        return {...state,loading:true}
    }else if (action.type === "CLOSE") {
        return {...state,loading:false}
    } else if (action.type === "REGISTER_ERRORS") {
        return {...state,registerErrors:action.payload}
    } else if (action.type==="SET_TOKEN") {
        const decode = verifyToken(action.payload);
        const { user } = decode
        return {...state,token:action.payload,user:user}
    } else if (action.type === "CLEAR_TOKEN") {
        console.log("User removed");
        localStorage.removeItem("myToken")
        return {...state,token:'',user:''}
    } else if (action.type === "UPDATE_USER") {
        const decode = verifyToken(action.payload);
        const { user } = decode
        return {...state,token:action.payload,user:user}
    }else {
       return state 
    }
            
}

export default AuthReducer