import React, { useEffect, useState } from 'react'
import profile from '../image/default_profile.png'
import { useHistory } from 'react-router';
import { useSelector,useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import toast, { Toaster } from 'react-hot-toast';

const UserEdit = () => {
    const history = useHistory()
    const dispatch=useDispatch()
    const { user } = useSelector(state => state.AuthReducer)
    // console.log(user);

    const [state, setState] = useState({ name: "", userName: "", email: "", facebook: "", github: "",image:""});
    
    const [image, setImage] = useState({image:""})
    const [imagePreview, setImagePreview] = useState();

    const handleFileChange = (e) => {
        if (e.target.files.length !== 0) {
         
            setState({...state,[e.target.name]:e.target.files[0]})
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0])   
        }
    }

    const handleChange = (e) => {
        setState({...state,[e.target.name]:e.target.value})
    }

    const fetchData = async () => {
        const res = await fetch(`/getUser/${user._id}`, {
            method:"GET"
        })
        const data = await res.json()
        console.log(res);
        console.log(data.message[0]);
        if (res.status === 200) {
            const {name,userName,email,facebook,github,image}=data.message[0]
            setState({ name ,userName, email, facebook, github,image})
        }
    }

    const changeDir = () => {
        history.push('/dashboard')
    }

    const handleSubmit =async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("image", state.image)
        formData.append("name", state.name)
        formData.append("userName", state.userName)
        formData.append("email", state.email)
        formData.append("facebook", state.facebook)
        formData.append("github", state.github)

        const res = await fetch(`/editUser/${user._id}`, {
            method: 'PATCH',
            heades: {
                'Content-Type':"application/json"
            },
            body:formData
        })
        const data = await res.json()
        console.log(res);
        console.log(data);
        if (res.status === 400) {
            toast.error(data.error, {
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
            // dispatch({type:"UPDATE_USER",payload:data.token})
            setTimeout(() => {
                changeDir()
            },2000)

        }
    }

    useEffect(() => {
        fetchData()
    },[])


    return (
        <section className="container mt-100 edit_user_section">
            <Helmet>
                <title>Edit Post</title>
            </Helmet>
            <Toaster
            position="top-center"
            reverseOrder={false}
            style={{zIndex:"9999"}}
            />
            <form onSubmit={handleSubmit}>
                <h1>Edit Your Info</h1>
                <label htmlFor="profile_img" className="profile_image">
                    <img src={imagePreview?imagePreview:(state.image?`../images/${state.image}`:profile)} alt="profile" />
                    <input type="file" id="profile_img" name="image" onChange={handleFileChange} style={{ display: "none" }} />
                </label>
                <div className="group">
                    <input type="text" name= "name" className="group_control" value={state.name} onChange={handleChange} placeholder="Enter the new Name" />
                </div>
                <div className="group">
                    <input type="text" name= "userName" className="group_control" value={state.userName} onChange={handleChange} placeholder="Enter the new User Name" />
                </div>
                <div className="group">
                    <input type="email" name="email" className="group_control" value={state.email} onChange={handleChange} placeholder="Enter the new Email" />
                </div>
                <label className="social-input">Social Links</label>
                <div className="group">
                    <input type="text" name="facebook" className="group_control" value={state.facebook} onChange={handleChange} placeholder="Enter your Facebook Link" />
                </div>
                <div className="group">
                    <input type="text" name="github" className="group_control" value={state.github} onChange={handleChange} placeholder="Enter your Github Link" />
                </div>
                <div className="group">
                    <input type="submit" className="btn btn_default btn_block" value="Update" />
                </div>  
            </form>
        </section>
    )
}

export default UserEdit
