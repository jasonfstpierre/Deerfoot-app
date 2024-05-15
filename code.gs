//Global Config varibles
var now = new Date();
var formattedTextDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'MMMM yyyy');
var formConfigs = {
    siteHazard: {
      title: "Site Hazard Assessment - {installer}_{PO}",
      formTitle: "Site Hazard Assessment - {installer}, {PO}",
      imageId: "1wLfFkW734CN4I7eitg8aANCjzcbmFnG1",
      imageWidth: 315,
      imageHeight: 55,
      formType: "siteHazard",
      emailSubject: "PO: {PO} Site Hazard Assessment",
      emailBodyTemplate: "Please find attached the Site Hazard Assessment for:\n\n" +
                         "PO: {PO}\n" +
                         "Customer: {customer}\n" +
                         "Address: {address}\n" +
                         "Installer: {installer}",

      fields: [
          { name: "fullNameField", label: "Installer: " },
          { name: "date", label: "Start Date: ", formatter: formatDateToMMDDYYYY },
          { name: "endDate", label: "End Date: ", formatter: formatDateToMMDDYYYY },
          { name: "poHandler", label: "PO: " }, 
          { name: "customer", label: "Customer: " },
          { name: "address", label: "Address: " },
          { name: "typrOfWork", label: "Type of Work: " },
          { name: "location", label: "Location: " },  
      ],
      checklistFields: [
          { name: "housekeeping", label: "Housekeeping: ", type: "checkbox" },
          { name: "airQuality", label: "Air quality: ", type: "checkbox" },
          { name: "walkWays", label: "Walk ways: ", type: "checkbox" },
          { name: "pPE", label: "PPE / Safety guards: ", type: "checkbox" },
          { name: "toolsCords", label: "Tools / Cords condition: ", type: "checkbox" },
          { name: "slipsTripsFalls", label: "Slips / Trips / Falls: ", type: "checkbox" },
          { name: "temperature", label: "Temperature: ", type: "checkbox" },
          { name: "lights", label: "Lights: ", type: "checkbox" }
      ],
      checklistHeaders: {
        columns: ["Potentail Hazard", "Risk"],
        backgroundColor: "#cccccc"
      },
      longFormFields: [
        { name: "additionalHazards", label: "Additional Hazards:" },
        { name: "correctiveActions", label: "Corrective Actions:" }
        // ... add more long-form fields here as needed ...
      ]
  },
    storeForklift: {
      title: "Store Forklift Inspection - " + formattedTextDate,
      formTitle: "Store Forklift Inspection",
      imageId: "1wLfFkW734CN4I7eitg8aANCjzcbmFnG1",
      imageWidth: 315,
      imageHeight: 55,
      formType: "StoreForklift",
      emailSubject: formattedTextDate + " - Store Forklift Inspection",
      alertEmailSubject: "ATTENTION REQUIRED: " + formattedTextDate + " - Store Forklift Inspection",
      emailBodyTemplate: "Hello {recipientName}, \n\n" + "Please find attached the forklift inspection form for " + formattedTextDate,
      alertEmailBodyTemplate: "Attention: One or more negative responses have been recorded in the attached " + formattedTextDate + " store forklift inspection form. Please review it for details.",

      fields: [
          { name: "fullNameField", label: "Inspector: " },
          { name: "date", label: "Date: ", formatter: formatDateToMMDDYYYY },
        ],
        checklistFields: [
          { name: "battery", label: "Battery: ", type: "checkbox" },
          { name: "tires", label: "Tires: ", type: "checkbox" },
          { name: "overheadGuard", label: "Overhead Guard: ", type: "checkbox" },
          { name: "carriage", label: "Carriage: ", type: "checkbox" },
          { name: "forks", label: "Forks: ", type: "checkbox" },
          { name: "forkLockingPins", label: "Fork Locking Pins: ", type: "checkbox" },
          { name: "liftCylinders", label: "Lift Cylinders: ", type: "checkbox" },
          { name: "hydraulicOil", label: "Hydraulic Oil: ", type: "checkbox" },
          { name: "batteryConnectors", label: "Battery Connectors: ", type: "checkbox" },
          { name: "brake", label: "Brake: ", type: "checkbox" },
          { name: "liftControls", label: "Lift Controls: ", type: "checkbox" },
          { name: "tiltControls", label: "Tilt Controls: ", type: "checkbox" },
          { name: "forwardDriving", label: "Forward Driving: ", type: "checkbox" },
          { name: "steering", label: "Steering: ", type: "checkbox" },
          { name: "backupAlarm", label: "Backup Alarm: ", type: "checkbox" },
          { name: "light", label: "Light: ", type: "checkbox" },
          { name: "horn", label: "Horn: ", type: "checkbox" },
          { name: "oil", label: "Oil: ", type: "checkbox" }
      ],
      checklistHeaders: {
        columns: ["Visual Inspection", "Operational Inspection"],
        backgroundColor: "#cccccc"
      },
        longFormFields: [
          { name: "notes", label: "Notes:" }
          // ... add more long-form fields here as needed ...
      ]
  },
    dFSForklift: {
      title: "DFS Forklift Inspection - " + formattedTextDate,
      formTitle: "DFS Forklift Inspection",
      imageId: "1wLfFkW734CN4I7eitg8aANCjzcbmFnG1",
      imageWidth: 315,
      imageHeight: 55,
      formType: "dFSForklift",
      emailSubject: formattedTextDate + formattedTextDate + " - DFS Forklift Inspection",
      alertEmailSubject: "ATTENTION REQUIRED: " + formattedTextDate + " - DFS Forklift Inspection",
      emailBodyTemplate: "Hello {recipientName}, here is the Site Hazard Assessment document you requested.",
      alertEmailBodyTemplate: "Attention: One or more negative responses have been recorded in the attached " + formattedTextDate + " DFS forklift inspection form. Please review it for details.",
      fields: [
          { name: "fullNameField", label: "Inspector: " },
          { name: "date", label: "Date: ", formatter: formatDateToMMDDYYYY },
        ],
        checklistFields: [
          { name: "battery", label: "Battery: ", type: "checkbox" },
          { name: "tires", label: "Tires: ", type: "checkbox" },
          { name: "overheadGuard", label: "Overhead Guard: ", type: "checkbox" },
          { name: "carriage", label: "Carriage: ", type: "checkbox" },
          { name: "forks", label: "Forks: ", type: "checkbox" },
          { name: "forkLockingPins", label: "Fork Locking Pins: ", type: "checkbox" },
          { name: "liftCylinders", label: "Lift Cylinders: ", type: "checkbox" },
          { name: "hydraulicOil", label: "Hydraulic Oil: ", type: "checkbox" },
          { name: "batteryConnectors", label: "Battery Connectors: ", type: "checkbox" },
          { name: "brake", label: "Brake: ", type: "checkbox" },
          { name: "liftControls", label: "Lift Controls: ", type: "checkbox" },
          { name: "tiltControls", label: "Tilt Controls: ", type: "checkbox" },
          { name: "forwardDriving", label: "Forward Driving: ", type: "checkbox" },
          { name: "steering", label: "Steering: ", type: "checkbox" },
          { name: "backupAlarm", label: "Backup Alarm: ", type: "checkbox" },
          { name: "light", label: "Light: ", type: "checkbox" },
          { name: "horn", label: "Horn: ", type: "checkbox" },
          { name: "oil", label: "Oil: ", type: "checkbox" }
      ],
      checklistHeaders: {
        columns: ["Visual Inspection", "Operational Inspection"],
        backgroundColor: "#cccccc"
      },
        longFormFields: [
          { name: "notes", label: "Notes:" }
          // ... add more long-form fields here as needed ...
      ]
  },
    signout: {
      title: "{customer} - Customer Signout",
      imageId: "1wLfFkW734CN4I7eitg8aANCjzcbmFnG1",
      imageWidth: 315,
      imageHeight: 55,
      formType: "signout",
      emailSubject: "{customer} - Customer Signout",
      emailBodyTemplate: 'Hello {sales}, your customer {customer} signed out {items}' + '\n\n' +
      'You can reach them at {phone}.' + '\n\n' + 'Notes: {notes}',
      fields: [
          { name: "fullNameField", label: "Signed out by: " },
          { name: "date", label: "Date signed out: ", formatter: formatDateToMMDDYYYY },
          { name: "sales", label: "Sales person(s): " },
          { name: "customer", label: "Customer: " },
          { name: "phone", label: "Phone Number: " },
        ],
      longFormFields: [
        { name: "items", label: "Items:" },
        { name: "notes", label: "Notes:" }
        ]
  },
    signIn: {
      title: "{customer} - Customer Sign In",
      imageId: "1wLfFkW734CN4I7eitg8aANCjzcbmFnG1",
      imageWidth: 315,
      imageHeight: 55,
      formType: "signIn",
      emailSubject: "{customer} - Customer Returned Samples",
      emailBodyTemplate: 'Hello, your customer {customer} returned samples' + '\n\n' +
      'You can follow up with them at.',
      fields: [
          { name: "fullNameField", label: "Signed back in by: " },
          { name: "date", label: "Date signed back in: ", formatter: formatDateToMMDDYYYY },
          { name: "customer", label: "Customer: " },
        ],
      longFormFields: [
        { name: "returnNotes", label: "Return Notes: " }
        ]
  },
    receiving: {
      title: "Receiving",
      formTitle: "Receiving - {PO}",
      imageId: "1wLfFkW734CN4I7eitg8aANCjzcbmFnG1",
      imageWidth: 315,
      imageHeight: 55,
      formType: "receiving",
      emailSubject: "Items Received",
      emailBodyTemplate: "Hello, blah blah blah a thing was received",
      fields: [
          { name: "fullNameField", label: "Received by: " },
          { name: "date", label: "Date Received: ", formatter: formatDateToMMDDYYYY },
          { name: "poHandler", label: "PO: " },
          { name: "customer", label: "Customer: " },
          { name: "location", label: "Location (Shelf): " }
      ],
    checklistFields: [
          { name: "building", label: "Building: ", type: "checkbox" },
          { name: "goodCondition", label: "Good Condition: ", type: "checkbox" },
          { name: "allItemsReceived", label: "All Items Received: ", type: "checkbox" },
      ],
    checklistHeaders: {
        columns: ["Checklist", "Result"],
        backgroundColor: "#cccccc"
      },
    longFormFields: [
        { name: "notes", label: "Notes:" }
        // ... add more long-form fields here as needed ...
      ]
  },
};

