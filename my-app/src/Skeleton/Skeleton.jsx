import React from 'react'

const Skeleton = ({ col }) => {
    if (col === col-6) {
        return col
    }
    return (
        <section className={`skeleton ${col}`}>
            <div className="card">
                <div className="post_img"></div>
                <div className="post_title"></div>
                <div className="post_description"></div>
                <div className="speaner"></div>
            </div>
        </section>
    )
}

export default Skeleton
