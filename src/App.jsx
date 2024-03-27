import React from 'react'
import Products from './pages/Products';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Root from './components/Root';
import Login from './pages/Login';
import Cart from './pages/Cart';

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: '',
                    element: <Products />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/cart',
                    element: <Cart />
                }
            ]
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App