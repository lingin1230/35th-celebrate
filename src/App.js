import { Suspense, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"

import Foreword from "./pages/Foreword"
import Lobby from "./pages/Lobby"
import Maze from "./level/Maze"
import Monster from "./level/Monster"
import Music from "./level/music"

function App() {
    const [ musicStatus, setMusicStatus ] = useState('unlock')
    const [ monsterStatus, setMonsterStatus ] = useState('lock')
    const [ mazeStatus, setMazeStatus ] = useState('lock')
    // 已開放尚未完成 unlock、已開放已完成 complete、尚未開放 lock

    return (
        <>
            <Router>
                {/* <Switch> */}

                    <Route path="/foreword">
                        <Foreword />
                    </Route>

                    <Route path="/lobby">
                        <Lobby
                            musicStatus={musicStatus}
                            mazeStatus={mazeStatus}
                            monsterStatus={monsterStatus}
                        />
                    </Route>

                    <Route path="/level/music">
                        <Music setStatus={setMusicStatus}/>
                    </Route>

                    <Route path="/level/monster">
                        <Monster setStatus={setMonsterStatus}/>
                    </Route>

                    <Route path="/level/maze">
                        <Suspense fallback={'error'}>
                            <Maze setStatus={setMazeStatus}/>
                        </Suspense>
                    </Route>

                {/* </Switch> */}
            </Router>
        </>
    )
}

export default App
