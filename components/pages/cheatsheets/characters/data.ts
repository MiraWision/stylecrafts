// arrows, copyright, greater/less than
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
      }
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
      }
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
        character: '∑',
        entityName: '&sum;',
        entityNumber: '&#8721;',
        description: 'N-Ary Summation'
      },
      {
        character: '√',
        entityName: '&radic;',
        entityNumber: '&#8730;',
        description: 'Square Root'
      },
      {
        character: '∫',
        entityName: '&int;',
        entityNumber: '&#8747;',
        description: 'Integral'
      },
      {
        character: '∝',
        entityName: '&prop;',
        entityNumber: '&#8733;',
        description: 'Proportional To'
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
      {
        character: '≈',
        entityName: '&asymp;',
        entityNumber: '&#8776;',
        description: 'Approximately Equal'
      },
      {
        character: '‰',
        entityName: '&permil;',
        entityNumber: '&#8240;',
        description: 'Per Mille Sign'
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
    ]
  },
  {
    groupName: 'Arrows',
    characters: [
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
        character: '↔',
        entityName: '&hArr;',
        entityNumber: '&#8660;',
        description: 'Left-Right Double Arrow'
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
      }
    ]
  },
  {
    groupName: 'Miscellaneous Symbols',
    characters: [
      {
        character: '⊕',
        entityName: '&oplus;',
        entityNumber: '&#8853;',
        description: 'Circled Plus (Direct Sum)'
      },
      {
        character: '⊗',
        entityName: '&otimes;',
        entityNumber: '&#8855;',
        description: 'Circled Times (Tensor Product)'
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
  }
];

export { characterEntities };