import React from "react";
import {Button, ListItem} from "react-native-elements";
import {connect} from "react-redux";
import {getCharactersAction, searchCharacterAction, setNextPageAction} from "../../Redux/charactersDuck";
import {getEpisodesAction, searchEpisodeAction} from "../../Redux/episodesDuck";
import {getLocationsAction, searchLocationAction} from "../../Redux/locationsDuck";

import {FiltersProps} from "../Types";
// Styles
import {Filters as STYLE} from "../Styles";

function Filters({
                     btnNames, filter, setFilter, keySearch, setKeySearch, searchCharacterAction, setFirstUpdate,
                     getCharactersAction, setNextPageAction, getEpisodesAction, getLocationsAction, type, searchLocationAction,
                     searchEpisodeAction
                 }: FiltersProps): JSX.Element {

    const changeFilterHandler = (filter: boolean) => {
        setFilter(filter);
        if (keySearch.length > 2) {
            switch (type) {

                case "Characters":
                    setNextPageAction(1);
                    searchCharacterAction ? searchCharacterAction(keySearch, filter, true) : null;
                    break;
                case "Episodes":
                    searchEpisodeAction ? searchEpisodeAction(keySearch, filter, true) : null;
                    break;
                case "Locations":
                    searchLocationAction ? searchLocationAction(keySearch, filter, true) : null;
                    break;

            }
            setFirstUpdate(true)
        }
    }

    const clear = (): void => {
        switch (type) {
            case "Characters":
                setNextPageAction(1);
                getCharactersAction ? getCharactersAction(false, true, 1) : null;
                break;
            case "Episodes":
                getEpisodesAction ? getEpisodesAction(false, true, 1) : null;
                break;
            case "Locations":
                getLocationsAction ? getLocationsAction(false, true, 1) : null;
                break;
        }
        setKeySearch('');

    }

    return (
        <ListItem containerStyle={STYLE.listItem}>
            <Button title={btnNames.first} type={filter ? "outline" : "solid"}
                    buttonStyle={STYLE.button}
                    onPress={() => changeFilterHandler(false)}/>
            <Button title={btnNames.second} type={filter ? "solid" : "outline"}
                    buttonStyle={STYLE.button}
                    onPress={() => changeFilterHandler(true)}/>
            <Button title={'CLEAR'} type={"solid"}
                    buttonStyle={STYLE.buttonCancel}
                    containerStyle={{marginLeft: "18%"}}
                    onPress={clear}
                    disabled={keySearch.length === 0}
            />
        </ListItem>
    );
}

export default connect(null, {
    searchCharacterAction, getCharactersAction,
    setNextPageAction, getEpisodesAction, getLocationsAction,
    searchEpisodeAction, searchLocationAction
})(Filters);