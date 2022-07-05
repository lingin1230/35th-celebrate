import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { PerspectiveCamera, OrbitControls, FirstPersonControls } from '@react-three/drei'
import { useEffect, useState } from 'react'

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

export default function Maze(props) {

    // const setLoaded = props.setLoaded
    const gltf = useLoader(GLTFLoader, dungeon)
    
    // useEffect(() => {
    //     setLoaded(true)
    // }, [])



    const [ hover, setHover ] = useState()
    const [ color, setColor ] = useState()


    useEffect(() => {
        console.log('hover', hover)
        hover === true ? setColor('#FFFFFF') : setColor('#EC2D2D')
    }, [hover])

    return(
        <>
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* <primitive object={gltf.scene} scale={3} position={[0, -2, 0]}/> */}

            {/* Dungeon position setting */}
            <primitive object={gltf.scene} scale={3} position={[19, -2, -180]}/>
            <FirstPersonControls lookSpeed={0.1} lookVertical={false} constrainVertical={false} movementSpeed={8}/>

            {/* <OrbitControls /> */}
            {/* <OrthographicCamera position={[0, 0, 100]} zoom={30} /> */}
        </Canvas>
        </>
    )
}