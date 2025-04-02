import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Nav } from './components/nav';
import { Routing } from './components/routing';
import { Provider } from 'react-redux';
import { mystore } from './redux/store';
import { Login } from './components/login';

function App() {
  return (
    <div className="App">
      <Provider store={mystore}>
      <BrowserRouter>
      <Nav></Nav>
      <Routing></Routing>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
