package service

func createPlayer(name string, home, target Direction, coins []Coin) Player {
	return Player{
		Name:   name,
		Home:   home,
		Target: target,
		Coins:  coins,
	}
}

func createCoins(positions []int) []Coin {
	coins := []Coin{}
	for _, position := range positions {
		coins = append(coins, Coin{
			Position: position,
		})
	}
	return coins
}

func makeRange(end, start, step int) []int {
	if step <= 0 || end < start {
		return []int{}
	}
	s := make([]int, 0, 1+(end-start)/step)
	for start <= end {
		s = append(s, start)
		start += step
	}
	return s
}

func includes(array []int, item int) bool {
	for _, element := range array {
		if element == item {
			return true
		}
	}
	return false
}

func CreateGame() *Game {
	players := []Player{}
	game := Game{
		Players: players,
		Start:   1,
		End:     64,
	}
	return &game
}

func CreateFirstPlayer(name string) Player {
	coins := createCoins(makeRange(2, 25, 2))
	return createPlayer(name, up, down, coins)
}

func CreateSecondPlayer(name string) Player {
	coins := createCoins(makeRange(41, 64, 2))
	return createPlayer(name, down, up, coins)
}
