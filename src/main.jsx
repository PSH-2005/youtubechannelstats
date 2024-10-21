import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-eiozg6igek2vkakw.us.auth0.com"
    clientId="RW5CBddZ9acLsEiipU9DcNFxI8Idxo50"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
)
