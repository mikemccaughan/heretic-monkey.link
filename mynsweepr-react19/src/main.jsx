import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Mynsweepr from './mynsweepr/mynsweepr'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

const root = createRoot(document.querySelector('#root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mynsweepr" element={<Mynsweepr />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
