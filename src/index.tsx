import React from 'react';
import './styles/homePage.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createRoot} from "react-dom/client";
// import {OldHomePage} from "./components/OldHomePage";
// import {PlanetsCanvas} from "./components/Planets";
import {HomePage} from "./components/HomePage";

const router = createBrowserRouter([
    {
        path: '',
        element: (
            <div>
                {/*<OldHomePage />*/}
                {/*<PlanetsCanvas />*/}
                <HomePage/>
            </div>
        )
    },
]);

// @ts-ignore
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);

