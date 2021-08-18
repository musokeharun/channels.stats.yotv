import React, {useState} from 'react';
import logo from "../../../assets/logo.png";
import Input from "../../../common/input";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {getUser, login} from "./authSlice";
import {login as serverLogin} from "../../../services/user";
import jwtDecode from "jwt-decode";

const PartnerLogin = () => {

    const user = useSelector(getUser);
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [token, setToken] = useState("")
    const fileId = v1();

    const submit = async e => {
        e.preventDefault();
        let user = await serverLogin(token, name)
        try {
            // TODO REDUCE LOGIN - AUTH SLICE
            dispatch(login(user))
            // console.log(tokenGot, user);
            window.location.href = "";
        } catch (e) {
            console.log("Error")
        }
    }

    const fileChange = e => {
        let file = e.currentTarget.files[0];
        if (!file) return;
        const {name, type, size} = file;
        if (type !== "text/plain") {
            console.log("File not supported");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            let result = event.target.result;
            // console.log('File content:', result);
            if (result)
                setToken(result.toString());
        };
        reader.readAsText(file);
    }

    console.log(user);

    return (
        <div className="main d-flex justify-content-center w-100">
            <main className="content d-flex p-0">
                <div className="container d-flex flex-column">

                    <div className="row h-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">
                                <div className="text-center mt-4">
                                    <h1 className="h2">Welcome back</h1>
                                    <p className="lead">Sign in to your account to continue</p>
                                </div>

                                <div className="card bg-light">
                                    <div className="card-body">
                                        <div className="m-sm-4">
                                            <div className="text-center">
                                                <img
                                                    src={logo}
                                                    alt="YoTv"
                                                    className="img-fluid rounded"
                                                    width="132"
                                                    height="132"
                                                />
                                            </div>

                                            <form onSubmit={submit}>

                                                <Input
                                                    name={"name"}
                                                    errors={""}
                                                    label={"Username"}
                                                    value={name}
                                                    inputClass={"form-control-lg"}
                                                    placeholder={"Enter your username"}
                                                    onChange={e => setName(e.currentTarget.value)}/>

                                                <Input
                                                    name={"password"}
                                                    errors={""}
                                                    label={"Password"}
                                                    value={token}
                                                    inputClass={"form-control-lg"}
                                                    placeholder={"Paste your token"}
                                                    onChange={e => setToken(e.currentTarget.value)}/>

                                                <label htmlFor={fileId}
                                                       className={"form-label text-primary cursor-pointer"}>
                                                    Upload file (.yotv.txt)
                                                </label>
                                                <input id={fileId} name={"file"} onChange={e => fileChange(e)}
                                                       className={"d-none"} type={"file"}/>


                                                <div className="text-center mt-3">
                                                    <button type="submit" className="btn btn-lg btn-primary">Sign in
                                                    </button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default PartnerLogin;
