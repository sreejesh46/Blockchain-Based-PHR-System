import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import contract from "../contracts/contract.json";
import { useCookies } from "react-cookie";
import { create } from 'ipfs-http-client';

const MedicalHistory = () => {
    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
        contract["abi"],
        contract["address"]
    );
    const [cookies, setCookie] = useCookies();
    const [medHistory, setMedHistory] = useState([]);

    useEffect(() => {
        const all = [];
        async function getMedHistory() {
            await mycontract.methods
                .getPatient()
                .call()
                .then(async (res) => {
                    for (let i = 0; i < res.length; i++) {
                        if (res[i] === cookies['hash']) {
                            const data = await (await fetch(`http://localhost:8080/ipfs/${res[i]}`)).json();
                            if (data.hasOwnProperty('medicalhistory')) {
                                all.push(...data.medicalhistory);
                            }
                            break;
                        }
                    }
                });
            setMedHistory(all);
        }
        getMedHistory();
    }, [cookies['hash']]);

    const [addFormData, setAddFormData] = useState({
        disease: "",
        time: "",
        solved: "",
    });

    const handleAddFormChange = (event) => {
        const newFormData = { ...addFormData };
        newFormData[event.target.name] = event.target.value;
        setAddFormData(newFormData);
    };

    async function submit() {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const currentAddress = accounts[0];

            const patientData = await mycontract.methods.getPatient().call();
            const patientHash = patientData.find(hash => hash === cookies['hash']);

            if (patientHash) {
                const data = await (await fetch(`http://localhost:8080/ipfs/${patientHash}`)).json();
                data.medicalhistory.push(addFormData);

                const client = create(new URL('http://127.0.0.1:5001'));
                const { cid } = await client.add(JSON.stringify(data));
                const newHash = cid['_baseCache'].get('z');

                await mycontract.methods.addPatient(newHash).send({ from: currentAddress });
                setCookie('hash', newHash);
                alert("Medical History Saved");
                window.location.reload();
            } else {
                console.log("Patient data not found.");
            }
        } catch (error) {
            console.error("Error saving medical history:", error);
        }
    }

    async function del(index) {
        const newData = [...medHistory];
        newData.splice(index, 1);
        setMedHistory(newData);

        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const currentAddress = accounts[0];

            const patientData = await mycontract.methods.getPatient().call();
            const patientHash = patientData.find(hash => hash === cookies['hash']);

            if (patientHash) {
                const data = await (await fetch(`http://localhost:8080/ipfs/${patientHash}`)).json();
                data.medicalhistory = newData;

                const client = create(new URL('http://127.0.0.1:5001'));
                const { cid } = await client.add(JSON.stringify(data));
                const newHash = cid['_baseCache'].get('z');

                await mycontract.methods.addPatient(newHash).send({ from: currentAddress });
                setCookie('hash', newHash);
                alert("Medical History Deleted");
                window.location.reload();
            } else {
                console.log("Patient data not found.");
            }
        } catch (error) {
            console.error("Error deleting medical history:", error);
        }
    }

    return (
        <div className="flex relative dark:bg-main-dark-bg">
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
            </div>

            <div className={"dark:bg-main-dark-bg  bg-main-bg min-h-screen ml-72 w-full  "}>
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                    <Navbar />
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "4rem",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    gap: "4rem"
                }}>
                    <form style={{ width: "100%" }}>
                        <table style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th className="">Disease</th>
                                    <th className="">Diagnosed Date</th>
                                    <th className="">Status</th>
                                    <th className="">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medHistory.map((mh, index) => (
                                    <tr key={index}>
                                        <td>{mh.disease}</td>
                                        <td>{mh.time}</td>
                                        <td>{mh.solved}</td>
                                        <td>
                                            <input type="button" value="Delete" onClick={() => del(index)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </form>

                    <form style={{
                        display: 'flex', flexDirection: 'column', gap: '1rem',
                        backgroundColor: 'rgb(3, 201, 215)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '24px',
                        borderRadius: '20px',
                    }}>
                        <h2>Add your Medical History</h2>
                        <input
                            type="text"
                            name="disease"
                            required="required"
                            placeholder="Disease"
                            onChange={handleAddFormChange}
                        />
                        <input
                            type="text"
                            name="time"
                            required="required"
                            placeholder="Diagnosed Date"
                            onChange={handleAddFormChange}
                        />
                        <input
                            type="text"
                            name="solved"
                            required="required"
                            placeholder="Treated/Ongoing"
                            onChange={handleAddFormChange}
                        />
                        <input type="button" value="Save" onClick={submit} />
                    </form>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default MedicalHistory;
