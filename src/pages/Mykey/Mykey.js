import { data } from 'autoprefixer'
import React, { useEffect, useState } from 'react'
import { API, config, Socket } from '../../config/API'
import { connect } from 'react-redux'
const Mykey = ({auth}) => {
    const {email} =auth.users
    const [Key,setKey] = useState([])
    const [triger,setTriger] = useState(false)
    const [mode,setMode] = useState(0)
    const [stateMode,setStateMode] = useState(0)
    const [StatePintu,setStatePintu]  = useState(0)
    useEffect(()=>{
        API.get("/tag",config)
        .then((res)=>{
            setKey(res.data.data)
        })
        .catch((err)=>{
            alert("belum ada tag")
        })
        Socket.emit("giveMeState",email)
    },[triger])

    useEffect(()=>{
        Socket.on("broad-giveState-"+email,data=>{
            setStateMode(data)
        })
    },[])
    useEffect(()=>{
        Socket.on("res-pintudibuka-"+email,data=>{
            console.log(data)
            if(data.state == "true"){
                setStatePintu(1)
                setTimeout(()=>{
                   setStatePintu(0)
                   const data = {email : email}
                   Socket.emit("closePintu",data)
                },10000)
            }
        })
    },[])
    useEffect(()=>{
        Socket.on("res-triger_refresh-"+email,data=>{
            console.log("state refresh")
            setTimeout(()=>{
                setTriger(true)
                setTriger(false)
            },1000)
            
        })
    },[])
    const handleDelet=(id)=>{
        API.delete("/tag/"+id,config)
        .then((res)=>{
            alert(res.data.message)
            setTriger(!triger)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
    const changeState=()=>{
        setMode(parseInt(mode)+1)
        if(mode==2){
            setMode(0)
        }
        const Data = {"email":email,"mode":mode}
        Socket.emit("changeMode",Data)
    }
    return (
        <div className="ld:grid grid-cols-2 w-10/12 gap-2 m-auto text-center">
            <div className="text-center w-3/12 bg-blue-400 text-white">
                <p>{email}</p>
            </div>
            <div className="bg-blue-400 rounded h-60">
                <p
                className="text-left m-2 text-white"
                >Controller Add</p>
                 <p
                    className="text-lg bg-white w-4/12 m-auto"
                    >{StatePintu == "0"?"Close":"Open"}</p>
                <div className="w-5/12  m-auto rounded pt-3">
                    <p
                    className="text-2xl lg:text-5xl bg-white w-full h-10 lg:h-20"
                    >{stateMode == "0"?"Lock":stateMode == "1"?"Add KEY":"NORMAL"}</p>
                    <button
                    className="w-full h-full rounded bg-white mt-2 text-blue-400"
                    onClick={()=>changeState()}
                    >
                        Change Mode
                    </button>
                </div>
            </div>
            <div className="bg-blue-400 rounded">
                <p className="text-left m-2 text-white">All My Key</p>
                {Key.map((data,index)=>(
                    <div className="w-7/12 m-auto pt-2 pb-2 flex"
                    key={index}
                    >
                        <button 
                        className="bg-white rounded-lg w-10/12"
                        >{data.TagId}</button>
                        <button
                        onClick={()=>handleDelet(data.id)}
                        className="m-2 bg-white h-10 w-2/12 rounded text-red-500"
                        >x</button>
                    </div>
                ))}
            </div>
            
        </div>
    )
}
const mapStateToProps = (state) => ({
  auth: state.login,
});

export default connect(mapStateToProps, {})(Mykey);
