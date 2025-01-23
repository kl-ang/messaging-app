export interface IConversationsProperties {
    conversations: {
        name: string;
        type: 'text' | 'audio' | 'photo';
        text?: {
            message: string;
        };
        audio?: {
            length: string;
        };
        lastMessageAt: string;
        delivered: boolean;
        read: boolean;
    }[];
}
  

export interface IMessageProperties {
    contact: {
        name: string;
    },
    messages: {
        type: string;
        text?: string;
        delivered: boolean;
        read: boolean;
        sentBy: string;
        sentAt: string;
    }[]
}
  