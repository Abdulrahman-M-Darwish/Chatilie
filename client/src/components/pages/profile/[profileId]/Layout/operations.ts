import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      avatar
      birthDate
      username
      friendsCount
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    profile(id: $userId) {
      id
      cover
      country
      bio
      gender
      hobbies
    }
  }
`;
