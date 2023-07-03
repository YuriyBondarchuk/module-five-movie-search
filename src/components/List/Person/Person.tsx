import { ImageSize } from "../../../shared/enums";
import { Crew, IActor } from "../../../shared/interfaces";
import { getImg } from "../../../shared/services";
import LazyImage from "../../LazyImage/LazyImage";
import "./Person.scss";
const personImg = require("./../../../images/user.png") as string;

type PersonType = IActor | Crew;

interface ActorProps {
    person: PersonType
}

function Person(props: ActorProps) {
    const { person } = props;

    const character = (): JSX.Element | false => {
        return person.type === 'Actor' && <p className="person-character">{person?.character}</p>
    }

    const departament = (): JSX.Element | false => {
        return person.type === 'Crew' && <p className="person-departament">{person?.department}</p>
    }

    return (
        <div className="person">
            <div className="person-icon">
                {<LazyImage path={getImg(person.profile_path && person.profile_path, ImageSize.original)} replace={personImg}/>}
            </div>

            <div className="person-info">
                <h3 className="aperson-name">{person.original_name}</h3>
                {character()}
                {departament()}
            </div>
        </div>
    );
}

export default Person;
