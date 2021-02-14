import ReactDOM from 'react-dom'
import App from './app'

// globale style loads
import './assets/scss/main.scss';

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

if ("serviceWorker" in navigator){
  window.addEventListener("load", ()=>{
    navigator.serviceWorker.register("/service-worker.js");
  })
}