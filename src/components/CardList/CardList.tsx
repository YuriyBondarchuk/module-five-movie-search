import { ShortMovie } from "../../shared/interfaces";
import Card from "./Card/Card";
import Pagination from "../Pagination/Pagination";
import "./CardList.scss";

interface CardListProps {
    list: ShortMovie[] | undefined;
    totalPage: number;
    currentPage: number;
    totalResult: number;
    emitLoadMore: () => void;
    emitNextPage: () => void;
    emitPrevPage: () => void;
    emitConcrete: (e: number) => void;
}

function CardList(props: CardListProps) {
    const {
        list,
        totalPage,
        currentPage,
        totalResult,
        emitLoadMore,
        emitNextPage,
        emitPrevPage,
        emitConcrete,
    } = props;
    return (
        <>
            <div>
                <div className="m-title">Всього занайденно: <span>{totalResult}</span></div>
                <div className="card-list">
                    {list &&
                        list.length &&
                        list.map((movie: ShortMovie, index: number) => (
                            <Card key={index} movie={movie} />
                        ))}
                    {list?.length && (
                        <Pagination
                            totalPage={totalPage}
                            currentPage={currentPage}
                            emitNextPage={() => emitNextPage()}
                            emitPrevPage={() => emitPrevPage()}
                            emitConcrete={(e) => emitConcrete(e)}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default CardList;
