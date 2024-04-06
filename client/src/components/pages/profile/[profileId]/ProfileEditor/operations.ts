import { gql } from '@apollo/client';

export const UPLOAD_MEDIAS = gql`
  mutation Upload($uploadMediasInput: UploadMediasInput!) {
    uploadMedias(uploadMediasInput: $uploadMediasInput) {
      secure_url
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $updateProfileId: ID!
    $updateProfileInput: UpdateProfileInput!
  ) {
    updateProfile(
      id: $updateProfileId
      updateProfileInput: $updateProfileInput
    ) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
    }
  }
`;
