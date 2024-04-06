import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      createdAt
      privacy
      mediaUrls
      text
      rePostedPostId
      author {
        id
        avatar
        username
        name
      }
    }
  }
`;

export const ON_POST_CREATED = gql`
  subscription OnPostCreated {
    postAdded {
      id
      createdAt
      privacy
      mediaUrls
      text
      rePostedPostId
      author {
        id
        avatar
        username
        name
      }
    }
  }
`;

export const ON_POST_UPDATED = gql`
  subscription OnPostUpdated {
    postUpdated {
      id
      createdAt
      privacy
      mediaUrls
      text
      rePostedPostId
      author {
        id
        avatar
        username
        name
      }
    }
  }
`;

export const ON_POST_REMOVED = gql`
  subscription OnPostRemoved {
    postRemoved
  }
`;
