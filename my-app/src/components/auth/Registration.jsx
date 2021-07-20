import React,{useEffect, useState} from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux' 
import toast, { Toaster } from 'react-hot-toast';

export const Registration = (props) => {
    const { loading, registerErrors, user } = useSelector(state => state.AuthReducer)

    const [state, setState] = useState({ name: "",userName:"", email: "", password: "",cpassword:"" })
    
    const dispatch = useDispatch()

    const handleInputs = (e) => {
        setState({...state,[e.target.name]:e.target.value})
    }


    const userRegister = async (e) => {
        e.preventDefault()

        if (state.password === state.cpassword) {
            dispatch({type:"SET_LOADER"})

            try {
                const res=await fetch('/register', {
                    method:"POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(state)
                
                })
                dispatch({ type: "CLOSE_LOADER" })
                const data =await res.json()
                // console.log(res);
                // console.log(data);
                if (res.status === 400) {
                    toast.error(data.error.name || data.error.userName || data.error.email || data.error.password || data.error.cpassword || data.error, {
                        style: {
                          padding: '10px',
                          color: '#fff',
                          fontSize:"16px",
                          background:"red"
                        },
                        iconTheme: {
                          primary: 'white',
                          secondary: 'red',
                        },
                      })
                } else {
                    toast.success(data.message, {
                        style: {
                            padding: '10px',
                            color: '#fff',
                            fontSize:"16px",
                            background:"#62D346"
                        },
                        iconTheme: {
                          primary: 'white',
                          secondary: '#62D346'
                        }
                    })
                    
                setTimeout(() => {
                    localStorage.setItem("myToken", data.token)
                    dispatch({ type: "SET_TOKEN", payload: data.token })
                },2000)
                    
                }
            } catch (err) {
                dispatch({type:"CLOSE_LOADER"})
                dispatch({type:"REGISTER_ERRORS",payload:err.message})
                console.log(err);
            }
        } else {
            toast.error("Confirm Password Doesn't Match", {
                style: {
                  padding: '10px',
                  color: '#fff',
                  fontSize:"16px",
                  background:"red"
                },
                iconTheme: {
                  primary: 'white',
                  secondary: 'red',
                },
              })
        }

    }

    useEffect(() => {
            if (user) {    
                console.log(user);
                props.history.push("/dashboard")
            }
    },[user])

    return (
        <section className="register_section container">
            <Toaster
            position="top-center"
            reverseOrder={false}
            />
            <Helmet>
                <title>User Register</title>
                <meta
                    name="Register Page"
                />
            </Helmet>
            <div className="row mt-80">
                <div className="col-8">
                    <div className="bgImage"></div>
                </div>
                <div className="col-4 account">
                    <form onSubmit={userRegister} method="POST">
                    <div className="group">
                            <h1>Register</h1>
                        </div>
                        <div className="group">
                            <input type="text" className="group_control" placeholder="Enter Your Name" value={state.name} onChange={handleInputs}
                            name="name" autoComplete="off" />
                        </div>
                        <div className="group">
                            <input type="text" className="group_control" placeholder="Enter Your User Name" value={state.userName} onChange={handleInputs}
                            name="userName" autoComplete="off" />
                        </div>
                        <div className="group">
                            <input type="email" className="group_control" placeholder="Enter Your Email" value={state.email} onChange={handleInputs} name="email" autoComplete="off" />
                        </div>
                        <div className="group">
                            <input type="password" className="group_control" placeholder="Enter Your Password" value={state.password} name="password" onChange={handleInputs} autoComplete="off" />
                        </div>
                        <div className="group">
                            <input type="password" className="group_control" placeholder="Re-type the Password" value={state.cpassword} name="cpassword" onChange={handleInputs} autoComplete="off" />
                        </div>
                        <div className="group">
                            <input type="submit" className="btn btn_default btn_block" value="REGISTER"/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
