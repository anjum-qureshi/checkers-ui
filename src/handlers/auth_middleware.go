package handlers

import (
	"checkers/src"
	"net/http"
)

type Middleware func(next http.Handler) http.Handler

func AuthMiddleWare() Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			playerId := r.Header.Get("player")
			gameId := r.Header.Get("game")
			newCtx := src.NewCtx(ctx, playerId, gameId)
			next.ServeHTTP(w, r.WithContext(newCtx))
		})
	}
}

func Wrap(handler http.Handler, middleware ...Middleware) http.Handler {
	last := len(middleware) - 1
	for m := range middleware {
		handler = middleware[last-m](handler)
	}
	return handler
}
