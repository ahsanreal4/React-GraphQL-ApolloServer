import { ApolloClient, ApolloProvider } from '@apollo/client'
import { cache } from 'reactive-variables'

import Main from 'components/Main/Main'

import './App.css'

function App() {
  const client = new ApolloClient({
    cache,
    uri: process.env.REACT_APP_SERVER_URL
  })

  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  )
}

export default App
