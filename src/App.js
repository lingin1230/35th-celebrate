import { Suspense, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"

import Foreword from "./components/Foreword"
import Lobby from "./components/Lobby"
import Maze from "./level/Maze"
import Monster from "./level/Monster"
import Music from "./level/music"

function App() {
    const [ musicComplete, setMusicComplete ] = useState(false)
    const [ mazeComplete, setMazeComplete ] = useState(false)
    const [ monsterComplete, setMonsterComplete ] = useState(false)

    return (
        <>
            <Router>
                <Switch>

                    <Route path="/foreword">
                        <Foreword />
                    </Route>

                    <Route path="/lobby">
                        <Lobby />
                    </Route>

                    <Route path="/level/music">
                        <Music setComplete={setMusicComplete}/>
                    </Route>

                    <Route path="/level/maze">
                        <Suspense fallback={'error'}>
                            <Maze setComplete={setMazeComplete}/>
                        </Suspense>
                    </Route>

                    <Route path="/level/monster">
                        <Monster setComplete={setMonsterComplete}/>
                    </Route>

                </Switch>
            </Router>
        </>
    )
}

export default App
