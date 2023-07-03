import { useEffect, useRef, useState } from "react";
import "./Dropdown.scss";

interface DropdownProps {
    list: string[];
    selectedDefault: string | undefined | null;
    emitSelected: (selected: string) => void;
}

function Dropdown(props: DropdownProps) {
    const { list, selectedDefault, emitSelected } = props;
    const [selected, setSelected] = useState<string>(
        selectedDefault ? selectedDefault : "Оберіть зі варіантів"
    );
    const [showList, setShowList] = useState<boolean>(false);
    const dropdownRef = useRef<any>(null);
    console.log(!selectedDefault);
    useEffect(() => {
        const handleClick = ($event: Event): void => {
            const element = $event.target;
            // console.log($event);
            if (dropdownRef.current && !dropdownRef.current.contains(element)) {
                $event.preventDefault();
                $event.stopPropagation();
                setShowList(false);
            }
        };

        window.addEventListener("click", handleClick);

        return () => window.removeEventListener("click", handleClick);
    }, [showList]);

    const selectedItem = (selecteditem: string): void => {
        setSelected(selecteditem);
        emitSelected(selecteditem);
        setShowList(false);
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div
                onClick={() => setShowList(!showList)}
                className="dropdown-top"
            >
                <div className="dropdown-selected">{selected}</div>
                <div
                    className={
                        showList
                            ? "dropdown-arrow dropdown-arrow-active"
                            : "dropdown-arrow"
                    }
                >
                    <i className="bi bi-caret-down-fill"></i>
                </div>
            </div>
            {showList && (
                <div className="dropdown-list">
                    {list.map((item: string, index: number) => (
                        <div
                            key={index}
                            onClick={() => selectedItem(item)}
                            className="dropdown-item"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
