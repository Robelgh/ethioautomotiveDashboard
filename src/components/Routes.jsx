import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Post from '../pages/post'
import Comments from '../pages/comments'
import Adds from '../pages/addAdds'

const Router = () => {
  return (
    <>
    
       <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/post" element={<Post />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/settings" element={<Customers />} />
          <Route path="/adds" element={<Adds />} />
      </Routes>
      
          
    </>
         
  
  )
}

export default Router
