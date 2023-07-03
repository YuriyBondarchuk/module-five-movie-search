import Person from "./Person/Person";
import "./List.scss";

interface ListProps {
    list: any;
    title: string;
}

function List(props: ListProps) {
    const { list, title } = props;

    const setList = (): JSX.Element => {
        if(list) {
            return list.map((person: any, index: number) => (
                <div key={index} className="list-item">{
                    <Person person={person} />
                }</div>
            ));
        } else {
            return <div>somethisns</div>
        }
    };

    return (
        <div className="list">
            <h3 className="list-title">{ title } <span>{ list && list.length }</span></h3>
            <div className="list-content"> { setList() } </div>
        </div>
    );
}

export default List;
