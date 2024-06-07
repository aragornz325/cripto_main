## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Endpoints

## Users
| Method | Endpoint | Description |
| ------ | ------ | ------ |
| GET | /api/users/ | User List |
| GET | /api/users/id/ | Retrieve User |
| PUT | /api/users/id/ | Update User |
| POST | /api/users/ | Create User |
| Delete | /api/users/id/ | Delete User |

#### User Object

```javascript
{
    username: "JohnBet",
    password: "aa0c8d12686d38a1524df75e69e09512225ee33a75e9a06127a5fddeb960f24d",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 555-1234",
}
```

## Game Coins
| Method | Endpoint | Description |
| ------ | ------ | ------ |
| PUT | /api/users/{id}/updateCoins | Update User Black Jack Coins |


#### Query

```javascript
{
    "one": 916,
    "five": 1916,
    "ten": 1000,
    "twentyfive": 4000,
    "fifty": 5000,
    "hundred": 10000,
    "twohundred": 20000,
    "fivehundred": 50000,
    "thousand": 100000
}
```

#### Result

```javascript
{
    coins: {
        "one": 916,
        "five": 1916,
        "ten": 1000,
        "twentyfive": 4000,
        "fifty": 5000,
        "hundred": 10000,
        "twohundred": 20000,
        "fivehundred": 50000,
        "thousand": 100000 
    },
    _id: "615cfc1ed88ec4e9997106a2",
    username: "Pedro",
    email: "johndasdasd.doe@example.com",
    password: "aa0c8d12686d38a1524df75e69e09512225ee33a75e9a06127a5fddeb960f24d",
    firstName: "Mariano",
    lastName: "Merdasd",
    phone: "+1 (555) 555-1234",
    coins: 0,
    status: false,
    date: "2021-10-06T01:30:06.216Z",
    __v: 0
}
```

## Blackjack Game
| Method | Endpoint | Description |
| ------ | ------ | ------ |
| POST | /api/blackjack/ | Create Game / Retrieve Game (once created) |
| POST | /api/blackjack/hit | Hit a Hand |
| POST | /api/blackjack/stand | Stand a hand |
| POST | /api/blackjack/double | Double a Hand |
| POST | /api/blackjack/split | Split a Hand |
| POST | /api/blackjack/split/hit | Hit a Splited Hand |
| POST | /api/blackjack/split/stand | Stand a Splited Hand |
| POST | /api/blackjack/split/double | Double a Splited Hand |

#### Query to Create a  Game With 3 hands|  /api/blackjack/

```javascript
{
  "userId": "617c3e83f8bf468ccf3a4fde", // User ID
  "bet": [{
      "one": 1,
      "five": 1,
      "ten": 0,
      "twentyfive": 0,
      "fifty": 0,
      "hundred": 0,
      "twohundred": 0,
      "fivehundred": 0,
      "thousand": 0
  },
  {
      "one": 1,
      "five": 1,
      "ten": 0,
      "twentyfive": 0,
      "fifty": 0,
      "hundred": 0,
      "twohundred": 0,
      "fivehundred": 0,
      "thousand": 0
  },
  {
      "one": 1,
      "five": 1,
      "ten": 0,
      "twentyfive": 0,
      "fifty": 0,
      "hundred": 0,
      "twohundred": 0,
      "fivehundred": 0,
      "thousand": 0
  }],
  "games": [true,true,true] // Playing with three hands
}
```

#### Query to Hit/Stand/Double/Split a Hand

```javascript
{
  "userId": "617c3e83f8bf468ccf3a4fde",
  "index": 2  // Index of the hand you want to apply the methods
}
```

#### Query to Hit/Stand/Double a Splited Hand

```javascript
{
  "userId": "617c3e83f8bf468ccf3a4fde",
  "index": 2,  // Index of the hand you want to apply the methods
  "handIndex": 0 // Index of the internal hand
}
```