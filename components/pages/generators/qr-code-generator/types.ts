enum CellShape {
  Square = 'square',
  Circle = 'circle',
  RoundedSquareSlight = 'rounded-square-slight',
  RoundedSquareFull = 'rounded-square-full',
  RoundedTopLeftBottomRight = 'rounded-top-left-bottom-right',
  RoundedTopRightBottomLeft = 'rounded-top-right-bottom-left',
  VerticalLines = 'vertical-lines',
  HorizontalLines = 'horizontal-lines',
}

enum EyeShape {
  Square = 'square',
  RoundedSquare = 'rounded-square',
  Circle = 'circle',
  Drop = 'drop',
}

enum DataType {
  Text = 'text',
  URL = 'url',
  Email = 'email',
  Phone = 'phone',
  SMS = 'sms',
  WiFi = 'wifi',
  VCard = 'vcard',
  Event = 'event',
}

interface Settings {
  foregroundColor: string;
  backgroundColor: string;
  cellShape: CellShape;
  eyeShape: EyeShape;
}

interface ColorsExample {
  foregroundColor: string;
  backgroundColor: string;
}

export { CellShape, EyeShape, DataType };

export type { Settings, ColorsExample };
