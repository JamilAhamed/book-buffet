import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import { createContext,  useState } from 'react';
import Orders from './Components/Order/Orders';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Login from './Components/Login/Login';
import Admin from './Components/Admin/Admin';
import Checkout from './Components/CheckOut/CheckOut';
import NotMatch from './Components/NotMatch/NotMatch';
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
       <Router>
      <Navbar />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <PrivateRoute path="/orders/:id">
          <Orders/>
        </PrivateRoute>
        <PrivateRoute  path="/orders">
          <Orders/>
        </PrivateRoute>
        <PrivateRoute  path="/admin">
          <Admin />
        </PrivateRoute>
        <PrivateRoute path="/checkout/:key">
          <Checkout />
        </PrivateRoute>
        <Route path="/login">
          <Login />
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
   
  )
}

export default App;