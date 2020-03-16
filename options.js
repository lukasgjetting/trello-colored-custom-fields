const input = document.getElementById('fieldName');

chrome.storage.sync.get('fieldName', ({ fieldName }) => {
  // Set initial value if there is one
  if(fieldName != null) {
    input.value = fieldName;
  }
});

input.onchange = (event) => {
  const { value: fieldName } = event.target;

  console.log(fieldName, event, chrome, chrome.permissions.getAll((...args) => console.log(args)));

  chrome.storage.sync.set({ fieldName });
};