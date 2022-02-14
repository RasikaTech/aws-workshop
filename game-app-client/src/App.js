import logo from './logo.svg';
import './App.css';
import { ProvideAuth, useAuth } from './Authentication/authProvider';
import PublicPage from './Pages/PublicPage';
import SignInPage from './Pages/SignInPage';
import Profile from './Components/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './Routing/PrivateRoute';
import React from 'react';
import GamePage from './Pages/GamePage';


function App() {  
  return (
    <ProvideAuth>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/public">Public page</Link>
            </li>          
            <li>
              <Profile/>              
            </li>
            <li>
              <Link to="/games">Play games</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/public">
              <PublicPage></PublicPage>
            </Route>           
            <PrivateRoute path="/games">
              <GamePage/>
            </PrivateRoute>
            <Route path="/signin">
              <SignInPage></SignInPage>
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth> 
  );
}

export default App;
