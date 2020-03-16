// Hard code these so color always looks good
const saturation = '80%';
const brightness = '35%';

const stringToAsciiSum = (string) => string.split('').reduce(
  (sum, char) => sum + char.charCodeAt(0),
  0
);

const colorFields = () => {
  const badges = document.querySelectorAll('.custom-field-front-badges .badge');

  badges.forEach((badge) => {
    const text = badge.innerText;
    const sum = stringToAsciiSum(text);
    const hue = sum % 360;

    badge.style.backgroundColor = `hsl(${hue},${saturation},${brightness})`;
  });
};

colorFields();