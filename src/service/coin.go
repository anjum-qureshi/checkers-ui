package service

type Direction int

const (
	up   Direction = -1
	down           = 1
)

func getMovesBasedOnDirection(direction Direction, position int) []int {
	placesToBeAdded := []int{7, 9}
	moves := []int{}
	for _, number := range placesToBeAdded {
		moves = append(moves, number*int(direction)+position)
	}
	return moves
}

type Coin struct {
	IsKing   bool `json:"isKing"`
	Position int  `json:"position"`
}

func (c *Coin) possibleMoves(home, target Direction, validate BoardRule) []int {
	moves := getMovesBasedOnDirection(home, c.Position)
	if c.IsKing {
		moves = append(getMovesBasedOnDirection(target, c.Position), moves...)
	}
	validMoves := []int{}
	for _,move := range moves {
		if validate(move) {
			validMoves = append(validMoves,move)
		}
	}
	return validMoves
}

func (c *Coin) isSame(value int) bool {
	return c.Position == value
}

func (c *Coin) moveTo(location int) {
	c.Position = location
}
