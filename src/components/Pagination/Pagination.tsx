import './Pagination.scss';

interface PaginationProps {
    totalPage: number;
    currentPage: number;
    emitNextPage: () => void;
    emitPrevPage: () => void;
    emitConcrete: (e: number) => void;
}

function Pagination(props: PaginationProps) {
    
    return (
        <nav className="pagination-pages">
            <ul className="pagination">
                <li className="page-item">
                    <div className="page-link" onClick={() => props.emitPrevPage()}>
                        <span aria-hidden="true">&laquo;</span>
                    </div>
                </li>
                {

                    
                    Array(props.totalPage).fill(null).map((pagination, index) => {
                        if(props.currentPage - 1 <= index && index < props.currentPage + 3) {
                            return (
                                <li key={index} onClick={(e: any): void => props.emitConcrete(index + 1)} className={props.currentPage === index + 1 ? "page-item page-active-item fw-semibold" : "page-item"}>
                                    <div className="page-link">{index + 1}</div>
                                </li>
                            )
                        }
                    })
                }
                <li className="page-item">
                    <div className="page-link" onClick={() => props.emitNextPage()}>
                        <span aria-hidden="true">&raquo;</span>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
