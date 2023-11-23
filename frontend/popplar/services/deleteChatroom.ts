import { getToken } from "./getAccessToken";
import axios from "axios";

export const deleteChatroom = async (roomId: number) => {
  const userAccessToken = await getToken();
  if (!userAccessToken) return;

  try {
    const url = `https://k9a705.p.ssafy.io:8000/live-chat/chatting-room/${roomId}`;
    const res = await axios.delete(url, {
      headers: {'Access-Token': userAccessToken},
    });
  } catch (e) {
    console.error(e);
  }
};
