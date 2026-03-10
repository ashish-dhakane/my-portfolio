// =============================================
// GOOGLE APPS SCRIPT
// Paste this entire file into your Google Apps Script editor.
// This receives form data and adds a row to your Google Sheet.
//
// Sheet columns (auto-created): Name | Email | Phone | Topic | Date & Time
// =============================================

function doPost(e) {
  try {
    // Parse the incoming JSON data from the form
    const data = JSON.parse(e.postData.contents);

    // Open the active Google Sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add header row only if the sheet is empty (first submission ever)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Name", "Email", "Phone", "Topic", "Date & Time"]);

      // Style the header row
      const headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setBackground("#0d9488");      // teal background
      headerRange.setFontColor("#ffffff");        // white text
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(12);

      // Freeze header row so it stays visible when scrolling
      sheet.setFrozenRows(1);

      // Set column widths
      sheet.setColumnWidth(1, 180);  // Name
      sheet.setColumnWidth(2, 240);  // Email
      sheet.setColumnWidth(3, 160);  // Phone
      sheet.setColumnWidth(4, 200);  // Topic
      sheet.setColumnWidth(5, 200);  // Date & Time
    }

    // Append the new submission as a row
    sheet.appendRow([
      data.name     || "",
      data.email    || "",
      data.phone    || "Not provided",
      data.topic    || "",
      data.datetime || new Date().toLocaleString()
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
