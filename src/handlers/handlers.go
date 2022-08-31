package handlers

import (
	"encoding/json"
	"checkers/src/contract"
	"checkers/src/service"
	"net/http"
)

var game *service.Game

func CreateGame(w http.ResponseWriter, r *http.Request) {
	var player contract.Player

	err := json.NewDecoder(r.Body).Decode(&player)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if game == nil {
		game = service.CreateGame()
		game.AddPlayer(service.CreateFirstPlayer(player.Name))
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("Successfully created game"))
		return
	}
	http.Error(w, "GAME already created", http.StatusNotAcceptable)
}

func AddPlayer(w http.ResponseWriter, r *http.Request) {
	var player contract.Player
	err := json.NewDecoder(r.Body).Decode(&player)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if game == nil {
		http.Error(w, "No game to start", http.StatusNotFound)
		return
	}
	if game.HasPlayerVacancy() {
		game.AddPlayer(service.CreateSecondPlayer(player.Name))
		w.WriteHeader(http.StatusAccepted)
		w.Write([]byte("Successfully added to game"))
		return
	}
	http.Error(w, "NO Empty slots in game", http.StatusNotAcceptable)
}

func StartGame(w http.ResponseWriter, r *http.Request) {
	if game == nil {
		http.Error(w, "No game to start", http.StatusNotFound)
		return
	}
	if !game.HasPlayerVacancy() {
		http.Error(w, "need players to start game", http.StatusBadRequest)
		return
	}
	game.AssignTurn()
	w.WriteHeader(http.StatusNoContent)
}

func PlayGame(w http.ResponseWriter, r *http.Request) {
	if game == nil {
		http.Error(w, "No game to play", http.StatusNotFound)
		return
	}
	var move contract.Move
	err := json.NewDecoder(r.Body).Decode(&move)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	err = game.MoveTo(move.From, move.To)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotAcceptable)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json") 
    json.NewEncoder(w).Encode(game)
}

func FetchGameStatus(w http.ResponseWriter, r *http.Request) {
	if game == nil {
		http.Error(w, "No game to play", http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json") 
    json.NewEncoder(w).Encode(game)
}