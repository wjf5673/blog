import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
// 导入i18n配置
import './i18n'
import App from './App.tsx'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
