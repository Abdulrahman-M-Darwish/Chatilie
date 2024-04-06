import { gql } from '@apollo/client';

export const GET_FRIENDS = gql`
  query operationsGetFriendsQuery($userId: ID) {
    chats(userId: $userId) {
      avatar
      name
    }
  }
`;
