import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useCookies } from 'react-cookie';
import Web3 from "web3"; // Import Web3

const MyProfile = () => {
  const [cookies, setCookie] = useCookies();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const hash = cookies['hash'];
      const response = await fetch(`http://localhost:8080/ipfs/${hash}`);
      const data = await response.json();
      setName(data.name);
      setEmail(data.mail);
      setPassword(data.password);
    };
    fetchData();
  }, [cookies]); // Dependency added to ensure useEffect runs only when cookies change

  const handleGameClick = (fieldName) => {
    switch (fieldName) {
      case 'name':
        setName(!name);
        break;
      case 'email':
        setEmail(!email);
        break;
      case 'password':
        setPassword(!password);
        break;
      default:
        break;
    }
  };

  const save = async () => {
    try {
      setCookie("name", name);
      setCookie("mail", email);
      setCookie("password", password);
      var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      var currentaddress = accounts[0];

      // Define contract object properly
      const contract = {}; // Assuming contract object structure
      const web3 = new Web3(window.ethereum);
      const mycontract = new web3.eth.Contract(contract['abi'], contract['networks']['5777']['address']);
      mycontract.methods.updateData(parseInt(cookies['index']), JSON.stringify({ name, mail: email, password })).send({ from: currentaddress })
        .then(res => {
          console.log(res);
        });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
        <Sidebar />
      </div>

      <div className="dark:bg-main-dark-bg bg-main-bg min-h-screen ml-72 w-full">
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <Navbar />
        </div>
        <div className="flex justify-center m-10 ">
          <form className=" p-5 bg-slate-100 rounded-lg">
            <h1 className="text-center text-lg">User Profile</h1>
            <div className="py-2">
              <label className="text-black">
                Name:
                <input
                  id="inp"
                  style={{ padding: "10px", margin: "10px", color: "black" }}
                  name="name"
                  type="text"
                  value={name}
                  onChange={() => handleGameClick('name')}
                  disabled={name}
                  required />
              </label>
              <input type="button" value="✎" className="text-2xl hover:text-blue-400 cursor-pointer" onClick={() => handleGameClick('name')} />
            </div>

            <div className="py-2">
              <label className="text-black">
                Email:
                <input
                  id="inp"
                  style={{ padding: "10px", margin: "10px" }}
                  name="email"
                  type="email"
                  value={email}
                  onChange={() => handleGameClick('email')}
                  disabled={email}
                  required />
              </label>
              <input type="button" value="✎" className="text-2xl hover:text-blue-400 cursor-pointer" onClick={() => handleGameClick('email')} />
            </div>

            <div className="py-2">
              <label className="text-black">
                Password:
                <input
                  style={{ padding: "10px", margin: "10px" }}
                  name="password"
                  type="password"
                  value={password}
                  onChange={() => handleGameClick('password')}
                  disabled={password}
                  required />
              </label >
              <input type="button" value="✎" className="text-2xl hover:text-blue-400 cursor-pointer" onClick={() => handleGameClick('password')} />
            </div>

            <div className="py-2">
              <input type="button" value="Save" onClick={save} className="bg-cyan-400 text-white font-medium p-3" />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MyProfile;
