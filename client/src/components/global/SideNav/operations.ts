import { gql } from '@apollo/client';

export const GET_REPUTATION = gql`
  query GetReputation($profileId: ID!) {
    profile(id: $profileId) {
      reputationOfAllTime
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($findUserInput: FindUserInput) {
    users(findUserInput: $findUserInput) {
      id
      name
      avatar
      username
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($findNotificationsInput: FindNotificationsInput) {
    notifications(findNotificationsInput: $findNotificationsInput) {
      id
      name
      avatar
      username
    }
  }
`;
