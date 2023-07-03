import { useCallback, useEffect, useState } from "react";
const empty = require('./../../images/no-found.jpg')

function LazyImage({
    path,
    placeholder,
    replace,
    loadError,
    ...props
}: {
    path: string | undefined;
    placeholder?: string;
    replace?: string;
    loadError?: any;
}) {
    const [img, initImg] = useState<string | undefined>(path ?? (replace ?? empty));
    const onLoad = useCallback(() => {
        path ? initImg(path) : initImg((replace ?? empty));
    }, [path, replace]);

    const onError = useCallback(() => {
        initImg(loadError || placeholder);
    }, [loadError, placeholder]);

    useEffect(() => {
        const imageObjt = new Image();

        imageObjt.src = path ?? replace ?? empty;
        imageObjt.addEventListener("load", onLoad);
        imageObjt.addEventListener("error", onError);

        return () => {
            imageObjt.removeEventListener("load", onLoad);
            imageObjt.removeEventListener("error", onError);
        };
    }, [path, onLoad, onError, replace]);

    return <img {...props} alt={img} src={img} />;
}

export default LazyImage;
