import {
    Idata,
    Iaction
} from "./types";
import {gql} from "@apollo/client";
import {client} from "./dataSource";
import _ from 'lodash';

const initialData: Idata = {
    fetching: false,
    data: [],
    current: {},
    nextPage: 1,
    pages: 1
}
const UPDATE_PAGE_CHARACTERS = "UPDATE_PAGE_CHARACTERS";

const GET_CHARACTERS = "GET_CHARACTER";
const GET_CHARACTERS_ERROR = "GET_CHARACTER_ERROR";

const GET_CHARACTERS_SUCCESS = "GET_CHARACTER_SUCCESS";
const SEARCH_CHARACTERS_SUCCESS = "GET_CHARACTER_SUCCESS";

const SET_NEXT_PAGE = "SET_NEXT_PAGE";


//Reducer
export default function reducer(state: Idata = initialData, action: Iaction) {
    switch (action.type) {

        case UPDATE_PAGE_CHARACTERS:
            return {...state, nextPage: action.payload};

        case GET_CHARACTERS:
            return {...state, fetching: true};
        case GET_CHARACTERS_ERROR:
            return {...state, fetching: false, error: action.payload};

        case GET_CHARACTERS_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload.results,
                pages: action.payload.info.pages,
                error: null
            };
        case SET_NEXT_PAGE:
            return {...state, nextPage: action.payload };

        default:
            return state;
    }
}

//ACTIONS

export const setNextPageAction = (page: number) => (dispatch: any) => {
    dispatch({
        type: SET_NEXT_PAGE,
        payload: page
    });
}

export const searchCharacterAction = (key: string, type: boolean, refreshAll: boolean) => (dispatch: any, getState: any) => {
    let query = gql`
            query($key:String, $page:Int) {
                characters(filter: {name: $key}, page: $page){
                    results{
                      id,
                      name, 
                      image,
                      gender,
                      species, 
                      type
                    }
                    info{
                      pages, 
                      next
                    }
                }
            }
        `;
    if (type) {
        query = gql`
            query($key:String, $page:Int) {
                characters(filter: {type: $key}, page: $page){
                    results{
                      id,
                      name, 
                      image,
                      gender,
                      species, 
                      type
                    }
                    info{
                      pages, 
                      next
                    }
                }
            }
        `;
    }
    const {nextPage} = getState().characters;
    dispatch({
        type: GET_CHARACTERS
    });
    return client.query({
        query,
        variables: {
            key,
            page: nextPage
        }
    }).then(({data, error}) => {
        if (error) {
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: error.message
            })
        } else {

            if (refreshAll) {
                dispatch({
                    type: SEARCH_CHARACTERS_SUCCESS,
                    payload: data.characters
                });
            } else {
                const newArray = _.uniq(getState().characters.data.concat(data.characters.results));
                data.characters.results = newArray;
                dispatch({
                    type: SEARCH_CHARACTERS_SUCCESS,
                    payload: {
                        results: newArray,
                        info: data.characters.info.pages,
                    }
                });
            }
            dispatch({
                type: UPDATE_PAGE_CHARACTERS,
                payload: data.characters.info.next ? data.characters.info.next : 1
            });
        }
    }).catch(e => {
        dispatch({
            type: GET_CHARACTERS_ERROR,
            payload: e.message
        })
        console.log(e);
    })


}

export const getCharactersAction = (updatePage?: boolean, refreshAll?: boolean, page?: number) => (dispatch: any, getState: any) => {
    const query = gql`
        query ($page:Int){
            characters(page:$page){
                results {
                  id,
                  name,
                  type,
                  species,
                  gender
                  image
                },
                info {
                    pages,
                    next,
                    prev
                }
                
            }
        }
    `;
    if (!page){
        page = getState().characters.nextPage;
    }

    dispatch({type: GET_CHARACTERS});
    return client.query({
        query,
        variables: {page}
    })
        .then(({data, error}) => {
            if (error) {
                dispatch({
                    type: GET_CHARACTERS_ERROR,
                    payload: error.message
                })
            } else {

                if (!refreshAll) {
                    const newArray = _.uniq(getState().characters.data.concat(data.characters.results))
                    data.characters.results = newArray
                    dispatch({
                        type: GET_CHARACTERS_SUCCESS,
                        payload: {
                            results: newArray,
                            info: data.characters.info.pages,
                        }
                    });
                } else {
                    dispatch({
                        type: GET_CHARACTERS_SUCCESS,
                        payload: data.characters
                    });
                }

                if (updatePage)
                    dispatch({
                        type: UPDATE_PAGE_CHARACTERS,
                        payload: data.characters.info.next ? data.characters.info.next : 1
                    });
            }

        }).catch(e => {
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: e.message
            })
            console.log(e.message);
        })

}

export const updatePageAction = (refreshAll: boolean, searching: boolean, keySearch: string, type: boolean) => (dispatch: any, getState: any) => {
    const {nextPage} = getState().characters;
    dispatch({
        type: UPDATE_PAGE_CHARACTERS,
        payload: nextPage
    })
    if (searching){
        searchCharacterAction(keySearch, type, refreshAll)(dispatch, getState);
    }else{
        getCharactersAction(true, refreshAll)(dispatch, getState);
    }
}
