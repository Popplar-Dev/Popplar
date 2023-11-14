import {useState} from 'react';
import {View, Image, Pressable, Text, Alert, StyleSheet} from 'react-native';
import {Menu} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {useRecoilState} from 'recoil';
import {userBlockListState} from '../../recoil/userState'; 

import { getToken } from '../../services/getAccessToken';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

type ChatProfileProps = {
  imgUrl: string;
  memberId: number;
  memberName: string; 
};

type RootStackParamList = {
  Chat: undefined;
  Draft: {memberId: number; memberName: string};
};

type DraftScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'Draft'
>;

export default function ChatProfile({imgUrl, memberId, memberName}: ChatProfileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userBlockedList, setUserBlockedList] = useRecoilState(userBlockListState);
  const {navigation} = useNavigation<DraftScreenRouteProp>(); 


  const blocked = userBlockedList.some(user => user.id === memberId); 
  const handleBlock = async () => {
    const userAccessToken = await getToken();
    if (userAccessToken === null) {
      return;
    }
    const url = `https://k9a705.p.ssafy.io:8000/member/block/${memberId}`
    try {
      if (blocked) {
        const res = await axios.delete(url, {
          headers: {'Access-Token': userAccessToken}
        })

        // const newList = userBlockedList.filter(user => user.id !== memberId); 
        // setUserBlockedList(newList); 

      } else {
        const res = await axios.post(url, null, {
          headers: {'Access-Token': userAccessToken}
        })
      }

      setIsMenuOpen(false);

      const newres = await axios.get("https://k9a705.p.ssafy.io:8000/member/block", {
        headers: {'Access-Token': userAccessToken}
      })

      setUserBlockedList(newres.data); 

    } catch (e) {
      console.error(e); 
    }
  }

  const handleMessage = () => {
    navigation.navigate("Draft",{memberId: memberId, memberName: memberName});
  }
  return (
    <View style={styles.container}>
      <Menu
        visible={isMenuOpen}
        onDismiss={() => setIsMenuOpen(false)}
        anchor={
          <View style={styles.profilePicContainer}>
            <Pressable onPress={()=>{setIsMenuOpen(prev=>!prev)}}>
              <FastImage style={{width: "100%", height: "100%"}}
              source={{uri: imgUrl}} resizeMode={FastImage.resizeMode.cover}/>
            </Pressable>
          </View>
        }
        anchorPosition="bottom"
        contentStyle={styles.menuContainer}>
        <View style={styles.buttonOuterContainer}>
          <Pressable
            style={styles.buttonInnerContainer}
            android_ripple={{color: '#464646'}}
            onPress={handleMessage}>
            <Icon name="chatbubbles-outline" size={23} color="#8B90F7"></Icon>
            <Text style={styles.buttonText}>쪽지하기</Text>
          </Pressable>
          <Pressable
            style={styles.buttonInnerContainer}
            android_ripple={{color: '#464646'}}
            onPress={handleBlock}
            >
            <Icon name="ban-outline" size={23} color="#8B90F7"></Icon>
            <Text style={styles.buttonText}>{blocked ? '차단해제': '차단하기'}</Text>
          </Pressable>
        </View>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    // borderWidth: 1,
    // borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  profilePicContainer: {
    width: 37,
    height: 37,
    borderRadius: 13,
    // borderWidth: 1,
    // borderColor: 'white',
    overflow: 'hidden',
    
  },
  profilePic: {
    width: '100%',
    height: '100%',
    
  },
  menuContainer: {
    backgroundColor: '#0c072c',
    left: 40,
    // paddingHorizontal: 10,
  },
  buttonOuterContainer: {
    // borderColor: 'white',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    flexDirection: 'row',
    // borderColor: 'white',
    // borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: '#0c072c',
  },
  buttonText: {
    marginStart: 10,
    color: '#8B90F7',
    fontSize: 14,
  },
});