//functions
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getRecipientEmails() {
  var spreadsheetId = '1plfPBtN0lgVYMvECDC9ZKgJ0HAcJAazMW86g8iFxDiw';
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("RecipientEmails");
  var range = 'A:B'; // Adjusted to get both Column A (Emails) and Column B (Names)
  var values = sheet.getRange(range).getValues();
  var recipients = values.map(function(row) {
    return {email: row[0], name: row[1]}; // Object containing both email and name
  }).filter(function(item) {
    return item.email && item.name; // Ensure both email and name are non-empty
  });
  return recipients;
}

/*function getUserRole(email) {
  var spreadsheetId = "1plfPBtN0lgVYMvECDC9ZKgJ0HAcJAazMW86g8iFxDiw";
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("Users");
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][0].toLowerCase() === email.trim().toLowerCase()) {
      return data[i][2]; // Assuming the role is stored in the third column (column C)
    }
  }
  return null; // Return null if no user found
}

function getUserFirstName(email) {
  var spreadsheetId = "1plfPBtN0lgVYMvECDC9ZKgJ0HAcJAazMW86g8iFxDiw";
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("Users");
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][0].toLowerCase() === email.trim().toLowerCase()) {
      return data[i][4]; // Assuming the role is stored in the third column (column C)
    }
  }
  return null; // Return null if no user found
}*/

