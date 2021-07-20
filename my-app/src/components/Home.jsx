import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Helmet} from "react-helmet"
import Skeleton from '../Skeleton/Skeleton'

export const Home = () => {

    const [posts,setPosts]=useState()

    const getPosts = async () => {
        const res = await fetch('/posts', {
            method:"GET"
        })
        const data = await res.json()
        console.log(res);
        console.log(data);

        if (res.status === 200) {
            setPosts(data.message.reverse())
        }
    }

    useEffect(() => {
        getPosts()
    },[])

    return (
        <section className="home_section container mt-100">
            <Helmet>
                <title>Web Articles</title>
                <meta
                    name="discription"
                    content="Learn HTML, CSS, JavaScript, React, Vue, Flutter etc"
                />
            </Helmet>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                {
                    posts ? posts.map(post => (
                        post.image ? (
                            <div className="card">
                            <div className="post-img">
                                <img src={`../images/${post.image}`} alt="Can't get post image." />
                            </div>
                            <div className="post-info">
                                <p className="author">{post.name}</p>
                                <Link className="title" to={`/post/${post._id}`}><h1 className="home_post_title">{post.title}</h1></Link>
                                <p className="home_post_description">{post.description.length!==150?post.description.slice(0,15)+'...':post.description+'...'}</p>
                            </div>
                            </div>
                        ):[1,2,3].map(v=><Skeleton/>)
                    )):[1,2,3].map(v=><Skeleton/>)
                }
                {
                    posts?(posts.length===0?<h1 className="loading">No posts are available right now...😥</h1>:''):null
                }
                </div>
                <div className="col-3"></div>
            </div>
        </section>
    )
}
