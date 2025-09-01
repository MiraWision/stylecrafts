import imagineString from '@mirawision/imagine/string';

const generateLoremIpsum = (type: 'sentences' | 'paragraphs', count: number): string => {
  if (type === 'sentences') {
    const sentences = [];
    for (let i = 0; i < count; i++) {
      // Generate a sentence with 6-12 words
      const wordsCount = Math.floor(Math.random() * 7) + 6;
      sentences.push(imagineString.sentence(wordsCount));
    }
    return sentences.join(' ');
  } else {
    const paragraphs = [];
    for (let i = 0; i < count; i++) {
      // Generate a paragraph with 3-6 sentences
      const sentencesCount = Math.floor(Math.random() * 4) + 3;
      paragraphs.push(imagineString.paragraph(sentencesCount));
    }
    return paragraphs.join('\n\n');
  }
};

export { generateLoremIpsum };
