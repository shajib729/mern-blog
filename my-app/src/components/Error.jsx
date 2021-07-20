import React from 'react'
import { Helmet } from 'react-helmet'

const Error = () => {
    return (
        <div>
            <Helmet>
                <title>404 | Page not found</title>
            </Helmet>
            <h1 style={{marginTop:"10rem",fontSize:"4rem",textAlign:"center"}}>404...Oops!!! Page is not found</h1>
        </div>
    )
}

export default Error
