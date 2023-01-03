
import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
//import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (employeesGrid, dates, shifts, shift) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Etunimi", "Sukunimi", "Nimike"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  employeesGrid.forEach(employees => {
    const employeesData = [
      employees.etunimi,
      employees.sukunimi,
      employees.nimike
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(employeesData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Vapaat työntekijät " + dates + " " +  shift[0].alkaa + " - " + shift[0].loppuu, 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;