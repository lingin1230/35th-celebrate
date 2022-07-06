import classNames from 'classnames'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import jungleMusic from 'url:../assets/sound/jungle.wav'

export default function Monster() {

    const [ monkeyBlood, setMonkeyBlood ] = useState(100)
    const [ girlBlood, setGirlBlood ] = useState(100)
    const [ talk, setTalk ] = useState(null)
    const bgSound = useRef()

    useEffect(() => {
        bgSound.current.src = jungleMusic
        bgSound.current.loop = true
        bgSound.current.play()
    }, [])

    useEffect(() => {
        if (monkeyBlood === 0) {
            setTalk('monkey')
            setTimeout(() => {
                document.location.href = '/lobby'
            }, [5000])
        }
        if (girlBlood === 0) {
            setTalk('girl')
            axios.patch('http://localhost:3000/level_status', {
                "monster": 'complete',
                "maze": 'unlock'
            })
            setTimeout(() => {
                document.location.href = '/lobby'
            }, [5000])
        }
    }, [monkeyBlood, girlBlood])


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