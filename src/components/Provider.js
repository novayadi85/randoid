import React, { useState } from "react";
export const Context = React.createContext();
const Provider = props => {
  const aCallback = (params) => {
    console.log("HEY FROM METHOD", params);
    setParams(params)
    setModalVisible(false)
    setFetching(true)
  };

  const [name, setName] = useState("Batman");
  const [params, setParams] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fetching, setFetching] = useState(true);

  return (
    <Context.Provider
      value={{
        name: name,
        params: params,
        fetching: fetching,
        modalVisible: modalVisible,
        refreshing: refreshing,
        updateName: name => setName(name),
        updateParams: params => {
            setParams(params)
        },
        setModalVisible: param => setModalVisible(param),
        setRefreshing: param => setRefreshing(param),
        setFetching: param => setFetching(param),
        aCallback: aCallback,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
