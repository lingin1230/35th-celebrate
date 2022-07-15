import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { PerspectiveCamera, OrbitControls, FirstPersonControls, MapControls, Box, useCursor } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'

import { Canvas, ambientLight, pointLight } from "@react-three/fiber"
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

import dungeonMusic from 'url:../assets/sound/dungeon.wav'
import classNames from 'classnames'

export default function Maze(props) {

    const setStatus = props.setStatus
    const bgSound = useRef()
    const maze = useLoader(GLTFLoader, dungeon)
    const present = useLoader(GLTFLoader, treature)


    const [ hover, setHover ] = useState()
    const [ color, setColor ] = useState()

    const [ text, setText ] = useState(false)


    useEffect(() => {
        bgSound.current.src = dungeonMusic
        bgSound.current.loop = true
        bgSound.current.play()
    }, [])

    useEffect(() => {
        console.log('hover', hover)
        hover === true ? setColor('#FFFFFF') : setColor('#EC2D2D')
    }, [hover])

    const paperClass = classNames('paper', {
        'show': text !== false
    })

    function paperClick() {
        setText(false)
    }

    useCursor(hover, /*'pointer', 'auto'*/)

    return(
        <>
        <audio ref={bgSound} />
        <div className={paperClass} onClick={paperClick}>{text}</div>
        <Canvas>
            <ambientLight />
            {/* <pointLight position={[10, 10, 10]} /> */}
            {/* <primitive object={gltf.scene} scale={3} position={[0, -2, 0]}/> */}

            
            <Box // first paper
                args={[2, 2, 2]}
                // opacity={0}
                position={[7.8, -1, -165]}
                onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}
                onClick={() => {setText('你找到我了！')}}
            >
                <meshPhongMaterial transparent={true} opacity={0}/>
            </Box>
            <primitive object={maze.scene} scale={3} position={[19, -2, -180]}/>
            <primitive object={present.scene} scale={0.5} position={[19, -2, -180]}/>
            {/* <OrbitControls /> */}
            <MapControls />
            {/* <FirstPersonControls lookSpeed={0.1} lookVertical={false} constrainVertical={false} movementSpeed={8}/> */}
        </Canvas>
        </>
    )
}