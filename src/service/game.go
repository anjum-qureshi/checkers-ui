package service

import (
	"errors"
)

type BoardRule func(position int) bool

func createBoardRule(start, end int) BoardRule {
	return func(position int) bool {
		return position >= start && position <= end
	}
}

type Status string

const (
	Draw       Status = "draw"
	Finished   Status = "finished"
	Unfinished Status = "unfinished"
)

type Game struct {
	Players         []Player `json:"players"`
	CurrPlayerIndex int      `json:"currentPlayer"`
	Start           int      `json:"start"`
	End             int      `json:"end"`
	PlayerSize      int      `json:"playerSize"`
}

func (g *Game) findWhoWon() *Player {
	for index, player := range g.Players {
		if player.hasLost() {
			return &g.Players[1-index]
		}
	}
	return nil
}

func (g *Game) HasPlayerVacancy() bool {
	return len(g.Players) != g.PlayerSize
}

func (g *Game) AddPlayer(player Player) {
	g.Players = append(g.Players, player)
}

func (g *Game) MoveTo(coinPos, position int) error {
	currPlayer := g.getCurrentPlayer()
	coin := g.getCurrentPlayer().getCoinAt(coinPos)

	moves := coin.possibleMoves(currPlayer.Home, currPlayer.Target, createBoardRule(g.Start, g.End))
	validationError := g.validate(moves, coinPos, position)
	if validationError == nil {
		coin.moveTo(position)
		return nil
	}
	return validationError
}

func (g *Game) getCurrentPlayer() *Player {
	return &g.Players[g.CurrPlayerIndex]
}

func (g *Game) getOtherPlayer() *Player {
	return &g.Players[1-g.CurrPlayerIndex]
}

func (g *Game) validate(moves []int, coinPos, position int) error {
	currPlayer := g.getCurrentPlayer()
	selectedCoin := g.getCurrentPlayer().getCoinAt(coinPos)

	if g.getOtherPlayer().getCoinAt(coinPos) != nil {
		return errors.New("Coin belongs to other player")
	}
	if selectedCoin == nil {
		return errors.New("No coin to move at that position")
	}
	if currPlayer.getCoinAt(coinPos) != nil {
		return errors.New("Current player's coin exist at the place to be moved")
	}
	if includes(moves, position) {
		return nil
	}
	return errors.New("Invalid move to position")
}

func (g *Game) isCapturingMove(coinPos int) bool {
	return g.getOtherPlayer().getCoinAt(coinPos) != nil
}

func (g *Game) changeTurn() {
	g.CurrPlayerIndex = 1 - g.CurrPlayerIndex
}

func (g *Game) AssignTurn() {
	g.CurrPlayerIndex = 0
}
