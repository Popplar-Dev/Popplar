/// <reference types="react-scripts" />

interface Window {
  kakao: {
    maps: any;
  }
}

declare module 'react-https-redirect' {
  const HttpsRedirect: React.ComponentType;
  export default HttpsRedirect;
}