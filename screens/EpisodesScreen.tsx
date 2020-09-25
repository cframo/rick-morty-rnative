import React, {useState} from "react";

import {connect} from 'react-redux';

import {ActivityIndicator, FlatList, View} from "react-native";
import Search from "../components/Search/Search";
import ListScreen from "../components/ListScreen/ListScreen";
import GeneralCard from "../components/Cards/GeneralCard";
import {updatePageAction} from "../Redux/episodesDuck";
import DetailedCard from "../components/Cards/DetailedCard";
import Filters from "../components/Filters/Filters";

import {IEpisode} from "../components/Types";
//Style
import {CharacterScreen as STYLE} from "../components/Styles";
import Error from "./Error";

function EpisodesScreen(props: any): JSX.Element {

    const {
        updatePageAction,
        episodes,
        loading,
        error
    } = props;

    const [episode, setEpisode] = useState<IEpisode>({});
    const [visible, setVisible] = useState<boolean>(false);
    const [keySearch, setKeySearch] = useState<string>('');
    const [filter, setFilter] = useState<boolean>(false)
    const [fisrtUpdate, setFirstUpdate] = useState<boolean>(true);


    const btnNames = {
        first: "Name",
        second: "Episode"
    }

    const showDetailedCard = (): JSX.Element | null => {
        if (visible)
            return <DetailedCard type={'Episode'} episode={episode} visible={visible} setIsVisible={setVisible}/>
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

    if (loading && episodes.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size={"large"}/>
            </View>
        );
    }

    if (error) {
        <Error/>
    }

    return (
        <View style={STYLE.container}>
            <View style={STYLE.body}>
                <View style={STYLE.header}>
                    <Search keySearch={keySearch} setKeySearch={setKeySearch} filter={filter}
                            setFirstUpdate={setFirstUpdate} type={"Episodes"}/>
                    <Filters btnNames={btnNames} filter={filter} setFilter={setFilter} keySearch={keySearch}
                             setKeySearch={setKeySearch} setFirstUpdate={setFirstUpdate} type={"Episodes"}/>
                </View>
                <ListScreen style={STYLE.content}>
                    <FlatList data={episodes} style={{width: "95%"}} renderItem={({item}) => {
                        return <GeneralCard type={"episode"} episode={item} setEpisode={setEpisode} setVisible={setVisible}/>
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
        episodes: state.episodes.data,
        loading: state.episodes.fetching,
        error: state.episodes.error,
    }
}

export default connect(mapState, {updatePageAction})(EpisodesScreen)