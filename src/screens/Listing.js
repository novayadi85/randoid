/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect , useContext } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  RefreshControl,
  ActivityIndicator,
  Button
} from 'react-native';
import {
  Dropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
import {ModalTitle, ModalContent, BottomModal} from 'react-native-modals';
import {SearchBar} from 'react-native-elements';
import { nSQL } from '@nano-sql/core';
import ListView from '../components/ListView';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import Footer from '../components/Footer';
import db from '../config';
import Provider, { Context } from "../components/Provider";

export const locations = [
  {
    value: '1',
    label: 'Denpasar',
  },
  {
    value: '2',
    label: 'Badung',
  }
];

const stylesModal = StyleSheet.create({
  container: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    flex: 1,
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  bottom: {
    width: '100%',
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    position: 'absolute',
    bottom: 0,
  }
});


const ListListing = param => {
  return <ListView props={param} />;
};

const delay = 5;
let executed = false;
function Listing(props) {
  const {navigation} = props;
  const state = useContext(Context)
  const [valueMS, setValueMS] = useState('');
  const [valueSS, setValueSS] = useState('');
  const [lists,setLists] = useState([])
  const [categories,setCategories] = useState([])
  const [params,setParams] = useState([])
  const [keyword,setKeyword] = useState('')
  const onChangeMS = (value) => {
    setValueMS(value);
  };
  const onChangeSS = (value) => {
    setValueSS(value);
  };

  state.fetchCollections = async(params) => {
    nSQL("listings").query("delete").exec().then(() => {
        db.collection("root_collection/tourism/tourism").get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            nSQL("listings").query('upsert', {
              data: doc.data()
            }).exec().then(result => {
              result.forEach(function(res){
                setLists([...lists, res.data])
              })
            });
        })
      });
    })
  }

  const fetchCategories = async(param) => {
    const docs = [];
	if(executed){
		nSQL("categories").query('select').exec().then(result => {
			result.forEach(function(res){
				let insert = res.data;
				insert.label = insert.title
				setCategories([...lists, insert])
			})
		});
	}
	else {
		db.collection(`root_collection/tourism/category`).orderBy('title', 'desc').get()
			.then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				let insert = doc.data();
				insert.label = insert.title
				setCategories([...docs, insert])
				executed = true;
				nSQL("categories").query('upsert', {
				data: doc.data()
				}).exec();
			})
		})
	}
    
  }

  const fetchCache = async() => {
    state.setFetching(true)
    setLists([])
    let results = lists
    /*
    nSQL("listings").query('select').exec().then(result => {
      result.forEach(function(res){
        setLists([...lists, res.data])
      })
    });
    results = lists
    // [{"keyword": "bali"}]
    // nSQL("users").query("select").where(["meta.eyeColor", "=", "blue"]).exec().then
    console.log('results', results)
    console.log('params', params)
    if(params.length){
      const {keyword} = params 
      params.forEach((searchTerm, k) => {
        if(k == 'keyword'){
          results = results.filter((result) => {
            return (
              result.title.toLowerCase().includes(
                searchTerm.toLowerCase(),
              ) 
            );
    
          });
        }
      })
    }
    console.log('search', results)
    console.log(lists)
    */

	nSQL("listings").query('select').exec().then(result => {
		result.map(function(res){
			const { data } = res
			if(params.length){ 
				params.forEach((searchTerm) => {
					const { keyword, location, category } = searchTerm
					if(keyword){
						if(data.title.toLowerCase().includes(keyword.toLowerCase())) setLists([...lists, data])
					}

					if(location){
						if(data.title.toLowerCase().includes(location.toLowerCase())) setLists([...lists, data])
					}

					if(category){
						if(data.title.toLowerCase().includes(category.toLowerCase())) setLists([...lists, data])
					}
				})
			}
			else {
				setLists([...lists, res.data])
			}
			
		})
	});

    state.setFetching(false)
  }

  const onRefresh = React.useCallback(() => {
    setLists([])
    state.fetchCollections();
    state.setFetching(true)
  }, []);

  const onFilter = () => {
    setLists([])
    state.setFetching(true);
    state.setModalVisible(false)
  };

  useEffect(() => {
    state.setFetching(true);
    fetchCache();
    fetchCategories();
    state.setRefreshing(false);
    state.setFetching(false);
  }, [state.fetching, params])

  const toggleModal = () => {
    state.setModalVisible(!state.modalVisible);
  };

  const handleChange = (search) => {
    setKeyword(search)
    if(search.length > 3){
      setLists([])
      setParams([...params, {keyword : search}]);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.container}>
          <SearchBar
              platform={'ios'}
              placeholder="Search..."
              onChangeText={handleChange}
              value={keyword}
            />
        </View>
        <View style={styles.ListView}>
          <Text style={styles.title}>Tempat Wisata</Text>
          {state.fetching ?  (
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#000000" />
              <Text style={[styles.center]}>Loading...</Text>
            </View>
          ): (
            <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} on/>}>
            {lists.map((item, index) => {
              return (
                <ListListing
                  item={item}
                  navigation={navigation}
                  key={index.toString()}
                />
              );
            })}
          </ScrollView>
          )}
         
          <View style={styles.buttonFilter}>
            <Button
              icon={
                <MaterialIconsIcon
                  style={styles.btnIcon}
                  name="tune"
                  size={15}
                  color="#000"
                />
              }
              type="outline"
              iconRight={false}
              title="Filter"
              onPress={toggleModal}
            />
          </View>
        </View>      
        <Footer navigation={navigation} style={styles.footer} />
        
      </View>
      <BottomModal
          visible={state.modalVisible}
          onTouchOutside={toggleModal}
          height={0.8}
          width={1}
          onSwipeOut={toggleModal}
          modalTitle={
            <ModalTitle
              title="Filter Tourism"
              hasTitleBar={true}
              style={styles.modalTitle}
            />
          }>
          <ModalContent
            style={{
              flex: 1,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={stylesModal.container}>
                  <MultiselectDropdown
                    label="Select category of Tourism"
                    data={categories}
                    enableSearch
                    enableAvatar
                    chipType="outlined"
                    value={valueMS}
                    onChange={onChangeMS}
                  />
                </View>
                <View style={stylesModal.container}>
                  <Dropdown
                    label="Select Location"
                    data={locations}
                    enableSearch
                    value={valueSS}
                    onChange={onChangeSS}
                  />
                </View>
                <View style={[stylesModal.container]}>
                  <Button onPress={() => {
                    onFilter()
                  }} title="Apply"/>
                </View>
              
              </ScrollView>
            </View>
          </ModalContent>
        </BottomModal>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalTitle: {
    backgroundColor: '#fff',
    color: '#000',
  },
  filtering: {
    flex: 1,
    backgroundColor: '#000000',
    paddingRight: 8,
    paddingLeft: 8,
  },
  buttonFilter: {
    bottom: 0,
    left: 0,
    margin: 10
  },  
  btnIcon: {
    backgroundColor: 'transparent',
    color: '#616161',
    fontSize: 24,
    opacity: 0.8,
    marginRight: 10
  },
  button: {
    backgroundColor: 'white'
  },
  ListView: {
    top: 55,
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    paddingTop: 0,
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 150,
  },
  scroll: {
    top: 55,
    backgroundColor: '#ccc',
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    paddingTop: 0,
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 150,
  },
  HeaderWithActionButton: {
    height: 20,
    width: '100%',
    marginTop: 26,
    marginLeft: 0,
  },
  footer: {
    height: 73,
    width: '100%',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 0,
    shadowOpacity: 1,
    shadowRadius: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 10000,
    position: 'absolute',
  },
  ButtonPrimary: {
    height: 36,
    width: 100,
    marginTop: 0,
    marginLeft: 0,
  },
  title: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10
  },
  center:{
    textAlign: 'center',
    marginTop: 10
  }
});

export default Listing;

