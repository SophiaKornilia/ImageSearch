import { createBrowserRouter } from "react-router-dom";
import { FavouriteImages } from "./pages/FavouriteImages";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, 
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
                index: true,
            },
            {
                path: "/FavouriteImages",
                element: <FavouriteImages />,
                index: true,
            }
        ]
    }
])