import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import soundC from 'url:../assets/sound/C.mp3'
import soundD from 'url:../assets/sound/D.mp3'
import soundE from 'url:../assets/sound/E.mp3'
import soundF from 'url:../assets/sound/F.mp3'
import soundG from 'url:../assets/sound/G.mp3'
import soundA from 'url:../assets/sound/A.mp3'
import soundB from 'url:../assets/sound/B.mp3'


export default function Music() {

    const [ musicNote, setMusicNote ] = useState([])
    const [ activeNote, setActiveNote ] = useState(null)
    const [ game, setGame ] = useState(false)
    const [ currentNote, setCurrentNote ] = useState(0)

    const sound = useRef()
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
                        setGame('success')
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


    const errorClass = classNames('error', {
        'active': game === 'error'
    })
    const successClass = classNames('success', {
        'active': game === 'success'
    })
    const startClass = classNames('start', {
        'show': game !== true && game !== 'success'
    })
    return (
        <>
            <div className="music">
                <div className="content">
                    <audio className="sound" src={soundC} ref={sound}></audio>
                    <div className="piano"></div>
                    <div className={errorClass}></div>
                    <div className={successClass}></div>
                    {musicNote}
                    <button className={startClass} onClick={() => {setGame(true)}}></button>
                </div>
            </div>
        </>
    )
}