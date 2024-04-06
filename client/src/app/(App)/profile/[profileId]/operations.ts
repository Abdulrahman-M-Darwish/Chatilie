import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($findPostsInput: FindPostsInput!) {
    posts(findPostsInput: $findPostsInput) {
      updatedAt
      text
      privacy
      mediaUrls
      id
      createdAt
      author {
        id
        username
        name
        avatar
      }
    }
  }
`;

export const GET_POSTS_AND_PROFILE = gql`
  query GetPostsAndProfile($findPostsInput: FindPostsInput!, $profileId: ID!) {
    profile(id: $profileId) {
      hobbies
      bio
      gender
      cover
    }
    posts(findPostsInput: $findPostsInput) {
      updatedAt
      text
      privacy
      mediaUrls
      id
      createdAt
      author {
        id
        username
        name
        avatar
      }
    }
  }
`;

export const GET_USER_AND_PROFILE = gql`
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

export const GET_PROFILE = gql`
  query GetUser($userId: ID!) {
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
