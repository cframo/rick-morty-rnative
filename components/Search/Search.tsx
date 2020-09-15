import React from "react";
import {SearchBar} from "react-native-elements";
import {SearchBarProps} from "../Types";
import {searchCharacterAction, setNextPageAction} from "../../Redux/charactersDuck";
import {searchEpisodeAction} from "../../Redux/episodesDuck";
import {searchLocationAction} from "../../Redux/locationsDuck";
import {connect} from "react-redux";

const Search = ({keySearch, setKeySearch, filter, setFirstUpdate, searchCharacterAction, searchEpisodeAction, searchLocationAction, type}: SearchBarProps): JSX.Element => {

    const searchKeyHandler = (key: string) => {
        setKeySearch(key);
        searchKey();
    }

    const searchKey = (): void => {
        if (keySearch.length > 2) {
            setFirstUpdate(true)
            switch (type) {
                case "Characters":
                    setNextPageAction(1);
                    searchCharacterAction ? searchCharacterAction(keySearch, filter, true) : null;
                    break
                case "Episodes":
                    searchEpisodeAction ? searchEpisodeAction(keySearch, filter, true) : null;
                    break;
                case "Locations":
                    searchLocationAction ? searchLocationAction(keySearch, filter, true) : null;
                    break;
            }
        }
    }

    return <SearchBar platform={"android"} lightTheme={true} value={keySearch} onChangeText={searchKeyHandler}/>;
}
export default connect(null, {searchCharacterAction, searchEpisodeAction, searchLocationAction})(Search);