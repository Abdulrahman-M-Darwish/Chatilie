import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      isActive
      avatar
      birthDate
      username
      friendsCount
    }
  }
`;
