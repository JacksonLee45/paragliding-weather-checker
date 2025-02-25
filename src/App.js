import './App.css';
import React, { useState} from 'react';
import { motion } from 'framer-motion'
import Footer from './components/Footer';
import Header from './components/Header';
import Body from './components/Body';

function App() {
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="app">

        <Header />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="content">

          <Body />
          
        </motion.div>   

        <Footer />

    </motion.div>
  );
}

export default App;
