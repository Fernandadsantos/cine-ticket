import React from 'react'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/homepage';
import Session from './pages/session';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/session",
    element: <Session />,
  },
]);


function App() {
  
  return(
    <RouterProvider router={router} />
  )
}
 
export default App;
