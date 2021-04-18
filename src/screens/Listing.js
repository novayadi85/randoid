/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect , useContext } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  RefreshControl,
  ActivityIndicator,
  Button,
  SafeAreaView
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
import {getDistance, resort} from '../utils/helper';

export const sorts = [
  {
    value: 'nearest',
    label: 'Nearest',
  },
  {
    value: 'ASC',
    label: 'ASC (A-Z)',
  },
  {
    value: 'DESC',
    label: 'DESC (Z-A)',
  }
];

const ListListing = param => {
  return <ListView props={param} />;
};

const useIsMounted = () => {
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);
  return isMounted;
};

function Listing(props) {
  const {navigation, navigation : { state} } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [cached, setCached] = useState(false);
  const [valueMS, setValueMS] = useState([]);
  const [valueSS, setValueSS] = useState('nearest');
  const [lists,setLists] = useState([])
  const [categories,setCategories] = useState([])
  const [keyword,setKeyword] = useState('')
  const [category,setCategory] = useState([])
  const [isFinish,setIsFinish] = useState(false)

  const onChangeMS = (value) => {
    setValueMS(value);
  };
  const onChangeSS = (value) => {
    setValueSS(value);
  };

  const isMounted = useIsMounted();

  async function beforeFetch() {
    console.log('before fetch event')
    try {
      // Wait for the result of waitAndMaybeReject() to settle,
      // and assign the fulfilled value to fulfilledValue:
      let loc = {}
      await nSQL("position").query('select').exec().then(result => {
        result.forEach(function({data:res}){
          loc = res
        })
      })

      // If the result of waitAndMaybeReject() rejects, our code
      // throws, and we jump to the catch block.
      // Otherwise, this block continues to run:
      return loc;
    }
    catch (e) {
      return 'caught';
    }
  }

  const forceReload = () => {
    try {
      let docId = false;
      if(state){
        const {params} = state;
        if(params){
          const {reload} = params;
          if(reload && reload == 'true'){
            return true
          }
        }
        return docId;
      }
      return false;

    } catch (e) {
      return false;
    }
  }

  const initCategory = async () => {
    try {
      let docId = false;
      if(state){
        const {params} = state;
        if(params){
          const {item, reload} = params;
          if(reload && reload == 'true'){
            return false;
          }

          if(item && item.docId){
            return [item.docId]
          }
        }
        return docId;
      }
      return false;

    } catch (e) {
      return false;
    }
  }

  const findData = (cId) => {
    if(cId && valueMS.length > 0) cId = valueMS;
    console.log(cId)
    if(cId){
      return db.collection(`root_collection/tourism/tourism`).where('category', 'in', cId);
    }
    else {
      return db.collection(`root_collection/tourism/tourism`);
    }
  }

  const fetchCollections = async() => {
    const lock = await beforeFetch();
    const cId = await initCategory();
    const collection = [];
    if(cached && !cId && !forceReload() && valueMS.length <= 0) {
      nSQL("listings").query('select').exec().then(result => {
        result.forEach(function(res){
          const { data } = res
          collection.push(data)
        })

        console.log('load cached',collection.length )
        filterListing(collection);

      });
    }
    else {
      const inserts = [];
      nSQL("listings").query("delete").exec();
      findData(cId).get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            const item = doc.data();
            const {latitude, longitude} = item
            
            item.image = require('../assets/images/cardImage4.png')
            if('file' in item ){
                const { src } = item.file 
                if(src){
                    item.image = {uri : src}
                }
            }

            if(latitude && longitude) {
              item.distance = getDistance(lock, latitude, longitude)
            }
            
            collection.push(item)
            if(!inserts.includes(doc.id)){
              return nSQL("listings").query('upsert', {
                data: item
              }).exec().then(() => {
                inserts.push(doc.id)
              })
            }
        })
      }).then(() => {
        setCached(true)
        const __collections = resort(collection, valueSS);
        console.log('load live', __collections.length )
        console.log('load inserts', inserts.length )
        console.log('load category', valueMS )
        if(valueMS.length > 0) filterListing(__collections);
        setLists(__collections)
      })
      
    }

    await fetchCategories();
    isMounted.current && setFetching(false);
  }

  const fetchCategories = async(param) => {
    try {
      const docCats = [];
      const c = await db.collection(`root_collection/tourism/category`).orderBy('name', 'desc').get()
          .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let insert = doc.data();
            
            docCats.push({
              value: doc.id,
              label: insert.name
            })
            
            nSQL("categories").query('upsert', {
              data: doc.data()
            }).exec();
          })
      }).then( _ => {
        return docCats
      })

      setCategories(c)
    }
    catch (e) {
      return 'caught';
    }
    
    
  }

  const handleChange = (search) => {
    setKeyword(search)
    setCached(true)
    setFetching(true)
  }
  const onRefresh = React.useCallback(() => {
    setCached(false)
    setFetching(true)
    setValueMS('')
    setValueSS('nearest')
    setKeyword('')
    setCategory([])
  }, [fetching, refreshing, categories, cached, lists, valueSS, valueMS, category, keyword]);

  const onFilter = React.useCallback(() => {
    setCached(true)
    setFetching(true)
    setCategory(valueMS)
    setModalVisible(false)
  }, [valueSS, valueMS, category, keyword, fetching, refreshing, categories, cached, lists, modalVisible]);

  const filterListing = (documents) => {
    const _query = keyword.toLowerCase()
    const result = documents.filter((document) => {
      let title = document.title.toLowerCase()
      if(_query.length > 3 || valueMS.length > 0){
        if(_query.length > 3 && title.includes(_query) || title == _query) {
          return true
        } 
  
        if(valueMS.length > 0 && valueMS.includes(document.category)) {
          return true
        }
      }
      else {
        return true;
      }
    });

    const docs = resort(result, valueSS)

    setLists(docs.length ? docs : [])
  }

  useEffect(() => {
    if(fetching) fetchCollections();
  }, [fetching])

  useEffect(() => {
    if(!fetching) {
      console.log('state', state)
      if(initCategory()) setValueMS('');
      if(forceReload()) {
        console.log('force', valueMS)
        console.log('initCategory', initCategory())
      }
      if(state.params)
      setFetching(true)
    }
  }, [state])

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <View style={styles.container}>
      <SafeAreaView style={{flex: 0}} />
      <SafeAreaView style={{flex: 1}}>
      <View style={[styles.container]}>
          <SearchBar
              platform={'ios'}
              placeholder="Search..."
              onChangeText={handleChange}
              value={keyword}
            />
        </View>
        <View style={styles.ListView}>
          <Text style={styles.title}>Tempat Wisata</Text>
          {fetching ?  (
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
              color="#ffffff"
              type="outline"
              iconRight={false}
              title="Filter"
              onPress={toggleModal}
            />
          </View>
        </View>      
        <BottomModal
          visible={modalVisible}
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
                    enableSearch={false}
                    enableAvatar={false}
                    chipType="outlined"
                    value={valueMS}
                    onChange={onChangeMS}
                  />
                </View>
                <View style={stylesModal.container}>
                  <Dropdown
                    label="Sort BY"
                    data={sorts}
                    enableSearch={false}
                    value={valueSS}
                    onChange={onChangeSS}
                  />
                </View>
                <View style={{ flex: 1}}>
                  <View style={{backgroundColor:'#1f7cef'}}>
                    <Button color="#ffffff" onPress={() => {
                      onFilter()
                    }} title="Apply"/>
                  </View>
                </View>
                
              
              </ScrollView>
            </View>
          </ModalContent>
        </BottomModal>
        <Footer navigation={navigation} style={styles.footer} />
      </SafeAreaView>
        
        
      </View>
      
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
    bottom: -40,
    left: 0,
    margin: 10,
    zIndex: 1000,
    backgroundColor: '#1f7cef',
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
  },
  buttonStyleContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
     marginTop: 5,
   }
});


export default Listing;

