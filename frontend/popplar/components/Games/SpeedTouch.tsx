import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

type spaceparam = {
  spaceId: number;
  mybestscore:number
};

function SpeedTouch({route}: spaceparam) {
  const gameinfo = route.params;
  // console.log(gameinfo)

	const [mybestscore, setMybestscore] = useState<number | null>(null);
	const [gameStarted, setGameStarted] = useState(false);
  const [gameColor, setGameColor] = useState('gray');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  useEffect(() =>{
    setMybestscore(gameinfo.mybestscore)
  },[])

  useEffect(() => {
    // setMybestscore(gameinfo.mybestscore)
    if (gameStarted) {
      const timeout = setTimeout(() => {
        setGameColor('#8B90F7');
        startReactionTimeMeasurement();
      }, Math.floor(Math.random() * 3000) + 2000);

      return () => clearTimeout(timeout);
    }
  }, [gameStarted]);

  const startGame = () => {
    setGameColor('gray');
    setGameStarted(true);
  };

  const startReactionTimeMeasurement = () => {
    setStartTime(new Date());
  };

  const measureReactionTime = () => {
    if (gameColor==='gray') {
      setGameStarted(false);
    } else {
      if (startTime) {
        const endTime = new Date();
        const reactionTime = (endTime.getTime() - startTime.getTime()) / 1000;
        setReactionTime(reactionTime);
        // console.log(reactionTime)
        const isLogin = async () => {
          const AccessToken = await AsyncStorage.getItem('userAccessToken');
          if (AccessToken !== null) {
            const userAccessToken = JSON.parse(AccessToken);
            const insertscore = {
              type:"REFLEXES",
              hotPlaceId: gameinfo.spaceId,
              points: reactionTime*(-100)
            }
            reactionTime*(-100)
            axios.post(`https://k9a705.p.ssafy.io:8000/game/insert-result`,
              insertscore,
              {headers: {'Access-Token': userAccessToken}}
            )
            .then((response) => {
              setMybestscore(reactionTime)
              axios.get(`https://k9a705.p.ssafy.io:8000/game/info/${gameinfo.spaceId}`,
              {headers: {'Access-Token': userAccessToken}}
              )
              .then((response)=>{
                setMybestscore(response.data.maxReflexesPoints/(-100))
              })

            // console.log(response.data);
            })
            .catch((err) => {
              console.log("에러 메시지 :", err);
            })
          }
        }
        isLogin()
        setGameStarted(false); 
      }
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameColor('gray');
    setStartTime(null);
    setReactionTime(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scorecomponent}>
        {/* <View style={styles.conquerorscore}>
          <Text style={styles.scoretext}>
            정복자 점수: 
          </Text>
          <Text style={styles.scoretext}>
            현재 점수: 
          </Text>
        </View> */}
        <View style={styles.myscore}>
          {mybestscore ? (
            <Text style={styles.scoretext}>
              내 최고 점수: {mybestscore.toFixed(3)} 초
            </Text>
            ):(
              <Text style={styles.scoretext}>
                내 최고 점수: 초
              </Text>
            )}
          <Text style={styles.scoretext}>
            현재 점수: {reactionTime} 초
          </Text>
        </View>
      </View>
      <View style={[styles.gamecontainer, { backgroundColor: gameColor }]}>
        {gameStarted ? (
          <View>
            <Text style={styles.text}>화면이 보라색이 되면 클릭하세요</Text>
            <Pressable onPress={measureReactionTime} style={styles.button}>
              <Text style={styles.buttonText}>클릭!</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            {reactionTime !== null ? (
              <View>
                <Text style={styles.text}>반응 속도: {reactionTime.toFixed(3)} 초</Text>
                <Pressable onPress={resetGame} style={styles.button}>
                  <Text style={styles.buttonText}>게임 재시작</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable onPress={startGame} style={styles.button}>
                <Text style={styles.buttonText}>게임 시작</Text>
              </Pressable>
            )}
          </View>
        )}
        
      </View>
      <View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  gamecontainer:{
    width:'80%',
    height:'50%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  scorecomponent: {
    flexDirection:'row',
    // borderWidth:1,
    width:'80%',
    justifyContent:'space-around',
    marginBottom:100
  },
  scoretext: {
    color:'white',
    fontSize:15
  },
  conquerorscore: {
    margin:10
  },
  myscore: {
    margin:10
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SpeedTouch;
