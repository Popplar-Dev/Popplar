import { View, Text, StyleSheet, Image, FlatList, TextInput, Button, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
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
          console.log(sortedHotplaces)
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>전체 핫플 목록</Text>
      <View style={styles.searchbox}>
        <Text style={styles.text}>핫플 검색</Text>
        <TextInput
          ref={textInputRef}
          style={styles.input}
          value={searchQuery}
          onChangeText={handleSearchInputChange}
        />
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
            <View style={styles.hotplace}>
              <View style={styles.hotplaceleft}>
                <View style={styles.hotplaceinfo}>
                  <View style={styles.title}>
                    {item.tier>0 ? (
                      <Image
                        source={require('../assets/tier/그림5.png')}
                        style={styles.tierImage}
                      />
                    ):(
                      <Image
                        source={require('../assets/mark/flag-iso-color.png')}
                        style={styles.tierImage}
                      />
                    )}
                    <Text style={styles.textbig}>{item.placeName}</Text>
                  </View>
                  {/* <Text style={styles.text}>핫플 티어 {item.tier}</Text> */}
                </View>
                <View style={styles.hotplaceinfo}>
                  <Text style={styles.text}>{item.roadAddressName}</Text>
                </View>
                <View style={styles.hotplaceinfo}>
                  <Text style={styles.text}>{item.visitorCount}명의 유저가 방문하였습니다</Text>
                </View>
              </View>
              <View style={styles.hotplaceright}>
                <View style={styles.hotplaceinfo}>
                  <Text style={styles.text}>{item.category}</Text>
                </View>
              </View>
            </View>
          )}
        />
        ) : (
          <Text style={styles.text}>결과 없습니다</Text>
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
    margin: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: 'white',
    backgroundColor: 'grey',
    width: '50%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  text: {
    color: 'white',
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
  button: {
    backgroundColor: 'blue',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  }
});


