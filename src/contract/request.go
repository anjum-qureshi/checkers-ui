package contract

type Player struct {
	Name string `json:"name"`
}

type Move struct {
	From int `json:"from,omitempty"`
	To int `json:"to,omitempty"`
}