//function hashAdminPassword() {
  //var password = ''; // Replace with your real password
  //var salt = Utilities.getUuid(); // Generates a unique salt
  //var hashedPassword = hashPassword(password, salt);
  //Logger.log(hashedPassword); // Check the logs to see the salted hashed password
//}


function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('Deerfoot App') // Optional: set a title for your web app
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getFormHtml(formName) {
  var template;
  
  // Choose the correct template based on formName
  switch(formName) {
    case 'Receiving':
      template = HtmlService.createTemplateFromFile('ReceivingForm');
      break;
    case 'Signout':
      template = HtmlService.createTemplateFromFile('SignoutForm');
      break;
    case 'SignIn':
      template = HtmlService.createTemplateFromFile('SignInForm');
      break;
    case 'SiteHazard':
      template = HtmlService.createTemplateFromFile('SiteHazardFormContent');
      break;
    case 'StoreForklift':
      template = HtmlService.createTemplateFromFile('StoreForkliftInspectionForm');
      break;
    case 'DFSForklift':
      template = HtmlService.createTemplateFromFile('ForkliftDFSInspectionForm');
      break;
    case 'StoreInspection':
      template = HtmlService.createTemplateFromFile('StoreInspectionForm');
      break;
    case 'DFSWarehouse':
      template = HtmlService.createTemplateFromFile('WarehouseInspectionsForm');
      break;
    case 'Chevy':
      template = HtmlService.createTemplateFromFile('ChevyInspectionForm');
      break;
    case 'Isuzu':
      template = HtmlService.createTemplateFromFile('IsuzuInspectionForm');
      break;
    default:
      return 'Form not found';
  }
  
  // Set a common title or other properties, if necessary
  template.title = formName + ' Form'; // Or any other title you wish to set
  
  // Evaluate the template and return the HTML content
  return template.evaluate().getContent();
}

function getLoginForm() {
  var template = HtmlService.createTemplateFromFile('Index.html');
  template.title = 'Login';  // Set the title for the page
  return template.evaluate().getContent();
}

function getRegistrationPage() {
  var template = HtmlService.createTemplateFromFile('Register.html');
  template.title = 'Registration Form';  // Set the title for the page
  return template.evaluate().getContent();
}

function getSelectionScreen() {
  var template = HtmlService.createTemplateFromFile('SelectionScreen.html');
  template.title = 'Registration Form';  // Set the title for the page
  return template.evaluate().getContent();
}

function checkLogin(email, password) {
  var sheet = SpreadsheetApp.openById("1plfPBtN0lgVYMvECDC9ZKgJ0HAcJAazMW86g8iFxDiw").getSheetByName("Users");
  var users = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues(); // Fetch data from columns 1 to 4

  for (var i = 0; i < users.length; i++) {
    if (users[i][0].toLowerCase().trim() === email.toLowerCase().trim()) {
      var passwordDetails = users[i][1].split(':');
      var salt = passwordDetails[0];
      var storedHash = passwordDetails[1];
      var hash = hashPassword(password, salt);
      if (hash.split(':')[1] === storedHash) {
        return {
          success: true,
          role: users[i][2],
          name: users[i][3] || 'No Name Provided', // Return the full name or a default message
          first: users[i][4] || 'No Name Provided' // Return the first name or a default message
        };
      }
      break; // Stop searching once the email is found
    }
  }
  return { success: false }; // Return failure if no email matches or password doesn't match
}


function hashPassword(password, salt) {
  var blob = Utilities.newBlob(salt + password).getBytes();
  var hashed = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, blob);
  var hashedText = hashed.reduce(function(str, chr) {
    chr = (chr < 0 ? chr + 256 : chr).toString(16);
    return str + (chr.length === 1 ? '0' : '') + chr;
  }, '');
  return salt + ':' + hashedText; // Concatenate salt and hash to store together
}

