function handleLogin() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var rememberMe = document.getElementById('rememberMe').checked;
  var loginButton = document.querySelector('.userInfoForm-button'); // Reference the login button

  // Save email to localStorage if rememberMe is checked
  if (rememberMe) {
    localStorage.setItem('rememberedEmail', email);
  } else {
    localStorage.removeItem('rememberedEmail');
  }

  // Disable the login button and change the text to show a loading state
  loginButton.disabled = true;
  loginButton.innerHTML = 'Logging in... <span class="spinner"></span>';

  google.script.run.withSuccessHandler(function(result) {
    if (result.success) {
      localStorage.setItem('userName', result.name);
      localStorage.setItem('firstName', result.first);
      localStorage.setItem('userRole', result.role);
      gotoSelectionScreen();
    } else {
      alert('Login failed. Please check your credentials.');
    }
    // Reset the login button state
    loginButton.disabled = false;
    loginButton.innerHTML = 'Login';
  }).withFailureHandler(function() {
    // Reset the login button state upon failure and alert the user
    loginButton.disabled = false;
    loginButton.innerHTML = 'Login';
    alert('Login failed. Please check your credentials.');
  }).checkLogin(email, password);
}

function fillInFullName() {
    var userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('fullNameField').value = userName;
    }
}

function updateFormSelection() {
    const userRole = localStorage.getItem('userRole');

    // Define all buttons with their required roles
    const buttons = [
        { id: 'Signout', text: 'Customer Signout', roles: ['Sales', 'Operations'] },
        { id: 'SignIn', text: 'Sample Returns', roles: ['Sales', 'Operations'] },
        { id: 'Receiving', text: 'Receiving', roles: ['Sales', 'Operations'] },
        { id: 'SiteHazard', text: 'Site Hazard Assessment', roles: ['Sales', 'Operations', 'Installer'] },
        { id: 'StoreForklift', text: 'Store Forklift Inspection', roles: ['Operations'] },
        { id: 'DFSForklift', text: 'DFS Forklift Inspection', roles: ['Operations'] },
        { id: 'StoreInspection', text: 'Store Inspection', roles: ['Operations'] },
        { id: 'DFSWarehouse', text: 'DFS Warehouse Inspection', roles: ['Operations'] },
        { id: 'Chevy', text: 'Chevy Colorado Inspection', roles: ['Operations'] },
        { id: 'Isuzu', text: 'Isuzu Truck Inspection', roles: ['Operations'] }
    ];

    // Filter and map buttons based on the user role
    html += buttons.filter(button => button.roles.includes(userRole))
                   .map(button => `<button onclick="gotoForm('${button.id}')">${button.text}</button>`)
                   .join('');

    document.getElementById('formSelection').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the user role from localStorage
    const userRole = localStorage.getItem('userRole');
    
    // Select all button elements within the form selection div
    const buttons = document.querySelectorAll('#formSelection button');
    
    // Loop through each button to determine if it should be displayed
    buttons.forEach(button => {
        const allowedRoles = button.getAttribute('data-role').split(" ");
        if (!allowedRoles.includes(userRole)) {
            button.style.display = 'none'; // Hide buttons not allowed for the user role
        }
    });
});

function fillInFirstName() {
    var firstName = localStorage.getItem('firstName');
    if (firstName) {
        document.getElementById('firstNameField').value = firstName;
    }
}

function handleUserRedirect(role) {
    if (role === 'admin') {
        document.getElementById('formContainer').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
        // window.location.href = 'adminPage'; // Optionally redirect
    } else {
        document.getElementById('formContainer').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
    }
}

function handleRegister() {
  google.script.run.withSuccessHandler(function(returnedHtml) {
    // Replace the current HTML with the HTML from the Register.html
    document.open();
    document.write(returnedHtml);
    document.close();
  }).getRegistrationPage();
}


