import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector,useDispatch } from 'react-redux'
import { Redirect } from 'react-router';

export const Login = () => {

    const {user} = useSelector(state=>state.AuthReducer)

    const dispatch=useDispatch()

    const [state, setState]=useState({ email: "", password: "" })
    
    const handleChange = (e) => {
        setState({...state,[e.target.name]:e.target.value})
    }

    const handleLogin =async (e) => {
        e.preventDefault()
        
        try {
            const res = await fetch("/login", {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(state)
            })
    
            const data = await res.json();
            // console.log(res);
            // console.log(data);
            
            if (res.status === 400) {
                toast.error(data.error.email || data.error.password || data.error, {
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
                    dispatch({ type: "SET_TOKEN", payload: data.token })
                    localStorage.setItem("myToken", data.token)
                },2000)
    
            }
        } catch (err) {
            alert(err.message)
        }

    }

    return (
        <section className="register_section container">
            <Toaster
            position="top-center"
            reverseOrder={false}
            />
            <Helmet>
                <title>User Login</title>
                <meta
                    name="Login Page"
                />
            </Helmet>
            <div className="row mt-80">
                <div className="col-8">
                    <div className="bgImage"></div>
                </div>
                <div className="col-4 account">
                    <form onSubmit={handleLogin}>
                        <div className="group">
                            <h1>LOGIN</h1>
                        </div>
                        <div className="group">
                            <input type="email" name='email' value={state.email} onChange={handleChange} className="group_control" placeholder="Enter Your Email" autoComplete="off" />
                        </div>
                        <div className="group">
                            <input type="password" name='password' value={state.password} onChange={handleChange} className="group_control" placeholder="Enter Your Password" autoComplete="off" />
                        </div>
                        <div className="group">
                            <input type="submit" className="btn btn_default btn_block" value="LOGIN"/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
