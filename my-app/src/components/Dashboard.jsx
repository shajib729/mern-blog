import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import {Link,useParams} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector,useDispatch } from 'react-redux'
import { BsPencil, BsTrash } from "react-icons/bs";
import Pagination from './Pagination';
import UserProfile from './UserProfile'
import toast, { Toaster } from 'react-hot-toast';
import Skeleton from '../Skeleton/Skeleton'
import moment from 'moment'

const Dashboard = () => {
    const { token, user:{_id}}=useSelector(state=>state.AuthReducer)
    const dispatch=useDispatch()
    const [posts, setPosts] = useState()
    const [data, setData] = useState()
    const history=useHistory()

    const fetchData =async () => {
        const res = await fetch(`/posts/${_id}`, {
            method: "get"
        })
        const data = await res.json()
        // console.log(res);
        // console.log(data);
        if (res.status === 200) {
            setPosts(data.message.reverse())
            setData(data)
            dispatch({type:"GET_POST",payload:data.message})
        }
    }

    let { page } = useParams()
    
    if (page === undefined) {
       page=1
    }


    // delete post  
    const deletePost = async (id) => {
        const res = await fetch(`/delete/${id}`, { method: "DELETE" })
        const data = await res.json()
        console.log(res);
        console.log(data);
        if (res.status === 200) {
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
            setTimeout(()=>history.push("/dashboard/1"),2000)
        } else if (res.status === 400) {
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
        }
    }

    
    useEffect(() => {
        fetchData()

    }, [page])


    return (
        <section className="dashboard_section container mt-100">
            <Helmet>
                <title>User Dashboard</title>
            </Helmet>
            <Toaster
            position="top-center"
            reverseOrder={false}
            />
            <div className='row'>
                <div className="col-4 p-15 profile_sticky">
                    <div className='profile'>
                        <UserProfile/>
                    </div>
                </div>
                <div className="col-8 row">
                {
                    posts?posts.slice((data?(Number(page)-1)*data.perPage:0),(data?data.perPage*Number(page):2)).map((post) =>post?(
                        post.image? (
                            <div className="dashboard_post" key={post._id}>
                            <div className="post_title">
                                <Link className="title" to={`/post/${post._id}`}><h1>{post.title}</h1></Link>
                                <div className="icon">
                                    <Link to={`/edit/${post._id}`} className="edit_icon"><BsPencil/></Link>
                                    <BsTrash onClick={()=>deletePost(post._id)} className="delete_icon"/>
                                </div>
                            </div>
                            <div className="time">
                                {moment(post.updatedAt).fromNow()}
                            </div>
                            <div className="post_thumb">
                                <img src={`../images/${post.image}`} alt="Can't get post image." />
                            </div>
                            {/* <div className="post_body" dangerouslySetInnerHTML={{__html: post.body}} /> */}
                        </div>
                        ):<h1 className="loading">No post is created yet...😪</h1>
                    ):[1,2].map(v=><Skeleton/>))
                        :
                            [1, 2].map(v => <Skeleton col='col-6'/>)
                    
                }
                {
                    posts?(posts.length === 0 ? (<h1 className="loading">No post is created yet...😪</h1>) : null):null
                }
            </div>
            {data ? <Pagination page={page} data={data ? data : 0} /> : ''}
            </div>
            
        </section>
    )
}

export default Dashboard
