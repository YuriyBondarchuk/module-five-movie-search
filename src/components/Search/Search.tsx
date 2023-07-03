import { useEffect, useRef, useState } from "react";
import Container from "../Container/Container";
import Input from "../Input/Input";
import "./Search.scss";
import { getImg, getMovieSearch } from "../../shared/services";
import {
    SearchData,
    SearchElement,
    SuccessHttpResponse,
} from "../../shared/interfaces";
import LazyImage from "../LazyImage/LazyImage";
import { useNavigate } from "react-router-dom";
import { AppRouteMap, PosterSize } from "../../shared/enums";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
const movieImg = require('./../../images/no-found.jpg')

interface SearchProps {
    emitSelect: () => void;
    emitClose: () => void;
}

function Search(props: SearchProps) {
    const { emitSelect } = props;
    const [query, setQuery] = useState<string>("");
    const [searchResult, setSearchResult] = useState<SearchData | null>(null);
    const [paginationtPage, setPaginationtPage] = useState<number>(1);
    const [requestPending, setRequestPending] = useState<boolean>(false);
    const beforePage = useRef<number>(1);
    const beforeQuery = useRef<string>("");
    const searchRef = useRef<any>(null);
    const navigate = useNavigate();
    const DELEY_REQUEST: number = 2000;

    useEffect(() => {
        let getData: string | number | NodeJS.Timeout | undefined;
        setRequestPending(false);

        if (
            (query && query !== beforeQuery.current) ||
            paginationtPage !== beforePage.current
        ) {
            setRequestPending(true);
            getData = setTimeout(() => {
                getMovieSearch(query, { page: paginationtPage }).then(
                    (data: SuccessHttpResponse<SearchData>): void => {
                        setRequestPending(false);
                        setSearchResult(data.data);

                        beforePage.current = data.data.page;
                        beforeQuery.current = query;
                    }
                );
            }, DELEY_REQUEST);
        }
        
        const handleClick = (event: Event) => {
            const element = event.target;
                const target = event.target as HTMLButtonElement;
    
                if (
                    !(target && target.closest(".header-search")) &&
                    searchRef.current &&
                    !searchRef.current.contains(element)
                ) {
                    event.preventDefault();
                    event.stopPropagation();
                    emitSelect();
                }
        }

        window.addEventListener("click", handleClick);

        return () => {
            clearTimeout(getData);
            window.removeEventListener("click", handleClick);
        };
    }, [query, paginationtPage, emitSelect]);

    const submit = (e: any): void => {
        e.preventDefault();
        setQuery(e.target.input.value);
    };

    const toMovie = (idMovie: number): void => {
        emitSelect();
        navigate(AppRouteMap.movies + "/" + idMovie);
    };

    const cleanResult = () => {};

    const search = () => {};

    const prev = (): void => {
        if (paginationtPage - 1 > 0) {
            setPaginationtPage(paginationtPage - 1);
        }
    };

    const next = (): void => {
        if (searchResult?.total_pages) {
            if (paginationtPage + 1 <= searchResult?.total_pages) {
                setPaginationtPage(paginationtPage + 1);
            }
        }
    };

    const concrete = (concrete: number): void => {
        setPaginationtPage(concrete);
    };

    const showInput = (): JSX.Element => {
        return (
            <>
                <div className="search-icon">
                    <i className="bi bi-search"></i>
                </div>
                <form onSubmit={submit}>
                    <Input emitChange={setQuery} />
                </form>
                {query && (
                    <div className="search-close">
                        <i className="bi bi-x"></i>
                    </div>
                )}
            </>
        );
    };

    const showTotal = (): JSX.Element | undefined => {
        if (!query || (!searchResult?.results && !query) || requestPending) {
            return;
        }

        return (
            <div className="search-result-total">
                Всього знaйдено: <span>{searchResult?.total_results}</span>
            </div>
        );
    };

    const showPagination = (): JSX.Element | undefined => {
        if (!query || !searchResult?.results.length || requestPending) {
            return;
        }

        return (
            <Pagination
                totalPage={searchResult?.total_pages}
                currentPage={paginationtPage}
                emitConcrete={concrete}
                emitNextPage={() => next()}
                emitPrevPage={() => prev()}
            />
        );
    };

    const showPage = (): JSX.Element | undefined => {
        if (!query || !searchResult?.results.length || requestPending) {
            return;
        }

        return (
            <div className="search-result-pages">
                Сторінка <span>{paginationtPage}</span> /{" "}
                {searchResult.total_pages}
            </div>
        );
    };

    const showList = (): JSX.Element[] | undefined => {
        if (!query || !searchResult?.results || requestPending) {
            return;
        }

        return searchResult?.results.map(
            (movie: SearchElement, index: number) => (
                <div
                    key={index}
                    onClick={() => toMovie(movie.id)}
                    className="search-result-item"
                >
                    <div className="search-result-left">
                        <div className="search-result-poster">
                            <LazyImage
                                path={getImg(movie.poster_path, PosterSize.w92)}
                                replace={movieImg}
                            />
                        </div>
                        <div className="search-result-title">
                            <h3 className="m-title-small">{movie.title}</h3>
                            <p className="m-desc-small">{movie.release_date}</p>
                        </div>
                    </div>

                    <div className="search-result-right">
                        <div className="search-result-original m-title-small">
                            Oригінальна назва:{" "}
                            <span>{movie.original_title}</span>
                        </div>
                        <div className="search-result-vote m-desc-small">
                            Оцінка: <span>{movie.vote_average}</span> / 10
                        </div>
                    </div>
                </div>
            )
        );
    };

    const showLoader = (): JSX.Element | undefined => {
        if (requestPending) {
            return <Loader type={"secondary"} />;
        }
    };

    const showEmptyMessaage = () => {
        if (!searchResult?.results.length && query && !requestPending) {
            return <div>Нічого немає по запиту "{query}"</div>;
        }
    };

    const showStartMessaage = () => {
        if ((searchResult && query) || requestPending) {
            return;
        }

        return <div>Тут буде результат пошуку</div>;
    };

    return (
        <div className="search" ref={searchRef}>
            <div className="search-top">
                <Container classAdd="search-container">{showInput()}</Container>
            </div>
            <div className="search-result">
                <Container>
                    {showTotal()}
                    {showList()}
                    {showPagination()}
                    {showPage()}
                    {showStartMessaage()}
                    {showEmptyMessaage()}
                    {showLoader()}
                </Container>
            </div>
        </div>
    );
}

export default Search;
