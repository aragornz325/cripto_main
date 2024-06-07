const stringToNumber = (string) => {
  switch(string){
    case 'one':
      return 1;
    case 'five':
      return 5;
    case 'ten':
      return 10;
    case 'twentyfive':
      return 25;
    case 'fifty':
      return 50;
    case 'hundred':
      return 100;
    case 'twohundred':
      return 200;
    case 'fivehundred':
      return 500;
    case 'thousand':
      return 1000;
    default:
      return undefined;
  }
}

export default stringToNumber;