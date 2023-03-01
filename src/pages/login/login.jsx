import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import dash from "../../images/dash.png";
import "../../css/main.css";
import "../../css/mdb.min.css";
import "../../css/tailwind.css";
import { axiosInstance } from "../../utils/axiosIntance";
import { TextField } from "@mui/material";
const Login = () => {
    const history = useHistory();
    const [msg, setMsg] = useState(false);
    const [data, setData] = useState({ username: "", password: "" });
    const login = (e) => {
        axiosInstance
            .post("/api/employee/login", data)
            .then((data) => {
                console.log(data.data);
                if (!data.data.login) {
                    setMsg("Login ýa-da paroly ýalňyş girizdiňiz !");
                } else {
                    localStorage.setItem("userData", JSON.stringify(data.data));
                    history.push({ pathname: "/home" });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="flex h-screen">
            <div className="w-1/2 relative bg-primary-light text-white pl-auto pr-auto pt-[75px] ">
                <h1 className="font-eczar text-[38px] ">
                    Designed for individuals
                </h1>
                <p className="sb-1 py-8">
                    Control your business and grow your data <br /> remotely,
                    from anywhere!
                </p>
                <div
                    className="absolute shadow-lg rounded-tl-xl bottom-0 right-0 w-9/12 h-[380px]
						flex justify-center items-center overflow-hidden"
                >
                    <img
                        className="rounded-tl-xl min-w-full min-h-full shrink-0"
                        src={dash}
                        alt=""
                    />
                </div>
            </div>
            <div className="w-1/2 relative">
                <div className="absolute-center w-8/12">
                    <div className="flex flex-column justify-center items-center gap-y-2 logo-text text-primary-dark">
                        <p className="font-eczar">Nurýüpek</p>
                    </div>
                    {msg && (
                        <div className="pt-12 pb-4">
                            <div
                                className="bg-rose-100 rounded-lg py-2 px-6  text-base text-rose-500 mb-3"
                                role="alert"
                            >
                                {msg}
                            </div>
                        </div>
                    )}
                    <div>
                        <div className="form-outline mt-4">
                            <TextField
                                className="h-[42px] font-roboto w-full border-[#efefef]"
                                id="outlined-basic"
                                label="Login"
                                variant="outlined"
                                size="small"
                                value={data.username}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        username: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="form-outline my-8">
                            <TextField
                                className="h-[42px] font-roboto w-full border-[#efefef]"
                                id="outlined-basic"
                                label="Parol"
                                variant="outlined"
                                size="small"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {false && (
                            <div className="select w-full border {% if messages %} border-2 border-rose-500">
                                <select
                                    name="store"
                                    className="select-text w-full pl-4"
                                >
                                    <option value="" disabled selected></option>

                                    <option value="{{ store.id }}">
                                        store.title
                                    </option>
                                </select>
                                <label className="select-label">Dükan</label>
                            </div>
                        )}
                        <button
                            onClick={() => login()}
                            className="btn vl-btn w-full justify-center mt-8"
                        >
                            Login
                        </button>
                    </div>
                </div>
                <span className="sb-1 text-black x-center pb-8 bottom-0">
                    Powered by Asmanoky
                </span>
            </div>
        </div>
    );
};

export default React.memo(Login);