function registerUser(email, password) {
  try {
    var spreadsheetId = "1plfPBtN0lgVYMvECDC9ZKgJ0HAcJAazMW86g8iFxDiw";
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var usersSheet = ss.getSheetByName("Users");
    var approvedEmailsSheet = ss.getSheetByName("ApprovedEmails");

    // Fetch the pre-approved list of emails
    var approvedEmailsRange = approvedEmailsSheet.getDataRange();
    var approvedEmails = approvedEmailsRange.getValues().map(function (r) { return r[0].toLowerCase(); });

    // Check if the email is on the pre-approved list
    if (approvedEmails.indexOf(email.toLowerCase()) === -1) {
      // Email not on the pre-approved list
      return { success: false, message: "Email is not approved for registration" };
    }

    // Check if the email already exists in the Users sheet
    var users = usersSheet.getDataRange().getValues();
    for (var i = 0; i < users.length; i++) {
      if (users[i][0].toLowerCase() === email.toLowerCase()) {
        // Email already exists
        return { success: false, message: "Email already registered" };
      }
    }

    // Generate a unique salt for the user
    var salt = Utilities.getUuid();
    
    // Hash the password here before storing it
    var hashedPassword = hashPassword(password, salt);

    // Store the new user's information
    usersSheet.appendRow([email, hashedPassword, "user"]); // Assuming the role is "user"

    // Registration successful
    return { success: true, message: "User registered successfully" };

  } catch (e) {
    // Handle any errors that occur during the process
    Logger.log(e.toString());
    return { success: false, message: "An error occurred during registration." };
  }
}

function formatDateToMMDDYYYY(dateString) {
  if (!dateString) return ''; // If dateString is null or undefined, return an empty string

  var dateParts = dateString.split('-'); // Split the string into [yyyy, mm, dd]
  if (dateParts.length === 3) {
    var year = dateParts[0];
    var month = dateParts[1];
    var day = dateParts[2];

    return month + '/' + day + '/' + year; // Reformat to mm/dd/yyyy
  } else {
    return dateString; // If the dateString is not in the expected format, return it unchanged
  }
}

function handleSignIn(formData) {
    var ss = SpreadsheetApp.openById('1o2bkv1EWfJhzGA05RVu4YDygI6ewPWz5DnaGywkrZHs');
    var sheet = ss.getSheetByName('signouts');
    if (!sheet) {
        Logger.log("Error: Signout sheet not found.");
        throw new Error("Signout sheet not found.");
    }

    var found = false;  // Flag to track if the customer is found
    var rows = sheet.getDataRange().getValues();  // Get all data in the sheet

    for (var i = 1; i < rows.length; i++) {  // Start from 1 to skip header row
        if (rows[i][1].trim().toLowerCase() === (formData.customer || '').trim().toLowerCase()) {  // Column B for Customer
            sheet.deleteRow(i + 1);  // Delete the row (account for header offset)
            found = true;
            break;  // Stop after the first match, remove this to delete all matches
        }
    }

    if (!found) {
        Logger.log("Customer not in signout database.");
        throw new Error("Customer not in signout database.");
    }
}

function getCustomerDetails(searchValue) {
    var ss = SpreadsheetApp.openById('1o2bkv1EWfJhzGA05RVu4YDygI6ewPWz5DnaGywkrZHs');
    var sheet = ss.getSheetByName('signouts');
    var data = sheet.getDataRange().getValues();
    var results = [];
    searchValue = searchValue.toLowerCase();

    for (var i = 1; i < data.length; i++) {
        var customer = data[i][1].toString().toLowerCase();
        var phone = data[i][2].toString().toLowerCase();
        if (customer.includes(searchValue) || phone.includes(searchValue)) {
            results.push({
                customer: data[i][1],
                phone: data[i][2],
                sales: data[i][3],
                items: data[i][4],
                notes: data[i][5]
            });
        }
    }
    return results;
}

/*function getCustomerDetails(customerName, phone) {
    var ss = SpreadsheetApp.openById('1o2bkv1EWfJhzGA05RVu4YDygI6ewPWz5DnaGywkrZHs');
    var sheet = ss.getSheetByName('signouts');
    var data = sheet.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {  // Skip header row
        if ((customerName && data[i][1].toLowerCase() === customerName.toLowerCase()) ||
            (phone && data[i][2] === phone)) {
            return {
                name: data[i][1],
                phone: data[i][2],
                sales: data[i][3],
                items: data[i][4],
                notes: data[i][5]
            };
        }
    }
    return null;
}*/

