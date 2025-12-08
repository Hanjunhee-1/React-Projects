import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Chess from './Chess'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Chess></Chess>
  </StrictMode>,
)
