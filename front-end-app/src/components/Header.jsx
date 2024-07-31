import React from 'react'
import './Header.css'

const Header = (props) => {
    const {
        title
    } = props
  return (
    <div className='header'>
        <div className='page-title'>
            {title}
        </div>
    </div>
  )
}

export default Header