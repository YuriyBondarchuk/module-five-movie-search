
import { Outlet } from "react-router-dom";
import "./Auth.scss";
import { Suspense } from "react";
import Loader from "../../components/Loader/Loader";

function Auth() {
    return <div>
        <Suspense fallback={<Loader />}>
            <Outlet />
        </Suspense>
    </div>;
}

export default Auth;
