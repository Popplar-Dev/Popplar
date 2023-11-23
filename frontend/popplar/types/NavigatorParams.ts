import {messageType} from './message';

export type TabNavigatorParamList = {
  AllPlaces: undefined;
  Chat: undefined;
  Map: undefined;
  Notifications: undefined;
  MyPage: undefined;
};

type spaceparam = {
  spaceId: number;
  mybestscore: number;
};

interface GameInfo {
  conquerorInfo: {
    name: string;
    profileImage: string;
  };
  conquerorPoints: number;
  hasConqueror: boolean;
  maxFightingPoints: number;
  maxReflexesPoints: number;
  myMaxFightingPoints: number;
  myMaxReflexesPoints: number;
}

export type MapStackParamList = {
  MapScreen: undefined;
  SpeedTouch: spaceparam;
  FiveGame: {spaceid: number; gameInfo: GameInfo};
  ClickGame: {spaceid: number; gameInfo: GameInfo};
  QnaList: {spaceId: number; spacename: string};
  QnaDetail: {
    qnaId: number;
    userId: number;
    username: string;
    profileimage: string;
  };
  Draft: {memberId: number; memberName: string};
};

export type ReceivedMessageStackParamList = {
  MessageHome: undefined;
  Detail: {message: messageType; tab: 'received' | 'sent'};
  Draft: {memberId: number; memberName: string};
};

export type SentMessagesStackParamList = {
  MessageHome: undefined;
  Detail: {message: messageType; tab: 'received' | 'sent'};
};

export type ChatStackParamList = {
  ChatScreen: undefined;
  Draft: {memberId: number; memberName: string};
};
