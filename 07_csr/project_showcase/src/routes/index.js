import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import ProjectsContainer from "../components/project/ProjectsContainer";
import Home from "../components/pages/Home";
import ErrorPage from "../components/pages/ErrorPage";
import ProjectForm from "../components/project/ProjectForm";
import ProjectDetails from "../components/project/ProjectDetails";
import ProjectEditForm from "../components/project/ProjectEditForm";

const projectRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/projects",
                element: <ProjectsContainer />,
            },
            {
                path: "/projects/new",
                element: <ProjectForm />,
            },
            {
                path: "/projects/:projectId",
                element: <ProjectDetails />,
            },
            {
                path: "/projects/:projectId/edit",
                element: <ProjectEditForm />,
            },
        ],
    },
]);

export default projectRouter;