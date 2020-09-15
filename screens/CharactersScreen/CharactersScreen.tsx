import React, {useState} from "react";

import {connect} from 'react-redux';

import {ActivityIndicator, FlatList, View} from "react-native";
import Search from "../../components/Search/Search";
import ListScreen from "../../components/ListScreen/ListScreen";
import GeneralCard from "../../components/Cards/CharactersCard/GeneralCard";
import {updatePageAction} from "../../Redux/charactersDuck";
import DetailedCard from "../../components/Cards/CharactersCard/DetailedCard";
import Filters from "../../components/Filters/Filters";

//Style
import {CharacterScreen as STYLE} from "../../components/Styles";
import {ICharacter} from "../../Redux/types";
import Error from "../Error";

function CharactersScreen(props: any): JSX.Element {

    const {
        updatePageAction,
        characters,
        loading,
        error
    } = props;

    const [character, setCharacter] = useState<ICharacter>({});
    const [visible, setVisible] = useState<boolean>(false);
    const [keySearch, setKeySearch] = useState<string>('');
    const [filter, setFilter] = useState<boolean>(false)
    const [fisrtUpdate, setFirstUpdate] = useState<boolean>(true);


    const btnNames = {
        first: "Name",
        second: "Type"
    }

    const showDetailedCard = (): JSX.Element | null => {
        if (visible)
            return <DetailedCard character={character} visible={visible} setIsVisible={setVisible}/>
        return null;
    }

    const conditionalUpdatePage = (): void => {
        if (keySearch.length > 2) {
            updatePageAction(false, true, keySearch, filter);
            setFirstUpdate(false);
        } else {
            updatePageAction(false, false);
        }
    }

    if (loading && characters.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size={"large"}/>
            </View>
        );
    }

    if (error){
        <Error/>
    }

    if (character)
    return (
        <View style={STYLE.container}>
            <View style={STYLE.body}>
                <View style={STYLE.header}>
                    <Search keySearch={keySearch} setKeySearch={setKeySearch} filter={filter}
                            setFirstUpdate={setFirstUpdate} type={"Characters"}/>
                    <Filters btnNames={btnNames} filter={filter} setFilter={setFilter} keySearch={keySearch}
                             setKeySearch={setKeySearch} setFirstUpdate={setFirstUpdate} type={"Characters"}/>
                </View>
                <ListScreen style={STYLE.content}>
                    <FlatList data={characters} style={{width: "95%"}} renderItem={({item}) => {
                        return <GeneralCard character={item} setCharacter={setCharacter} setVisible={setVisible}/>
                    }} keyExtractor={item => item.id} onEndReachedThreshold={0.5}
                              onEndReached={conditionalUpdatePage}>
                    </FlatList>
                    {loading ? <ActivityIndicator style={{marginBottom: "4%"}} size={"large"}/> : null}
                </ListScreen>
                {showDetailedCard()}
            </View>
        </View>
    );
}

const mapState = (state: any) => {
    return {
        characters: state.characters.data,
        loading: state.characters.fetching,
        error: state.characters.error,
    }
}

export default connect(mapState, {updatePageAction})(CharactersScreen)