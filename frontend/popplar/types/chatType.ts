export type ChatMessageType = {
  'message-id': string; 
  chattingRoomId: number; 
  messageType: 'me' | 'others';
  memberId: number;  
  memberName: string; 
  memberProfileImage?: string;  
  chattingContent: string; 
  date?: string;
  time?: string; 
}