import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import Web3 from "web3";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import contract from "../contracts/contract.json"; // Replace with your contract details
import { useCookies } from "react-cookie";
import { create } from 'ipfs-http-client'

const MedicalHistory = () => {
  const [mycontract, setMyContract] = useState(null); // State variable for contract instance
  const [medicalHistory, setMedicalHistory] = useState(null); // State variable for fetched data
  const [error, setError] = useState(null); // State variable for errors

  useEffect(() => {
    const initializeContract = async () => {
      try {
        const web3 = new Web3(window.ethereum); // Assuming you have Web3 provider setup
        const contract = new web3.eth.Contract(contractData.abi, contractData.address);
        setMyContract(contract);
      } catch (error) {
        setError(error);
        console.error('Error initializing contract:', error);
      }
    };

    initializeContract();
  }, []); // Empty dependency array to run only once on component mount

  const fetchData = async () => {
    if (!mycontract) {
      console.warn('Contract not yet initialized');
      return; // Prevent unnecessary calls before contract is ready
    }

    try {
      const patientData = await mycontract.methods.getPatient().call(); // Assuming getPatient() fetches data from blockchain
      // If data is stored on IPFS, retrieve details using IPFS hash from patientData
      const processedData = processDataFromBlockchain(patientData); // Process fetched data (optional)
      setMedicalHistory(processedData);
    } catch (error) {
      setError(error);
      console.error('Error fetching medical history:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, [mycontract]); // Dependency array: Re-fetch data when contract changes

  // Handle errors, loading state, and display medical history data (JSX)
  return (
    <div>
      {error ? (
        <p>Error: {error.message}</p>
      ) : medicalHistory ? (
        <table>
          <tbody>
            {/* Display medical history data from medicalHistory state */}
            <tr>
              {/* ... table rows with patient information ... */}
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading medical history...</p>
      )}
      <button onClick={fetchData}>Refresh Data</button>
    </div>
  );
};

// Function to process data from blockchain (optional)
function processDataFromBlockchain(data) {
  // Implement logic to handle any necessary data transformation
  return data; // Or return the processed data
}

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
                  <th className="">Disease</th>
                  <th className="">Diagnosed Date</th>
                  <th className="">Status</th>
                  <th className="">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getMedHistory()}
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
;

export default MedicalHistory;