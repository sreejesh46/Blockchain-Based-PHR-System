import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Signup.css';
import Web3 from "web3";
import contract from '../contracts/contract.json';
import { create } from 'ipfs-http-client';

const Signup = () => {
    const [type, setType] = useState(false);
    const [regp, setRegp] = useState({
        "name": "",
        "mail": "",
        "password": "",
        "insurance": [{}],
        "allergies": [{}],
        "medicalhistory": [{}],
        "hospitalizationhistory": [{}],
        "visit": [{}],
        "selectedDoctors": [{}]
    });

    const [regd, setRegd] = useState({
        "name": "",
        "mail": "",
        "password": "",
        "license": "",
        "speciality": ""
    });

    const handle = (e) => {
        const newData1 = { ...regp };
        const newData2 = { ...regd };
        newData1[e.target.name] = e.target.value;
        newData2[e.target.name] = e.target.value;
        setRegp(newData1);
        setRegd(newData2);
    }

    const register = async (e) => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const currentaddress = accounts[0];

            const web3 = new Web3(window.ethereum);
            const mycontract = new web3.eth.Contract(
                contract["abi"],
                contract["address"]
            );

            let regData = e ? regd : regp; // Determine whether registering a doctor or patient

            let client = create();
            client = create(new URL('http://127.0.0.1:5001'));
            const { cid } = await client.add(JSON.stringify(regData));
            const hash = cid['_baseCache'].get('z');

            if (e) {
                // Registering a doctor
                await mycontract.methods.addDoctor(hash).send({ from: currentaddress });
            } else {
                // Registering a patient
                await mycontract.methods.addPatient(hash).send({ from: currentaddress });
            }

            alert("Account created");
        } catch (error) {
            console.error("Error registering account:", error);
        }
    }

    return (
        <div className="login-container bg-gradient-to-r from-green-500 to-green-500 via-teal-200 ">
            <form className="login-form backdrop-blur-lg
               [ p-8 md:p-10 lg:p-10 ]
               [ bg-gradient-to-b from-white/60 to-white/30 ]
               [ border-[1px] border-solid border-white border-opacity-30 ]
               [ shadow-black/70 shadow-2xl ]">
                <h2 className="login-form-title">Sign Up</h2>
                <div className="input-container">
                    <div className="input-div">
                        <div className="input-heading">
                            <i className="fas fa-user"></i>
                            <h5>Username</h5>
                        </div>
                        <input name="name" onChange={(e) => handle(e)} id="name" placeholder="Full Name" />
                    </div>
                    <div className="input-div">
                        <div className="input-heading" style={{ margin: "1rem 0" }}>
                            <i className="fas fa-key"></i>
                            <h5>User Type</h5>
                            <select id="user-type" name="type" onChange={() => { setType(!type) }} style={{ padding: '0.5rem', backgroundColor: 'white' }}>
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-div">
                        <div className="input-heading">
                            <i className="fas fa-envelope"></i>
                            <h5>Email</h5>
                        </div>
                        <input onChange={(e) => handle(e)} type="mail" placeholder="youremail@gmail.com" id="email" name="mail" />
                    </div>

                    {type &&
                        <div className="input-div" style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="input-heading">
                                    <i className="fas fa-suitcase"></i>
                                    <p>Specialization</p>
                                </div>
                                <input onChange={(e) => handle(e)} type="text" placeholder="Specialization" id="speciality" name="speciality" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="input-heading">
                                    <i className="fas fa-key"></i>
                                    <p>License No.</p>
                                </div>
                                <input onChange={(e) => handle(e)} type="text" placeholder="License No." id="license" name="license" />
                            </div>
                        </div>
                    }

                    <div className="input-div">
                        <div className="input-heading">
                            <i className="fas fa-lock"></i>
                            <h5>Password</h5>
                        </div>
                        <input onChange={(e) => handle(e)} type="password" placeholder="********" id="password" name="password" />
                    </div>

                </div>

                <input type="button" value="Sign Up" className="btn" onClick={() => { register(type) }} />
                <p style={{ textAlign: "right" }}>Already a user?
                    <Link style={{ marginLeft: "4px", color: "black", textDecoration: "underline" }} to='/login'>Log In.</Link>
                </p>
            </form>
        </div>
    )
}

export default Signup;
