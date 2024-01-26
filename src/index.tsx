import React from 'react';
import './styles/index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createRoot} from "react-dom/client";
import {HomePage} from "./components/HomePage";

const router = createBrowserRouter([
    {
        path: '',
        element: <HomePage />
    },
]);

// @ts-ignore
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);

