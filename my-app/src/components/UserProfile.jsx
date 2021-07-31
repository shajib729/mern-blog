import React, { useEffect, useState } from 'react'
import profile from '../image/default_profile.png'
import { useSelector } from 'react-redux'
import { FaFacebook, FaGithub } from 'react-icons/fa';
import {Link} from 'react-router-dom'

const UserProfile = () => {
    
    const {user} = useSelector(state => state.AuthReducer)

    const [data,setData]=useState({ name:'' ,userName:'', email:'', facebook:'', github:'',image:'' })

    const [state, setState] = useState({image:""})
    const [imagePreview, setImagePreview] = useState();

    // const handleFileChange = (e) => {
    //     if (e.target.files.length !== 0) {
         
    //         setState({[e.target.name]:e.target.files[0]});
            
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImagePreview(reader.result);
    //         }
    //         reader.readAsDataURL(e.target.files[0])   
    //     }
    // }

    const fetchData = async () => {
        const res = await fetch(`/getUser/${user._id}`, {
            method:"GET"
        })
        const data = await res.json()
        console.log(res);
        console.log(data.message[0]);
        if (res.status === 200) {
            const {name,userName,email,facebook,github,image}=data.message[0]
            setData({ name ,userName, email, facebook, github,image })
        }
    }

    useEffect(() => {
        fetchData()
    },[])
    
    return (
        <>
            <div className="edit_profile">
                <Link to="/user-edit">Edit Profile</Link>
            </div>
            <label htmlFor="profile_img" className="profile_image">
                <img src={data.image?`${data.image}`:profile} alt="profile" />
            </label>
            <div className="userName">
                <p>Username : </p><p>{data.userName}</p>
            </div>
            <div className="name">
                <p>Name : </p><p>{data.name}</p>
            </div>
            <div className="email">
                <p>Email : </p><p>{data.email}</p>
            </div>
            <div className="user_social">
               { data.facebook? <a href={`http://${data.facebook}`} target='_blank'><FaFacebook className="facebook active"/></a> :<FaFacebook className="facebook inActive"/>}
               { data.github? <a href={`http://${data.github}`} target='_blank'><FaGithub className="github active"/></a>:<FaGithub className="github inActive"/>}
            </div>
            
        </>
    )
}

export default UserProfile