function gotoForm(formName) {
  google.script.run.withSuccessHandler(function(html) {
    var container = document.getElementById('main-container');
    container.innerHTML = html; // Insert the HTML content for the selected form*/

    // Common functions needed for all forms
    fillInFullName();
    defaultDateToday();
    populateRecipientEmails();

    // Call functions based on the formName
    switch(formName) {
      case 'Receiving':
        attachDynamicPoListener(); // Call functions that set up event listeners or initial values
        break;
      case 'Signout':
        initSignoutForm();
        break; 
      case 'SignIn':
        setupRemoveButtons();
        initSignInForm();
        break; 
      case 'SiteHazard':
        break;
      case 'StoreForklift':
        break;
      case 'DFSForklift':
        break;
      case 'StoreInspection':
        break;
      case 'DFSWarehouse':
        break;
      case 'Chevy':
        break;
      case 'Isuzu':
        break;
      // Add more cases as necessary for different forms
    }
  }).getFormHtml(formName);
}

function initSignoutForm() {
    // Assuming your input field has an ID 'itemInput'
    var itemInput = document.getElementById('itemInput');
    if (itemInput) {
        // Attach the debounced search to the input event
        itemInput.addEventListener('input', debounce(function() {
            searchItems(this.value);
        }, 600));
    }

    // Setup the container to listen for clicks on suggested items
    var suggestions = document.getElementById('suggestions');
    if (suggestions) {
        suggestions.addEventListener('click', function(event) {
            if (event.target && event.target.nodeName === 'DIV') { // Ensure clicks are on item divs
                var selectedItem = event.target.textContent;
                itemInput.value = ''; // Optional: clear input after selection
                suggestions.style.display = 'none'; // Hide suggestions after selection
            }
        });
    }
}

function initSignInForm() {
    // Event listener for loading customer details
    var loadButton = document.getElementById('loadCustomerDetailsButton');
    if (loadButton) {
        loadButton.addEventListener('click', loadCustomerDetails);
    }


    // Setup for handling item returns
    var returnItemsButton = document.getElementById('returnItemsButton');
    if (returnItemsButton) {
        returnItemsButton.addEventListener('click', function() {
            var selectedItems = getSelectedItemsForReturn(); // Define this function to fetch selected items
            selectedItems.forEach(item => {
                updateSignoutSheet(item, 'return', document.getElementById('customer').value);
            });
        });
    }


    // Ensure that initialization happens after the DOM is fully loaded
    if (document.readyState === 'complete') {
        setupFormAfterDOMLoad(); // Directly call setup if DOM is already loaded
    } else {
        document.addEventListener('DOMContentLoaded', setupFormAfterDOMLoad); // Defer setup until DOM is completely loaded
    }
}

function gotoSelectionScreen() {
  google.script.run.withSuccessHandler(function(returnedHtml) {
    var mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = returnedHtml; // Set the new HTML
  }).getSelectionScreen();
}

function gotoSelectionScreen() {
  google.script.run.withSuccessHandler(function(returnedHtml) {
    var mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = returnedHtml; // Set the new HTML
    updateFormSelection(); // Update form buttons based on user role after HTML is set
  }).getSelectionScreen();
}

function gotoReceivingForm() {
  google.script.run.withSuccessHandler(function(returnedHtml) {
    var mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = returnedHtml; // Set the new HTML

    // After setting innerHTML, reattach event listeners
    attachDynamicPoListener();
    defaultDateToday()
    populateRecipientEmails(); // Call this after the new HTML is loaded to populate the dropdown.
  }).getReceivingForm();
}

function attachDynamicPoListener() {
  const poInput = document.getElementById('poReceived');
  const submitButton = document.getElementById('ReceiveSubmitButton');

  if (poInput && submitButton) {
    poInput.addEventListener('input', function() {
      const poValue = poInput.value.trim();
      submitButton.value = poValue ? `Receive items for PO: ${poValue}` : 'Receive items';
    });
  } else {
    console.error('Form elements not found');
  }
}

function loadCustomerDetails() {
  var searchValue = document.getElementById('searchField').value;
  if (searchValue) {
    google.script.run.withSuccessHandler(displayCustomerDetails).getCustomerDetails(searchValue);
  } else {
    document.getElementById('details').innerText = 'Please enter a search term.';
  }
}

