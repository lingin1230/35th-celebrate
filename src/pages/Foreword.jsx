import classNames from "classnames"
import { useEffect, useState } from "react"

export default function Foreword() {

    const [ text, setText ] = useState(null)
    const [ pageTrasition, setPageTransition ] = useState(false)


    useEffect(() => {
        setText(
            <>
            <div className="text" onClick={() => {nextText()}}>
                Dear Furecool: <br/><br/>
                對於身為勇者的你，<br/>
                應該一生都致力於尋找寶物吧？<br/>
                最近異世界中<br/>
                謠傳有著價值連城的寶物，<br/>
                就隱藏在魔物大陸裡面！
            </div>
            </>
        )
    }, [])

    function nextText() {
        setText(
            <div className="text" onClick={() => {goLobby()}}>
                在農荒小鎮上，<br/>
                有一名叫做 QQ 的珠寶商，<br/>
                據說她擁有寶物的藏寶圖！<br/>
                想必愛喝酒的她，<br/>
                正在 Skeleton Bar 開心暢飲吧？<br/><br/>
                快去找到她！<br/>
                取得寶藏的所在地吧！
            </div>
        )
    }
    function goLobby() {
        setPageTransition(true)
        setTimeout(() => {
            document.location.href = '/lobby'
        }, [1500])
    }

    const forewordClass = classNames('foreword', {
        'go-lobby': pageTrasition
    })

    return (
        <div className={forewordClass}>
            <div className="content">
                <div className="paper">
                    {text}
                </div>
            </div>
        </div>
    )
}