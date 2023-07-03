import { PosterSize } from "../../shared/enums";
import { getImg } from "../../shared/services";
import LazyImage from "../LazyImage/LazyImage";
import "./Gallery.scss";

interface GalleryProps {
    list: any;
    title: string;
}

function Gallery(props: GalleryProps) {
    const { list, title } = props;

    return (
        <div>
            <h3 className="m-title">{title}</h3>
            <div className="gallery">
                <div className="gallery-pagination"></div>
                <div className="gallery-content">
                    {list.map((image: any) => (
                        <div style={{'width': '200px'}} className="gallery-item">
                            {<LazyImage path={getImg(image.file_path, PosterSize.w185)}/>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Gallery;
