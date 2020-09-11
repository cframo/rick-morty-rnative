interface ICharacter {
    name: string;
    image: string;
    species: string;
    type: string;
    gender: string;
}

interface ICharacterEpisodeLocation {
    id: number;
    name: string;
    image: string;
}

export interface IEpisode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: ICharacterEpisodeLocation[]
}

export interface ILocation {
    id: number;
    name: string;
    air_date: string;
    type: string;
    dimension: string;
    residents: ICharacterEpisodeLocation[];
}

export type GeneralCardLocationProps = {
    location: ILocation;
    setLocation: (location: ILocation) => void;
    setVisible: (visible: boolean) => void;
}

export type GeneralCardProps = {
    character: ICharacter;
    setCharacter: (character: ICharacter) => void;
    setVisible: (visible: boolean) => void;
}

export type GeneralEpisodeProps = {
    episode: IEpisode;
    setVisible: (visible: boolean) => void;
    setEpisode: (episode: IEpisode) => void;

}

export type DetailedCardCharacter = {
    character: ICharacter,
    visible: boolean,
    setIsVisible: (visible: boolean) => void
}

export type DetailedCardEpisode = {
    episode: IEpisode;
    visible: boolean;
    setIsVisible: (visible: boolean) => void;
}

export type DetailedCardLocation = {
    location: ILocation,
    visible: boolean;
    setIsVisible: (visible: boolean) => void;
}

export type SearchBarProps = {
    keySearch: string;
    setKeySearch: (key: string) => void;
    filter: boolean;
    searchCharacterAction?: (key: string, type: boolean, refreshAll: boolean) => void;
    searchEpisodeAction?: (key: string, type: boolean, refreshAll: boolean) => void;
    searchLocationAction?: (key: string, type: boolean, refreshAll: boolean) => void;
    type: string;
    setFirstUpdate: (firstUpdate: boolean) => void;
}

interface btnNames {
    first: string;
    second: string;
}
export type FiltersProps = {
    btnNames: btnNames;
    filter: boolean;
    setFilter: (filter: boolean) => void;
    keySearch: string;
    setKeySearch: (keySearch: string) => void
    searchCharacterAction?: (key: string, type: boolean, refreshAll: boolean) => void;
    searchEpisodeAction?: (key: string, type: boolean, refreshAll: boolean) => void;
    searchLocationAction?: (key: string, type: boolean, refreshAll: boolean) => void;
    setFirstUpdate: (firstUpdate: boolean) => void;
    getCharactersAction?: (updatePage?: boolean, refreshAll?: boolean, page?: number) => void;
    getEpisodesAction?: (updatePage?: boolean, refreshAll?: boolean, page?: number) => void;
    getLocationsAction?: (updatePage?: boolean, refreshAll?: boolean, page?: number) => void;
    setNextPageAction: (nextPage: number) => void;
    type: string;
}