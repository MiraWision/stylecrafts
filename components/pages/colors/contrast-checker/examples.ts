const contrastColors = [
  {
    groupName: "Dark Contrasts",
    colors: [
      { background: "#2C3E50", text: "#ECF0F1" },
      { background: "#34495E", text: "#F1C40F" },
      { background: "#2C3E50", text: "#AED6F1" },
      { background: "#1C2833", text: "#D4E6F1" },
      { background: "#212F3C", text: "#FDEDEC" },
      { background: "#4A235A", text: "#E8DAEF" },
      { background: "#0B5345", text: "#A9DFBF" },
      { background: "#2E4053", text: "#FAD7A0" },
    ]
  },
  {
    groupName: "Light Contrasts",
    colors: [
      { background: "#FFFFFF", text: "#000000" },
      { background: "#F0F8FF", text: "#2C3E50" },
      { background: "#FAFAD2", text: "#34495E" },
      { background: "#F5FFFA", text: "#8E44AD" },
      { background: "#F0F4C3", text: "#37474F" },
      { background: "#FCE4EC", text: "#4A148C" },
      { background: "#FFF3E0", text: "#4E342E" },
      { background: "#F9FBE7", text: "#3E2723" }
    ]
  },
  {
    groupName: "Modern UI",
    colors: [
      { background: "#1A1A1A", text: "#FFFFFF" },
      { background: "#2D3748", text: "#E2E8F0" },
      { background: "#4A5568", text: "#F7FAFC" },
      { background: "#718096", text: "#FFFFFF" },
      { background: "#A0AEC0", text: "#2D3748" },
      { background: "#E2E8F0", text: "#2D3748" },
      { background: "#F7FAFC", text: "#4A5568" },
      { background: "#FFFFFF", text: "#1A202C" }
    ]
  },
  {
    groupName: "Accessibility",
    colors: [
      { background: "#000000", text: "#FFFFFF" },
      { background: "#FFFFFF", text: "#000000" },
      { background: "#1A1A1A", text: "#FFFFFF" },
      { background: "#FFFFFF", text: "#1A1A1A" },
      { background: "#2D3748", text: "#FFFFFF" },
      { background: "#FFFFFF", text: "#2D3748" },
      { background: "#4A5568", text: "#FFFFFF" },
      { background: "#FFFFFF", text: "#4A5568" }
    ]
  },
  {
    groupName: "Brand Colors",
    colors: [
      { background: "#3B82F6", text: "#FFFFFF" },
      { background: "#10B981", text: "#FFFFFF" },
      { background: "#F59E0B", text: "#FFFFFF" },
      { background: "#EF4444", text: "#FFFFFF" },
      { background: "#8B5CF6", text: "#FFFFFF" },
      { background: "#EC4899", text: "#FFFFFF" },
      { background: "#06B6D4", text: "#FFFFFF" },
      { background: "#84CC16", text: "#FFFFFF" }
    ]
  },
  {
    groupName: "Pastels",
    colors: [
      { background: "#FEF3C7", text: "#92400E" },
      { background: "#DBEAFE", text: "#1E40AF" },
      { background: "#D1FAE5", text: "#065F46" },
      { background: "#FEE2E2", text: "#991B1B" },
      { background: "#F3E8FF", text: "#7C3AED" },
      { background: "#FCE7F3", text: "#BE185D" },
      { background: "#ECFDF5", text: "#047857" },
      { background: "#FEF7CD", text: "#A16207" }
    ]
  }
];