function createPDF(formData, config) {
    Logger.log("Received form data: " + JSON.stringify(formData));
    var customerName = formData.customer || 'N/A';
    var poHandler = formData.poHandler || 'N/A';

    // Construct PDF title with defaults
    var pdfTitle = config.title
                .replace('{customer}', customerName)
                .replace('{PO}', poHandler);
                    
    var doc = DocumentApp.create(pdfTitle);
    var body = doc.getBody();
    var header = doc.getHeader() || doc.addHeader();

    var headerTable = header.appendTable();
    var tableRow = headerTable.appendTableRow();
    var cellStyle = {};
    cellStyle[DocumentApp.Attribute.BORDER_WIDTH] = 0;
    headerTable.setAttributes(cellStyle);

    var imageCell = tableRow.appendTableCell();
    var timeStampCell = tableRow.appendTableCell();

    var imageBlob = DriveApp.getFileById(config.imageId).getBlob();
    var image = imageCell.insertImage(0, imageBlob);
    image.setWidth(config.imageWidth);
    image.setHeight(config.imageHeight);

    var now = new Date();
    var timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), 'MM/dd/yyyy HH:mm:ss');
    timeStampCell.setText(timestamp);
    var timestampParagraph = timeStampCell.getChild(0).asParagraph();
    timestampParagraph.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);

    // Ensure that formData fields have defaults before use
    var customerName = formData.customer || 'N/A'; // Assuming customer is pulled directly from formData earlier
    var poHandler = formData.poHandler || 'N/A';

    // Formatting the date, this remains unchanged
    var formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'MM/dd/yyyy');

    // Construct the document title with safe defaults and replace placeholders
    body.appendParagraph(config.formTitle
                      .replace('{customer}', customerName)
                      .replace('{PO}', poHandler) + ' (' + formattedDate + ')')
        .setHeading(DocumentApp.ParagraphHeading.HEADING1)
        .setAlignment(DocumentApp.HorizontalAlignment.CENTER);

    body.appendParagraph(""); // Empty paragraph for spacing

    // Create the first details table with labels and results in the same cell
    var detailsTable = body.appendTable();
    var rowIndex = 0;
    for (var i = 0; i < config.fields.length; i++) {
        // If the current index is even, or it's the last element, create a new row
        if (i % 2 === 0 || i === config.fields.length - 1) {
            detailsTable.appendTableRow();
        }

        // Current row
        var row = detailsTable.getRow(rowIndex);

        // Current field and its value
        var field = config.fields[i];
        var fieldValue = formData[field.name] || 'N/A';
        var labelText = field.label;
        var fullText = labelText + fieldValue;

        // Append the cell with label and value
        var cell = row.appendTableCell(fullText);

        // Apply bold styling to the label part of the text
        var cellText = cell.editAsText();
        cellText.setBold(0, labelText.length - 1, true); // -1 adjusts for the colon and space

        // Move to the next row after filling two cells or if it's the last element
        if (i % 2 !== 0 || i === config.fields.length - 1) {
            rowIndex++;
        }
    }

    body.appendHorizontalRule();

    // Checklist table with header
    if (config.checklistFields && config.checklistFields.length > 0 && config.checklistHeaders && Object.keys(config.checklistHeaders).length > 0) {
    var checklistTable = body.appendTable();
    var headerRow = checklistTable.appendTableRow();
    
    if (config.checklistHeaders.columns) {
        config.checklistHeaders.columns.forEach(function(columnName) {
            var headerCell = headerRow.appendTableCell(columnName);
            headerCell.setBackgroundColor(config.checklistHeaders.backgroundColor);
            var headerCellText = headerCell.editAsText();
            headerCellText.setBold(true); // Set header text to bold
        });
    }

    config.checklistFields.forEach(function(field) {
        var row = checklistTable.appendTableRow();
        var labelCell = row.appendTableCell(field.label);
        var labelCellText = labelCell.editAsText();
        labelCellText.setBold(true); // Bold the label text

        var responseText = formData[field.name] || 'N/A'; // Assume unchecked checkboxes result in absence from formData
        var responseCell = row.appendTableCell(responseText);
        var responseCellText = responseCell.editAsText();
        responseCellText.setBold(false);
    });
    }

    config.longFormFields.forEach(function(fieldConfig) {
        // Create the title paragraph for the long-form field, bold it
        var titleParagraph = body.appendParagraph(fieldConfig.label);
        titleParagraph.setBold(true);
        
        // Get the user response for the long-form field
        var userResponse = formData[fieldConfig.name] || 'N/A';  // Default to 'N/A' if no response
        // Create the content paragraph for the long-form field
        var contentParagraph = body.appendParagraph(userResponse);
        contentParagraph.setBold(false); // Ensure the response is not bolded
    });

    doc.saveAndClose();
    Utilities.sleep(2000);  // Wait for the document to save
    

    var docFile = DriveApp.getFileById(doc.getId());
    var pdfBlob = docFile.getAs(MimeType.PDF); // Ensure this is returning a PDF blob
    Logger.log("PDF created and blob obtained with size: " + pdfBlob.getBytes().length + " bytes and MIME type: " + pdfBlob.getContentType());
    return { pdfBlob: pdfBlob, docId: doc.getId() };
}

