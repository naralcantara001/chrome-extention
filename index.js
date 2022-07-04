const inputBtn = document.querySelector(".input-btn");
const saveTab = document.querySelector(".save-tab");
const deleteBtn = document.querySelector(".delete-btn");
const input = document.querySelector(".input");
const list = document.querySelector(".list");
let myLeads = [];

// from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
      <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
    </li>`;
  }
  list.innerHTML = listItems;
}

saveTab.addEventListener("click", function () {
  // Grab the URL of the current tab!
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const save = tabs[0].url;
    myLeads.push(save);
    input.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    inputBtn.click();
  }
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(input.value);
  input.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);

  console.log(localStorage.getItem("myLeads"));
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
