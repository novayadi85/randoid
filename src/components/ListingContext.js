import React, { useState } from 'react'

export const ListingContext = React.createContext({
    fetching: false,
    lists: [],
    modalVisible: false,
})

export const ListingContextProvider = (props) => {

    const setFetching = (fetching) => {
        console.log('set fetching....')
        setState({...state, fetching: fetching})
    }

    const setLists = (lists) => {
        setState({...state, lists: lists})
    }

    const setModalVisible = (modalVisible) => {
        setState({...state, modalVisible: modalVisible})
    }

    const initState = {
        fetching: false,
        setFetching: setFetching,
        lists: [],
        setLists: setLists,
        modalVisible: false,
        setModalVisible: setModalVisible,
    } 

    const [state, setState] = useState(initState)

    return (
        <ListingContext.Provider value={state}>
        {props.children}
        </ListingContext.Provider>
    )
}