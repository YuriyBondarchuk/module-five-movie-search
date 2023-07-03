import "./Loader.scss";

interface LoaderPorps {
    addClass?: string;
    type?: "main" | "secondary";
}
function Loader(props: LoaderPorps) {
    const { addClass, type } = props;

    return (
        <div className="loader">
            <div
                className={
                    addClass
                        ? "spinner-grow text-primary" +
                          addClass
                        : "spinner-grow text-primary m-custom-color-main"
                }
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Loader;
