const input = document.getElementById('fieldName');

chrome.storage.sync.get('fieldName', ({ fieldName }) => {
  console.log(fieldName);
  input.value = fieldName;
});

input.onchange = (event) => {
  const { value: fieldName } = event.target;

  console.log(fieldName, event, chrome, chrome.permissions.getAll((...args) => console.log(args)));

  chrome.storage.sync.set({ fieldName });
};