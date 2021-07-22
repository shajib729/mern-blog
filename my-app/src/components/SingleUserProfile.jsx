import React from 'react'
import profile from '../image/default_profile.png'
import { FaFacebook, FaGithub } from 'react-icons/fa';

const SingleUserProfile = ({user}) => {
    return user?(
        <>
            <label htmlFor="profile_img" className="profile_image">
                <img src={user.image?`../public/${user.image}`:profile} alt="profile" />
            </label>
            <div className="userName">
                <p>Username : </p><p>{user.userName}</p>
            </div>
            <div className="name">
                <p>Name : </p><p>{user.name}</p>
            </div>
            <div className="email">
                <p>Email : </p><p>{user.email}</p>
            </div>
            <div className="user_social">
               { user.facebook? <a href={`http://${user.facebook}`} target='_blank'><FaFacebook className="facebook active"/></a> :<FaFacebook className="facebook inActive"/>}
               { user.github? <a href={`http://${user.github}`} target='_blank'><FaGithub className="github active"/></a>:<FaGithub className="github inActive"/>}
            </div>
            
        </>
    )
        :
    <div className="skeleton_section">
        <label className="profile_image skeleton"></label>
        <div className="userName skeleton"></div>
        <div className="name skeleton"></div>
        <div className="email skeleton"></div>
    </div>
}

export default SingleUserProfile