function defaultDateToday() {
  const dateInput = document.getElementById('date');
  const today = new Date();
  const date = today.getFullYear() + '-' + 
               ('0' + (today.getMonth() + 1)).slice(-2) + '-' + 
               ('0' + today.getDate()).slice(-2); // Format the date as YYYY-MM-DD
  dateInput.value = date;
}

function gotoLoginForm() {
  google.script.run.withSuccessHandler(function(returnedHtml) {
    var mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = returnedHtml; // Set the new HTML
  }).getLoginForm();
}


function populateRecipientEmails() {
  google.script.run.withSuccessHandler(function(recipients) {
    var select = document.getElementById('recipientEmail');
    if (select) {
      recipients.forEach(function(recipient) {
        var option = document.createElement('option');
        option.value = recipient.email; // Set the email as the option's value.
        option.textContent = recipient.name; // Set the recipient name as the option text.
        select.appendChild(option);
      });
      select.onchange = updateRecipientName; // Attach the update function directly.
    } else {
      console.error('Select element not found');
    }
  }).withFailureHandler(function(error) {
    console.error('Error fetching recipient emails:', error);
  }).getRecipientEmails();
}

function updateRecipientName() {
    var select = document.getElementById('recipientEmail');
    var selectedOption = select.options[select.selectedIndex];
    if (selectedOption && selectedOption.value) { // Check if a valid option is selected
        document.getElementById('recipientName').value = selectedOption.textContent; // Set the recipient's name into the hidden input
        console.log("Recipient Name Updated: " + selectedOption.textContent); // Log the updated name
    }
}

function submitForm(formType) {
  event.preventDefault(); // Prevent default form submission
  
  var form = document.querySelector(`form[data-form-type="${formType}"]`);
  var formData = new FormData(form);
  var statusTitle = document.getElementById('statusTitle');
  var statusBody = document.getElementById('statusBody');
  
  // Hide the form and show the status message
  form.style.display = 'none';
  statusContainer.style.display = 'block';
  statusTitle.textContent = 'Please wait';
  statusBody.textContent = 'Your form is being processed.';

  // Include items in details
  var itemsInDetails = Array.from(document.querySelectorAll('#itemSection .itemBeingReturned'))
                          .map(item => item.textContent.trim().replace('Move', '')).join("; ");
  var itemsStillOut = Array.from(document.querySelectorAll('#itemsStillOut .itemBeingReturned'))
                            .map(item => item.textContent.trim().replace('Move', '')).join("; ");

  formData.append('itemsInDetails', itemsInDetails);
  formData.append('itemsStillOut', itemsStillOut);

  console.log("Items In Details logged from submitForm: " + itemsInDetails);
  console.log("Items Still Out logger from submitForm: " + itemsStillOut);

  console.log("Form Data Collected:"); // Log to see collected form data
  for (var pair of formData.entries()) {
    console.log(pair[0]+ ': ' + pair[1]);
  }

  var objectData = {formType: formType};
  formData.forEach(function(value, key) {
    objectData[key] = value;
  });

  google.script.run
    .withSuccessHandler(function() {
      showStatus('Success', 'Your form has been submitted successfully.', 'success');
    })
    .withFailureHandler(function(error) {
      console.error('Submission Error:', error);
      showStatus('Error', 'There was an issue submitting your form.', 'error');
      form.style.display = 'block';
    })
    .handleFormSubmit(objectData);

  return false;
}

function showStatus(title, message, statusType) {
  var statusContainer = document.getElementById('statusContainer');
  var statusTitle = document.getElementById('statusTitle');
  var statusBody = document.getElementById('statusBody');

  statusTitle.textContent = title;
  statusBody.textContent = message;
  statusContainer.className = 'status-container ' + statusType;
  statusContainer.style.display = 'block';
}

