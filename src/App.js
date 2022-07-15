import { Suspense, useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import axios from "axios"

import Foreword from "./pages/Foreword"
import Lobby from "./pages/Lobby"
import Maze from "./level/Maze"
import Monster from "./level/Monster"
import Music from "./level/music"

function App() {
    const [ musicStatus, setMusicStatus ] = useState(null)
    const [ monsterStatus, setMonsterStatus ] = useState('lock')
    const [ mazeStatus, setMazeStatus ] = useState('lock')

    // 已開放尚未完成 unlock、已開放已完成 complete、尚未開放 lock
    

    useEffect(() => {
        if (document.location.pathname === '/') {
            document.location.href = '/foreword'
        }
    }, [document.location.pathname])

    useEffect(() => {
        axios.get('http://localhost:3000/level_status')
        .then((res) => {
            setMusicStatus(res.data.music)
            setMonsterStatus(res.data.monster)
            setMazeStatus(res.data.maze)
        })
    }, [musicStatus, monsterStatus, mazeStatus])

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
                        <Music status={musicStatus} setStatus={setMusicStatus}/>
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
