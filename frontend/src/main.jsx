import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const base_url = `https://${import.meta.env.VITE_BASE_URL}/pokemon/`

///// local
// const base_url = 'http://localhost:80/pokemon/'
// const base_url = 'http://localhost:4000/pokemon/'


const client = new ApolloClient({
        uri: base_url,
        cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
        <ApolloProvider client={client}>
        <App />
        </ApolloProvider>
)
