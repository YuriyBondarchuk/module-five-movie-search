import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import "./Header.scss";
import { AppRouteMap } from "../../shared/enums";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Search from "../Search/Search";

function Header() {
    const isLoggined: boolean = true;
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener("scroll", handleScrollPosition);

        return () => {
            document.removeEventListener("scroll", handleScrollPosition);
        };
    });

    const toDetails = (): void => {
        navigate(location.state.from, { replace: true });
    };

    const handleScrollPosition = () => {
        setScrollPosition(window.pageYOffset);
    };

    const setActiveLink = ({
        isActive,
        isPending,
    }: {
        isActive: boolean;
        isPending: boolean;
    }) => {
        return isPending ? "pending" : isActive ? "active" : "";
    };

    const setAuthBtn = () => {
        return isLoggined ? (
            <Button text="Logout" emmitClick={() => logOut()} />
        ) : (
            <Button text="Login" emmitClick={() => logIn()} />
        );
    };

    const logOut = () => {
        console.log("logOut");
    };

    const logIn = () => {
        console.log("logIn");
    };

    const setClass = (): string => {
        return scrollPosition > 100 ? "header fixed" : "header";
    };
    // console.log(location.state.movie)

    return (
        <header className={setClass()}>
            {location?.state?.from && (
                <div className="header-back" onClick={() => toDetails()}>
                    <i className="bi bi-arrow-left-square-fill"></i>
                    <div>{location.state.movie}</div>
                </div>
            )}
            <Container classAdd="header-container">
                <div className="header-logo">KM</div>
                <nav className="header-menu">
                    <ul>
                        <li>
                            <NavLink
                                to={AppRouteMap.home}
                                className={setActiveLink}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={AppRouteMap.movies}
                                className={setActiveLink}
                            >
                                Movies
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="header-right">
                    <div className="header-search" onClick={() => setShowSearch(!showSearch)}>
                        <i className="bi bi-search"></i>
                    </div>
                    <div className="header-auth">{setAuthBtn()}</div>
                </div>
            </Container>
            {showSearch && <Search emitClose={console.log} emitSelect={() => setShowSearch(false)} />}
        </header>
    );
}

export default Header;
