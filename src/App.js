import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './components/List';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateList from './pages/CreateList';
import Temp from './pages/Temp';
import DeleteListModal from './components/Home/DeleteListModal';
import EditList from './pages/EditList';
import ViewList from './pages/ViewList';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/signup' component={Signup}></Route>
        <Route exact path='/temp' component={Temp}></Route>
        <Route exact path='/list/create' component={CreateList}></Route>
        <Route exact path='/list/edit/:id' component={EditList}></Route>
        <Route exact path='/list/view/:id' component={ViewList}></Route>
      </Switch>
    </Router>
  );
}

export default App;
