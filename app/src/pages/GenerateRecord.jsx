import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import contract from "../contracts/contract.json";
import Web3 from "web3";

const GenerateRecord = ({ patientData }) => {
  const [pdfData, setPdfData] = useState("");

  // Function to generate PDF
  const generatePdf = () => {
    const pdf = new jsPDF();

    // Generate PDF from HTML content
    pdf.text(pdfData, 10, 10);

    // Save the PDF
    pdf.save("patient_record.pdf");
  };

  useEffect(() => {
    // Convert patient data to HTML format
    const htmlContent = `
      <h1>Insurance</h1>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Policy No.</th>
            <th>Expiry</th>
          </tr>
        </thead>
        <tbody>
          ${showInsurance(patientData.insurance)}
        </tbody>
      </table>
      <h1>Allergies</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Medication</th>
          </tr>
        </thead>
        <tbody>
          ${showAllergies(patientData.allergies)}
        </tbody>
      </table>
      <h1>Medical History</h1>
      <table>
        <thead>
          <tr>
            <th>Disease</th>
            <th>Diagnosed Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${showMedHistory(patientData.medicalhistory)}
        </tbody>
      </table>
      <h1>Hospitalization History</h1>
      <table>
        <thead>
          <tr>
            <th>Admitted On</th>
            <th>Discharged On</th>
            <th>Reason</th>
            <th>Surgery</th>
          </tr>
        </thead>
        <tbody>
          ${showHospHistory(patientData.hospitalizationhistory)}
        </tbody>
      </table>
      <h1>Checkup History</h1>
      <table>
        <thead>
          <tr>
            <th>Name Of Professional</th>
            <th>Date Of Visit</th>
            <th>Reason?</th>
          </tr>
        </thead>
        <tbody>
          ${showCheckUpHistory(patientData.visit)}
        </tbody>
      </table>
    `;

    // Set the HTML content to generate PDF
    setPdfData(htmlContent);
  }, [patientData]);

  // Helper functions to generate HTML content for each section
  const showInsurance = (insurance) => {
    return insurance
      .map((d) => {
        return `
          <tr>
            <td>${d.company || ""}</td>
            <td>${d.policyNo || ""}</td>
            <td>${d.expiry || ""}</td>
          </tr>
        `;
      })
      .join("");
  };

  const showAllergies = (allergies) => {
    return allergies
      .map((d) => {
        return `
          <tr>
            <td>${d.name || ""}</td>
            <td>${d.type || ""}</td>
            <td>${d.medication || ""}</td>
          </tr>
        `;
      })
      .join("");
  };

  const showMedHistory = (medicalhistory) => {
    return medicalhistory
      .map((d) => {
        return `
          <tr>
            <td>${d.disease || ""}</td>
            <td>${d.time || ""}</td>
            <td>${d.solved || ""}</td>
          </tr>
        `;
      })
      .join("");
  };

  const showHospHistory = (hospitalizationhistory) => {
    return hospitalizationhistory
      .map((d) => {
        return `
          <tr>
            <td>${d.datefrom || ""}</td>
            <td>${d.dateto || ""}</td>
            <td>${d.reason || ""}</td>
            <td>${d.surgery || ""}</td>
          </tr>
        `;
      })
      .join("");
  };

  const showCheckUpHistory = (visit) => {
    return visit
      .map((d) => {
        return `
          <tr>
            <td>${d.name || ""}</td>
            <td>${d.date || ""}</td>
            <td>${d.reason || ""}</td>
          </tr>
        `;
      })
      .join("");
  };

  return (
    <div>
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
};

export default GenerateRecord;
