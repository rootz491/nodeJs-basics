import React from 'react'
import { Link } from 'react-router-dom';
import './style/nav.css';

export default function Nav() {
    return (
        <div className='nav'>
            <Link className='navBtn' to='/'>home</Link>
            <Link className='navBtn' to='/notes'>notes</Link>
            <Link className='navBtn' to='/post'>post</Link>
            <Link className='navBtn' to='/about'>about</Link>
        </div>
    )
}
