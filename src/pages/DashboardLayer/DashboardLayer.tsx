import { Suspense} from "react";
import "./DashboardLayer.scss";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Layer from "../../components/Layer/Layer";
import Footer from "../../components/Footer/Footer";
import Content from "../../components/Content/Content";
import Loader from "../../components/Loader/Loader";

function DashboardLayer() {
    return (
        <Layer>
            <Header />
            <Content>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </Content>
            <Footer />
        </Layer>
    );
}

export default DashboardLayer;
