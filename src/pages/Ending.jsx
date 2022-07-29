import classNames from "classnames"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import bgMusic from 'url:../assets/sound/ending.mp3'

export default function Ending() {

    const [ list, setList ] = useState([])
    const bgSound = useRef()

    useEffect(() => {
        bgSound.current.src = bgMusic
        bgSound.current.loop = true
        bgSound.current.play()

        axios.get('http://localhost:3000/list')
        .then((res) => {
            const staff = []
            for (const position of res.data) {
                staff.push(
                    <li key={`position-${position}`}>
                        <div>{position}</div>
                        <div>Gin Lin</div>
                    </li>
                )
            }
            setList(staff)
            setTimeout(() => {
                document.location = '/'
            }, [50000])
        })
        .catch((err) => {
            console.log(err.response)
        })
        
    }, [])


    return (
        <div className="ending">
            <audio ref={bgSound} />
            <ul>
                {list}
            </ul>
        </div>
    )
}