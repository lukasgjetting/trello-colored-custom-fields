// Hard code these so color always looks good
const saturation = '80%';
const brightness = '35%';

const stringToAsciiSum = (string) => string.split('').reduce(
  (sum, char) => sum + char.charCodeAt(0),
  0
);

const colorFields = (fields) => {
  const badges = document.querySelectorAll('.custom-field-front-badges .badge');

  badges.forEach((badge) => {
    const text = badge.innerText;
    const [name] = text.split(/: /);

    if(fields.length > 0 && !fields.includes(name)) {
      return;
    }

    const sum = stringToAsciiSum(text);
    const hue = sum % 360;

    badge.style.backgroundColor = `hsl(${hue},${saturation},${brightness})`;
    badge.classList.add('colored');
  });
};

chrome.storage.sync.get('fieldName', ({ fieldName }) => {
  const fields = (fieldName || '')
    .split('|')
    .filter(f => f != '');

  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  const observer = new MutationObserver(function(mutations, observer) {
    // Get all card mutations
    const cardMutations = mutations.filter(
      (mutation) => mutation.target.className.includes('list-card'),
    );

    // Don't re-color if no cards were changed
    if(cardMutations.length === 0) {
      return;
    }

    colorFields(fields);
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });

  // Call manually the first time
  colorFields(fields);
});