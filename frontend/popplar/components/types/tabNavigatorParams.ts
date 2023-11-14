export type TabNavigatorParamList = {
  AllPlaces: undefined;
  Chat: undefined;
  Map: undefined;
  Notifications: {
    screen?: string;
    params?: {
      memberId: number;
      memberName: string;
    };
  };
  MyPage: undefined;
};
