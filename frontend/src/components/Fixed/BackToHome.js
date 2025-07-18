import React from 'react'
import { Link } from 'react-router-dom'
import banner1 from '../../assets/images/banner1.jpg'

const BackToHome = () => {
  return (
    <nav className="p-4 flex justify-between items-center" style={{
                backgroundImage: `url(${banner1})`,
                backgroundSize : 'contain'
              }}>
        <Link to="/">
          <button className="btn btn-ghost text-lg">❮ Home</button>
        </Link>
        
      </nav>
  )
}

export default BackToHome
