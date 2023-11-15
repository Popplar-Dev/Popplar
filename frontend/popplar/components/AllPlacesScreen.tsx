import { View, Text, StyleSheet, Image, FlatList, TextInput, Button, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import MapScreen from './MapScreen'
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from 'recoil';
import { userInfoState } from './recoil/userState';
import { useRecoilState } from 'recoil';

interface HotPlace {
  addressName: string;
  category: string;
  placeName: string;
  placeType: string;
  roadAddressName: string;
  phone: string;
  id: number;
  likeCount: number;
  visitorCount: number;
  tier: number;
}

export default function AllPlacesScreen() {
  const [loading, setLoading] = useState(true);
  const textInputRef = useRef<TextInput | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [Hotplaces, setHotplaces] = useState<HotPlace[]>([]);
  const [searchedHotplaces, setSearchedHotplaces] = useState<HotPlace[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('전체'); 
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const navigation = useNavigation();

  function gomap(item: HotPlace) {
    // navigation.navigate('MapScreen' , {spaceId: spaceInfo.id, spacename: spaceInfo.place_name} )
    navigation.navigate('MapScreen', {data: item})
  }

  const images = [
    { name: "0", uri: require("../assets/mark/flag-iso-color.png") },
    { name: "1", uri: require("../assets/tier/그림1.png") },
    { name: "2", uri: require("../assets/tier/그림2.png") },
    { name: "3", uri: require("../assets/tier/그림3.png") },
    { name: "4", uri: require("../assets/tier/그림4.png") },
    { name: "5", uri: require("../assets/tier/그림5.png") },
  ];

  function disassembleHangul(text: string): string {
    const cho = 'rRseEfaqQtTdwWczxvg';
    const jung = 'koiOjpuPhynbml';
    const jong = 'rRswDGZXCv';
  
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      if (charCode >= 44032 && charCode <= 55203) {
        const diff = charCode - 44032;
        const jongIndex = diff % 28;
        const jungIndex = ((diff - jongIndex) / 28) % 21;
        const choIndex = (((diff - jongIndex) / 28 - jungIndex) / 21) % 19;
  
        const assembledChar =
          cho[choIndex] + jung[jungIndex] + jong[jongIndex];
        result += assembledChar;
      } else {
        result += text[i];
      }
    }
  
    return result;
  }

  useEffect(() => {
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.get(`https://k9a705.p.ssafy.io:8000/hot-place`,
          {
            headers: {
              'Access-Token': userAccessToken,
            },
          }
        )
        .then((response) => {
          const sortedHotplaces = response.data.sort((a: HotPlace, b: HotPlace) => b.visitorCount - a.visitorCount);
          setHotplaces(sortedHotplaces);
          setSearchedHotplaces(sortedHotplaces); 
          // console.log(sortedHotplaces)
          setLoading(false);
        })
        .catch((err) => {
          console.log("에러 메시지 ::", err);
          setLoading(false);
        })
      }
    }
    isLogin();
  }, []);

  const handleSearchInputChange = (text: string) => {
    const disassembledText = disassembleHangul(text);
    setSearchQuery(text);
    performSearch(disassembledText);
  };

  const performSearch = (query: string) => {
    const filteredHotplaces = Hotplaces.filter((item) => {
      const placeNameMatch = disassembleHangul(item.placeName).includes(query);
      const roadAddressMatch = disassembleHangul(item.roadAddressName).includes(query);
      return placeNameMatch || roadAddressMatch;
    });
    setSearchedHotplaces(filteredHotplaces);
    setShowNoResults(filteredHotplaces.length === 0);
  };

  
  const handleFilterSelection = (filter: string) => {
    setSelectedFilter(filter);
    setIsFilterDropdownOpen(false);
    if (filter === '전체') {
      setSearchedHotplaces(Hotplaces);
    } else {
      const filteredHotplaces = Hotplaces.filter((item) => item.category === filter);
      if (filteredHotplaces.length===0) {
        setSearchedHotplaces(filteredHotplaces)
        setShowNoResults(true)
      } else {
        setSearchedHotplaces(filteredHotplaces);
      }
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titletext}>전체 핫플 목록</Text>
      <View style={styles.searchbox}>
        <View style={styles.searchboxtop}>
          <Text style={styles.text}>검색</Text>
          <TextInput
            ref={textInputRef}
            style={styles.input}
            value={searchQuery}
            onChangeText={handleSearchInputChange}
          />

        </View>
        <View>
          <Pressable
            style={[styles.filterButton, selectedFilter === '전체' && styles.selectedFilter]}
            onPress={() => handleFilterSelection('전체')}
          >
            <Text style={styles.filterText}>전체보기</Text>
          </Pressable>
          <View style={styles.filterContainer}>
            <Pressable
              style={[styles.filterButton, selectedFilter === '음식점' && styles.selectedFilter]}
              onPress={() => handleFilterSelection('음식점')}
            >
              <Text style={styles.filterText}>음식점</Text>
            </Pressable>
            <Pressable
              style={[styles.filterButton, selectedFilter === '카페' && styles.selectedFilter]}
              onPress={() => handleFilterSelection('카페')}
            >
              <Text style={styles.filterText}>카페</Text>
            </Pressable>
            <Pressable
              style={[styles.filterButton, selectedFilter === '문화시설' && styles.selectedFilter]}
              onPress={() => handleFilterSelection('문화시설')}
            >
              <Text style={styles.filterText}>문화시설</Text>
            </Pressable>
            <Pressable
              style={[styles.filterButton, selectedFilter === '관광명소' && styles.selectedFilter]}
              onPress={() => handleFilterSelection('관광명소')}
            >
              <Text style={styles.filterText}>관광명소</Text>
            </Pressable>
            <Pressable
              style={[styles.filterButton, selectedFilter === '학교' && styles.selectedFilter]}
              onPress={() => handleFilterSelection('학교')}
            >
              <Text style={styles.filterText}>학교</Text>
            </Pressable>
            <Pressable
              style={[styles.filterButton, selectedFilter === '기타' && styles.selectedFilter]}
              onPress={() => handleFilterSelection('기타')}
            >
              <Text style={styles.filterText}>기타</Text>
            </Pressable>
          </View>
        </View>

      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        (searchedHotplaces.length > 0 || !showNoResults) ? (
        <FlatList
          style={styles.placelistcontainer}
          data={searchedHotplaces.length > 0 ? searchedHotplaces : Hotplaces}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item, index }) => (
          <Pressable onPress={() => gomap(item)}>
            <View style={styles.hotplace} >
              <View style={styles.hotplaceleft}>
                <View style={styles.hotplaceinfo}>
                  <View style={styles.title}>
                    <Image
                        source={images[item.tier].uri}
                        style={styles.tierImage}
                      />
                    <Text style={styles.textbig}>{item.placeName}</Text>
                  </View>
                  {/* <Text style={styles.text}>핫플 티어 {item.tier}</Text> */}
                </View>
                <View style={styles.hotplaceinfo}>
                  <Text style={styles.text}>{item.roadAddressName}</Text>
                </View>
                <View style={styles.hotplaceinfo}>
                  <Text style={styles.text}><Text style={styles.focustext}>{item.visitorCount}</Text>명의 유저가 방문하였습니다</Text>
                </View>
              </View>
              <View style={styles.hotplaceright}>
                <View style={styles.hotplaceinfo}>
                  <Text style={styles.text}>{item.category}</Text>
                </View>
              </View>
            </View>
          </Pressable>
          )}
        />
        ) : (
          <Text style={styles.text}>결과가 없습니다</Text>
        )
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.93,
    alignItems: 'center'
  },
  searchbox: {
    marginbottom: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchboxtop: {
    flexDirection:'row',
    alignItems:'center'
  },
  input: {
    color: 'white',
    backgroundColor: 'grey',
    width: '50%',
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    margin: 10,
  },
  titletext: {
    fontWeight:'bold',
    fontSize:18,
    color: 'white',
    marginTop:10
  },
  text: {
    color: 'white',
  },
  focustext: {
    color:'pink'
  },
  textbig: {
    fontSize: 20,
    color: 'white',
    paddingBottom:5
  },
  placelistcontainer: {
    width: '95%',
    backgroundColor: '#2C2C2C',
    borderRadius:10,
    borderWidth:1,
    borderColor:'#8B90F7',
  },
  hotplace: {
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderColor:'#8B90F7',
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  hotplaceleft: {

  },
  hotplaceright: {
    alignItems: 'flex-end',
  },
  hotplaceinfo: {
    marginVertical: 5,
    // flexDirection: 'row'
  },
  title: {
    flexDirection:'row',
    alignItems:'center',
    // borderWidth:1
  },
  tierImage: {
    marginRight:5
  },

  filterContainer: {
    flexDirection:'row'
  },
  filterLabel: {

  },
  filterButton: {
    alignItems:'center',
    marginHorizontal:8,
    marginBottom:5,
    paddingHorizontal:5,
    paddingVertical:3,
    // borderWidth:1,
    // borderRadius:5,
    // borderColor:'#8B90F7',
    // width:
  },
  selectedFilter: {
    backgroundColor:'#8B90F7',
    borderRadius:5
  },
  filterText:{
    color:'white',
    paddingBottom:2
  }
});