function createForkliftPDF(formData, config) {
    Logger.log("Received form data: " + JSON.stringify(formData));

    var pdfTitle = config.title;
    var doc = DocumentApp.create(pdfTitle);
    var body = doc.getBody();
    var header = doc.getHeader() || doc.addHeader();

    // Set up the header table
    var headerTable = header.appendTable();
    var tableRow = headerTable.appendTableRow();
    var cellStyle = {};
    cellStyle[DocumentApp.Attribute.BORDER_WIDTH] = 0;
    headerTable.setAttributes(cellStyle);

    // Adding image to header
    var imageCell = tableRow.appendTableCell();
    var imageBlob = DriveApp.getFileById(config.imageId).getBlob();
    var image = imageCell.insertImage(0, imageBlob);
    image.setWidth(config.imageWidth);
    image.setHeight(config.imageHeight);

    // Adding timestamp to header
    var now = new Date();
    var timeStampCell = tableRow.appendTableCell(Utilities.formatDate(now, Session.getScriptTimeZone(), 'MM/dd/yyyy HH:mm:ss'));
    timeStampCell.getChild(0).asParagraph().setAlignment(DocumentApp.HorizontalAlignment.RIGHT);

    // Title of the document
    var formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'MM/dd/yyyy');

    // Append paragraph with title and formatted date
    body.appendParagraph(config.formTitle + ' (' + formattedDate + ')')
        .setHeading(DocumentApp.ParagraphHeading.HEADING1)
        .setAlignment(DocumentApp.HorizontalAlignment.CENTER);

    // Adding an empty paragraph for spacing
    body.appendParagraph("");

    // Handling the first details table with labels and results in the same cell
    var detailsTable = body.appendTable();
    config.fields.forEach(function(field, index) {
        var row = detailsTable.appendTableRow();
        var fullText = field.label + (formData[field.name] || 'N/A');
        var cell = row.appendTableCell(fullText);
        cell.editAsText().setBold(0, field.label.length - 1, true);
    });

    body.appendHorizontalRule();

    // Constructing the two-column checklist
    constructChecklistTable(body, formData, config);

    config.longFormFields.forEach(function(fieldConfig) {
        // Create the title paragraph for the long-form field, bold it
        var titleParagraph = body.appendParagraph(fieldConfig.label);
        titleParagraph.setBold(true);
        
        // Get the user response for the long-form field
        var userResponse = formData[fieldConfig.name] || 'N/A';  // Default to 'N/A' if no response
        // Create the content paragraph for the long-form field
        var contentParagraph = body.appendParagraph(userResponse);
        contentParagraph.setBold(false); // Ensure the response is not bolded
    });

    // Saving the document
    doc.saveAndClose();
    Utilities.sleep(2000); // Ensure the document has time to save properly

    // Converting to PDF and returning
    var docFile = DriveApp.getFileById(doc.getId());
    var pdfBlob = docFile.getAs(MimeType.PDF);
    Logger.log("PDF created and blob obtained with size: " + pdfBlob.getBytes().length + " bytes and MIME type: " + pdfBlob.getContentType());
    return { pdfBlob: pdfBlob, docId: doc.getId() };
}


//for Forklift pdf
function constructChecklistTable(body, formData, config) {
    var checklistTable = body.appendTable();
    var headerRow = checklistTable.appendTableRow();

    // Setting headers for checklist
    if (config.checklistHeaders && config.checklistHeaders.columns) {
        config.checklistHeaders.columns.forEach(function(columnName) {
            var headerCell = headerRow.appendTableCell(columnName);
            headerCell.setBackgroundColor(config.checklistHeaders.backgroundColor);
            headerCell.editAsText().setBold(true);
        });
    }

    // Split the checklistFields into two groups for two columns
    var firstColumnFields = config.checklistFields.slice(0, 9);  // First 9 fields for Visual Inspection
    var secondColumnFields = config.checklistFields.slice(9);    // Next 9 fields for Operational Inspection
    var maxRows = Math.max(firstColumnFields.length, secondColumnFields.length);

    // Append rows with two columns: one for each inspection type
    for (var i = 0; i < maxRows; i++) {
        var row = checklistTable.appendTableRow();

        // Handle each column by combining prompt and response in one cell
        appendChecklistField(row, firstColumnFields[i], formData);
        appendChecklistField(row, secondColumnFields[i], formData);
    }
}

//for forklift pdf
function appendChecklistField(row, field, formData) {
    if (field) {
        var responseText = formData[field.name] || 'N/A';  // Use 'N/A' if no response provided
        var fullText = field.label + responseText;  // Combine label and response into one string

        var cell = row.appendTableCell(fullText);
        var cellText = cell.editAsText();

        // Set bold for the label
        var labelEnd = field.label.length;
        if (labelEnd > 0 && labelEnd <= fullText.length) {
            cellText.setBold(0, labelEnd - 1, true); // Bold from start to just before the label ends
        }

        // Set the response part to not be bold
        if (labelEnd < fullText.length) {
            cellText.setBold(labelEnd, fullText.length -1, false); // Set the response text not bold
        }

        // Check if the response is "Unacceptable" and set the text color to red
        if (responseText === "Unacceptable") {
            cellText.setForegroundColor(labelEnd, fullText.length -1, "#FF0000"); // Set color to red
        }
    } else {
        row.appendTableCell("");  // Append an empty cell if there is no field
    }
}

function handleFormSubmit(formData) {
    // Initial logging to confirm function is called and log received formData
    Logger.log("Received form data: " + JSON.stringify(formData));

    var config = formConfigs[formData.formType];
    if (!config) {
        Logger.log("Form type configuration not found for type: " + formData.formType);
        return;
    }

    // Log the configuration to ensure it is loaded correctly
    Logger.log("Configuration loaded: " + JSON.stringify(config));

    // Initialize a flag to detect any unacceptable responses
    var hasUnacceptableResponse = false;

    // Check for "Unacceptable" responses in the formData
    Object.keys(formData).forEach(key => {
        if (formData[key] === "Unacceptable") {
            hasUnacceptableResponse = true;
        }
    });

    // Additional logging to verify data before processing emails and PDFs
    Logger.log("Customer: " + formData.customer);
    Logger.log("PO Handler: " + formData.poHandler);
    Logger.log("Full Name Field: " + formData.fullNameField);
    Logger.log("Recipient Name: " + formData.recipientName);
    Logger.log("Sales: " + formData.sales);
    Logger.log("Phone: " + formData.phone);
    Logger.log("Address: " + formData.address);
    Logger.log("Items: " + formData.items);
    Logger.log("Notes: " + formData.notes);

    // More detailed logging for item details
    Logger.log("Items In Details: " + formData['itemsInDetails']);
    Logger.log("Items Still Out: " + formData['itemsStillOut']);

    var now = new Date();
    var timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), 'MM/dd/yyyy');


