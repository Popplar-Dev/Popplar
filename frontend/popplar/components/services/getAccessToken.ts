import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => { 
  return AsyncStorage.getItem('userAccessToken')
    .then((value) => {
      if (value !== null) {
        const userAccessToken = JSON.parse(value);
        return userAccessToken
      } else {
        console.log('userAccessToken is not set or an error occurred.');
        return null
      }
    })
    .catch((error) => {
      console.error(error);
      return null
    });
  }