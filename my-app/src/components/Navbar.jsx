import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

export const Navbar = () => {

    const dispatch = useDispatch()

    const [toggle,setToggle]=useState(false)

    const { user } = useSelector(state => state.AuthReducer)

    // document.querySelector('.navbar_right a').addEventListener('click',()=>setToggle(false))
    
    const Links=user? <div className={toggle?"active navbar_right":"navbar_right"}>
                        <Link onClick={()=>setToggle(false)} to="/">Home</Link>
                        <Link onClick={()=>setToggle(false)} to="/users">Users</Link>
                        <Link onClick={()=>setToggle(false)} to="/create">Create Post</Link>
                        <Link onClick={()=>setToggle(false)} to="/dashboard">{user.userName}</Link>
                        <Link onClick={()=>{
                            setToggle(false)
                            dispatch({type:"CLEAR_TOKEN"})
                        }} to="/">Logout</Link>
                    </div> :
                    <div className={toggle?"active navbar_right":"navbar_right"}>
                        <Link onClick={()=>setToggle(false)} to="/">Home</Link>
                        <Link onClick={()=>setToggle(false)} to="/users">Users</Link>
                        <Link onClick={()=>setToggle(false)} to="/login">Login</Link>
                        <Link onClick={()=>setToggle(false)} to="/register">Register</Link>
                    </div>

    return (
        <section className="navbar_section">
            <nav className="navbar">
                <div className="container">
                    <div className="navbar_row">
                        {/* logo  */}
                        <div className="navbar_left">
                        <Link to="/" exact>
                            LOGO
                        </Link>
                        </div>
                        {/* link  */}
                            {Links}
                        
                        {/* mobile toggle bar  */}
                        <div className={toggle?"active toggle":"toggle"} onClick={()=>setToggle(!toggle)}></div>
                    </div>
                </div>
            </nav>
        </section>
    )
}
