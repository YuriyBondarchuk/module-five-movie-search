import { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import FilterItem from "./FilterItem/FilterItem";
import "./Filters.scss";
import { getLocalStorage, setLocalStorage } from "../../shared/services";
import Button from "../Button/Button";
import { FilterData } from "../../shared/interfaces/FilterInterface";

interface FiltersProps {
    emitFilter: (filters: FilterData) => void;
}

function Filters(props: FiltersProps) {
    const { emitFilter } = props;
    const [saveFilters, setSaveFilters] = useState<FilterData>();
    const savePrevRef = useRef<any>();
    const [filterData, setFilterData] = useState<FilterData>({
        sort_by: "",
        with_genres: "",
        with_original_language: "",
    });

    const { sortBy, genres, languages } = getLocalStorage("config");
    
    useEffect(() => {
        const filterSave: FilterData = getLocalStorage('filters');

        if(filterSave !== savePrevRef.current) {
            console.log(filterSave);
            setSaveFilters(filterSave);
            emitFilter(filterSave);
            savePrevRef.current = filterSave;
        }
    }, [emitFilter, filterData])


    const sort_by_value = (e: string | undefined) => {
        if(e) {
            let sort = sortBy.filter((obj: any) => obj.type === e);

            return sort[0].name;
        }

        return null;
    };

    const sort_by = (e: string) => {
        let sort = sortBy.filter((obj: any) => obj.name === e);

        return sort[0].type;
    };

    const genre_by_value = (e: string | undefined) => {
        if(e) {
            let genresFilter = genres.genres.filter((genre: any) => genre.id === e);

            return genresFilter[0].name;
        }

        return null;
    };

    const genre_by = (e: string) => {
        let genresFilter = genres.genres.filter((genre: any) => genre.name === e);

        return genresFilter[0].id;
    };

    const lang_by_value = (e: string | undefined) => {
        if(e) {
            let languagueFilter = languages.filter((lang: any) => lang.iso_639_1 === e);

            return languagueFilter[0].english_name;
        } 
        return null;
    };

    const lang_by = (e: string) => {
        let languagueFilter = languages.filter((lang: any) => lang.english_name === e);

        return languagueFilter[0].iso_639_1;
    };

    const filterButton = () => {
        setLocalStorage('filters', filterData);
        emitFilter(filterData)
    }

    const resetButton = () => {
        const reset = {
            sort_by: "",
            with_genres: "",
            with_original_language: "",
        };
        setFilterData(reset);
        setLocalStorage('filters', reset);
        emitFilter(reset);
    }

    return (
        <div className="filter">
            <h2 className="m-title">Фільтри</h2>
            <div className="filter-element filter-sort">
                <FilterItem title="Сортувати">
                    <p>Сортувати по ...</p>
                    <Dropdown
                        selectedDefault={sort_by_value(saveFilters?.sort_by)}
                        list={sortBy.map((obj: any) => obj.name)}
                        emitSelected={(e) =>
                            setFilterData({
                                ...filterData,
                                sort_by: sort_by(e),
                            })
                        }
                    />
                </FilterItem>
            </div>
            <div className="filter-element filter-genres">
                <FilterItem title="Жанри">
                    <Dropdown
                        selectedDefault={genre_by_value(saveFilters?.with_genres)}
                        list={genres.genres.map((genre: any) => genre.name)}
                        emitSelected={(e) =>
                            setFilterData({ ...filterData, with_genres: genre_by(e) })
                        }
                    />
                </FilterItem>
            </div>
            <div className="filter-element filter-language">
                <FilterItem title="Мови">
                    <Dropdown
                        selectedDefault={lang_by_value(saveFilters?.with_original_language)}
                        list={languages.map((lang: any) => lang.english_name)}
                        emitSelected={(e) =>
                            setFilterData({ ...filterData, with_original_language: lang_by(e) })
                        }
                    />
                </FilterItem>
            </div>
            <Button
                text="Фільтрувати"
                classAdd="button-main"
                emmitClick={() => filterButton()}
            />
            <Button
                text="Скинути фільтр"
                classAdd="button-secondary"
                emmitClick={() => resetButton()}
            />
        </div>
    );
}

export default Filters;
