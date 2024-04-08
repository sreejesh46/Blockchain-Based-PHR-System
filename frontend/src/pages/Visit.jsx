import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import contract from "../contracts/contract.json";
import { useCookies } from "react-cookie";
import { create } from 'ipfs-http-client';

const Visits = () => {
    const web3 = new Web3(window.ethereum);
    const mycontract = new web3.eth.Contract(
        contract["abi"],
        contract["address"]
    );
    const [cookies, setCookie] = useCookies();
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const currentAddress = accounts[0];

            const patientData = await mycontract.methods.getPatient().call();
            const patientHash = patientData.find((hash) => hash === cookies["hash"]);

            if (patientHash) {
                const response = await fetch(`http://localhost:8080/ipfs/${patientHash}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.visit) {
                        setVisits(data.visit);
                    }
                } else {
                    throw new Error("Error fetching visit data");
                }
            } else {
                console.log("Patient data not found.");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching visits:", error);
            setLoading(false);
        }
    };

    const [addFormData, setAddFormData] = useState({
        name: "",
        date: "",
        reason: "",
    });

    const handleAddFormChange = (event) => {
        const newFormData = { ...addFormData };
        newFormData[event.target.name] = event.target.value;
        setAddFormData(newFormData);
    };

    const submit = async () => {
        try {
            setLoading(true);
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const currentAddress = accounts[0];

            const patientData = await mycontract.methods.getPatient().call();
            const patientHash = patientData.find(hash => hash === cookies['hash']);

            if (patientHash) {
                const response = await fetch(`http://localhost:8080/ipfs/${patientHash}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        data.visit.push(addFormData);

                        const client = create(new URL('http://127.0.0.1:5001'));
                        const { cid } = await client.add(JSON.stringify(data));
                        const newHash = cid['_baseCache'].get('z');

                        await mycontract.methods.addPatient(newHash).send({ from: currentAddress });
                        setCookie('hash', newHash);
                        alert("Checkup History Saved");
                        setAddFormData({
                            name: "",
                            date: "",
                            reason: "",
                        });
                        setVisits([...data.visit]);
                    }
                } else {
                    throw new Error("Error fetching patient data");
                }
            } else {
                console.log("Patient data not found.");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error submitting checkup history:", error);
            setLoading(false);
        }
    };

    const del = async (index) => {
        const newData = [...visits];
        newData.splice(index, 1);
        setVisits(newData);

        try {
            setLoading(true);
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const currentAddress = accounts[0];

            const patientData = await mycontract.methods.getPatient().call();
            const patientHash = patientData.find(hash => hash === cookies['hash']);

            if (patientHash) {
                const response = await fetch(`http://localhost:8080/ipfs/${patientHash}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        data.visit = newData;

                        const client = create(new URL('http://127.0.0.1:5001'));
                        const { cid } = await client.add(JSON.stringify(data));
                        const newHash = cid['_baseCache'].get('z');

                        await mycontract.methods.addPatient(newHash).send({ from: currentAddress });
                        setCookie('hash', newHash);
                        alert("Checkup History Deleted");
                        setVisits([...newData]);
                    }
                } else {
                    throw new Error("Error fetching patient data");
                }
            } else {
                console.log("Patient data not found.");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error deleting checkup history:", error);
            setLoading(false);
        }
    };

    return (
        <div className="flex relative dark:bg-main-dark-bg">
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
            </div>

            <div
                className={
                    "dark:bg-main-dark-bg  bg-main-bg min-h-screen ml-72 w-full  "
                }
            >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                    <Navbar />
                </div>
                <div
                    style={{ display: "flex", flexDirection: "column", padding: "4rem", justifyContent: "center", alignItems: "flex-end", gap: "4rem" }}
                >
                    <form style={{ width: "100%" }}>
                        <table style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th className="">Name Of Professional</th>
                                    <th className="">Date Of Visit</th>
                                    <th className="">Reason?</th>
                                    <th className="">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="4">Loading...</td>
                                    </tr>
                                ) : (
                                    visits.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.date}</td>
                                            <td>{item.reason}</td>
                                            <td>
                                                <input type="button" value="Delete" onClick={() => del(index)} />
                                            </td>
                                        </tr>
                                    ))
                                )}
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
                            name="name"
                            required="required"
                            placeholder="Name Of Professional"
                            value={addFormData.name}
                            onChange={handleAddFormChange}
                        />
                        <input
                            type="text"
                            name="date"
                            required="required"
                            placeholder="Date of Visit"
                            value={addFormData.date}
                            onChange={handleAddFormChange}
                        />
                        <input
                            type="text"
                            name="reason"
                            required="required"
                            placeholder="Reason"
                            value={addFormData.reason}
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

export default Visits;
