package service

type Player struct {
	Name   string `json:"name"`
	Home   Direction `json:"home"`
	Target Direction `json:"target"`
	Coins  []Coin `json:"coins"`
}

func (p *Player) getKingPosition(home Direction) Direction {
	if home == up {
		return down
	}
	return up
}

func (p *Player) hasLost() bool {
	return len(p.Coins) == 0
}

func (p *Player) possibleMoves(validate BoardRule) map[Coin][]int {
	coinsMoveMap := map[Coin][]int{}
	for _, coin := range p.Coins {
		coinsMoveMap[coin] = coin.possibleMoves(p.Home, p.Target, validate)
	}
	return coinsMoveMap
}

func (p *Player) getCoinAt(value int) *Coin {
	for _, coin := range p.Coins {
		if coin.Position == value {
			return &coin
		}
	}
	return nil
}
