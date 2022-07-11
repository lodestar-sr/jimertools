import { MessageDto } from "@shared/dto/message.dto";

export const generateUuid = (length = 16) => {
  const pattern = '1234567890abcdefghijklmnopqrstuvwxyz';
  let key = '';
  for (let i = 0; i < length; i ++) {
    key += pattern[Math.floor(Math.random() * pattern.length)];
  }
  return key;
};

export const sanitizeMessage = (message: MessageDto) => {
  const { chatroom, ...data } = message;
  return data;
}
