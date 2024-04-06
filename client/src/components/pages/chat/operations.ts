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

export const ON_USER_UPDATE = gql`
  subscription OnUserUpdate {
    userUpdated {
      isActive
      id
    }
  }
`;
