import './App.css';
import React from 'react';
import { ThemeProvider } from '../components/ui/theme-provider';
import Footer from './components/Footer';
import Header from './components/Header';
import Body from './components/Body';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
          <Body />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;