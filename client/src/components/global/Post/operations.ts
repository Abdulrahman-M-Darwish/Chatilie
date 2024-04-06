import { gql } from '@apollo/client';

export const GET_FOLLOWER = gql`
  query Get_Follower($followerId: ID!) {
    follower(followerId: $followerId) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($updatePostId: ID!, $updatePostInput: UpdatePostInput!) {
    updatePost(id: $updatePostId, updatePostInput: $updatePostInput) {
      id
    }
  }
`;

export const REMOVE_POST = gql`
  mutation Remove_Post($removePostId: ID!) {
    removePost(id: $removePostId) {
      id
    }
  }
`;

export const CREATE_REACTION = gql`
  mutation CreateReaction($createReactionInput: CreateReactionInput!) {
    createReaction(createReactionInput: $createReactionInput) {
      user {
        name
      }
    }
  }
`;

export const REMOVE_REACTION = gql`
  mutation RemoveReaction($removeReactionPostId: String!) {
    removeReaction(postId: $removeReactionPostId)
  }
`;

export const GET_REACTIONS = gql`
  query GetReactions($postId: String!) {
    reactions(postId: $postId) {
      reactions {
        user {
          name
        }
      }
      count
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      id
      createdAt
      privacy
      text
      updatedAt
      rePostedPostId
    }
  }
`;

export const GET_POST = gql`
  query GetPost($postId: ID!) {
    post(id: $postId) {
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
