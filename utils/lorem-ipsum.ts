const LOREM_SENTENCES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
  "Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
  "Integer in mauris eu nibh euismod gravida.",
  "Duis ac tellus et risus vulputate vehicula.",
  "Donec lobortis risus a elit. Etiam tempor.",
  "Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.",
  "Maecenas fermentum consequat mi. Donec fermentum.",
  "Pellentesque malesuada nulla a mi.",
  "Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.",
  "Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat."
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateLoremIpsum = (type: 'sentences' | 'paragraphs', count: number): string => {
  if (type === 'sentences') {

    const sentences = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * LOREM_SENTENCES.length);
      sentences.push(LOREM_SENTENCES[idx]);
    }
    return sentences.join(' ');
  } else {

    const paragraphs = [];
    for (let i = 0; i < count; i++) {
      const numSentences = getRandomInt(3, 6);

      const shuffled = [...LOREM_SENTENCES].sort(() => Math.random() - 0.5);
      paragraphs.push(shuffled.slice(0, numSentences).join(' '));
    }
    return paragraphs.join('\n\n');
  }
};

export { generateLoremIpsum };
