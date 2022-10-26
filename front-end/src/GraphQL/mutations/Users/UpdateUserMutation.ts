import { gql } from '@apollo/client'

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUsernameInput!) {
    updateUsername(input: $input) {
      id
      username
    }
  }
`
