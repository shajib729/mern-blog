import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Registration } from './components/auth/Registration';
import { Login } from './components/auth/Login';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import Create from './components/Create';
import Error from './components/Error';
import Dashboard from './components/Dashboard';
import "./main.scss"
import PrivateRoute from './private/PrivateRoute';
import RouterLinks from './private/RouterLinks';
import {Provider} from 'react-redux';
import Store from './store';
import EditPost from './components/EditPost';
import UserEdit from './components/UserEdit';
import PostPage from './components/PostPage';
import Users from './components/Users';
import SingleUser from './components/SingleUser'

function App() {
  return (
    <BrowserRouter>
    <Provider store={Store}>
      <Navbar/>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/users" component={Users} exact/>
        <Route path="/user/:userName" component={SingleUser} exact/>
        <Route path="/post/:id" component={PostPage} exact/>
        <Route path="/register" component={Registration}/>
        <PrivateRoute exact path='/dashboard/:page?' component={Dashboard}/>
        <PrivateRoute exact path='/create' component={Create}/>
        <PrivateRoute exact path='/edit/:id' component={EditPost}/>
        <PrivateRoute exact path='/user-edit' component={UserEdit}/>
        <RouterLinks exact path='/login' component={Login}/>
        <Route component={Error}/>
      </Switch>
    </Provider>
    </BrowserRouter>   
  );
}

export default App;
