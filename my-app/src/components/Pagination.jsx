import React from 'react'
import { Link } from 'react-router-dom'
import {GrNext,GrPrevious} from 'react-icons/gr'

const Pagination = ({ page, data: { perPage, skip,count } }) => {

    let totalPages = Math.ceil(count / perPage);
    let startLoop = page
    let diff = totalPages - page
    if (diff <= 3) {
        startLoop = totalPages - 3;
    }
    let endLoop = startLoop + 3;
    if (startLoop <= 0) {
        startLoop = 1
    }
    const links = () => {
        const store = [];
        for (let i = startLoop; i <= endLoop; i++) {
            if (i == 1) {
                store.push(<li key={i}><Link className={page==i?'active_page':""} to={`/dashboard`}> {i}</Link></li>)
            } else {
                store.push(<li key={i}><Link className={page==i?'active_page':""} to={`/dashboard/${i}`}> {i}</Link></li>)
            }
        }
        return store
    };
    const next = () => {
        if (page < totalPages) {
            return (<li><Link to={`/dashboard/${Number(page)+1}`}><GrNext/></Link></li>)
        }
    }
    const prev = () => {
        if (page > 1) {
            return (<li><Link to={`/dashboard/${Number(page)-1}`}><GrPrevious/></Link></li>)
        }
    }
    console.log(totalPages);

    return totalPages>1?(
        <section className="pagination">
            <ul>{prev()}{links()}{next()}</ul>
        </section>
    ):''
}

export default Pagination
