import React from 'react';
import './styles/index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createRoot} from "react-dom/client";
import {HomePage} from "./components/HomePage";
import {PlanetsCanvas} from "./components/Planets";

const router = createBrowserRouter([
    {
        path: '',
        element: (
            <div>
                <HomePage />
                <PlanetsCanvas />
            </div>
        )
    },
]);

// @ts-ignore
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);

