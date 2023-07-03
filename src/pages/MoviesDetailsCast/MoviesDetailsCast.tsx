import { useLocation } from "react-router-dom";
import "./MoviesDetailsCast.scss";
import { useEffect, useState } from "react";
import { getMovieCredits } from "../../shared/services";
import { SuccessHttpResponse, TeamData } from "../../shared/interfaces";
import List from "../../components/List/List";
import Container from "../../components/Container/Container";

function MoviesDetailsCast() {
    const [credits, setCredits] = useState<TeamData>();

    const location = useLocation();
    const movieId: number = location.state.data.id;

    useEffect(() => {
        if(!credits) {
            getMovieCredits(movieId).then((data: SuccessHttpResponse<TeamData>) => {
                setCredits(data.data)
            });
        }
    });

    return <Container> 
        <div className="movie-cast">
            <div className="movie-cast-panel">
                <List list={credits?.crew} title="Команда"/>
            </div>
            <div className="movie-cast-panel">
                <List list={credits?.cast} title="Актори"/>
            </div>
        </div>
    </Container>
}

export default MoviesDetailsCast;
