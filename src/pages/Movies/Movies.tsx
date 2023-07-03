import { Suspense } from "react";
import "./Movies.scss";
import { Outlet } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function Movies() {
    return (
        <Suspense fallback={<Loader />}>
            <Outlet />
        </Suspense>
    );
}

export default Movies;
