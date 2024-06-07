# Poker Hold'em

- [Flowchart](https://drive.google.com/file/d/1XrdXZUHxR4-Dpm7l_zo2vbY0ArfmFxBU/view?usp=sharing)
- [States](https://drive.google.com/file/d/1Ku2uheZpSPck_HYQwFF8LLIDvjP_qBvN/view?usp=sharing)
- [Schemas](https://drive.google.com/file/d/1Ku2uheZpSPck_HYQwFF8LLIDvjP_qBvN/view?usp=sharing) (a bit ugly)
- [API Deploy](http://apicasino.herokuapp.com)

This was made following a strategy based on the flow `state -> action -> newState`.

Here `states` means who is the dealer, who is folded, who won the round.
`actions` means which action (join, bet) and from who.

We can translate `states` as a db in mongodb using [native nestjs mongoose](https://docs.nestjs.com/techniques/mongodb). In [`./schemas`](./schemas) you can find everything you need to know and the [proposed states](./schemas/states/) for this game in a convenient json format, which fits perfectly in mongodb.

`actions` are incoming request and events from a ReactJS client, which will trigger a state change and return the new state to the client

Incoming `actions` ara handled by [controllers](https://docs.nestjs.com/controllers) and [gateways](https://docs.nestjs.com/websockets/gateways), where we call [services](https://docs.nestjs.com/providers) to calculate the new state.

## States

- [Room state](./schemas/states/room-states.json)
  - Inscription
  - Playing
- [Round State](./schemas/states/round-states.json)
  - PRE-FLOP
  - FLOP
  - TURN
  - RIVER
  - FINNISH
- [Player Bet State](./schemas/states/bet-state.json)
  - SMALL-BLIND
  - BIG-BLIND
  - LOWER
  - EVEN
  - ALL-IN
  - FOLDED

## Actions

- [Player Bet Actions](./schemas/states/bet-actions.json)
  - SMALL-BLIND
  - BIG-BLIND
  - CALL
  - CHECK
  - RAISE
  - ALL-IN
  - FOLD

## How to perform actions

Actions are performed through:
#### Sockets
Using [socket.io](https://socket.io/) library. Connect to `poker-holdem` [namespace](https://socket.io/docs/v4/namespaces/), emit and listen to following events.

#### REST
The main path structure is `/poker-holdem/room` or `/poker-holdem/game`

Every body attached to a request or event action will be validated in order to add a security layer, remember that actions with body are meant to modify states and we need to check if incoming data is sent by the correct user.
#### Create room
Through `POST /poker-holdem/room` send a body like following:
```json
{
	"type": "PUBLIC",
	"entryPrice": 10,
	"rakeValue": 0.5,
	"maxPlayers": 5,
	"timeout": 100000
}
```
this will return the newly created `roomId`

### View a room
The REST request `GET /poker-holde/room/:roomId` will respond with room main info, which includes general room data like timeouts, min and max entryPrice, maxPlayers.

When loading a room screen, you can emit a `see-room` event with ```json { "roomId": "a9a9a9a9a9a9a9" } ``` as body. This will subscribe the user to any room update (new players, game state, etc) which will be emitted through `refresh` event. 

See [JSON responses shape](#json-responses-shape) for detail.

### Join a room

When a user wants to join a room can emit a `join` event with following body:
```json
{
	"userId": "62d84b2b4ff37ea608267f21",
	"roomId": "62db0bc95da618a96b25ee80",
	"roomBalance": 9999999
}
```

`roomBalance` is the amount with player enter to the room. From this number will be substracted to perform bets.

REST endpoint `PUT /poker-holdem/room/join` with the same body is available for testing purposes.

### Bet

`activeRound` has `activePlayer` prop, which handles which player can send a bet action to this server. Each `player` has a `betState` which control which actions can be performed.
Emit `bet` event with:

```json
{
	"roomId": "62db0bc95da618a96b25ee80",
	"playerId": "62db0dac5da618a96b25ee8d",
	"betAction": 1,
	"raiseAmount": 1
}
```
`raiseAmount` it's obligatory in RAISE and not used in the other actions.

This event will trigger all necesary compute to define the next state that will be emitted as `activeRound` json through `refresh`.

REST endpoint `PUT /poker-holdem/game/bet` with the same body is available for testing purposes.

## JSON responses shape

### Room
```json
{
  "_id": "62db0bc95da618a96b25ee80",
  "turnTimeout": 10000,
  "startTimeout": 10000,
  "players": [ /* SEE PLAYERS EXPLANATION BELOW */ ],
  "roomState": {
    "_id": 2,
    "name": "playing",
    "description": "When a round is performing"
  },
  "activeRound": {
    "_id": "62db0eac5da618a96b25eea3",
    /* SEE BELOW FOR THIS PROP DETAIL */
  },
  "rounds": [
    "62db0eac5da618a96b25eea3"
  ],
  "availableSeats": [ 4, 5 ],
  "maxPlayers": 5,
  "rakeValue": 0.5,
  "entryPrice": 10,
  "type": "PUBLIC",
}
```

### Active Round

```json
{
    "_id": "62db0eac5da618a96b25eea3",
    "activePlayer": "62db0dac5da618a96b25ee8d",
    "dealer": "62db0d9e5da618a96b25ee85",
    "roundState": 2,
    "currentBet": 62,
    "pot": 1549,
    "tableCards": [ "JC", "4S", "6D", "AS" ],
    "players": [
        {
            "_id": "62db0d9e5da618a96b25ee85",
            "user": "62d1ce4564c2bfc5ce22e89f",
            "didAnAction": false,
            "currentBet": 15,
            "seat": 1,
            "betState": {
                "_id": 2,
                "name": "lower",
                "description": "Obligatory second bet. Normally double than small blind",
                "betActions": [
                    {
                        "_id": 3,
                        "name": "CALL",
                        "description": ""
                    },{
                        "_id": 4,
                        "name": "RAISE",
                        "description": ""
                    },{
                        "_id": 6,
                        "name": "ALL-IN",
                        "description": ""
                    }
                ]
            }
        },
      // And other players...
    ]
  }
```

### Players info
There is a slightly difference between the `players` prop inside room object and `players` prop inside `activeRound`.
The first one will only contains the necessary info to display a connected user:
```json
{
    "_id": "62e929f27297c48fefb086ba",
    "user": {
        "_id": "62d1ce4564c2bfc5ce22e89f",
        "lastName": "",
        "firstName": "perilla",
        "username": "mnero"
    },
    "roomBalance": 9999989,
    "seat": 1
}
```

The second one will contains every information needed to display the user and his game state:

```json
{
        "_id": "62e929f27297c48fefb086ba",
        "user": {
          "_id": "62d1ce4564c2bfc5ce22e89f",
          "lastName": "",
          "firstName": "asdasd",
          "username": "asdasd"
        },
        "hand": [ "7C", "QD" ],
        "roomBalance": 9999989,
        "currentBet": 10,
        "seat": 1,
        "betState": {
          "_id": 4,
          "name": "even",
          "description": "Player's last bet has tied the current bet",
          "betActions": [
            {
              "_id": 4,
              "name": "RAISE",
              "description": ""
            },
            {
              "_id": 5,
              "name": "CHECK",
              "description": ""
            },
            {
              "_id": 6,
              "name": "ALL-IN",
              "description": ""
            },
            {
              "_id": 7,
              "name": "FOLD",
              "description": ""
            }
          ]
        }
      },
```
