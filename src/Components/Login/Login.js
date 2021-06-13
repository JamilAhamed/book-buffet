import { faEnvelope, faLock, faUser, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import React, { useContext, useState } from 'react';
import firebaseConfig from './firebase.config';
import "firebase/auth";
import "./Login.css"
import firebase from "firebase/app";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Login = () => {
    const history= useHistory();
    const location =useLocation();
    const { from } = location.state || { from: { pathname: "/" } }
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] =useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const [newUser, setNewUser] = useState(false);
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                const { email, displayName } = result.user;
                const user = { email, name: displayName }
                setLoggedInUser(user);
                history.replace(from);
            }).catch((error) => {
                const newUserInfo = {}
                newUserInfo.error = error.message;
                setLoggedInUser(newUserInfo);
            });

    }
    const handleChange = (event) => {
        let isFieldValid = true;
        let isPasswordMatched = false;

        if (event.target.name === 'name') {
            isFieldValid = true;
        }
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(event.target.value)
            isFieldValid = isPasswordValid && isPasswordHasNumber;
        }
        if (newUser && event.target.name === 'confirmPassword') {
            if (event.target.value === user.password) {
                isPasswordMatched = true;
                const isPasswordValid = event.target.value.length > 6;
                const isPasswordHasNumber = /\d{1}/.test(event.target.value)
                isFieldValid = isPasswordMatched && isPasswordValid && isPasswordHasNumber;
            }
        }
        if (isFieldValid) {
            const userInfo = { ...user };
            userInfo[event.target.name] = event.target.value;
            setUser(userInfo);
        }
    }
    const handleSubmit = (event) => {
        if (newUser && user.email && user.password && user.name) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => { 
                    const { email, displayName } = res.user;
                    const newUserInfo = { email, name: displayName };
                    newUserInfo.name = user.name;
                    newUserInfo.error = '';
                    setLoggedInUser(newUserInfo);
                    alert('SignUp successfully completed')
                    updateUserName(user.name);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = {};
                    newUserInfo.error = error.message;
                    setLoggedInUser(newUserInfo);
                    alert(`${error.message}`)
                    
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const { email, displayName } = res.user;
                    const newUserInfo = { email, name: displayName }
                    newUserInfo.error = '';
                    setLoggedInUser(newUserInfo);
                    alert("login successfully")
                    history.replace(from)

                })
                .catch((error) => {
                    const newUserInfo = {};
                    newUserInfo.error = error.message;
                    setLoggedInUser(newUserInfo);
                    alert(`${error.message}`)
                });
        }
        event.preventDefault();
    }

    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
        }).catch(function (error) {
            console.log("error Occurred",error);
        });
    }

    return (
        <div className="card-container">
            <div className="sign-card">
            
                <form className="input-div" onSubmit={handleSubmit}>
                    <div>
                        {
                            newUser ? <h1>Sign Up</h1> : <h1>Sign In</h1>
                        }
                        {
                            newUser &&
                            <div className="input-group">
                                <span>
                                    <FontAwesomeIcon icon={faUser} size="s"></FontAwesomeIcon>
                                </span>
                                <input onChange={handleChange} type="name" name="name" placeholder="Name" required></input>
                            </div>
                        }
                        <div className="input-group">
                            <span>
                                <FontAwesomeIcon icon={faEnvelope}  size="s"></FontAwesomeIcon>
                            </span>
                            <input onChange={handleChange} type="email" placeholder="Email" required></input>
                        </div>
                        <div className="input-group">
                            <span >
                                <FontAwesomeIcon icon={faLock} size="s" />
                            </span>
                            <input onChange={handleChange} type="password" name="password" placeholder="Password" minLength="6" required />
                        </div>
                        {
                            newUser &&
                            <div className="input-group">
                                <span >
                                    <FontAwesomeIcon icon={faUserLock} size="s"></FontAwesomeIcon>
                                </span>
                                <input onChange={handleChange} type="password" name="confirmPassword" placeholder="Confirm Password" minLength="6" required />
                                {
                                    user.confirmPassword !== user.password && <p style={{ color: "red" }}>Passwords are not same</p>
                                }
                            </div>
                        }
                         <input type="checkbox" name="remember-me" id="checkbox" />  <label htmlFor="remember-me">Remember me</label>
                        <p style={{ color: "red" }}>{loggedInUser.error}</p>

                        {
                            !newUser && <input className="btn" type="submit" value="Sign In" />
                        }
                        {
                            newUser && user.password === user.confirmPassword && <input className="btn" type="submit" value="Submit" />
                        }
                        
                    </div>
                    
                    {
                        !newUser &&
                        <div className="social-links" onClick={handleGoogleSignIn}>
                            <span>Login with Google</span>
                            <button > <FontAwesomeIcon icon={faGoogle} size="2x"></FontAwesomeIcon> </button> 
                        </div>
                    }
                   
                </form>
                <div className="btnn-div">
                    {
                        newUser ? <button onClick={() => setNewUser(!newUser)}> Already Have An Account ?</button> :
                        <button onClick={()=>setNewUser(!newUser)}> Create An Account ?</button>
                    }
                </div>
                
            </div>
           
        </div>
    );
};

export default Login;