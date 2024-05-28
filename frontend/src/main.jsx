import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

///// local machine
// const base_url = 'http://localhost:4000/pokemon/'

///// local containerized
const base_url = 'http://localhost:80/pokemon/'


// Prod

// const base_url = `https://${import.meta.env.VITE_BASE_URL}/pokemon/`

const client = new ApolloClient({
        uri: base_url,
        cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
        <ApolloProvider client={client}>
        <App />
        </ApolloProvider>
)
