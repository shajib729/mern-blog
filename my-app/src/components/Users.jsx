import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaFacebook, FaGithub } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import profile from '../image/default_profile.png'
import { Helmet } from 'react-helmet'

const Users = () => {

    const [allUsers,setAllUsers]=useState()

    const users = async () => {
        const res = await axios.get('/userss')
        setAllUsers(res.data.message);
    }

    useEffect(() => {
        users()
    },[])

    return allUsers?(
        <section className="mt-100 container users_section">
            <Helmet>
                <title>Users</title>
            </Helmet>
            <div className="row">
                {
                allUsers.map(user => (
                    <div className="col-4">
                        <div className="user">
                            <div className="profile">
                                <img src={user.image?`../images/${user.image}`:profile} alt="" />
                            </div>
                            <div className="userName">
                                <p>Username : </p>
                                <p>{user.userName}</p>
                            </div>
                            <div className="name">
                                <p>Name : </p>
                                <p>{user.name}</p>
                            </div>
                            <div className="email">
                                <p>Email : </p>
                                <p>{user.email}</p>
                            </div>
                            
                            <div className="user_social">
                            { user.facebook? <a href={`http://${user.facebook}`} target='_blank'><FaFacebook className="facebook active"/></a> :<FaFacebook className="facebook inActive"/>}
                            { user.github? <a href={`http://${user.github}`} target='_blank'><FaGithub className="github active"/></a>:<FaGithub className="github inActive"/>}
                            </div>

                            <Link className="seeMore" to={`/user/${user.userName}`}>See Post</Link>
                        </div>
                    </div>
                ))
                }
            </div>
        </section>
    ): <h1 className="loading mt-100">Loading...</h1>
}

export default Users
