import { useQuery } from "@tanstack/react-query";
import { getFetch } from "../../../utils/fetcher";
import { IConversationsProperties, IMessageProperties } from "./types";

const CONVERSATIONS_KEY = 'CONVERSATIONS';
const MESSAGE_KEY = 'MESSAGE';
const PROXY_URL = 'http://localhost:3001/proxy?url=';
const CONVERSATIONS_URL_PATH = `${PROXY_URL}https://media.halogen.my/experiment/web/list-conversations.json`;
const MESSAGE_URL_PATH = `${PROXY_URL}https://media.halogen.my/experiment/web/list-messages.json`;

const conversationsFetch = (): Promise<IConversationsProperties> =>
    getFetch({ path: `${CONVERSATIONS_URL_PATH}` });

export const useGetConversations = () => {
    const { data, ...rest } = useQuery({ queryKey: [CONVERSATIONS_KEY], queryFn: () => conversationsFetch() });
  
    return {
        conversationsList: data?.conversations ?? [],
        ...rest,
    };
};

const messagesFetch = (): Promise<IMessageProperties> =>
    getFetch({ path: `${MESSAGE_URL_PATH}` });

export const useGetMessage = () => {
    const { data, ...rest } = useQuery({ queryKey: [MESSAGE_KEY], queryFn: () => messagesFetch() });
  
    return {
        contactName: data?.contact?.name ?? '',
        messages: data?.messages ?? [],
        ...rest,
    };
};