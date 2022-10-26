import { useState } from 'react'

import { useLazyQuery, useMutation, useQuery } from '@apollo/client'

// Mutations
import { CREATE_USER_MUTATION } from 'GraphQL/mutations/Users/CreateUserMutation'
import { DELETE_USER_MUTATION } from 'GraphQL/mutations/Users/DeleteUserMutation'
import { UPDATE_USER_MUTATION } from 'GraphQL/mutations/Users/UpdateUserMutation'

// Queries
import { QUERY_ALL_MOVIES } from 'GraphQL/queries/Movies/GetAllMovies'
import { QUERY_MOVIE_BY_NAME } from 'GraphQL/queries/Movies/GetMovieByName'
import { QUERY_ALL_USERS } from 'GraphQL/queries/Users/GetAllUsers'

// CONSTANTS
const PAGE_SIZE = 2

const Main = () => {
  // Mutations
  const [createUser] = useMutation(CREATE_USER_MUTATION)
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)
  const [deleteUser] = useMutation(DELETE_USER_MUTATION)

  // States
  const [movieQuery, setMovieQuery] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [age, setAge] = useState('')
  const [updateId, setUpdateId] = useState('')
  const [updateUsername, setUpdateUsername] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [page, setPage] = useState(0)

  // Queries
  const { data, refetch: getAllUsers } = useQuery(QUERY_ALL_USERS, {
    variables: {
      limit: PAGE_SIZE,
      offset: page
    }
  })
  const { data: moviesData } = useQuery(QUERY_ALL_MOVIES)
  const [fetchMovie, { data: movieFetched }] = useLazyQuery(QUERY_MOVIE_BY_NAME)

  const renderUser = (user: any) => (
    <div
      key={user.id}
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        alignContent: 'center'
      }}
    >
      <h2>{user.name}</h2>
      <h2>{user.username}</h2>
      <h2>{user.age}</h2>
    </div>
  )

  const renderMovie = (movie: any) => <h4 key={movie.id}>{movie.name}</h4>

  return (
    <div style={{ textAlign: 'center', marginBottom: 200, marginTop: 50 }}>
      <div>
        <h1>Create User</h1>
        <input
          type={'text'}
          placeholder={'Enter name'}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type={'text'}
          placeholder={'Enter username'}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type={'number'}
          placeholder={'Enter age'}
          onChange={(e) => setAge(e.target.value)}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name,
                  username,
                  age: parseInt(age)
                }
              }
            })
            getAllUsers()
          }}
        >
          Create User
        </button>
      </div>
      <div>
        <h1>Update User</h1>
        <input
          type={'number'}
          placeholder={'Enter ID'}
          onChange={(e) => setUpdateId(e.target.value)}
        />
        <input
          type={'text'}
          placeholder={'Enter username'}
          onChange={(e) => setUpdateUsername(e.target.value)}
        />
        <button
          onClick={() =>
            updateUser({
              variables: {
                input: {
                  id: updateId,
                  username: updateUsername
                }
              }
            })
          }
        >
          Update User
        </button>
      </div>
      <div>
        <h1>Delete User</h1>
        <input
          type={'number'}
          placeholder={'Enter ID'}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button
          onClick={() => {
            deleteUser({
              variables: {
                id: parseInt(deleteId)
              }
            })
            getAllUsers()
          }}
        >
          Delete User
        </button>
      </div>
      <div>
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        {data &&
          data.users.map((user: any) => {
            return renderUser(user)
          })}
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
      <h1>List of Users</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          alignContent: 'center'
        }}
      >
        <h2>Name</h2>
        <h2>Username</h2>
        <h2>Age</h2>
      </div>
      {data &&
        data.users.map((user: any) => {
          return renderUser(user)
        })}
      <h1>List of Movies</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          alignContent: 'center'
        }}
      >
        <h2>Name</h2>
      </div>
      {moviesData && moviesData.movies.map((movie: any) => renderMovie(movie))}
      <input type={'text'} onChange={(e) => setMovieQuery(e.target.value)} />
      <button
        onClick={() =>
          fetchMovie({
            variables: {
              name: movieQuery
            }
          })
        }
      >
        Fetch Movie
      </button>
      {movieFetched && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem'
          }}
        >
          <h3>{movieFetched.movie?.name}</h3>
          <h3>{movieFetched.movie?.yearOfPublication}</h3>
        </div>
      )}
    </div>
  )
}

export default Main
