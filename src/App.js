import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext,  useState } from 'react';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import NotMatch from './Components/NotMatch/NotMatch';
import Login from './Components/Login/Login'
import Admin from './Components/Admin/Admin';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route>
          <Admin></Admin>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotMatch></NotMatch>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
