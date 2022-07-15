import classNames from 'classnames'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import jungleMusic from 'url:../assets/sound/jungle.wav'
import monkeyHurt from 'url:../assets/sound/monkey-hurt.mp3'
import girlHurt from 'url:../assets/sound/pyo.mp3'
import success from 'url:../assets/sound/success.mp3'
import fail from 'url:../assets/sound/power-down.mp3'

export default function Monster() {

    const [ popup, setPopup ] = useState('begin')
    const [ result, setResult ] = useState(null)
    const [ monkeyBlood, setMonkeyBlood ] = useState(100)
    const [ girlBlood, setGirlBlood ] = useState(100)
    const bgSound = useRef()
    const sound = useRef()

    useEffect(() => {
        bgSound.current.src = jungleMusic
        bgSound.current.loop = true
        bgSound.current.play()
    }, [])

    useEffect(() => {
        if (monkeyBlood !== 100) {
            sound.current.src = monkeyHurt
            sound.current.play()
        }

        if (monkeyBlood === 0) {
            sound.current.src = fail
            sound.current.play()

            setResult(false)
            setTimeout(() => {
                setPopup('monkey')
                setResult(null)
            }, [2000])
        }
    }, [monkeyBlood])

    useEffect(() => {
        if (girlBlood !== 100) {
            sound.current.src = girlHurt
            sound.current.play()
        }

        if (girlBlood === 0) {
            sound.current.src = success
            sound.current.play()

            axios.patch('http://localhost:3000/level_status', {
                "monster": 'complete',
                "maze": 'unlock'
            })

            setResult(true)
            setTimeout(() => {
                setPopup('girl')
                setResult(null)
            }, [2000])
        }
    }, [girlBlood])

    function popupClick() {
        if (popup === 'monkey') {
            document.location.href = '/lobby'
        }
        if (popup === 'girl') {
            setPopup('success')
        }
        if (popup === 'success') {
            document.location.href = '/lobby'
        }
    }

    const resultClass = classNames('result', {
        'success': result === true,
        'fail': result === false
    })
    const statusClass = classNames('status', {
        'success': girlBlood === 0,
        'fail': monkeyBlood === 0
    })
    const monkeyClass = classNames('monkey', 'blood', `blood-${monkeyBlood >=0 ? monkeyBlood : 0}`)
    const girlClass = classNames('girl', 'blood', `blood-${girlBlood >=0 ? girlBlood : 0}`)
    const popupClass = classNames('popup', {
        'hide': popup === 'playing',
        'begin': popup === 'begin',
    })

    return (
        <div className="monster">
            <div className={resultClass}></div>
            <audio ref={bgSound} />
            <audio ref={sound} />
            <div className={statusClass}></div>
            <div
                className={monkeyClass}
                onClick={() => {monkeyBlood > 0 && setMonkeyBlood(monkeyBlood - 10)}}
            ></div>
            <div
                className={girlClass}
                onClick={() => {girlBlood > 0 && setGirlBlood(girlBlood - 10)}}
            ></div>
            <div className={popupClass}>
                <div className="popup-content" onClick={popupClick}>
                    { popup === 'begin' &&
                        <>
                        <div>
                            快！快救救我！我快被壞人抓到了！
                        </div>
                        <button class="start" onClick={()=> {setPopup('playing')}}></button>
                        </>
                    }
                    { popup === 'monkey' &&
                        <>
                        <div>
                            我...我是 QQ 啊！你怎麼把我殺了！！
                        </div>
                        <div className="monkey-detail"></div>
                        </>
                    }
                    { popup === 'girl' &&
                        <>
                        <div>
                            身為一位邪惡女童食人魔<br/>
                            居然被一名普通人類給殺死了！！！<br/>
                            我做鬼也不會...ㄅㄜ ㄌㄜ...
                        </div>
                        <div className="girl-detail"></div>
                        </>
                    }
                    { popup === 'success' &&
                        <>
                        <div>
                            真是太感謝你了！<br/>
                            請務必讓我報答你！<br/>
                            什麼？寶藏？<br/>
                            是是是，我這就帶你去找～<br/>
                            他就被藏在 Isekai Maze 裡面，<br/>
                            走吧！
                        </div>
                        <div className="monkey-detail"></div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}