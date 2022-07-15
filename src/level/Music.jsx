import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import axios from "axios"
import soundC from 'url:../assets/sound/C.mp3'
import soundD from 'url:../assets/sound/D.mp3'
import soundE from 'url:../assets/sound/E.mp3'
import soundF from 'url:../assets/sound/F.mp3'
import soundG from 'url:../assets/sound/G.mp3'
import soundA from 'url:../assets/sound/A.mp3'
import soundB from 'url:../assets/sound/B.mp3'
import barMusic from 'url:../assets/sound/bar.mp3'
import meow from 'url:../assets/sound/cat.mp3'
import coin from 'url:../assets/sound/coin.mp3'
import powerDown from 'url:../assets/sound/power-down.mp3'
import success from 'url:../assets/sound/success.mp3'


export default function Music(props) {

    const status = props.status
    const setStatus = props.setStatus

    const [ musicNote, setMusicNote ] = useState([])
    const [ activeNote, setActiveNote ] = useState(null)
    const [ game, setGame ] = useState(false)
    const [ currentNote, setCurrentNote ] = useState(0)
    const [ talk, setTalk ] = useState(null)
    const [ piano, setPiano ] = useState(false)
    const [ sick, setSick ] = useState(false)

    const sound = useRef()
    const bgSound = useRef()

    const pianoNote = {
        67: soundC,
        68: soundD,
        69: soundE,
        70: soundF,
        71: soundG,
        65: soundA,
        66: soundB
    }
    const correct = [67, 68, 69, 67, 68, 67, 70]
    
    function keyDown(e) {
        if (pianoNote[e.keyCode] !== undefined && game === true) {
            sound.current.src = pianoNote[e.keyCode]
            sound.current.play()

            if (currentNote + 1 === correct.length) {
                if (e.keyCode === correct[currentNote]) {
                    setTimeout(() => {
                        sound.current.src = success
                        sound.current.play()
                        setGame('success')
                        axios.patch('http://localhost:3000/level_status', {
                            "music": 'complete',
                            "monster": 'unlock'
                        })
                        .then((res) => {
                            setStatus(res.data.status)
                        })
                    }, [1000])

                    setTimeout(() => {
                        setTalk('cat')
                        setPiano(false)
                    }, [2500])

                } else {
                    setActiveNote(null)
                    setGame('error')
                    setCurrentNote(0)
                }
            }
            else {
                if (e.keyCode === correct[currentNote]) {
                    setActiveNote(Math.floor(Math.random() / 2 * 10))
                    setCurrentNote(currentNote + 1)
                } else {
                    setActiveNote(null)
                    setGame('error')
                    setCurrentNote(0)
                }
            }
        }
    }

    useEffect(() => {
        bgSound.current.src = barMusic
        bgSound.current.play()
        bgSound.current.loop = true
    }, [])

    useEffect(() => {
        document.body.addEventListener(('keydown'), keyDown)

        return(() => {
            document.body.removeEventListener(('keydown'), keyDown)
        })
    }, [game, currentNote])

    useEffect(() => {
        const notes = []
        for (let i = 0; i < 5; i++) {
            const noteClass = classNames('note', `note-${i + 1}`, {
                'active': activeNote === i
            })
            notes.push(
                <div key={`note-${i}`} className={noteClass}></div>
            )
        }
        setMusicNote(notes)
    }, [activeNote])

    useEffect(() => {
        if (sick === true) {
            sound.current.src = powerDown
            sound.current.play()
        }
    }, [sick])

    function avatarClick(avatar) {
        setTalk(avatar)
        if (avatar === 'cat') {
            sound.current.src = meow
            sound.current.play()
        }
        else {
            sound.current.src = coin
            sound.current.play()
        }
    }

    function closePopup() {
        const targetChild = event.target.children
        if (targetChild.length === 1 && targetChild[0].className === 'popup-content') {
            setTalk(null)
        }
    }
    function goLobby() {
        if (status === 'complete') {
            document.location.href = '/lobby'
        }
    }

    const errorClass = classNames('error', {
        'active': game === 'error'
    })
    const successClass = classNames('success', {
        'active': game === 'success'
    })
    const startClass = classNames('start', {
        'show': game !== true && game !== 'success'
    })
    const wizardClass = classNames('customer', 'wizard', {
        'talk': talk === 'wizard'
    })  
    const ghostClass = classNames('customer', 'ghost', {
        'talk': talk === 'ghost'
    })
    const potClass = classNames('customer', 'pot', {
        'talk': talk === 'pot'
    })
    const tableClass = classNames('customer', 'table', {
        'talk': talk === 'table',
        'sick': sick
    })
    const catClass = classNames('customer', 'cat', {
        'talk': talk === 'cat'
    })
    const pianoPopup = classNames('piano-popup', {
        'show': piano
    })

    return (
        <>
            <div className="music">
                <audio ref={sound}></audio>
                <audio ref={bgSound}></audio>

                <div className={wizardClass} onClick={() => {avatarClick('wizard')}}></div>
                <div className={ghostClass} onClick={() => {avatarClick('ghost')}}></div>
                
                <div className={potClass} onClick={() => {avatarClick('pot')}}></div>
                <div className="pot-popup" onClick={closePopup}>
                    <div className="popup-content">
                        <div className="hot-pot"></div>
                    </div>
                </div>

                <div className={tableClass} onClick={() => {avatarClick('table')}}></div>
                <div className="table-popup" onClick={closePopup}>
                    <div className="popup-content">
                        <div className="food-area">
                            <div className="food food-1" onClick={() => {setSick(true)}}></div>
                            <div className="food food-2" onClick={() => {setSick(true)}}></div>
                            <div className="food food-3" onClick={() => {setSick(true)}}></div>
                        </div>
                        <div className="sick"></div>
                    </div>
                </div>
                <div className={catClass} onClick={() => {avatarClick('cat')}}></div>
                <div className="cat-popup" onClick={closePopup}>
                    <div className="popup-content" onClick={goLobby}>
                        { status !== 'complete'
                            ?
                            <>
                            <div className="talk">
                                你好啊，勇者<br/>
                                你說你在找一名叫 QQ 的珠寶商？<br/>
                                這裡時常有些群聚鬥毆，像她那種愛叫囂的酒客，<br/>
                                老早就被人看不順眼被抓去教訓了！<br/><br/>
                                既然你這麼想找到他，<br/>
                                你替我彈一手好曲子，<br/>
                                我就告訴你她被帶到哪去了如何？
                            </div>
                            <button className="go" onClick={() => {setPiano(true); setTalk(null)}}></button>
                            </>
                            :
                            <div className="talk">
                                彈得真彆扭...<br/>
                                看在你這麼努力的份上我還是告訴你好了<br/>
                                他被來鎮上觀光食人族抓走了！<br/>
                                現在他們要帶她回村莊裡享用，<br/>
                                這時間想必已經在準備配料了吧，<br/>
                                我看你還是帶些餐具上路吧，<br/>
                                搞不好還能吃上幾口好料，meow～
                            </div>
                        }
                        <div className="cat"></div>
                        
                    </div>
                </div>
                <div className="content">
                    <div className={pianoPopup}>
                        <div className="piano"></div>
                        <div className={errorClass}></div>
                        <div className={successClass}></div>
                        {musicNote}
                        <button className={startClass} onClick={() => {setGame(true)}}></button>
                    </div>
                </div>
            </div>
        </>
    )
}