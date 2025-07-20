const characterEntities = [
  {
    groupName: 'Punctuation Marks',
    characters: [
      {
        character: '…',
        entityName: '&hellip;',
        entityNumber: '&#8230;',
        description: 'Ellipsis'
      },
      {
        character: '–',
        entityName: '&ndash;',
        entityNumber: '&#8211;',
        description: 'En Dash'
      },
      {
        character: '—',
        entityName: '&mdash;',
        entityNumber: '&#8212;',
        description: 'Em Dash'
      },
      {
        character: '‾',
        entityName: '&oline;',
        entityNumber: '&#8254;',
        description: 'Overline'
      },
      {
        character: '©',
        entityName: '&copy;',
        entityNumber: '&#169;',
        description: 'Copyright'
      },
      {
        character: '®',
        entityName: '&reg;',
        entityNumber: '&#174;',
        description: 'Registered'
      },
      {
        character: '™',
        entityName: '&trade;',
        entityNumber: '&#8482;',
        description: 'Trademark'
      },
      {
        character: '§',
        entityName: '&sect;',
        entityNumber: '&#167;',
        description: 'Section'
      },
      {
        character: '¶',
        entityName: '&para;',
        entityNumber: '&#182;',
        description: 'Pilcrow Sign'
      },
      {
        character: '“',
        entityName: '&ldquo;',
        entityNumber: '&#8220;',
        description: 'Left Double Quotation Mark'
      },
      {
        character: '”',
        entityName: '&rdquo;',
        entityNumber: '&#8221;',
        description: 'Right Double Quotation Mark'
      },
      {
        character: '‘',
        entityName: '&lsquo;',
        entityNumber: '&#8216;',
        description: 'Left Single Quotation Mark'
      },
      {
        character: '’',
        entityName: '&rsquo;',
        entityNumber: '&#8217;',
        description: 'Right Single Quotation Mark'
      },
    ]
  },
  {
    groupName: 'Bullets and Lists',
    characters: [
      {
        character: '•',
        entityName: '&bull;',
        entityNumber: '&#8226;',
        description: 'Bullet'
      },
      {
        character: '·',
        entityName: '&middot;',
        entityNumber: '&#183;',
        description: 'Middle Dot'
      },
      {
        character: '‣',
        entityName: '&tri;',
        entityNumber: '&#8227;',
        description: 'Triangular Bullet'
      },
      {
        character: '❖',
        entityName: '&diamondbull;',
        entityNumber: '&#10022;',
        description: 'Diamond Bullet'
      },
    ]
  },
  {
    groupName: 'Currencies',
    characters: [
      {
        character: '€',
        entityName: '&euro;',
        entityNumber: '&#8364;',
        description: 'Euro Symbol'
      },
      {
        character: '£',
        entityName: '&pound;',
        entityNumber: '&#163;',
        description: 'Pound Sterling Symbol'
      },
      {
        character: '¥',
        entityName: '&yen;',
        entityNumber: '&#165;',
        description: 'Yen Symbol'
      },
      {
        character: '¢',
        entityName: '&cent;',
        entityNumber: '&#162;',
        description: 'Cent Symbol'
      },
      {
        character: '₿',
        entityName: '&bsol;',
        entityNumber: '&#8383;',
        description: 'Bitcoin Symbol'
      }
    ]
  },
  {
    groupName: 'Math, Logic, and Science',
    characters: [
      {
        character: '±',
        entityName: '&plusmn;',
        entityNumber: '&#177;',
        description: 'Plus-Minus'
      },
      {
        character: '≈',
        entityName: '&asymp;',
        entityNumber: '&#8776;',
        description: 'Approximately Equal'
      },
      {
        character: '≠',
        entityName: '&ne;',
        entityNumber: '&#8800;',
        description: 'Not Equal'
      },
      {
        character: '≤',
        entityName: '&le;',
        entityNumber: '&#8804;',
        description: 'Less Than or Equal'
      },
      {
        character: '≥',
        entityName: '&ge;',
        entityNumber: '&#8805;',
        description: 'Greater Than or Equal'
      },
      {
        character: '÷',
        entityName: '&divide;',
        entityNumber: '&#247;',
        description: 'Division Sign'
      },
      {
        character: '×',
        entityName: '&times;',
        entityNumber: '&#215;',
        description: 'Multiplication Sign'
      },
      {
        character: '√',
        entityName: '&radic;',
        entityNumber: '&#8730;',
        description: 'Square Root'
      },
      {
        character: '‰',
        entityName: '&permil;',
        entityNumber: '&#8240;',
        description: 'Per Mille Sign'
      },
      {
        character: '°',
        entityName: '&deg;',
        entityNumber: '&#176;',
        description: 'Degree Symbol'
      },
      {
        character: '′',
        entityName: '&prime;',
        entityNumber: '&#8242;',
        description: 'Prime (Minute or Feet)'
      },
      {
        character: '″',
        entityName: '&Prime;',
        entityNumber: '&#8243;',
        description: 'Double Prime (Second or Inches)'
      },
      {
        character: '∞',
        entityName: '&infin;',
        entityNumber: '&#8734;',
        description: 'Infinity'
      },
      {
        character: '½',
        entityName: '&frac12;',
        entityNumber: '&#189;',
        description: 'Fraction One-Half'
      },
      {
        character: '⅓',
        entityName: '&frac13;',
        entityNumber: '&#8531;',
        description: 'Fraction One-Third'
      },
      {
        character: '⅔',
        entityName: '&frac23;',
        entityNumber: '&#8532;',
        description: 'Fraction Two-Thirds'
      },
      {
        character: '¼',
        entityName: '&frac14;',
        entityNumber: '&#188;',
        description: 'Fraction One-Quarter'
      },
      {
        character: '¾',
        entityName: '&frac34;',
        entityNumber: '&#190;',
        description: 'Fraction Three-Quarters'
      },
      {
        character: '¹',
        entityName: '&sup1;',
        entityNumber: '&#185;',
        description: 'Superscript One'
      },
      {
        character: '²',
        entityName: '&sup2;',
        entityNumber: '&#178;',
        description: 'Superscript Two (Squared)'
      },
      {
        character: '³',
        entityName: '&sup3;',
        entityNumber: '&#179;',
        description: 'Superscript Three (Cubed)'
      },
      {
        character: '∑',
        entityName: '&sum;',
        entityNumber: '&#8721;',
        description: 'N-Ary Summation'
      },
      {
        character: '∏',
        entityName: '&prod;',
        entityNumber: '&#8719;',
        description: 'Product'
      },
      {
        character: '∫',
        entityName: '&int;',
        entityNumber: '&#8747;',
        description: 'Integral'
      },
      {
        character: '∂',
        entityName: '&part;',
        entityNumber: '&#8706;',
        description: 'Partial Differential'
      },
      {
        character: '∧',
        entityName: '&and;',
        entityNumber: '&#8743;',
        description: 'Logical And'
      },
      {
        character: '∨',
        entityName: '&or;',
        entityNumber: '&#8744;',
        description: 'Logical Or'
      },
      {
        character: '∩',
        entityName: '&cap;',
        entityNumber: '&#8745;',
        description: 'Intersection'
      },
      {
        character: '∪',
        entityName: '&cup;',
        entityNumber: '&#8746;',
        description: 'Union'
      },      
    ]
  },
  {
    groupName: 'Greek Letters',
    characters: [
      {
        character: 'α',
        entityName: '&alpha;',
        entityNumber: '&#945;',
        description: 'Alpha'
      },
      {
        character: 'β',
        entityName: '&beta;',
        entityNumber: '&#946;',
        description: 'Beta'
      },
      {
        character: 'γ',
        entityName: '&gamma;',
        entityNumber: '&#947;',
        description: 'Gamma'
      },
      {
        character: 'Δ',
        entityName: '&Delta;',
        entityNumber: '&#916;',
        description: 'Delta (Uppercase)'
      },
      {
        character: 'δ',
        entityName: '&delta;',
        entityNumber: '&#948;',
        description: 'Delta (Lowercase)'
      },
      {
        character: 'ε',
        entityName: '&epsilon;',
        entityNumber: '&#949;',
        description: 'Epsilon'
      },
      {
        character: 'θ',
        entityName: '&theta;',
        entityNumber: '&#952;',
        description: 'Theta'
      },
      {
        character: 'λ',
        entityName: '&lambda;',
        entityNumber: '&#955;',
        description: 'Lambda'
      },
      {
        character: 'µ',
        entityName: '&micro;',
        entityNumber: '&#181;',
        description: 'Micro Symbol'
      },
      {
        character: 'π',
        entityName: '&pi;',
        entityNumber: '&#960;',
        description: 'Pi'
      },
      {
        character: 'σ',
        entityName: '&sigma;',
        entityNumber: '&#963;',
        description: 'Sigma'
      },
      {
        character: 'Σ',
        entityName: '&Sigma;',
        entityNumber: '&#931;',
        description: 'Sigma (Uppercase)'
      },
      {
        character: 'Ω',
        entityName: '&Omega;',
        entityNumber: '&#937;',
        description: 'Omega'
      }
    ],
  },
  {
    groupName: 'Arrows',
    characters: [
      {
        character: '←',
        entityName: '&larr;',
        entityNumber: '&#8592;',
        description: 'Left Arrow'
      },
      {
        character: '↑',
        entityName: '&uarr;',
        entityNumber: '&#8593;',
        description: 'Up Arrow'
      },
      {
        character: '→',
        entityName: '&rarr;',
        entityNumber: '&#8594;',
        description: 'Right Arrow'
      },
      {
        character: '↓',
        entityName: '&darr;',
        entityNumber: '&#8595;',
        description: 'Down Arrow'
      },
      {
        character: '↔',
        entityName: '&harr;',
        entityNumber: '&#8596;',
        description: 'Left-Right Arrow'
      },
      {
        character: '⇄',
        entityName: '&leftrightarrow;',
        entityNumber: '&#8644;',
        description: 'Left Right Arrow'
      },
      {
        character: '⇅',
        entityName: '&updownarrow;',
        entityNumber: '&#8645;',
        description: 'Up Down Arrow'
      },
      {
        character: '⇆',
        entityName: '&leftrightarrows;',
        entityNumber: '&#8646;',
        description: 'Left Right Arrows'
      },
      {
        character: '⇐',
        entityName: '&lArr;',
        entityNumber: '&#8656;',
        description: 'Left Double Arrow'
      },
      {
        character: '⇒',
        entityName: '&rArr;',
        entityNumber: '&#8658;',
        description: 'Right Double Arrow'
      },
      {
        character: '⇑',
        entityName: '&uArr;',
        entityNumber: '&#8657;',
        description: 'Up Double Arrow'
      },
      {
        character: '⇓',
        entityName: '&dArr;',
        entityNumber: '&#8659;',
        description: 'Down Double Arrow'
      },
      {
        character: '↪',
        entityName: '&hookrightarrow;',
        entityNumber: '&#8618;',
        description: 'Hook Right Arrow'
      },
      {
        character: '↩',
        entityName: '&hookleftarrow;',
        entityNumber: '&#8617;',
        description: 'Hook Left Arrow'
      },
      {
        character: '↼',
        entityName: '&leftwavearrow;',
        entityNumber: '&#8605;',
        description: 'Left Wave Arrow'
      },
      {
        character: '⇀',
        entityName: '&rightharpoonup;',
        entityNumber: '&#8640;',
        description: 'Right Harpoon Up'
      },
      {
        character: '↼',
        entityName: '&leftharpoonup;',
        entityNumber: '&#8636;',
        description: 'Left Harpoon Up'
      },
    ]
  },
  {
    groupName: 'Miscellaneous Symbols',
    characters: [
      {
        character: '★',
        entityName: '&starf;',
        entityNumber: '&#9733;',
        description: 'Black Star'
      },
      {
        character: '☆',
        entityName: '&star;',
        entityNumber: '&#9734;',
        description: 'White Star'
      },
      {
        character: '⊕',
        entityName: '&oplus;',
        entityNumber: '&#8853;',
        description: 'Circled Plus'
      },
      {
        character: '⊗',
        entityName: '&otimes;',
        entityNumber: '&#8855;',
        description: 'Circled Times'
      },
      {
        character: '♠',
        entityName: '&spades;',
        entityNumber: '&#9824;',
        description: 'Black Spade Suit'
      },
      {
        character: '♣',
        entityName: '&clubs;',
        entityNumber: '&#9827;',
        description: 'Black Club Suit'
      },
      {
        character: '♥',
        entityName: '&hearts;',
        entityNumber: '&#9829;',
        description: 'Black Heart Suit'
      },
      {
        character: '♦',
        entityName: '&diams;',
        entityNumber: '&#9830;',
        description: 'Black Diamond Suit'
      },
    ]
  },
  {
    groupName: 'Diacritic Symbols',
    characters: [
      {
        character: 'á',
        entityName: '&aacute;',
        entityNumber: '&#225;',
        description: 'A Acute'
      },
      {
        character: 'à',
        entityName: '&agrave;',
        entityNumber: '&#224;',
        description: 'A Grave'
      },
      {
        character: 'â',
        entityName: '&acirc;',
        entityNumber: '&#226;',
        description: 'A Circumflex'
      },
      {
        character: 'ä',
        entityName: '&auml;',
        entityNumber: '&#228;',
        description: 'A Umlaut'
      },
      {
        character: 'ç',
        entityName: '&ccedil;',
        entityNumber: '&#231;',
        description: 'C Cedilla'
      },
      {
        character: 'é',
        entityName: '&eacute;',
        entityNumber: '&#233;',
        description: 'E Acute'
      },
      {
        character: 'è',
        entityName: '&egrave;',
        entityNumber: '&#232;',
        description: 'E Grave'
      },
      {
        character: 'ê',
        entityName: '&ecirc;',
        entityNumber: '&#234;',
        description: 'E Circumflex'
      },
      {
        character: 'ë',
        entityName: '&euml;',
        entityNumber: '&#235;',
        description: 'E Umlaut'
      },
      {
        character: 'í',
        entityName: '&iacute;',
        entityNumber: '&#237;',
        description: 'I Acute'
      },
      {
        character: 'ì',
        entityName: '&igrave;',
        entityNumber: '&#236;',
        description: 'I Grave'
      },
      {
        character: 'î',
        entityName: '&icirc;',
        entityNumber: '&#238;',
        description: 'I Circumflex'
      },
      {
        character: 'ï',
        entityName: '&iuml;',
        entityNumber: '&#239;',
        description: 'I Umlaut'
      },
      {
        character: 'ñ',
        entityName: '&ntilde;',
        entityNumber: '&#241;',
        description: 'N Tilde'
      },
      {
        character: 'ó',
        entityName: '&oacute;',
        entityNumber: '&#243;',
        description: 'O Acute'
      },
      {
        character: 'ò',
        entityName: '&ograve;',
        entityNumber: '&#242;',
        description: 'O Grave'
      },
      {
        character: 'ô',
        entityName: '&ocirc;',
        entityNumber: '&#244;',
        description: 'O Circumflex'
      },
      {
        character: 'ö',
        entityName: '&ouml;',
        entityNumber: '&#246;',
        description: 'O Umlaut'
      },
      {
        character: 'ø',
        entityName: '&oslash;',
        entityNumber: '&#248;',
        description: 'O Slash'
      },
      {
        character: 'ú',
        entityName: '&uacute;',
        entityNumber: '&#250;',
        description: 'U Acute'
      },
      {
        character: 'ù',
        entityName: '&ugrave;',
        entityNumber: '&#249;',
        description: 'U Grave'
      },
      {
        character: 'û',
        entityName: '&ucirc;',
        entityNumber: '&#251;',
        description: 'U Circumflex'
      },
      {
        character: 'ü',
        entityName: '&uuml;',
        entityNumber: '&#252;',
        description: 'U Umlaut'
      },      
    ]
  },
  {
    groupName: 'Whitespace Symbols',
    characters: [
      {
        character: ' ',
        entityName: '&nbsp;',
        entityNumber: '&#160;',
        description: 'Non-breaking space'
      },
      {
        character: ' ',
        entityName: '&ensp;',
        entityNumber: '&#8194;',
        description: 'En space'
      },
      {
        character: ' ',
        entityName: '&emsp;',
        entityNumber: '&#8195;',
        description: 'Em space'
      },
      {
        character: ' ',
        entityName: '&thinsp;',
        entityNumber: '&#8201;',
        description: 'Thin space'
      },
      {
        character: ' ',
        entityName: '&hairsp;',
        entityNumber: '&#8202;',
        description: 'Hair space'
      },
      {
        character: ' ',
        entityName: '&nnbsp;',
        entityNumber: '&#8239;',
        description: 'Narrow no-break space'
      },
      {
        character: ' ',
        entityName: '&numsp;',
        entityNumber: '&#8199;',
        description: 'Figure space'
      },
      {
        character: ' ',
        entityName: '&puncsp;',
        entityNumber: '&#8200;',
        description: 'Punctuation space'
      },
      {
        character: ' ',
        entityName: '&mediumsp;',
        entityNumber: '&#8287;',
        description: 'Medium Mathematical Space'
      },
      {
        character: '‍',
        entityName: '&zwsp;',
        entityNumber: '&#8206;',
        description: 'Zero Width Space'
      },
      {
        character: '​',
        entityName: '&zwnj;',
        entityNumber: '&#8204;',
        description: 'Zero Width Non-Joiner'
      },
      {
        character: '‌',
        entityName: '&zwj;',
        entityNumber: '&#8205;',
        description: 'Zero Width Joiner'
      },
    ],
  },
];

export { characterEntities };