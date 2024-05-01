
function addInsuranceDetails(doc, insuranceData) {
  doc.text('Insurance Details:', { fontSize: 12, underline: true });
  doc.moveDown();
  insuranceData.forEach(insurance => {
    doc.text(`Company: ${insurance.company}`, { fontSize: 10 });
    doc.text(`Policy No.: ${insurance.policyNo}`, { fontSize: 10 });
    doc.text(`Expiry: ${insurance.expiry}`, { fontSize: 10 });
    doc.moveDown();
  });
}

function addAllergiesDetails(doc, allergiesData) {
  doc.text('Allergies:', { fontSize: 12, underline: true });
  doc.moveDown();
  allergiesData.forEach(allergy => {
    doc.text(`Name: ${allergy.name}`, { fontSize: 10 });
    doc.text(`Type: ${allergy.type}`, { fontSize: 10 });
    doc.text(`Medication: ${allergy.medication}`, { fontSize: 10 });
    doc.moveDown();
  });
}

function addMedHistoryDetails(doc, medHistoryData) {
  doc.text('Medical History:', { fontSize: 12, underline: true });
  doc.moveDown();
  medHistoryData.forEach(history => {
    doc.text(`Disease: ${history.disease}`, { fontSize: 10 });
    doc.text(`Diagnosed Date: ${history.time}`, { fontSize: 10 });
    doc.text(`Status: ${history.solved}`, { fontSize: 10 });
    doc.moveDown();
  });
}

function addHospHistoryDetails(doc, hospHistoryData) {
  doc.text('Hospitalization History:', { fontSize: 12, underline: true });
  doc.moveDown();
  hospHistoryData.forEach(history => {
    doc.text(`Admitted On: ${history.datefrom}`, { fontSize: 10 });
    doc.text(`Discharged On: ${history.dateto}`, { fontSize: 10 });
    doc.text(`Reason: ${history.reason}`, { fontSize: 10 });
    doc.text(`Surgery: ${history.surgery}`, { fontSize: 10 });
    doc.moveDown();
  });
}

function addCheckUpHistoryDetails(doc, checkUpData) {
  doc.text('Checkup History:', { fontSize: 12, underline: true });
  doc.moveDown();
  checkUpData.forEach(checkup => {
    doc.text(`Name Of Professional: ${checkup.name}`, { fontSize: 10 });
    doc.text(`Date Of Visit: ${checkup.date}`, { fontSize: 10 });
    doc.text(`Reason?: ${checkup.reason}`, { fontSize: 10 });
    doc.moveDown();
  });
}

module.exports = {
  addInsuranceDetails,
  addAllergiesDetails,
  addMedHistoryDetails,
  addHospHistoryDetails,
  addCheckUpHistoryDetails
};
