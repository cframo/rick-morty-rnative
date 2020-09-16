import {gql} from "@apollo/client";
import {client} from "./dataSource";
import _ from "lodash";
import {Iaction, Idata} from "./types";

const initialData: Idata = {
    fetching: false,
    data: [],
    current: {},
    nextPage: 1,
    pages: 1
}

const UPDATE_PAGE_LOCATIONS = "UPDATE_PAGE_LOCATIONS";

const GET_LOCATIONS = "GET_LOCATIONS";
const GET_LOCATIONS_ERROR = "GET_LOCATIONS_ERROR";

const GET_LOCATIONS_SUCCESS = "GET_LOCATIONS_SUCCESS";
const SEARCH_LOCATIONS_SUCCESS = "SEARCH_LOCATIONS_SUCCESS";

export default function reducer(state: Idata = initialData, action: Iaction) {
    switch (action.type) {

        case UPDATE_PAGE_LOCATIONS:
            return {...state, nextPage: action.payload};

        case GET_LOCATIONS:
            return {...state, fetching: true};
        case GET_LOCATIONS_ERROR:
            return {...state, fetching: false, error: action.payload};

        case GET_LOCATIONS_SUCCESS:
            return {...state, fetching: false, data: action.payload.results, pages: action.payload.info.pages};
        case SEARCH_LOCATIONS_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload.results,
                pages: action.payload.info.pages,
                error: null
            };

        default:
            return state;
    }
}

export const searchLocationAction = (key: string, type: boolean, refreshAll: boolean) => (dispatch: any, getState: any) => {
    let query = gql`
            query($key:String, $page:Int) {
                locations(filter: {name: $key}, page: $page){
                    results{
                        id,
                        name,
                        type, 
                        dimension,
                        residents {
                          id,
                          name,
                          image
                        }
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
                locations(filter: {type: $key}, page: $page){
                    results{
                        id,
                        name,
                        type, 
                        dimension,
                        residents {
                          id
                          name,
                          image
                        }
                    }
                    info{
                      pages, 
                      next
                    }
                }
            }
        `;
    }


    const {nextPage} = getState().locations;
    dispatch({
        type: GET_LOCATIONS
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
                type: GET_LOCATIONS_ERROR,
                payload: error.message
            })
        } else {

            if (refreshAll) {
                dispatch({
                    type: SEARCH_LOCATIONS_SUCCESS,
                    payload: data.locations
                });
            } else {
                const newArray = _.uniq(getState().locations.data.concat(data.locations.results));
                data.locations.results = newArray;
                dispatch({
                    type: SEARCH_LOCATIONS_SUCCESS,
                    payload: {
                        results: newArray,
                        info: data.locations.info.pages,
                    }
                });
            }

            dispatch({
                type: UPDATE_PAGE_LOCATIONS,
                payload: data.locations.info.next ? data.locations.info.next : 1
            });
        }
    }).catch(e => {
        dispatch({
            type: GET_LOCATIONS_ERROR,
            payload: e.message
        })
        console.log(e);
    })


}

export const getLocationsAction = (updatePage?: boolean, refreshAll?: boolean, page?: number) => (dispatch: any, getState: any) => {
    const query = gql`
        query ($page:Int){
            locations(page:$page) {
                results {
                  id,
                  name,
                  type, 
                  dimension,
                  residents {
                    id,
                    name,
                    image
                  }
                },
                info {
                    pages,
                    next                    
                }
            }
        }`;
    if (!page) {
        page = getState().locations.nextPage;
    }
    dispatch({
        type: GET_LOCATIONS
    });
    return client.query({
        query,
        variables: {page}
    })
        .then(({data, error}) => {
            if (error) {
                console.log(error.message);
                dispatch({
                    type: GET_LOCATIONS_ERROR,
                    payload: error.message
                });
            } else {

                if (!refreshAll) {
                    const newArray = _.uniq(getState().locations.data.concat(data.locations.results))
                    data.locations.results = newArray
                    dispatch({
                        type: GET_LOCATIONS_SUCCESS,
                        payload: {
                            results: newArray,
                            info: data.locations.info.pages,
                        }
                    });
                } else {
                    dispatch({
                        type: GET_LOCATIONS_SUCCESS,
                        payload: data.locations
                    });
                }

            }
        }).catch(e => {
            dispatch({
                type: GET_LOCATIONS_ERROR,
                payload: e.message
            })
            console.log(e)
        });
}

export const updatePageAction = (refreshAll: boolean, searching: boolean, keySearch: string, type: boolean) => (dispatch: any, getState: any) => {
    const {nextPage} = getState().locations;
    dispatch({
        type: UPDATE_PAGE_LOCATIONS,
        payload: nextPage
    })
    if (searching) {
        searchLocationAction(keySearch, type, refreshAll)(dispatch, getState);
    } else {
        getLocationsAction(true, refreshAll)(dispatch, getState);
    }
}