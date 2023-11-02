import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

function Terms() {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('popplar/assets/stars.png')}
        style={styles.backgroundImage}
      >
				<View>
					<Text style={styles.text}>이용약관</Text>
					<Text style={styles.text}>
            제 1 조 (목적)
            본 약관은 주식회사 카카오(이하 "회사")가 제공하는 사물위치정보 및 위치기반 서비스(이하, 위치정보 서비스)에 대해 회사와 서비스를 이용하는 이용자간의 권리·의무 및 책임사항, 기타 필요한 사항 규정을 목적으로 합니다.

            제 2 조 (이용약관의 효력 및 변경)
            ①본 약관은 이용자가 본 약관에 동의하고 회사가 정한 절차에 따라 위치정보 서비스의 이용자로 등록됨으로써 효력이 발생합니다.
            ②이용자가 본 약관의 “동의하기” 버튼을 클릭하였을 경우 본 약관의 내용을 모두 읽고 이를 충분히 이해하였으며, 그 적용에 동의한 것으로 봅니다.
            ③회사는 위치정보 서비스의 변경사항을 반영하기 위한 목적 등으로 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 수정할 수 있습니다.
            ④약관이 변경되는 경우 회사는 변경사항을 그 적용일자 최소 15일 전에 회사의 홈페이지 또는 서비스 공지사항 등(이하, 홈페이지 등)을 통해 공지합니다. 다만, 개정되는 내용이 이용자 권리의 중대한 변경을 발생시키는 경우 적용일 최소 30일 전에 이메일(이메일주소가 없는 경우 서비스 내 전자쪽지 발송, 서비스 내 알림 메시지를 띄우는 등의 별도의 전자적 수단) 발송 또는 등록한 휴대폰번호로 카카오톡 메시지 또는 문자메시지를 발송하는 방법 등으로 개별적으로 고지합니다.
            ⑤회사가 전항에 따라 공지 또는 통지를 하면서 공지 또는 통지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 이용자의 의사표시가 없는 경우에는 변경된 약관을 승인한 것으로 봅니다. 이용자가 개정약관에 동의하지 않을 경우 본 약관에 대한 동의를 철회할 수 있습니다.

          </Text>
				</View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
  },
  text: {
    color:'white',
    fontSize:15
  },
	backgroundImage: {
    flex: 1,
    width: '100%', 
    height: '100%', 
  },
});

export default Terms;
