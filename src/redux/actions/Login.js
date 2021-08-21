import {API,config,setAuthToken} from "../../config/API"

export const loginAction = (email, password) => async(dispatch) => {
    try {
        const body = {
            email: email,
            password: password
        }

        const res = await API.post("/login", body,config)
        console.log("ini res = ", res)
        dispatch({
            type: "LOGIN_USERS_SUCCESS",
            payload: res.data,
        });
        dispatch(loadUser())
    }catch(err) {
        dispatch({
            type: "LOGIN_USERS_FAIL",
            payload: err,
        })
    }
}
export const SignUp = (first_name,last_name, email, password) => async(dispatch) => {
  try {
      const body = {
          first_name: first_name,
          lastname:last_name,
          email: email,
          password: password
          
      }

      const res = await API.post("/register", body)
      dispatch({
          type: "USERS_CREATE_SUCCESS",
          payload: res.data
      });
      dispatch(loadUser()) 
  }catch(err) {
      dispatch({
          type:"USERS_CREATE_FAIL",
          payload:err.response
      })
      
  }
}
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.getItem('token'));
    }
    console.log(localStorage.token)
    try {
      const res = await API.get("/auth",config);
      dispatch({
        type: "LOAD_USER_SUCCESS",
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: "LOAD_USER_FAIL",
      });
    }
  };