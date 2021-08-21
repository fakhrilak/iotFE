import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom"
import Login from './pages/Auth/Login.js'
import Register from './pages/Auth/Register'


import './App.css'
import { setAuthToken } from './config/API'
import { Provider } from "react-redux";
import store from "./redux/store/store"
import { loadUser } from './redux/actions/Login'
import Controller from './pages/Controller/Controller'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import UserRoute from './components/Routes/UserRoute'
import Mykey from './pages/Mykey/Mykey.js'


if (localStorage.token) {
  console.log("haha",localStorage.token)
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
    <Router>
    <Navbar/>
 
      <div className="">
     
          <div className="w-11/12 m-auto pt-10">
            <Switch>
              
                <Route exact path="/login" component ={Login}/>
                <Route exact path="/register" component ={Register}/>
                <UserRoute exact path="/mykey" component ={Mykey}/>
                <Route exact path="/" component={Home}/>
              
            </Switch>
            
          </div>   
      </div>    
    </Router>
    </Provider>
  )
}

export default App

