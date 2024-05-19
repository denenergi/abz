import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import { formAction, positionsLoader } from "../pages/Users";
import ErrorPage from "../pages/ErrorPage";
import Users from "../pages/Users";

export const router = createBrowserRouter([
    {
        path: '/users',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                loader: positionsLoader,
                action: formAction,
                index: true,
                element: <Users />
            }
        ]
    }
])