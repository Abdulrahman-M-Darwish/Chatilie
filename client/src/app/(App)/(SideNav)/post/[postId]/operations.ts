import { gql } from '@apollo/client';

export const GET_POST = gql`
  query GetPost($postId: ID!) {
    post(id: $postId) {
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

export const GET_COMMENTS = gql`
  query GetComments($findPostsInput: FindPostsInput) {
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