function retrySubmission() {
    var form = document.getElementById('siteHazardForm');
    var statusContainer = document.getElementById('statusContainer');

    // Hide the status message
    statusContainer.style.display = 'none';

    // Optionally reset the form fields
    form.reset();

    // Show the form again for a new submission attempt
    form.style.display = 'block';
}

  /*document.addEventListener('DOMContentLoaded', function() {
    google.script.run.withSuccessHandler(function(name) {
      if (name) {
        document.getElementById('nameField').value = name;
      }
    }).findNameByEmail(google.script.host.user);
  });*/

 document.addEventListener('DOMContentLoaded', function() {
    // Function to trigger login when Enter is pressed
    function triggerLoginOnEnter(event) {
      if (event.key === 'Enter') {
        handleLogin(); // Call the login function
        event.preventDefault(); // Prevent the default form submit
      }
    }
    // Add event listeners to the email and password fields
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    emailInput.addEventListener('keypress', triggerLoginOnEnter);
    passwordInput.addEventListener('keypress', triggerLoginOnEnter);
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Set up event delegation to handle clicks on dynamically loaded content
    document.body.addEventListener('click', function(event) {
        if (event.target.id === 'loadDetailsButton') {
            loadCustomerDetails();
        }
    });
  });

 /*document.addEventListener('DOMContentLoaded', function() {
    google.script.run.withSuccessHandler(function(recipients) {
      var select = document.getElementById('recipientEmail');
      recipients.forEach(function(recipient) {
        var option = document.createElement('option');
        option.value = recipient.email; // Use email as the value if needed
        option.textContent = recipient.name; // Display name for user selection
        select.appendChild(option);
      });
    }).getRecipientEmails();
  });*/


  document.addEventListener('DOMContentLoaded', (event) => {
    const handleCheckboxChange = (event) => {
      let name = event.target.name;
      document.querySelectorAll('input[type="checkbox"][name="' + name + '"]').forEach((chk) => {
        if(chk !== event.target) chk.checked = false;
      });
    };

    document.querySelectorAll('.receiving-checklist input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    var rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
  });

//item sign out

function submitItemForm(formType, event) {
    event.preventDefault(); // Prevent default form submission

    var form = document.querySelector(`form[data-form-type="${formType}"]`);
    var formData = new FormData(form);
    var statusTitle = document.getElementById('statusTitle');
    var statusBody = document.getElementById('statusBody');
    
    // Hide the form and show the status message
    form.style.display = 'none';
    statusContainer.style.display = 'block';
    statusTitle.textContent = 'Please wait';
    statusBody.textContent = 'Your form is being processed.';

    var objectData = {formType: formType};
    formData.forEach(function(value, key) {
        objectData[key] = value;
    });

    // Handle elements specific to the 'signout' form type
    if (formType === 'signout') {
        var selectedItemsContainer = document.getElementById('selectedItemsContainer');
        if (selectedItemsContainer) {
            var selectedItemsTexts = [];
            var selectedItems = selectedItemsContainer.getElementsByClassName('selected-item');
            for (var item of selectedItems) {
                var text = item.firstChild.textContent; // Assuming the item name is the first child node of the item div
                selectedItemsTexts.push(text);
            }
            objectData['items'] = selectedItemsTexts.join('; '); // Join with bullets and new lines
        } else {
            console.error('SelectedItemsContainer not found');
        }
    }

    // Google Apps Script handling
    google.script.run
        .withSuccessHandler(function() {
            showStatus('Success', 'Your form has been submitted successfully.', 'success');
            if (selectedItemsContainer) {
                selectedItemsContainer.innerHTML = ''; // Clear only if exists and form is signout
            }
        })
        .withFailureHandler(function(error) {
            console.error('Submission Error:', error);
            showStatus('Error', 'There was an issue submitting your form.', 'error');
            form.style.display = 'block';
        })
        .handleFormSubmit(objectData);

    return false;
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

function searchItems(query) {
  console.log('Search Query:', query);
    // You can log the query to see what you're sending to the server.
    
    // Ensure that the query is not undefined and has the required length.
    if (query && query.length >= 3) {
        // Call your server-side function with the query.
        google.script.run.withSuccessHandler(displaySuggestions).getItems(query);
    } else {
        // Hide the suggestions if the query is too short.
        document.getElementById('suggestions').style.display = 'none';
    }
}

// Create a debounced version of searchItems
const debouncedSearchItems = debounce(searchItems, 600);

const testDebounce = debounce(() => console.log('Debounce Test'), 600);


function displaySuggestions(items) {
    var suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = ''; // Clear previous suggestions
    items.forEach(function(item) {
        var div = document.createElement('div');
        div.textContent = item.fullName + ' (' + item.count + ')';
        div.onclick = function() {
            addItemToContainer(item.fullName); // Use this function to add the item to the container
            suggestionsDiv.style.display = 'none';
            document.getElementById('itemInput').value = ''; // Clear the input field if necessary
        };
        suggestionsDiv.appendChild(div);
    });
    suggestionsDiv.style.display = items.length > 0 ? 'block' : 'none';
}

function addItemToContainer(itemFullName) {
    var container = document.getElementById('selectedItemsContainer');
    var itemDiv = document.createElement('div');
    itemDiv.textContent = itemFullName;
    itemDiv.className = 'selected-item'; // Add a class for styling if needed

    // Optionally add a remove button next to each item
    var removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-item-btn'; // Add a class for the button for potential styling
    removeBtn.onclick = function() {
        container.removeChild(itemDiv);
    };

    itemDiv.appendChild(removeBtn);
    container.appendChild(itemDiv);
}

// Function to handle the Enter key for new item entries
function handleCustomItemEntry(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the form from being submitted
        var inputField = document.getElementById('customItemInput');
        var itemText = inputField.value.trim();

        if (itemText) {
            addItemToContainer(itemText);  // Add the custom item
            inputField.value = ''; // Clear the field after adding the item
        }
    }
}

//Item sign in functions

function updateSignoutSheet(item, action, customer) {
    google.script.run.withSuccessHandler(function() {
        console.log('Item ' + action + ' successfully for ' + customer);
        // Optionally refresh the data or inform the user
    }).withFailureHandler(function(error) {
        console.error('Failed to ' + action + ' item:', error);
    }).updateSignoutSheet(item, action, customer);
}

function displayCustomerDetails(results) {
  var resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';
  results.forEach(function(result, index) {
    var div = document.createElement('div');
    div.textContent = result.customer + ' - ' + result.phone;
    div.className = 'customerSearched';
    div.onclick = function() {
      showCustomerDetails(result);
    };
    resultsContainer.appendChild(div);
  });
  resultsContainer.style.display = 'block';
}

function showCustomerDetails(data) {
    var customerInfo = document.getElementById('customerInfo');
    customerInfo.innerHTML = `
        <span class="customer-details-title">Customer Details:</span><br>
        <span class="customer-details-bold-text">Name:</span> ${data.customer}<br>
        <span class="customer-details-bold-text">Phone:</span> ${data.phone}<br>
        <span class="customer-details-bold-text">Sales Contact:</span> ${data.sales}<br>`;

    var itemSection = document.getElementById('itemSection');
    itemSection.innerHTML = data.items.length ? `<span class="customer-details-title">Returned Items:</span>${formatItems(data.items, 'details', 'itemSection')}` : '';

    var notesSection = document.getElementById('notesSection');
    notesSection.innerHTML = data.notes.trim() ? `<span class="customer-details-title">Notes:</span><br>${data.notes}<br>` : '';

    // Set hidden input values
    document.getElementById('hiddenCustomerName').value = data.customer;
    document.getElementById('hiddenPhoneNumber').value = data.phone;
    document.getElementById('hiddenSalesContact').value = data.sales;
    document.getElementById('hiddenOriginalNotes').value = data.notes;

    updateDetailsVisibility();
    updateItemsStillOutVisibility();
    document.getElementById('searchResults').style.display = 'none';
    setupToggleButtons();
}

function moveItemToStillOut(itemElement) {
    var itemsStillOutDiv = document.getElementById("itemsStillOut");
    if (!itemsStillOutDiv || !itemElement) {
        console.error('Error: Required elements not found for moving to Still Out.');
        return;
    }

    itemsStillOutDiv.appendChild(itemElement);  // Move the item
}

function moveItemToDetails(itemElement) {
    var detailsDiv = document.getElementById("details");
    if (!detailsDiv || !itemElement) {
        console.error('Error: Required elements not found for moving to Details.');
        return;
    }

    detailsDiv.appendChild(itemElement);  // Move the item back
}

function setupFormAfterDOMLoad() {
    updateDetailsVisibility();
    updateItemsStillOutVisibility();
}

function setupRemoveButtons() {
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.onclick = function() {
            moveItemToStillOut(this.closest('.itemBeingReturned'));
        };
    });
}

