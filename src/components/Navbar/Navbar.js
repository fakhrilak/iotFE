import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../img/Odi.png'
import "./Navbar.css"

const Navbar = ({auth}) => {
  const {users,isLogin} = auth
  console.log(users,"ini navbar")
  const history = useHistory();
  const dispatch = useDispatch()

  const logout=()=>{
    dispatch({
      type:"LOGOUT"
    })
  }
    return (
        <div classname="navbar_component">
        {isLogin ?
        <nav className="pr-20 pl-10">  
          
          <ul>
                <li className="font-semibold text-blue-400"
                ><Link to="/mykey">MY KEY</Link></li>
                <li className="font-semibold text-blue-400"
                onClick={()=>logout()}
                ><Link>LOGOUT</Link></li>
          </ul>
          </nav>:
          <nav className="pr-20 pl-10 ">  
          <ul>
                <li><Link to="/login"><button className="w-16 h-10 rounded text-center text-blue-400 font-medium">Login</button></Link></li>
                <li><Link to="/register"><button className="w-20 h-9 rounded-2xl text-blue-400 bg-blue-400 border-1 text-center text-white font-semibold px-2">SignUp</button></Link></li>
          </ul>
          </nav>
      
          }
        </div>
    )
}

const mapStateToProps = (state) => ({
  auth: state.login,
});

export default connect(mapStateToProps, {})(Navbar);
