import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Helmet} from "react-helmet"

const PostPage = () => {

    const [post,setPost]=useState()

    const {id} = useParams()
    console.log(id);

    const getPost = async () => {
        const res = await fetch(`/post/${id}`, {
            method:"GET"
        })
        const data = await res.json()
        console.log(res);
        console.log(data.message);
        if (res.status === 200) {
            setPost(data.message)
        }
    }

    useEffect(() => {
        getPost()
    },[])

    return post ?
        (
            <section className="mt-100 container post_page_section">
                <Helmet>
                    <title>{ post.title?post.title:"Loading..."}</title>
                    <meta
                        name="discription"
                        content="Learn HTML, CSS, JavaScript, React, Vue, Flutter etc"
                    />
                </Helmet>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <h1>{post.title}</h1>
                        <div className="post_thumb">
                            <img src={`/public/${post.image}`} alt="" />
                        </div>
                        <div className="post_body" dangerouslySetInnerHTML={{__html: post.body}} />
                    </div>
                    <div className="col-3"></div>
                </div>
            </section>
        )
        :
        <h1 className="mt-100 loading">Loading...😯</h1>
}

export default PostPage
