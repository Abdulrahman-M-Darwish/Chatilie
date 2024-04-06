import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation Signup($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
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
