import React, { useState} from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
// import { uuid } from 'uuidv4';

const Create = () => {
    const dispatch = useDispatch()
    
    const { user: { _id, name }, user } = useSelector(state => state.AuthReducer)
    
    const [value, setValue] = useState('')

    const [currentImage, setCurrentImage] = useState("Choose Image")
    const [imagePreview, setImagePreview] = useState('');

    const history =useHistory()

    const fileHandle = (e) => {
        if (e.target.files.length !== 0) {
         
            setCurrentImage(e.target.files[0].name);
            setState({...state,[e.target.name]:e.target.files[0]})
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const [state, setState] = useState({
        title: "",description:"",image:""
    })
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
        const createSlug = state.title.trim().split(' ').join('-')
        setSlug(createSlug)
    }

    const [slug, setSlug] = useState(state.title.trim().split(' ').join('-'));
    const [slugButton,setSlugButton]=useState(false)
    const slugHandle = (e) => {
        setSlug(e.target.value)
        setSlugButton(true)
    }
    const handleEditSlug = (e) => {
        e.preventDefault()
        setSlug(slug.trim().split(" ").join('-'))
    }

    const redirectToHome = () => {
        history.push("/dashboard");
    }

    const createPost = async (e) => {
        
        const {title,description,image}=state
        e.preventDefault()

        console.log(image);

        const formData = new FormData()
        formData.append("image", image)
        formData.append('title',title)
        formData.append('description',description)
        formData.append('body',value)
        formData.append('slug', slug)
        formData.append('name', name)
        formData.append('id', _id)
        // formData.append('postId', uuid())
        
        const res = await fetch('/create_post', {
            method: "POST",
            heades: {
              'Content-Type':"application/json"  
            },
            body:formData
        })
        const data = await res.json()
        
        console.log(res);
        console.log(data);

        if (res.status === 400) {
                toast.error( data.error, {
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
                  });
                dispatch({type:"POST_CREATE_ERROR",payload:data})
            } else if (res.status === 200) {
                setTimeout(()=>redirectToHome(),2000)
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
                dispatch({ type: "CREATE_POST", payload: data.post })
            }
    }

    return user?(
        <div>
            <Helmet>
                <title>Create New Post</title>
            </Helmet>
            <Toaster
            position="top-center"
            reverseOrder={false}
            style={{zIndex:"9999"}}
            />
            <div className="container mt-100">
            <form onSubmit={createPost} enctype="multipart/form-data">
                <div className="row">
                    <div className="col-6 pr-15">
                        <div className="card">
                            <h3 className="card_h3">Create a new post</h3>
                            
                            <div className="group">
                                <label htmlFor="title">Post Title</label>
                                <input type="text" name="title"
                                value={state.title} onChange
                                ={handleChange} id="title" className="group_control" placeholder="Post title..."/>
                            </div>
                            <div className="group">
                                <label htmlFor="image" className="image_label">{currentImage}</label>
                                <input type="file" name="image" id="image"
                                onChange={fileHandle}
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="body">Post Body</label>
                                    <ReactQuill theme="snow" value={value} placeholder="Post body..." onChange={setValue}/>
                                
                            </div>
                            <div className="group">
                                <label htmlFor="description">Meta Description</label>
                                <textarea name="description" id="description" defaultValue={state.description}
                                onChange={handleChange} placeholder="Meta Description..." className="group_control" cols="30" rows="10" maxLength="150"></textarea>
                                <p>{state.description?state.description.length:0}</p>
                            </div>                 
                        </div>
                    </div>
                        
                    <div className="col-6 pl-15">
                        <div className="card">
                            <div className="group">
                                <label htmlFor="slug">Post Url</label>
                                <input type="text" id="slug" name="slug" value={slug} onChange={slugHandle} className="group_control" placeholder="Post URL..." />    
                            </div>
                            <div className="group">
                                {slugButton?<button className="btn btn_default" onClick={handleEditSlug}>Update Slug</button>:""}
                            </div>
                            <div className="group">
                                <div className="imagePreview">
                                    {imagePreview? <img src={imagePreview} alt="" />:"" }
                                </div>
                            </div>
                            <div className="group">
                                <input type="submit" className="btn btn_default btn_block" value="Create Post" />
                            </div>  
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    ):(<Redirect to="/login" />)
}

export default Create