const colorPalettes = [
  {
    groupName: "Red Variations",
    usage: "Primary Color",
    colors: [
      { title: "Crimson", hex: "#FF0000" },
      { title: "Firebrick", hex: "#E60000" },
      { title: "Ruby Red", hex: "#CC0000" },
      { title: "Garnet", hex: "#B30000" },
      { title: "Maroon", hex: "#990000" },
      { title: "Burgundy", hex: "#800000" },
      { title: "Tomato", hex: "#FF4C4C" },
      { title: "Coral", hex: "#FF6666" },
      { title: "Salmon", hex: "#FF7F7F" },
      { title: "Rosy Red", hex: "#FF9999" },
      { title: "Carnation", hex: "#FFB2B2" },
      { title: "Light Coral", hex: "#FFC4C4" },
      { title: "Blush", hex: "#FFD6D6" },
      { title: "Misty", hex: "#FFEBEB" },
      { title: "Pastel Red", hex: "#FFCCCC" },
      { title: "Cherry", hex: "#FF1A1A" },
      { title: "Flame", hex: "#FF3333" },
      { title: "Tangerine", hex: "#FF6666" },
      { title: "Candy Red", hex: "#FF9999" },
      { title: "Light Pink", hex: "#FFB6C1" }
    ]
  },
  {
    groupName: "Pink Variations",
    usage: "Accent Color",
    colors: [
      { title: "Pink", hex: "#FFC0CB" },
      { title: "Light Pink", hex: "#FFB6C1" },
      { title: "Hot Pink", hex: "#FF69B4" },
      { title: "Deep Pink", hex: "#FF1493" },
      { title: "Pale Violet Red", hex: "#DB7093" },
      { title: "Blush Pink", hex: "#FF87A2" },
      { title: "Raspberry Pink", hex: "#FF5C8D" },
      { title: "Baby Pink", hex: "#F4C2C2" },
      { title: "Neon Pink", hex: "#FF6FFF" },
      { title: "Candy Pink", hex: "#FFB3DE" },
      { title: "Watermelon", hex: "#FF85A1" },
      { title: "Bubblegum", hex: "#FF99CC" },
      { title: "Fuchsia", hex: "#FF66B2" },
      { title: "Cotton Candy", hex: "#FF7FBA" },
      { title: "Powder Pink", hex: "#FF9FCF" },
      { title: "Ballet Pink", hex: "#FFB6D5" },
      { title: "Peach Pink", hex: "#FFCCD9" },
      { title: "Blush Pink", hex: "#FFDDE1" },
      { title: "Misty Pink", hex: "#FFE4E1" },
      { title: "Soft Pink", hex: "#FFDAE9" }
    ]
  },
  {
    groupName: "Yellow Variations",
    usage: "Accent Color",
    colors: [
      { title: "Yellow", hex: "#FFFF00" },
      { title: "Canary Yellow", hex: "#FFFF33" },
      { title: "Lemon Yellow", hex: "#FFFF66" },
      { title: "Light Yellow", hex: "#FFFF99" },
      { title: "Mellow Yellow", hex: "#FFFFB2" },
      { title: "Cream Yellow", hex: "#FFFFCC" },
      { title: "Pale Yellow", hex: "#FFFFE0" },
      { title: "Ivory Yellow", hex: "#FFFFF0" },
      { title: "Banana Yellow", hex: "#FFFAE6" },
      { title: "Cornsilk Yellow", hex: "#FFF8DC" },
      { title: "Lemon Chiffon", hex: "#FFFACD" },
      { title: "Light Goldenrod", hex: "#FAFAD2" },
      { title: "Papaya Whip", hex: "#FFEFD5" },
      { title: "Moccasin", hex: "#FFE4B5" },
      { title: "Gold", hex: "#FFD700" },
      { title: "Sunshine Yellow", hex: "#FFEA00" },
      { title: "Saffron", hex: "#FFC300" },
      { title: "Buttercup", hex: "#FFDD00" },
      { title: "Dandelion", hex: "#FFEE00" },
      { title: "Flaxen", hex: "#FFEB00" }
    ]
  },
  {
    groupName: "Orange Variations",
    usage: "Primary Color",
    colors: [
      { title: "Orange", hex: "#FFA500" },
      { title: "Dark Orange", hex: "#FF8C00" },
      { title: "Pumpkin", hex: "#FF7F00" },
      { title: "Tiger Orange", hex: "#FF6700" },
      { title: "Orange Red", hex: "#FF4500" },
      { title: "Tomato", hex: "#FF6347" },
      { title: "Coral Orange", hex: "#FF8243" },
      { title: "Light Salmon", hex: "#FFA07A" },
      { title: "Apricot", hex: "#FFB07C" },
      { title: "Peach", hex: "#FFC7A1" },
      { title: "Light Peach", hex: "#FFDAB9" },
      { title: "Moccasin", hex: "#FFE4B5" },
      { title: "Goldenrod", hex: "#FFD700" },
      { title: "Tangerine", hex: "#FFBA00" },
      { title: "Honey", hex: "#FFB347" },
      { title: "Bisque", hex: "#FFCC99" },
      { title: "Blanched Almond", hex: "#FFE5B4" },
      { title: "Desert Sand", hex: "#FFEB99" },
      { title: "Papaya", hex: "#FFF0D4" },
      { title: "Blanched Almond", hex: "#FFEBCD" }
    ]
  },
  {
    groupName: "Green Variations",
    usage: "Primary Color",
    colors: [
      { title: "Lime", hex: "#00FF00" },
      { title: "Lime Green", hex: "#32CD32" },
      { title: "Forest Green", hex: "#228B22" },
      { title: "Green", hex: "#008000" },
      { title: "Dark Green", hex: "#006400" },
      { title: "Medium Aquamarine", hex: "#66CDAA" },
      { title: "Dark Sea Green", hex: "#8FBC8F" },
      { title: "Light Sea Green", hex: "#20B2AA" },
      { title: "Medium Spring Green", hex: "#00FA9A" },
      { title: "Pale Green", hex: "#98FB98" },
      { title: "Chartreuse", hex: "#7FFF00" },
      { title: "Lawn Green", hex: "#7CFC00" },
      { title: "Green Yellow", hex: "#ADFF2F" },
      { title: "Spring Green", hex: "#00FF7F" },
      { title: "Medium Sea Green", hex: "#3CB371" },
      { title: "Sea Green", hex: "#2E8B57" },
      { title: "Saddle Brown", hex: "#8B4513" },
      { title: "Dark Olive Green", hex: "#556B2F" },
      { title: "Olive Drab", hex: "#6B8E23" },
      { title: "Olive", hex: "#808000" }
    ]
  },
  {
    groupName: "Blue Variations",
    usage: "Primary Color",
    colors: [
      { title: "Blue", hex: "#0000FF" },
      { title: "Medium Blue", hex: "#0000CD" },
      { title: "Dark Blue", hex: "#00008B" },
      { title: "Navy", hex: "#000080" },
      { title: "Dodger Blue", hex: "#1E90FF" },
      { title: "Cornflower Blue", hex: "#6495ED" },
      { title: "Steel Blue", hex: "#4682B4" },
      { title: "Royal Blue", hex: "#4169E1" },
      { title: "Deep Sky Blue", hex: "#00BFFF" },
      { title: "Sky Blue", hex: "#87CEEB" },
      { title: "Light Sky Blue", hex: "#87CEFA" },
      { title: "Light Blue", hex: "#ADD8E6" },
      { title: "Powder Blue", hex: "#B0E0E6" },
      { title: "Cadet Blue", hex: "#5F9EA0" },
      { title: "Medium Turquoise", hex: "#48D1CC" },
      { title: "Dark Turquoise", hex: "#00CED1" },
      { title: "Turquoise", hex: "#40E0D0" },
      { title: "Pale Turquoise", hex: "#AFEEEE" },
      { title: "Light Cyan", hex: "#E0FFFF" },
      { title: "Light Steel Blue", hex: "#B0C4DE" }
    ]
  },
  {
    groupName: "Purple Variations",
    usage: "Accent Color",
    colors: [
      { title: "Purple", hex: "#800080" },
      { title: "Blue Violet", hex: "#8A2BE2" },
      { title: "Dark Violet", hex: "#9400D3" },
      { title: "Dark Orchid", hex: "#9932CC" },
      { title: "Medium Orchid", hex: "#BA55D3" },
      { title: "Thistle", hex: "#D8BFD8" },
      { title: "Plum", hex: "#DDA0DD" },
      { title: "Violet", hex: "#EE82EE" },
      { title: "Orchid", hex: "#DA70D6" },
      { title: "Magenta", hex: "#FF00FF" },
      { title: "Fuchsia", hex: "#FF00CC" },
      { title: "Medium Violet Red", hex: "#C71585" },
      { title: "Pale Violet Red", hex: "#DB7093" },
      { title: "Lavender", hex: "#E6E6FA" },
      { title: "Plum", hex: "#DDA0DD" },
      { title: "Hot Pink", hex: "#FF69B4" },
      { title: "Deep Pink", hex: "#FF1493" },
      { title: "Dark Violet", hex: "#9400D3" },
      { title: "Dark Orchid", hex: "#9932CC" },
      { title: "Medium Orchid", hex: "#BA55D3" }
    ]
  },
  {
    groupName: "Brown Variations",
    usage: "Background Color",
    colors: [
      { title: "Brown", hex: "#A52A2A" },
      { title: "Saddle Brown", hex: "#8B4513" },
      { title: "Sienna", hex: "#A0522D" },
      { title: "Chocolate", hex: "#D2691E" },
      { title: "Peru", hex: "#CD853F" },
      { title: "Sandy Brown", hex: "#F4A460" },
      { title: "Burly Wood", hex: "#DEB887" },
      { title: "Tan", hex: "#D2B48C" },
      { title: "Rosy Brown", hex: "#BC8F8F" },
      { title: "Blanched Almond", hex: "#FFEBCD" },
      { title: "Bisque", hex: "#FFE4C4" },
      { title: "Navajo White", hex: "#FFDEAD" },
      { title: "Peach Puff", hex: "#FFDAB9" },
      { title: "Pale Goldenrod", hex: "#EEE8AA" },
      { title: "Wheat", hex: "#F5DEB3" },
      { title: "Moccasin", hex: "#FFE4B5" },
      { title: "Seashell", hex: "#FFF5EE" },
      { title: "Linen", hex: "#FAF0E6" },
      { title: "Cornsilk", hex: "#FFF8DC" },
      { title: "Old Lace", hex: "#FDF5E6" }
    ]
  },
  {
    groupName: "White Variations",
    usage: "Background Color",
    colors: [
      { title: "White", hex: "#FFFFFF" },
      { title: "Alice Blue", hex: "#F0F8FF" },
      { title: "Antique White", hex: "#FAEBD7" },
      { title: "Beige", hex: "#F5F5DC" },
      { title: "Bisque", hex: "#FFE4C4" },
      { title: "Cornsilk", hex: "#FFF8DC" },
      { title: "Honeydew", hex: "#F0FFF0" },
      { title: "Lavender Blush", hex: "#FFF0F5" },
      { title: "Mint Cream", hex: "#F5FFFA" },
      { title: "Old Lace", hex: "#FDF5E6" },
      { title: "Seashell", hex: "#FFF5EE" },
      { title: "Ivory", hex: "#FFFFF0" },
      { title: "Linen", hex: "#FAF0E6" },
      { title: "Floral White", hex: "#FFFAF0" },
      { title: "Mint", hex: "#F0FFF0" },
      { title: "Azure", hex: "#F0FFFF" },
      { title: "White Smoke", hex: "#F5F5F5" },
      { title: "Snow", hex: "#FFFAFA" },
      { title: "Ghost White", hex: "#F8F8FF" },
      { title: "Lavender White", hex: "#E6E6FA" }
    ]
  },
  {
    groupName: "Gray Variations",
    usage: "Text Color",
    colors: [
      { title: "Gray", hex: "#808080" },
      { title: "Dark Gray", hex: "#A9A9A9" },
      { title: "Silver", hex: "#C0C0C0" },
      { title: "Light Gray", hex: "#D3D3D3" },
      { title: "Gainsboro", hex: "#DCDCDC" },
      { title: "White Smoke", hex: "#F5F5F5" },
      { title: "Dark Slate Gray", hex: "#2F4F4F" },
      { title: "Dim Gray", hex: "#696969" },
      { title: "Light Slate Gray", hex: "#778899" },
      { title: "Slate Gray", hex: "#708090" },
      { title: "Gray Web", hex: "#BEBEBE" },
      { title: "Gray X11", hex: "#DCDCDC" },
      { title: "Light Grey", hex: "#D3D3D3" },
      { title: "Silver", hex: "#C0C0C0" },
      { title: "Dark Grey", hex: "#A9A9A9" },
      { title: "Dim Grey", hex: "#696969" },
      { title: "Light Slate Grey", hex: "#778899" },
      { title: "Slate Grey", hex: "#708090" },
      { title: "Grey Web", hex: "#BEBEBE" },
      { title: "Smoke", hex: "#CCCCCC" }
    ]
  },
  {
    groupName: "Black Variations",
    usage: "Text Color",
    colors: [
      { title: "Black", hex: "#000000" },
      { title: "Jet Black", hex: "#0C0C0C" },
      { title: "Charcoal", hex: "#181818" },
      { title: "Onyx", hex: "#2C2C2C" },
      { title: "Dark Charcoal", hex: "#363636" },
      { title: "Dim Gray", hex: "#404040" },
      { title: "Dark Slate Gray", hex: "#4D4D4D" },
      { title: "Granite", hex: "#5A5A5A" },
      { title: "Slate Gray", hex: "#666666" },
      { title: "Ash Gray", hex: "#737373" },
      { title: "Gray", hex: "#808080" },
      { title: "Light Charcoal", hex: "#8D8D8D" },
      { title: "Light Slate Gray", hex: "#9A9A9A" },
      { title: "Pale Gray", hex: "#A6A6A6" },
      { title: "Smoke", hex: "#B3B3B3" },
      { title: "Light Gray", hex: "#BFBFBF" },
      { title: "Silver", hex: "#CCCCCC" },
      { title: "Light Silver", hex: "#D9D9D9" },
      { title: "Gainsboro", hex: "#E6E6E6" },
      { title: "Gainsboro", hex: "#F2F2F2" }
    ]
  }
];

export { contrastColors, colorPalettes };