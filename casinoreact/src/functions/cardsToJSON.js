const cardsToJSON = ( cardArray ) => {
  const cards = [];
  cardArray.map((str)=>{
    let type = str[str.length - 1];
    switch(type){
      case 'C':
        type = 'clubs';
        break;
      case 'D':
        type = 'diamonds';
        break;
      case 'H':
        type = 'hearts';
        break;
      case 'S':
        type = 'spades';
        break;
    }
    let value = str.slice(0, -1).toLowerCase();
    cards.push({ type, value });
  });
  return cards;
}

export default cardsToJSON;