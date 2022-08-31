package src

import (
	"context"
)

type ContextValue struct {
	GameId int
	Player string
}

type playerContextKey struct{}
type gameContextKey struct{}

func NewCtx(ctx context.Context, playerId, gameId string) context.Context {
	newCtxWithPlayer := context.WithValue(ctx, playerContextKey{}, playerId)
	newCtxWithPlayerAndGame := context.WithValue(newCtxWithPlayer, gameContextKey{}, gameId)
	return newCtxWithPlayerAndGame
}

func GetPlayerId(ctx context.Context) string {
	value, ok := ctx.Value(playerContextKey{}).(string)
	if !ok {
		return ""
	}
	return value
}

func GetGameId(ctx context.Context) string {
	value, ok := ctx.Value(gameContextKey{}).(string)
	if !ok {
		return ""
	}
	return value
}