// Ensure formData fields have defaults before use
var customer = formData.customer || 'N/A';
var poHandler = formData.poHandler || 'N/A';
var fullNameField = formData.fullNameField || 'N/A';
var recipientName = formData.recipientName || 'No Recipient Name';
var sales = formData.sales || 'there';
var phone = formData.phone || 'No Contact Number';
var address = formData.address || 'Address not provided';

// Enhanced safety for items to ensure it is always treated as a string
var items = formData.items ? 'the following items:\n\n• ' + String(formData.items).replace(/; /g, '\n• ') : 'some items';
var notes = formData.notes || 'No notes provided';

// Retrieve details about items in and out
var itemsInDetails = formData['itemsInDetails'] || 'No details available';
var itemsStillOut = formData['itemsStillOut'] || 'No items still out';
Logger.log("Items In Details: " + itemsInDetails);
Logger.log("Items Still Out: " + itemsStillOut);

// Construct email subject and body with defaults and replace placeholders
var emailSubject = (hasUnacceptableResponse ? config.alertEmailSubject : config.emailSubject)
                    .replace('{customer}', customer)
                    .replace('{PO}', poHandler)
                    .replace('{installer}', fullNameField);
var emailBody = (hasUnacceptableResponse ? config.alertEmailBodyTemplate : config.emailBodyTemplate)
                    .replace('{customer}', customer)
                    .replace('{recipientName}', recipientName)
                    .replace('{sales}', sales)
                    .replace('{phone}', phone)
                    .replace('{PO}', poHandler)
                    .replace('{installer}', fullNameField)
                    .replace('{address}', address)
                    .replace('{items}', items)
                    .replace('{notes}', notes);
    
    // Create the PDF only for form types other than 'signIn'
    if (formData.formType === 'signout') {
        // Proceed with signing out process
        try {
            sendEmailWithoutAttachment(formData.recipientEmail, emailBody, emailSubject);
            Logger.log("Email sent successfully with PDF attachment for signout");
            // Move items to the "Signed Out Items" sheet after successful email send
            writeToSignoutSpreadsheet(formData, timestamp);
        } catch (e) {
            Logger.log("Failed to process signout: " + e.toString());
        }
    } else if (formData.formType === 'signIn') {

      var customerName = formData.customerName;
      var phoneNumber = formData.phoneNumber;
      var salesContact = formData.salesContact;
      var items = formData.itemsInDetails + "; " + formData.itemsStillOut;
      Logger.log("Items prepared for email: " + items);
      var originalNotes = formData.originalNotes;
      var itemsInDetails = formData.itemsInDetails || "";
      var itemsStillOut = formData.itemsStillOut || ""; 
      var returningNotes = formData.returnNotes || "N/A"

      // Split the items by ";", trim whitespace, add a bullet point and newline
      var formattedItemsInDetails = itemsInDetails.split(';')
                                .map(item => item.trim())
                                .filter(item => item)  // Ensure no empty strings
                                .map(item => "• " + item)
                                .join('\n');

      var formattedItemsStillOut = itemsStillOut.split(';')
                                .map(item => item.trim())
                                .filter(item => item)  // Ensure no empty strings
                                .map(item => "• " + item)
                                .join('\n');

      var emailBody = 'Hello, ' + salesContact + '\n\n' +
                'Your customer ' + customerName + ' has returned the following samples:\n\n' +
                formattedItemsInDetails + '\n\n';

                if (formattedItemsStillOut) {
                    emailBody += 'Samples not returned yet:\n\n' + formattedItemsStillOut + '\n\n';
                }

                emailBody += 'Contact phone number: ' + phoneNumber + '\n' +
                            'Original notes: ' + originalNotes + '\n\n' +
                            'Returning notes: ' + returningNotes;

        // Process signIn form, similar to previous but skip PDF creation
        try {
            sendEmailWithoutAttachment(formData.recipientEmail, emailBody, emailSubject);
            Logger.log("Email sent successfully for signIn without PDF attachment");
            Logger.log("Attempting to call updateSpreadsheetOnSignIn");
            updateSpreadsheetOnSignIn(formData.customerName, formData.itemsInDetails.split('; '));
            Logger.log("Called updateSpreadsheetOnSignIn successfully");
        } catch (e) {
            Logger.log("Failed to send email for signIn or update spreadsheet: " + e.toString());
        }
    } else if (formData.formType === 'storeForklift' || formData.formType === 'dFSForklift') {
        try {
            var result = createForkliftPDF(formData, config);
            sendEmailWithAttachment(result.pdfBlob, formData.recipientEmail, emailBody, emailSubject);
            Logger.log("Email sent successfully with PDF attachment for other form types");
        } catch (e) {
            Logger.log("Failed to send email for other form types: " + e.toString());
        }
    } else {
        // Handle other form types, including PDF creation
        try {
            var result = createPDF(formData, config);
            sendEmailWithAttachment(result.pdfBlob, formData.recipientEmail, emailBody, emailSubject);
            Logger.log("Email sent successfully with PDF attachment for other form types");
        } catch (e) {
            Logger.log("Failed to send email for other form types: " + e.toString());
        }
    }
}

