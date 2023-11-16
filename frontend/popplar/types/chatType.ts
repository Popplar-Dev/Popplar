export type ChatMessageType = {
  chattingId: number; 
  chattingRoomId: number; 
  messageType: 'me' | 'others';
  memberId: number;  
  memberName: string; 
  memberProfileImage: string;  
  chattingContent: string; 
  date?: string;
  time?: string;
  conqueror: boolean; 
}