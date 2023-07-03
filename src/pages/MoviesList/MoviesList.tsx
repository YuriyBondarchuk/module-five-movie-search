import { useEffect, useRef, useState } from "react";
import CardList from "../../components/CardList/CardList";
import Container from "../../components/Container/Container";
import Filters from "../../components/Filters/Filters";
import "./MoviesList.scss";
import { getLocalStorage, getMoviesTrending } from "../../shared/services";
import { TrendingType } from "../../shared/enums";
import {
    MovieResponse,
    ShortMovie,
    SuccessHttpResponse,
} from "../../shared/interfaces";
import { FilterData } from "../../shared/interfaces/FilterInterface";

function MoviesList(): JSX.Element {
    const [movies, setMovies] = useState<ShortMovie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(500);
    const [totalResult, setTotalResult] = useState<number>(0);
    const prevPagination = useRef<number>(0);
    const [filters, setFilter] = useState<FilterData>({
        sort_by: "",
        with_genres: "",
        with_original_language: "",
    });

    useEffect(() => {
        if (
            !movies.length ||
            currentPage !== prevPagination.current ||
            filters
        ) {
            // const filtersSave = getLocalStorage('filters');
            // console.log(filtersSave);
            // const filterData = filtersSave ? filtersSave: filters;
            getMoviesTrending(TrendingType.all, {
                ...filters,
                page: currentPage,
            })
                .then(
                    (
                        response: SuccessHttpResponse<
                            MovieResponse<ShortMovie[]>
                        >
                    ) => {
                        setMovies(response.data.results);
                        setCurrentPage(response.data.page);
                        setTotalResult(response.data.total_results);

                        response.data.total_pages < 500 &&
                            setTotalPage(response.data.total_pages);
                        prevPagination.current = response.data.page;
                    }
                )
                .catch((error) => console.log(error));
        }
    }, [currentPage, filters, movies.length]);

    const loadMore = () => {
        setCurrentPage(currentPage + 1);
    };

    const nextPage = (): void => {
        currentPage < totalPage && setCurrentPage(currentPage + 1);
    };

    const prevPage = (): void => {
        currentPage - 1 > 0 && setCurrentPage(currentPage - 1);
    };

    const concretePage = (e: number): void => {
        setCurrentPage(e);
    };

    return (
        <Container classAdd="movie-list">
            <Filters emitFilter={setFilter} />
            <CardList
                totalPage={totalPage}
                currentPage={currentPage}
                totalResult={totalResult}
                list={movies}
                emitLoadMore={() => loadMore()}
                emitNextPage={() => nextPage()}
                emitPrevPage={() => prevPage()}
                emitConcrete={(e) => concretePage(e)}
            />
        </Container>
    );
}

export default MoviesList;
