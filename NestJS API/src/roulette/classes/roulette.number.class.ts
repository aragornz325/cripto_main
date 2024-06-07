export class RouletteNumber {
  constructor(
    public number: number,
    public color: string,
    public row: number,
    public column: number,
    public doubleColumns: any[],
    public isOdd: boolean,
    public lessThanEighteen: boolean,
    public dozen: number,
    public doubles: any[],
    public quarters: any[],
  ) {
    this.number = number;
    this.color = color;
    this.column = column;
    this.doubleColumns = doubleColumns;
    this.row = row;
    this.color = color;
    this.isOdd = isOdd;
    this.lessThanEighteen = lessThanEighteen;
    this.dozen = dozen;
    this.doubles = doubles;
    this.quarters = quarters;
  }
}

const ceroNumber = new RouletteNumber(
  0,
  'green',
  0,
  0,
  [[0, 1]],
  false,
  false,
  0,
  [1, 2, 3],
  [
    [0, 1, 2],
    [0, 2, 3],
  ],
);
const oneNumber = new RouletteNumber(
  1,
  'red',
  3,
  1,
  [
    [0, 1],
    [1, 2],
  ],
  true,
  true,
  1,
  [0, 2, 4],
  [
    [0, 1, 2],
    [1, 2, 4, 5],
  ],
);
const twoNumber = new RouletteNumber(
  2,
  'black',
  2,
  1,
  [
    [0, 1],
    [1, 2],
  ],
  false,
  true,
  1,
  [0, 1, 3, 5],
  [
    [0, 2, 3],
    [0, 1, 2],
    [2, 3, 5, 6],
    [1, 2, 4, 5],
  ],
);
const threeNumber = new RouletteNumber(
  3,
  'red',
  1,
  1,
  [
    [0, 1],
    [1, 2],
  ],
  true,
  true,
  1,
  [0, 2, 6],
  [
    [0, 2, 3],
    [2, 3, 5, 6],
  ],
);
const fourNumber = new RouletteNumber(
  4,
  'black',
  3,
  2,
  [
    [1, 2],
    [2, 3],
  ],
  false,
  true,
  1,
  [1, 5, 7],
  [
    [1, 2, 4, 5],
    [4, 5, 7, 8],
  ],
);
const fiveNumber = new RouletteNumber(
  5,
  'red',
  2,
  2,
  [
    [1, 2],
    [2, 3],
  ],
  true,
  true,
  1,
  [2, 4, 6, 8],
  [
    [1, 2, 4, 5],
    [4, 5, 7, 8],
    [2, 3, 5, 6],
    [5, 6, 8, 9],
  ],
);
const sixNumber = new RouletteNumber(
  6,
  'black',
  1,
  2,
  [
    [1, 2],
    [2, 3],
  ],
  false,
  true,
  1,
  [3, 5, 9],
  [
    [2, 3, 5, 6],
    [5, 6, 8, 9],
  ],
);
const sevenNumber = new RouletteNumber(
  7,
  'red',
  3,
  3,
  [
    [2, 3],
    [3, 4],
  ],
  true,
  true,
  1,
  [4, 8, 10],
  [
    [4, 5, 7, 8],
    [5, 6, 8, 9],
  ],
);
const eightNumber = new RouletteNumber(
  8,
  'black',
  2,
  3,
  [
    [2, 3],
    [3, 4],
  ],
  false,
  true,
  1,
  [5, 7, 9],
  [
    [4, 5, 7, 8],
    [5, 6, 8, 9],
    [8, 9, 11, 12],
    [7, 8, 10, 11],
  ],
);
const nineNumber = new RouletteNumber(
  9,
  'red',
  1,
  3,
  [
    [2, 3],
    [3, 4],
  ],
  true,
  true,
  1,
  [6, 8, 12],
  [[5, 6, 8, 9]],
);
const tenNumber = new RouletteNumber(
  10,
  'black',
  3,
  4,
  [
    [3, 4],
    [4, 5],
  ],
  false,
  true,
  1,
  [7, 11, 13],
  [
    [5, 6, 8, 9],
    [6, 7, 9, 10],
  ],
);
const elevenNumber = new RouletteNumber(
  11,
  'black',
  2,
  4,
  [
    [3, 4],
    [4, 5],
  ],
  true,
  true,
  1,
  [8, 10, 12, 14],
  [
    [7, 8, 10, 11],
    [8, 9, 11, 12],
    [10, 11, 13, 14],
    [11, 12, 14, 15],
  ],
);
const twelveNumber = new RouletteNumber(
  12,
  'red',
  1,
  4,
  [
    [3, 4],
    [4, 5],
  ],
  false,
  true,
  1,
  [9, 11, 15],
  [
    [8, 9, 11, 12],
    [11, 12, 14, 15],
  ],
);
const thirteenNumber = new RouletteNumber(
  13,
  'black',
  3,
  5,
  [
    [4, 5],
    [5, 6],
  ],
  true,
  true,
  2,
  [10, 14, 16],
  [
    [10, 11, 13, 14],
    [13, 14, 16, 17],
  ],
);
const fourteenNumber = new RouletteNumber(
  14,
  'red',
  2,
  5,
  [
    [4, 5],
    [5, 6],
  ],
  false,
  true,
  2,
  [11, 13, 15, 17],
  [
    [10, 11, 13, 14],
    [11, 12, 14, 15],
    [14, 15, 17, 18],
    [13, 14, 16, 17],
  ],
);
const fifteenNumber = new RouletteNumber(
  15,
  'black',
  1,
  5,
  [
    [4, 5],
    [5, 6],
  ],
  true,
  true,
  2,
  [12, 14, 18],
  [
    [11, 12, 14, 15],
    [14, 15, 17, 18],
  ],
);
const sixteenNumber = new RouletteNumber(
  16,
  'red',
  3,
  6,
  [
    [5, 6],
    [6, 7],
  ],
  false,
  true,
  2,
  [13, 17, 19],
  [
    [13, 14, 16, 17],
    [16, 17, 19, 20],
  ],
);
const seventeenNumber = new RouletteNumber(
  17,
  'black',
  2,
  6,
  [
    [5, 6],
    [6, 7],
  ],
  true,
  true,
  2,
  [14, 16, 18, 20],
  [
    [13, 14, 16, 17],
    [16, 17, 19, 20],
    [14, 15, 17, 18],
    [17, 18, 20, 21],
  ],
);
const eighteenNumber = new RouletteNumber(
  18,
  'red',
  1,
  6,
  [
    [5, 6],
    [6, 7],
  ],
  false,
  true,
  2,
  [15, 17, 21],
  [
    [16, 17, 19, 20],
    [17, 18, 20, 21],
  ],
);
const nineteenNumber = new RouletteNumber(
  19,
  'red',
  3,
  7,
  [
    [6, 7],
    [7, 8],
  ],
  true,
  true,
  2,
  [16, 20, 22],
  [
    [16, 17, 19, 20],
    [19, 20, 22, 23],
  ],
);
const twentyNumber = new RouletteNumber(
  20,
  'black',
  2,
  7,
  [
    [6, 7],
    [7, 8],
  ],
  false,
  true,
  2,
  [17, 19, 21, 23],
  [
    [16, 17, 19, 20],
    [19, 20, 22, 23],
    [20, 21, 23, 24],
    [17, 18, 20, 21],
  ],
);
const twentyOneNumber = new RouletteNumber(
  21,
  'red',
  1,
  7,
  [
    [6, 7],
    [7, 8],
  ],
  true,
  true,
  2,
  [18, 20, 24],
  [
    [17, 18, 20, 21],
    [20, 21, 23, 24],
  ],
);
const twentyTwoNumber = new RouletteNumber(
  22,
  'black',
  3,
  8,
  [
    [7, 8],
    [8, 9],
  ],
  false,
  true,
  2,
  [19, 23, 25],
  [
    [19, 20, 22, 23],
    [22, 23, 25, 26],
  ],
);
const twentyThreeNumber = new RouletteNumber(
  23,
  'red',
  2,
  8,
  [
    [7, 8],
    [8, 9],
  ],
  true,
  true,
  2,
  [20, 22, 24, 26],
  [
    [19, 20, 22, 23],
    [20, 21, 23, 24],
    [23, 24, 26, 27],
    [22, 23, 25, 26],
  ],
);
const twentyFourNumber = new RouletteNumber(
  24,
  'black',
  1,
  8,
  [
    [7, 8],
    [8, 9],
  ],
  false,
  true,
  3,
  [21, 23, 25],
  [
    [20, 21, 23, 24],
    [23, 24, 26, 27],
  ],
);
const twentyFiveNumber = new RouletteNumber(
  25,
  'red',
  3,
  9,
  [
    [8, 9],
    [9, 10],
  ],
  true,
  true,
  3,
  [22, 24, 26],
  [
    [21, 22, 24, 25],
    [24, 25, 27, 28],
  ],
);
const twentySixNumber = new RouletteNumber(
  26,
  'black',
  2,
  9,
  [
    [8, 9],
    [9, 10],
  ],
  false,
  true,
  3,
  [23, 25, 27],
  [
    [22, 23, 25, 26],
    [25, 26, 28, 29],
  ],
);
const twentySevenNumber = new RouletteNumber(
  27,
  'red',
  1,
  9,
  [
    [8, 9],
    [9, 10],
  ],
  true,
  true,
  3,
  [24, 26, 28],
  [
    [23, 24, 26, 27],
    [26, 27, 29, 30],
  ],
);
const twentyEightNumber = new RouletteNumber(
  28,
  'black',
  3,
  10,
  [
    [9, 10],
    [10, 11],
  ],
  false,
  true,
  3,
  [25, 27, 29],
  [
    [24, 25, 27, 28],
    [27, 28, 30, 31],
  ],
);
const twentyNineNumber = new RouletteNumber(
  29,
  'black',
  2,
  10,
  [
    [9, 10],
    [10, 11],
  ],
  true,
  true,
  3,
  [26, 28, 30],
  [
    [25, 26, 28, 29],
    [28, 29, 31, 32],
  ],
);
const thirtyNumber = new RouletteNumber(
  30,
  'red',
  1,
  10,
  [
    [9, 10],
    [10, 11],
  ],
  false,
  true,
  3,
  [27, 29, 31],
  [
    [26, 27, 29, 30],
    [29, 30, 32, 33],
  ],
);
const thirtyOneNumber = new RouletteNumber(
  31,
  'black',
  3,
  11,
  [
    [10, 11],
    [11, 12],
  ],
  true,
  true,
  3,
  [28, 30, 32],
  [
    [27, 28, 30, 31],
    [30, 31, 33, 34],
  ],
);
const thirtyTwoNumber = new RouletteNumber(
  32,
  'red',
  2,
  11,
  [
    [10, 11],
    [11, 12],
  ],
  false,
  true,
  3,
  [29, 31, 33],
  [
    [28, 29, 31, 32],
    [31, 32, 34, 35],
  ],
);
const thirtyThreeNumber = new RouletteNumber(
  33,
  'black',
  1,
  11,
  [
    [10, 11],
    [11, 12],
  ],
  true,
  true,
  3,
  [30, 32, 34],
  [
    [29, 30, 32, 33],
    [32, 33, 35, 36],
  ],
);
const thirtyFourNumber = new RouletteNumber(
  34,
  'red',
  3,
  12,
  [[11, 12]],
  false,
  true,
  3,
  [31, 33, 35],
  [
    [30, 31, 33, 34],
    [33, 34, 36, 37],
  ],
);
const thirtyFiveNumber = new RouletteNumber(
  35,
  'black',
  2,
  12,
  [[11, 12]],
  true,
  true,
  3,
  [32, 34, 36],
  [
    [31, 32, 34, 35],
    [34, 35, 37, 38],
  ],
);
const thirtySixNumber = new RouletteNumber(
  36,
  'red',
  1,
  12,
  [[11, 12]],
  false,
  true,
  3,
  [33, 35, 37],
  [
    [32, 33, 35, 36],
    [35, 36, 38, 39],
  ],
);

const rouletteNumbers = [
  ceroNumber,
  fifteenNumber,
  nineteenNumber,
  fourNumber,
  twentyOneNumber,
  twoNumber,
  twentyFiveNumber,
  seventeenNumber,
  thirtyFourNumber,
  sixNumber,
  twentySevenNumber,
  thirteenNumber,
  thirtySixNumber,
  elevenNumber,
  thirtyNumber,
  eightNumber,
  twentyThreeNumber,
  tenNumber,
  fiveNumber,
  twentyFourNumber,
  sixteenNumber,
  thirtyThreeNumber,
  oneNumber,
  twentyNumber,
  fourteenNumber,
  thirtyOneNumber,
  nineNumber,
  twentyTwoNumber,
  eighteenNumber,
  twentyNineNumber,
  sevenNumber,
  twentyEightNumber,
  twelveNumber,
  thirtyFiveNumber,
  threeNumber,
  twentySixNumber,
  thirtyTwoNumber,
];

export { rouletteNumbers };
