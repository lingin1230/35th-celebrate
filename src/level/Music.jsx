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
                        setTimeout(() => {
                            document.location.href = '/lobby'
                        }, [1500])
                    }, [1000])
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
            setTimeout(() => {
                setPiano(true)
            }, [3000])
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
                <div className={catClass} onClick={() => {avatarClick('cat')}}>
                    <div className="talk"></div>
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