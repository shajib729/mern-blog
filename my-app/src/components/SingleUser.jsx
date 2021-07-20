import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import SingleUserProfile from './SingleUserProfile'
import Skeleton from '../Skeleton/Skeleton'

const SingleUser = () => {

    const { userName } = useParams()

    const [user,setUser]=useState()
    const [posts,setPosts]=useState()
    
    const getUser = async () => {
        const res = await axios.get(`/user/${userName}`)
        setUser(res.data.user);
        setPosts(res.data.post);
    }

    useEffect(() => {
        getUser()
    },[])

    return (
        <section className="mt-100 container single_user_section">
            {/* <section className="dashboard_section container mt-100"> */}
            <Helmet>
                <title>User</title>
            </Helmet>
            <div className='row'>
                <div className="col-4 p-15 profile_sticky">
                    <div className='profile'>
                        <SingleUserProfile user={user}/>
                    </div>
                </div>
                <div className="col-8 row">
                    {/* {
                        posts?<div className="dashboard_post" >
                            <div className="post_title">
                                <Link className="title" to={`/`}><h1>title</h1></Link>
                            </div>
                            <div className="post_thumb">
                                <img src={`../images/post1.jpeg`} alt="Can't get post image." />
                            </div>
                        </div> :
                            <h1>Loading...</h1>
                    } */}
                    {
                        posts?posts.map((post) =>post?(
                            post.image? (
                                <div className="dashboard_post" key={post._id}>
                                <div className="post_title">
                                    <Link className="title" to={`/post/${post._id}`}><h1>{post.title}</h1></Link>
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
                </div>
                    
            </div>
        </section>
    )
}

export default SingleUser
