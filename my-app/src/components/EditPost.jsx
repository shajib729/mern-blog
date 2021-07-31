import React,{useEffect, useState} from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom'

const EditPost = () => {

    const { user } = useSelector(state => state.AuthReducer)
    // console.log(user);
    const {id} = useParams()
    const [value, setValue] = useState('')
    const [state, setState] = useState({ title: "", image: "", description: "" })
    
    const [currentImage, setCurrentImage] = useState("Choose Image")
    const [imagePreview, setImagePreview] = useState('');

    const [cloudImage,setCloudeImage]=useState()
    const [cloudeImageUrl,setCloudeImageUrl]=useState()

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
        setCloudeImage(e.target.files[0]);
    }
    
    const handleIChange = (e) => {
        setState({...state,[e.target.name]:e.target.value})
    }
    console.log(id);
    const getData = async () => {
        const res = await fetch(`/post/${id}`, {
            method: "get"
        })
        const data = await res.json()
        console.log(res);
        console.log(data);
        if (res.status === 200) {
            const { title, image, slug, body, description } = data.message;
            setState({ title: title, image: image, description: description })
            setValue(body)
        }
    }

    const editPost = async (e) => {
        e.preventDefault()

        const getImgUrl = new FormData()
        getImgUrl.append('file',cloudImage)
        getImgUrl.append('upload_preset',"shajib-cloud")
        getImgUrl.append('cloud_name', "shajib")

        let resImg=await fetch('https://api.cloudinary.com/v1_1/shajib/image/upload', {
            method: "post",
            heades: {
              'Content-Type':"application/json"  
            },
            body:getImgUrl
        })
        const dataImg=await resImg.json()
        // dataImg?setCloudeImageUrl(dataImg):setCloudeImageUrl()

        // console.log(dataImg.url);
        // console.log(cloudeImageUrl)

        const formData = new FormData()
        formData.append("image", state.image)
        formData.append("imageUrl", dataImg.url)
        formData.append('title',state.title)
        formData.append('description',state.description)
        formData.append('body',value)
        // formData.append('slug', slug)
        // formData.append('name', name)
        // formData.append('id', _id)
        
        const res = await fetch(`/edit/${id}`, {
            method: "PATCH",
            heades: {
              'Content-Type':"application/json"  
            },
            body:formData
        })

        // const res = await fetch(`/edit/${id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type':"application/json"
        //     },
        //     body:JSON.stringify({description:state.description,body:value,title:state.title,image:state.image})
        // })
        const data = await res.json()
        console.log(res);
        console.log(data);
        if (res.status === 400) {
            toast.error( data.error.title || data.error.body || data.error.description, {
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
        } else if (res.status === 200) {
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
        }
    }

    useEffect(() => {
        getData()
    },[])

    return(
        <section className="edit_section container mt-100">
            <Helmet>
                <title>Edit Post</title>
            </Helmet>
            <Toaster
            position="top-center"
            reverseOrder={false}
            style={{zIndex:"9999"}}
            />
            <form onSubmit={editPost}>
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                            <h3 className="card_h3">Edit Post</h3>
                            <div className="group">
                                <label htmlFor="title">Post Title</label>
                                <input type="text" name="title" id="title" className="group_control" value={state.title} onChange={handleIChange} placeholder="Enter the new Title" />
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
                                onChange={handleIChange} placeholder="Meta Description..." className="group_control" cols="30" rows="10" maxLength="150"></textarea>
                                <p>{state.description?state.description.length:0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 pl-15">
                        <div className="card">
                            {/* <div className="group">
                                <label htmlFor="slug">Post Url</label>
                                <input type="text" id="slug" name="slug" value={slug} onChange={slugHandle} className="group_control" placeholder="Post URL..." />    
                            </div> */}
                            {/* <div className="group">
                                {slugButton?<button className="btn btn_default" onClick={handleEditSlug}>Update Slug</button>:""}
                            </div> */}
                            <div className="group">
                                <div className="imagePreview">
                                    {imagePreview? <img src={imagePreview} alt="" />:"" }
                                </div>
                            </div>
                            <div className="group">
                                <input type="submit" className="btn btn_default btn_block" value="Update Post" />
                            </div>  
                        </div>
                    </div>
                </div>
            </form>
            
        </section>
    ) 
    // : <h1 style={{ margin: "200px auto", textAlign: "center", fontSize: "4rem", fontWeight: "400" }}>Loading...😌</h1>
}

export default EditPost
