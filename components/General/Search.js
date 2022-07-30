import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
const Search = ({ navigation }) => {

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const music = useSelector(state => state.musics)
  useEffect(() => {
    setFilteredDataSource(music)
    setMasterDataSource(music)
}, [])
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const input = item.name + ' - ' + item.singer;
        const itemData = item.name + '-' + item.singer
          ? input.toUpperCase()
          : ''.toUpperCase();


        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    const name = item.name;
    const singer = item.singer
    const view = item.view
    return (
      // Flat List Item
      <TouchableOpacity onPress={() => getItem(item)}>
        <View style={styles.itemView} >
          <Image style={styles.itemStyle} source={{ uri: item.img }} />
          <View style = {{flexDirection: 'column'}}>

          <Text style={{ fontWeight: 'bold',fontSize: 16,color:'white'}}>
            {`${name.toUpperCase()}`}
          </Text>
          <Text style= {{color: 'gray', fontSize: 10,fontWeight: 'bold',marginTop:'3%'}}>
          {`${singer.toUpperCase()}`}
          </Text>
          <View style={{ marginTop:'3%',flexDirection: 'row',}}>
            <Ionicons name= "ios-play" size={12} color="gray" fontWeight = 'bold' /> 
            <Text style={{ fontWeight: 'bold',fontSize: 9,color:'gray'}}>
              {view}
          </Text>
          </View>
          </View>
        </View>
      </TouchableOpacity>


    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          borderWidth: 0.2,
          width: '100%',
          backgroundColor: '#C8C8C8',
          marginTop: 10
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an itemaler
    navigation.navigate('NowPlaying', {
      playID: [item.id]
    })
  };

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'black' }}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Find by Singer or Name's Song"
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    marginTop: 30
  },
  itemStyle: {
    backgroundColor:'black',
    padding: '10%',
    height: 50,
    width: 50,
    marginRight: '10%',
    borderRadius: 10,

  },
  itemView: {
    backgroundColor:'black',
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:'5%',
  }
});

export default Search;