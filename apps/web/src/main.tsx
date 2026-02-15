import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { UserContextProvider } from './utils/userContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </StrictMode>
)
