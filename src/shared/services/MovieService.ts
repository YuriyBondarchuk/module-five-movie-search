import { ImageSize, LogoSize, PosterSize } from "../enums";

export const getImg = (
    url: string | undefined,
    type?: ImageSize | PosterSize | LogoSize
): string | undefined => {
    if (!url) {
        return;
    }
    return "https://image.tmdb.org/t/p/" + (type ?? ImageSize.w300) + url;
};

export const formatTime = (minutes: number) => {
    const hours: number = Math.floor(minutes / 60);
    const minute: number = minutes - (hours * 60);

    return (hours + 'ч ' + minute + 'м');
};
