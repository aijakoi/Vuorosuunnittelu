
import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
//import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (shifts, datestart, dateEnd, firstName, lastName) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Alkaa", "Loppuu", "Tehtävä", "Paikka"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  shifts.forEach(shift => {
    const shiftData = [
        shift.alkaa,
        shift.loppuu,
        shift.tehtävä,
        shift.paikka,
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(shiftData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Vuororaportti " + firstName + " " + lastName + " || " + datestart + " - " +  dateEnd, 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;