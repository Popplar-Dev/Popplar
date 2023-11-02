/// <reference types="react-scripts" />

interface Window {
  kakao: {
    maps: any;
  },
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
    // 다른 WebView 관련 속성 및 메서드도 여기에 추가할 수 있습니다.
  };
}

declare module 'react-https-redirect' {
  const HttpsRedirect: React.ComponentType;
  export default HttpsRedirect;
}