import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './app'

// globale style loads
import './assets/scss/main.scss';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)

if ("serviceWorker" in navigator){
  window.addEventListener("load", ()=>{
    navigator.serviceWorker.register("/service-worker.js");
  })
}