document.querySelectorAll('.remove-item').forEach(button => {
  button.onclick = function() {
    removeItem(this.parentElement); // Assuming the button is a direct child of the item div
  };
});

function updateCustomerDetailsDisplay(itemText, add) {
    var detailsDiv = document.getElementById('details');
    var currentItems = detailsDiv.innerHTML;
    if (add) {
        detailsDiv.innerHTML = currentItems + `• ${itemText}<br>`;
    } else {
        // This part would ideally be more specific to ensure only the correct item is removed
        detailsDiv.innerHTML = currentItems.replace(`• ${itemText}<br>`, '');
    }
}

function formatItems(itemsString, origin = 'details', targetId = 'details') {
    return itemsString.split(';').map(function(item) {
        var itemText = item.trim();
        return `<div class="itemBeingReturned" data-origin="${origin}" data-target-id="${targetId}">${itemText} <button type="button" class="toggle-item-btn">Move</button></div>`;
    }).join('');
}

function setupToggleButtons() {
    document.querySelectorAll('.toggle-item-btn').forEach(button => {
        button.onclick = function() {
            toggleItemLocation(this.closest('.itemBeingReturned'));
        };
    });
}

function toggleItemLocation(itemElement) {
    // Determine the new target based on current location
    var newTargetId = itemElement.dataset.origin === 'details' ? 'itemsStillOut' : 'itemSection';
    var targetContainer = document.getElementById(newTargetId);

    if (!itemElement || !targetContainer) {
        console.error('Error: itemElement or targetContainer not found.');
        return;
    }

    // Move the item and update data-origin
    targetContainer.appendChild(itemElement);
    itemElement.dataset.origin = newTargetId === 'itemSection' ? 'details' : 'itemsStillOut';

    // Optionally update visibility or other statuses
    updateDetailsVisibility();
    updateItemsStillOutVisibility();
}

