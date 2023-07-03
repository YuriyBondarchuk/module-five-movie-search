import { useState } from 'react';
import './FilterItem.scss';

interface FilterItemProps {
    children: any;
    title: string;
}

function FilterItem(props: FilterItemProps) {
    const {children, title} = props;
    const [showList, setShowList] = useState<boolean>(false);

    return ( <div className={showList ? 'filter-item filter-item-active' :  'filter-item'}>
        <div onClick={() => setShowList(!showList)} className='filter-item-top'>
            <h3>{title}</h3>
            <div className={showList ? "filter-item-arrow filter-item-arrow-active" : "filter-item-arrow"}>
                <i className="bi bi-caret-down-fill"></i>
            </div>
        </div>
       {showList &&  <div className='filter-item-content'>
            {children}
        </div>}
    </div> );
}

export default FilterItem;