package main

import (
	"checkers/src/handlers"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func Middleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("middleware", r.URL)
		h.ServeHTTP(w, r)
	})
}

func serve() {
	router := mux.NewRouter()
	router.Handle("/game/create", handlers.CreateGameHandler()).Methods(http.MethodPost)
	router.Handle("/game/add-player", handlers.AddPlayerHandler()).Methods(http.MethodPost)
	router.Handle("/game/status", handlers.Wrap(handlers.FetchGameStatusHandler(), handlers.AuthMiddleWare())).Methods(http.MethodGet)
	router.Handle("/game/start", handlers.Wrap(handlers.StartGameHandler(), handlers.AuthMiddleWare())).Methods(http.MethodGet)
	router.Handle("/game/move", handlers.Wrap(handlers.PlayGameHandler(), handlers.AuthMiddleWare())).Methods(http.MethodPost)
	server := &http.Server{
		Handler:      router,
		Addr:         "127.0.0.1:8000",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	server.ListenAndServe()
	log.Println("Listening at port 8000")
}
