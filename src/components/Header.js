import React from 'react'
import { motion } from 'framer-motion'

function Header() {
  return (
    <motion.header
        initial={{ y: 50, opacity: 0}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }} 
        style={{
            marginTop:'0px', 
            marginBottom: '10px',
            backgroundColor: '#282c34',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex', // Use flexbox for centering
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            height: '100px' // Set a height for the header
        }}>
    
        <h1>Paragliding Weather Checker</h1>

    </motion.header>
  )
}

export default Header