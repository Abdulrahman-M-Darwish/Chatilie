import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      id
      name
      email
      isActive
      avatar
      birthDate
      username
    }
  }
`;
