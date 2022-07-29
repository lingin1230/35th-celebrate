import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, FirstPersonControls, MapControls, Box, useCursor, ArcballControls } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

// import file from 'url:../assets/gltf/test.glb'
import farm from 'url:../assets/gltf/farm.glb'
import chickenFarm from 'url:../assets/gltf/chicken-farm.glb'
import pixelWoodenbox from 'url:../assets/gltf/pixel-woodenbox.glb'
import pokemonCenter from 'url:../assets/gltf/pokemon-center.glb'
import pokemonRoom from 'url:../assets/gltf/pokemon-room.glb'
import ramen from 'url:../assets/gltf/ramen.glb'
import sisterBedroom from 'url:../assets/gltf/sister-bedroom.glb'
import dungeon from 'url:../assets/gltf/dungeon.glb'
import meatSteak from 'url:../assets/gltf/meat-steak.glb'
import fantasyBook from 'url:../assets/gltf/fantasy-book.glb'
import treature from 'url:../assets/gltf/treature.glb'
import walkingDuck from 'url:../assets/gltf/walking-duck.glb'

import dungeonMusic from 'url:../assets/sound/dungeon.wav'
import success from 'url:../assets/sound/success.mp3'
import fail from 'url:../assets/sound/power-down.mp3'
import doorOpen from 'url:../assets/sound/door-open.mp3'
import classNames from 'classnames'
import axios from 'axios'

export default function Maze(props) {

    const maze = useLoader(GLTFLoader, dungeon)
    const present = useLoader(GLTFLoader, treature)
    const bgSound = useRef()
    const sound = useRef()

    const [ hover, setHover ] = useState()
    const [ color, setColor ] = useState()
    const [ text, setText ] = useState(false)
    const [ treasure, setTreasure ] = useState(false)
    // const [ text, setText ] = useState('錯邊囉～')
    // const [ treasure, setTreasure ] = useState(false)

    useCursor(hover)


    useEffect(() => {
        bgSound.current.src = dungeonMusic
        bgSound.current.loop = true
        bgSound.current.play()
    }, [])

    useEffect(() => {
        console.log('hover', hover)
        hover === true ? setColor('#FFFFFF') : setColor('#EC2D2D')
    }, [hover])

    useEffect(() => {
        if (treasure === 'open') {
            sound.current.src = doorOpen
            sound.current.play()
        }
    }, [treasure])

    function paperClick() {
        setText(false)
    }

    function treasureClick() {
        treasure === true && setTreasure('open')
        treasure === 'open' && setTreasure('monkey-1')
        treasure === 'monkey-1' && setTreasure('monkey-2')
        treasure === 'monkey-2' && setTreasure('monkey-3')
        treasure === 'monkey-3' && setTreasure('choice')
    }

    function ending() {
        sound.current.src = success
        sound.current.play()

        setTimeout(() => {
            document.location.href = '/ending'
        }, [3000])
    }

    function reset() {
        sound.current.src = fail
        sound.current.play()

        setTimeout(() => {
            axios.patch('http://localhost:3000/level_status', {
                "music": 'unlock',
                "monster": 'lock',
                "maze": 'lock'
            })
            document.location.href = '/'
        }, [2000])
    }



    const paperClass = classNames('paper', {
        'show': text !== false && text !== 'treasure'
    })
    const treasureClass = classNames('treasure', {
        'show': treasure !== false,
        'open': treasure === 'open'
    })

    return(
        <>
        <audio ref={bgSound} />
        <audio ref={sound} />
        <div className={paperClass} onClick={paperClick}>{text}</div>
        <div className={treasureClass} onClick={treasureClick}>
            { treasure === true &&
                <div className="box"></div>
            }
            { treasure === 'open' &&
                <div className="box"></div>
            }
            { treasure === 'monkey-1' && 
                <>
                <div className="talk">
                    咦...咦！？<br/>
                    寶箱裡面怎麼會是空的？？<br/>
                    怎麼會這樣！！<br/>
                    被誰拿走了？？？
                </div>
                <div className="monkey-detail"></div>
                </>
            }
            { treasure === 'monkey-2' && 
                <>
                <div className="talk">
                    啊...啊哈哈哈，歹勢歹勢～<br/>
                    上個月我拿到藏寶圖之後<br/>
                    我就迫不及待地來尋寶了，<br/>
                    我把它放到我的包包裡後，<br/>
                    去酒吧大喝個過癮就忘記這回事了<br/>
                    啊哈哈哈～
                </div>
                <div className="monkey-detail"></div>
                </>
            }
            { treasure === 'monkey-3' && 
                <>
                <div className="talk">
                    欸欸等等！你先不要拔劍！<br/>
                    來來來，把劍收好哦，<br/>
                    不如這樣子好了！<br/>
                    寶物我就直接送你了如何？很輕鬆吧？<br/>
                </div>
                <div className="monkey-detail"></div>
                </>
            }
            { treasure === 'choice' && 
                <>
                <div className="btn-area">
                    <button onClick={ending}>收下禮物</button>
                    <button onClick={reset}>殺了他</button>
                </div>
                </>
            }
        </div>
        <Canvas>
            <ambientLight />
            <Box // 中間 paper
                args={[2, 2, 2]}
                position={[7.8, -1, -165]}
                onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}
                onClick={() => {setText('再進去一點點')}}
            >
                <meshPhongMaterial transparent={true} opacity={0} />
            </Box>

            <Box // 右邊 paper
                args={[2, 2, 2]}
                position={[65, -2, -266]}
                onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}
                onClick={() => {setText('錯邊囉～')}}
            >
                <meshPhongMaterial transparent={true} opacity={0} />
            </Box>

            <primitive object={maze.scene} scale={3} position={[19, -2, -180]}/>
            <primitive // 禮物！！
                object={present.scene}
                scale={0.1} 
                position={[-50, -5, -255]}
                onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}
                onClick={() => {setTreasure(true)}}
            />
            <FirstPersonControls
                activeLook={!text && !treasure}
                lookSpeed={0.1}
                lookVertical={false}
                constrainVertical={false}
                movementSpeed={8}
            />
            {/* <FirstPersonControls activeLook={!text && !treasure} lookSpeed={0.1} lookVertical={false} constrainVertical={false} movementSpeed={30}/> */}
            {/* <OrbitControls /> */}
            {/* <MapControls /> */}
            {/* <ArcballControls /> */}
        </Canvas>
        </>
    )
}