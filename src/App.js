
import './App.css';
import{Routes,Route} from 'react-router-dom'
import Page from './component/Page';
import CreatePage from './component/CreatePage';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Page/>} />
      <Route path='/Create' element={<CreatePage/>} />
     </Routes>
     
     
    </div>
  );
}

export default App;
