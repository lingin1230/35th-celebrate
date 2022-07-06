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
                'open': openDoor === i,
                'unlock': levelStatus[i] === 'unlock',
                'lock': levelStatus[i] === 'lock',
                'complete': levelStatus[i] === 'complete',
            })
            door.push(
                <div
                    className={doorClass}
                    key={`door-${i + 1}`}
                    onClick={() => setOpenDoor(i)}
                ></div>
            )
        }
        setDoors(door)

    }, [musicStatus, mazeStatus, monsterStatus])

    return (
        <div className="lobby">
            {doors}
        </div>
    )
}