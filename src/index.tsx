import React from 'react';
import './styles/basic.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createRoot} from "react-dom/client";
// import {HomePage} from "./components/HomePage";
// import {PlanetsCanvas} from "./components/Planets";
import {BasicPage} from "./components/BasicPage";

const router = createBrowserRouter([
    {
        path: '',
        element: (
            <div>
                {/*<HomePage />*/}
                {/*<PlanetsCanvas />*/}
                <BasicPage/>
            </div>
        )
    },
]);

// @ts-ignore
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);