function sendEmailWithAttachment(pdfBlob, recipientEmail, emailBody, emailSubject) {
    try {
        MailApp.sendEmail({
            to: recipientEmail,
            subject: emailSubject,
            body: emailBody,
            attachments: [pdfBlob]
        });
        Logger.log("Email sent successfully with the PDF attached.");
    } catch (e) {
        Logger.log("Failed to send email with PDF: " + e.toString());
    }
}

function sendEmailWithoutAttachment(recipientEmail, emailBody, emailSubject) {
    try {
        MailApp.sendEmail({
            to: recipientEmail,
            subject: emailSubject,
            body: emailBody,
        });
        Logger.log("Email sent successfully.");
    } catch (e) {
        Logger.log("Failed to send email " + e.toString());
    }
}

//Item database related functions

function getItems(query) {
    var spreadsheetId = '1o2bkv1EWfJhzGA05RVu4YDygI6ewPWz5DnaGywkrZHs';
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName("Available Items Database");

    SpreadsheetApp.flush();  // Ensure data is current
    var data = sheet.getDataRange().getValues();

    var itemsCountMap = {};
    query = query.trim().toLowerCase();

    for (var i = 1; i < data.length; i++) {
        var key = (data[i][1] + ' - ' + data[i][2]).toLowerCase();  // Create key from style and color
        if (key.includes(query)) {
            if (!itemsCountMap[key]) {
                itemsCountMap[key] = {
                    itemNumber: data[i][0],
                    styleName: data[i][1],
                    colorName: data[i][2],
                    manufacturer: data[i][3],
                    count: 0
                };
            }
            itemsCountMap[key].count++;
        }
    }

    var matchedItems = Object.values(itemsCountMap).map(item => ({
        ...item,
        fullName: `${item.styleName} - ${item.colorName}`  // Include count in fullName
    }));

    matchedItems.sort((a, b) => a.fullName.localeCompare(b.fullName));

    return matchedItems.slice(0, 15);
}

function writeToSignoutSpreadsheet(formData, timestamp) {
    var ss = SpreadsheetApp.openById('1o2bkv1EWfJhzGA05RVu4YDygI6ewPWz5DnaGywkrZHs');
    var sheet = ss.getSheetByName('signouts');
    if (!sheet) {
        // Create the 'signouts' sheet if it doesn't exist
        sheet = ss.insertSheet('signouts');
    }

    var customerName = formData.customer || 'Unknown Customer';
    var existingNames = sheet.getRange(1, 2, sheet.getLastRow(), 1).getValues(); // Get all customer names in column 2
    var nameCount = 1; // Start counting occurrences

    // Check for existing names and increment nameCount accordingly
    existingNames.forEach(function(row) {
        if (row[0].startsWith(customerName)) {
            nameCount++;
        }
    });

    // Modify customer name if it has been found before
    if (nameCount > 1) {
        customerName += " (" + nameCount + ")";
    }

    // Prepare the row to append
    var row = [
        timestamp,  // Timestamp
        customerName,  // Customer
        formData.phone || 'No Contact Number',  // Phone
        formData.sales || 'Unknown Salesperson',  // Sales
        formData.items || 'No items listed', //Items
        formData.notes || 'N/A'  // Notes
    ];

    // Append the row to the sheet
    sheet.appendRow(row);
}

Logger.log("Defining the updateSpreadsheetOnSignIn function");

function updateSpreadsheetOnSignIn(customerName, signedInItems) {
    var ss = SpreadsheetApp.openById('1o2bkv1EWfJhzGA05RVu4YDygI6ewPWz5DnaGywkrZHs');
    var sheet = ss.getSheetByName('signouts'); // Replace with your actual sheet name
    var dataRange = sheet.getDataRange();
    var values = dataRange.getValues();

    var itemsColumnIndex = 4; // Assuming items are in the fifth column
    var nameColumnIndex = 1; // Names are in the second column

    signedInItems = signedInItems.map(item => item.toLowerCase().trim()); // Normalize signed-in items for comparison

    for (var i = 1; i < values.length; i++) {
        var rowName = values[i][nameColumnIndex];
        var rowItems = values[i][itemsColumnIndex];

        if (rowName && rowName.toString().trim().toLowerCase() === customerName.trim().toLowerCase()) {
            var currentItems = rowItems.split(';').map(item => item.trim().toLowerCase());
            var remainingItems = currentItems.filter(item => !signedInItems.includes(item));

            Logger.log('Row ' + (i + 1) + ', Processed Items: ' + currentItems.join('; ') +
                       ', Remaining Items: ' + remainingItems.join('; '));

            if (remainingItems.length > 0) {
                sheet.getRange(i + 1, itemsColumnIndex + 1).setValue(remainingItems.join('; '));
            } else {
                sheet.deleteRow(i + 1); // Delete the row if no items are left
                break; // Stop loop to avoid errors after deleting a row
            }
        }
    }
}

Logger.log("updateSpreadsheetOnSignIn function defined");

function getSelectedItemsForReturn() {
    var itemDivs = document.querySelectorAll('#selectedItemsContainer .selected-item'); // Assuming each item is in a div with class 'selected-item'
    var items = [];
    itemDivs.forEach(function(div) {
        items.push(div.textContent); // or any other relevant data attribute that represents the item
    });
    return items;
}