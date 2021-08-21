import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Socket } from "../../config/API";
import Navbar from "../../components/Navbar/Navbar";

const Controller = (props) => {
  const { login } = props;
  const { users } = login;
  const [triger, setTriger] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("Tap ID Card Kambing");
  useEffect(() => {
    if (users) {
      Socket.emit("SendStatus", { id_User: users._id });
    }
  }, [users, triger]);
  useEffect(() => {
    if (users) {
      Socket.on("MyStatus" + users._id, (data) => {
        setStatus(data.mode);
      });
      Socket.on("ResTimbangan" + users._id, (data) => {
        setMessage(data.message);
      });
    }
  }, []);
  const setMode = () => {
    Socket.emit("SetTimbangan", {
      value: status == "1" ? "0" : "1",
      _id: users._id,
    });
    setTriger(!triger);
  };
  return (
    <div className="bg-emerald-700 h-screen">
      <div className="bg-white w-4/12 h-96 mx-auto text-center shadow-lg rounded-2xl items-center block border-2 border-green">
        <button className="bg-emerald-700 rounded-md p-3 border-2 mt-20 text-white"
          onClick={() => setMode()}
        >
          UBAH MODE
        </button>
        <p className="mt-8">
          MODE : <br/>
          {" "}
          <strong className="text-lg">{status == 0 ? "TIMBANGAN" : "TAGING"}</strong>
        </p>

        <p className="mt-8">{message}</p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps, {})(Controller);
