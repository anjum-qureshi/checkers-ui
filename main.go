package main

// "strings"
// "checkers/src/service"

// type InputReader struct {
// 	reader *bufio.Reader
// }

// func (i *InputReader) getLine(label string) string {
// 	fmt.Println(label)
// 	text, _ := i.reader.ReadString('\n')
// 	return strings.Replace(text, "\n", "", -1)
// }

func main() {
	// command := os.Args[1]
	// fmt.Print()
	serve()
	// switch command {
	// case "serve":
	// 	fmt.Print("start serve")
	// 	serve()
	// case "cli":
	// 	fmt.Print("start cli")
	// 	cli()
	// default:
	// 	fmt.Printf("invalid command")
	// }
}

// func cli() {
	// reader := InputReader{reader: bufio.NewReader(os.Stdin)}
	// player1 := reader.getLine("Enter player name")
	// player2 := reader.getLine("Enter player name")
	// game := service.CreateGame()
	// game.AssignTurn()
	// for game.FindWhoWon() != nil {
	// 	label := game.GetCurrentPlayer().Name + "'s Turn input move"
	// 	command := reader.getLine(label)
	// 	text := strings.Split(command, "to")
	// 	fmt.Print(text)
	// }

// }
