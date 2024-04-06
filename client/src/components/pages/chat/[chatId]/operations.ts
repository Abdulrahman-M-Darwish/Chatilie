import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      id
      text
      mediaUrls
      updatedAt
      createdAt
      author {
        id
        name
        avatar
        username
      }
    }
  }
`;
