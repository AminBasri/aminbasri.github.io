export enum ModuleType {
  HOME = 'HOME',
  SIGHT = 'SIGHT',
  SOUND = 'SOUND',
  CREATE = 'CREATE',
  IMAGINE = 'IMAGINE',
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  image?: string; // base64
  isAudio?: boolean;
}
