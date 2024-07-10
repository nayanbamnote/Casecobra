// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950

export const BASE_PRICE = 14_00


export const COLORS = [
  { label: 'Black', value: 'black', tw: 'zinc-900' },
  { label: 'Blue',  value: 'blue',  tw: 'blue-950' },
  { label: 'Rose', value: 'rose', tw: 'rose-950' },
] as const

export const MODELS = {
  name: 'models',
  options: [
    { label: 'iPhone X', value: 'iphonex' },
    { label: 'iPhone 11', value: 'iphone11' },
    { label: 'iPhone 12', value: 'iphone12' },
    { label: 'iPhone 13', value: 'iphone13' },
    { label: 'iPhone 14', value: 'iphone14' },
    { label: 'iPhone 15', value: 'iphone15' },
  ],
} as const

export const MATERIALS = {
  name: 'material',
  options: [
    {
      label: 'Silicone',
      value: 'silicone',
      description: undefined,
      price: 0,
    },
    {
      label: 'Soft Polycarbonate',
      value: 'polycarbonate',
      description: 'Scratch-resistant coating',
      price: 5_00,
    },
  ],
} as const

export const FINISHES = {
  name: 'finish',
  options: [
    {
      label: 'Smooth Finish',
      value: 'smooth',
      description: undefined,
      price: 0,
    },
    {
      label: 'Textured Finish',
      value: 'textured',
      description: 'Soft grippy texture',
      price: 3_00,
    },
  ],
} as const