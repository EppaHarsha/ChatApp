import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Chat from './Chat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Chat /> */}
    <App/>
  
  </StrictMode>,
)
