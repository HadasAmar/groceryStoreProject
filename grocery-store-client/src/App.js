import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';  // ייבוא של React Query

import Navbar from './components/Navbar';
import Routing from './routes/Routing';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// יצירת ה-query client
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>  {/* עטיפת האפליקציה ב-QueryClientProvider */}
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
