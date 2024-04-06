import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
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

export const UPLOAD_MEDIAS = gql`
  mutation uploadMedias($uploadMediasInput: UploadMediasInput!) {
    uploadMedias(uploadMediasInput: $uploadMediasInput) {
      secure_url
    }
  }
`;
