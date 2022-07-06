import classNames from "classnames"
import { useEffect, useState } from "react"

export default function Lobby(props) {

    const musicStatus = props.musicStatus
    const monsterStatus = props.monsterStatus
    const mazeStatus = props.mazeStatus
    const levelStatus = [ musicStatus, monsterStatus, mazeStatus ]
    const [ doors, setDoors ] = useState([])
    const [ openDoor, setOpenDoor ] = useState(null)


    useEffect(() => {

        let door = []
        const level = ['music', 'monster', 'maze']
        
        for (let i = 0; i < 3; i++) {
            const doorClass = classNames('door', `door-${level[i]}`, {
                'open': openDoor === i && levelStatus[i] === 'unlock',
                'unlock': levelStatus[i] === 'unlock',
                'lock': levelStatus[i] === 'lock',
                'complete': levelStatus[i] === 'complete',
            })

            function handleDoorClick(index) {
                setOpenDoor(index)
                
                if (levelStatus[i] === 'unlock') {
                    setTimeout(() => {
                        document.location.href=`/level/${level[i]}`
                    }, [1500])
                }
            }

            door.push(
                <div className="door-bg" key={`door-${i + 1}`}>
                    <div
                        className={doorClass}
                        onClick={() => {handleDoorClick(i)}}
                    ></div>
                </div>
            )
        }
        setDoors(door)

    }, [musicStatus, mazeStatus, monsterStatus, openDoor])

    return (
        <div className="lobby">
            <div className="content">
                <div className="door-area">
                    {doors}
                </div>
            </div>
        </div>
    )
}