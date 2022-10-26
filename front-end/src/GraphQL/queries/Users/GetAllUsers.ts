import { gql } from '@apollo/client'

export const QUERY_ALL_USERS = gql`
  query GetAllUsers($limit: Int!, $offset: Int!) {
    users(limit: $limit, offset: $offset) {
      users {
        id
        name
        age
        username
      }
      dataSize
    }
  }
`
