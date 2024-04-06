import { gql } from '@apollo/client';

export const GET_CHATS = gql`
  query Get_Chats {
    chats {
      id
      name
      avatar
      birthDate
      createdAt
      email
      isActive
      updatedAt
      username
      chatId
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      text
      mediaUrls
      updatedAt
      createdAt
      author {
        id
        name
        avatar
        username
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      id
      text
      mediaUrls
      updatedAt
      createdAt
      author {
        id
        name
        avatar
        username
      }
    }
  }
`;

export const ON_MESSAGE_CREATED = gql`
  subscription OnMessageCreated {
    messageCreated {
      id
      text
      mediaUrls
      updatedAt
      createdAt
      author {
        id
        name
        avatar
        username
      }
    }
  }
`;

export const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      name
      avatar
      username
    }
  }
`;
