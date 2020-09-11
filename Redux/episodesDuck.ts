import {Iaction, Idata} from "./types";
import {gql} from "@apollo/client";
import {client} from "./dataSource";
import _ from "lodash";
import {getCharactersAction, searchCharacterAction} from "./charactersDuck";

const initialData: Idata = {
    fetching: false,
    data: [],
    current: {},
    nextPage: 1,
    pages: 1
}
const UPDATE_PAGE_EPISODES  = "UPDATE_PAGE_EPISODES";

const GET_EPISODES = "GET_EPISODES";
const GET_EPISODES_ERROR = "GET_EPISODES_ERROR";

const GET_EPISODES_SUCCESS = "GET_EPISODES_SUCCESS";
const SEARCH_EPISODES_SUCCESS = "SEARCH_EPISODES_SUCCESS";

export default function reducer(state: Idata = initialData, action: Iaction) {
    switch (action.type) {

        case UPDATE_PAGE_EPISODES:
            return {...state, nextPage:action.payload};

        case GET_EPISODES:
            return {...state, fetching: true};
        case GET_EPISODES_ERROR:
            return {...state, fetching: false, error: action.payload};

        case GET_EPISODES_SUCCESS:
            return {...state, fetching: false, data: action.payload.results, pages: action.payload.info.pages};

        case SEARCH_EPISODES_SUCCESS:
            return {...state, fetching: false, data: action.payload.results, pages: action.payload.info.pages, error: null};
        default:
            return state;
    }
}


export const searchEpisodeAction = (key: string, episode: boolean, refreshAll: boolean) => (dispatch: any, getState: any) => {
    let {nextPage} = getState().episodes;
    let query = gql `
        query($key:String,$page:Int){
            episodes(filter: {name: $key},page:$page) {
                results {
                  id, 
                  name, 
                  air_date,
                  episode, 
                  characters {
                    id,
                    name,
                    image
                  }
                },
                info{
                    pages,
                    next
                }
            }
        }
        `;
    if(episode){
        query = gql `
        query($key:String,$page:Int){
            episodes(filter: {episode: $key}, page:$page) {
                results {
                  id, 
                  name, 
                  air_date,
                  episode, 
                  characters {
                    id,
                    name,
                    image
                  }
                },
                info{
                    pages,
                    next
                }
            }
        }
        `;
        nextPage = 1;
    }

    dispatch({
        type: GET_EPISODES
    });
    return client.query({
        query,
        variables: {
            key,
            page: nextPage
        }
    }).then(({data, error}) => {
        if (error){
            dispatch({
                type: GET_EPISODES_ERROR,
                payload: error.message
            })
        }else{
            if (refreshAll) {
                dispatch({
                    type: SEARCH_EPISODES_SUCCESS,
                    payload: data.episodes
                });
            } else {
                const newArray = _.uniq(getState().episodes.data.concat(data.episodes.results));
                data.episodes.results = newArray;
                dispatch({
                    type: SEARCH_EPISODES_SUCCESS,
                    payload: {
                        results: newArray,
                        info: data.episodes.info.pages,
                    }
                });
            }
            dispatch({
                type: UPDATE_PAGE_EPISODES,
                payload: data.episodes.info.next ? data.episodes.info.next : 1
            });
        }
    }).catch(e => {
        dispatch({
            type: GET_EPISODES_ERROR,
            payload: e.message
        })
        console.log(e.message);
    })



}

export const getEpisodesAction = (updatePage?: boolean, refreshAll?: boolean, page?: number) => (dispatch: any, getState: any) => {
    const query = gql`
        query($page:Int){
            episodes(page:$page) {
                results {
                  id, 
                  name, 
                  air_date,
                  episode, 
                  characters {
                    id,
                    name,
                    image
                  }
                },
                info{
                    pages,
                    next
                }
            }
        }`;
    if (!page){
        page = getState().episodes.nextPage;
    }
    dispatch({
        type: GET_EPISODES
    });
    return client.query({
        query,
        variables: {page}
    })
        .then( ({data, error}) => {
            if (error){
                console.log(error.message);
                dispatch({
                    type: GET_EPISODES_ERROR,
                    payload: error.message
                });
            }else{

                if (!refreshAll) {
                    const newArray = _.uniq(getState().episodes.data.concat(data.episodes.results))
                    data.episodes.results = newArray
                    dispatch({
                        type: GET_EPISODES_SUCCESS,
                        payload: {
                            results: newArray,
                            info: data.episodes.info.pages,
                        }
                    });
                } else {
                    dispatch({
                        type: GET_EPISODES_SUCCESS,
                        payload: data.episodes
                    });
                }

                if(updatePage)
                    dispatch({
                        type: UPDATE_PAGE_EPISODES,
                        payload: data.episodes.info.next ? data.episodes.info.next : 1
                    });
            }
        }).catch(e => {
            dispatch({
                type: GET_EPISODES_ERROR,
                payload: e.message
            })
            console.log(e)
        });
}

export const updatePageAction = (refreshAll: boolean, searching: boolean, keySearch: string, type: boolean) => (dispatch: any, getState: any) =>{
    const {nextPage} = getState().episodes;
    dispatch({
        type: UPDATE_PAGE_EPISODES,
        payload: nextPage
    })
    if (searching){
        searchEpisodeAction(keySearch, type, refreshAll)(dispatch, getState);
    }else{
        getEpisodesAction(true, refreshAll)(dispatch, getState);
    }
}