function updateDetailsVisibility() {
    var detailsDiv = document.getElementById("details");
    var customerInfo = document.getElementById("customerInfo");
    var itemSection = document.getElementById("itemSection");
    var notesSection = document.getElementById("notesSection");

    // Check if each section has children (more reliable than innerHTML for checking content)
    if (customerInfo.children.length === 0 && itemSection.children.length === 0 && notesSection.children.length === 0) {
        detailsDiv.style.display = 'none';
    } else {
        detailsDiv.style.display = 'block';
    }
}

function updateItemsStillOutVisibility() {
    var itemsStillOutDiv = document.getElementById("itemsStillOut");

    if (!itemsStillOutDiv) {
        console.error('Items Still Out div not found');
        return; // Stop the function if the element is not found
    }

    // Check if the div has any children
    itemsStillOutDiv.style.display = itemsStillOutDiv.children.length > 0 ? 'block' : 'none';
}

function updateVisibility() {
    var detailsDiv = document.getElementById('details');
    var itemsStillOutDiv = document.getElementById('itemsStillOut');

    // Check if 'details' has visible content (excluding white spaces)
    if(detailsDiv.innerHTML.trim() === '') {
        detailsDiv.style.display = 'none';
    } else {
        detailsDiv.style.display = 'block';
    }

    // Check if 'itemsStillOut' has visible content (excluding white spaces)
    if(itemsStillOutDiv.innerHTML.trim() === '') {
        itemsStillOutDiv.style.display = 'none';
    } else {
        itemsStillOutDiv.style.display = 'block';
    }
}
