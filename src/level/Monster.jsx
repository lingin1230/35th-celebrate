import classNames from 'classnames'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import jungleMusic from 'url:../assets/sound/jungle.wav'
import monkeyHurt from 'url:../assets/sound/monkey-hurt.mp3'
import girlHurt from 'url:../assets/sound/girl-hurt.mp3'
import success from 'url:../assets/sound/success.mp3'
import fail from 'url:../assets/sound/power-down.mp3'

export default function Monster() {

    const [ monkeyBlood, setMonkeyBlood ] = useState(100)
    const [ girlBlood, setGirlBlood ] = useState(100)
    const [ talk, setTalk ] = useState(null)
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

            setTalk('monkey')
            setTimeout(() => {
                document.location.href = '/lobby'
            }, [5000])
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

            setTalk('girl')
            axios.patch('http://localhost:3000/level_status', {
                "monster": 'complete',
                "maze": 'unlock'
            })
            setTimeout(() => {
                document.location.href = '/lobby'
            }, [5000])
        }
    }, [girlBlood])


    const statusClass = classNames('status', {
        'success': girlBlood === 0,
        'fail': monkeyBlood === 0
    })
    const monkeyClass = classNames('monkey', 'blood', `blood-${monkeyBlood >=0 ? monkeyBlood : 0}`, {
        'talk': talk === 'monkey'
    })
    const girlClass = classNames('girl', 'blood', `blood-${girlBlood >=0 ? girlBlood : 0} `, {
        'talk': talk === 'girl'
    })

    return (
        <div className="monster">
            <audio ref={bgSound} />
            <audio ref={sound} />
            <div className={statusClass}></div>
            <div className={monkeyClass} onClick={() => {monkeyBlood > 0 && setMonkeyBlood(monkeyBlood - 10)}}>
                <div className="monkey-talk">我...我是 QQ 啊！你怎麼把我殺了！！</div>
            </div>
            <div className={girlClass} onClick={() => {girlBlood > 0 && setGirlBlood(girlBlood - 10)}}>
                <div className="girl-talk">你！你怎麼知道我是邪惡女童！<br/>ㄅㄜ ㄌㄜ...</div>
            </div>
            <div className="content">

            </div>
        </div>
    )
}