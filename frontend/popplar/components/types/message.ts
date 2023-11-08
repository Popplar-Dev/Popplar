export type messageType = {
  messageId: number;
  sentMemberId: number;
  sentMemberName: string;
  sentMemberProfileImage: string;
  receivedMemberId: number;
  receivedMemberName: string;
  content: string;
  checked: boolean;
};
