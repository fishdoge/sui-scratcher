
# Sui Scratcher Proposal

---

## I. Game Overview

**Game Title:** Blockchain Scratch Lottery (Sui Scratcher)
**Game Type:** Scratch card-style game
**Platform:** Blockchain DApp
**Number of Players:** Unlimited; open to global participants

**Game Concept:**
This game is a blockchain-based lottery called *Sui Scratcher*, which combines a traditional jackpot mechanism with a “termination reward” protocol. Players can purchase an unlimited number of lottery tickets. Each ticket reveals its result instantly. If a player wins a jackpot, they must choose the right timing to redeem it—failing to do so before the termination event results in forfeiting the prize.

---

## II. Gameplay Instructions

### 1. Initial Setup:

- The banker injects **1000 USDT** into the prize pool to initiate the first round.

### 2. Lottery Purchase & Draw Process:

- **Each ticket costs 5 USDT**, and players may purchase unlimited tickets.
- Upon purchase, the ticket is instantly revealed to indicate whether it is a winning ticket.
  - Winning probability: **20.15%**

### 3. Prize Structure:

- **14% chance** to win 10 USDT (Common Prize)
- **6% chance** to win 20 USDT (Special Prize)
- **0.1% chance** to win the Grand Prize:
  - Redeemable at any time to **claim the entire current prize pool**.
  - Multiple players may hold the Grand Prize simultaneously.
  - If not redeemed before a termination event, the prize will be forfeited.
- **0.05% chance** to trigger a Termination Prize:
  - The current game round ends immediately.
  - Any unredeemed Grand Prizes will be voided.

### 4. Game Termination Conditions:

- The game ends when a **Grand Prize is redeemed**, or when a **Termination Prize is drawn**.

### 5. Prize Pool Distribution Upon Game Termination:

- Regardless of the termination cause (Grand Prize redemption or Termination Prize), **30%** of the prize pool is rolled over to the **next game round**.

### 6. Special Case Handling:

- If no Grand or Termination Prize is drawn and the prize pool is depleted by regular wins, the project team will **re-inject 100 USDT** to maintain game continuity.

---

## III. Game Components

### 1. Lottery System:

- Lottery tickets reveal results immediately upon purchase.
- If not a winning ticket, the funds are directly added to the prize pool.

### 2. Prize Pool Management:

- The banker initially contributes 1000 USDT; tickets can be purchased infinitely.
- Once a Grand Prize is redeemed or a Termination Prize is triggered, the prize pool is distributed, with 30% carried forward to the next round.

### 3. Player Strategy & Protocol Dynamics:

- Players who win the Grand Prize must time their redemption wisely. Delaying redemption may result in forfeiture if a Termination Prize is drawn.
- Players may adopt either competitive or cooperative strategies, choosing to wait for the prize pool to grow before claiming.

---

## IV. Economic Model & Risk Management

### 1. Economic Model:

- All non-winning ticket revenue goes directly into the prize pool, creating a self-sustaining economic loop.
- If the prize pool is drained prematurely, the project team will inject another 100 USDT to ensure gameplay continuity.

### 2. Risk Control:

- The probabilities of the Grand Prize and Termination Prize add uncertainty to the system.
- After each round, the system will assess the prize pool growth rate and adjust win probabilities accordingly to maintain economic stability.

---

## V. Transparency & Recordkeeping

### 1. On-chain Transparency:

- All ticket purchases and prize distributions are recorded on-chain, ensuring fairness and transparency.
- Players can check the prize pool and winning probabilities at any time.

### 2. Community and NFT Integration:

- Special and Grand Prizes may be represented as NFTs, allowing players to trade or collect them on blockchain marketplaces.
- Community leaderboards and a “Hall of Fame” can be created to enhance engagement and a sense of achievement.

---

## VI. Conclusion

This system introduces an innovative combination of jackpot and termination-based mechanics, differentiating itself from traditional lotteries. By leveraging blockchain transparency and modular economic design, *Sui Scratcher* delivers a fresh and thrilling experience to players worldwide.
