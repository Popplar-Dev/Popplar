import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = () => { 
  return AsyncStorage.getItem('userAccessToken')
    .then((value) => {
      if (value !== null) {
        console.log('userAccessToken:', value);
        return value
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