import "./App.css"
import React from "react"
import { Canvas } from "@react-three/fiber"
import {
	Backdrop,
	CameraControls,
	Float,
	RandomizedLight,
	SpotLight,
} from "@react-three/drei"
import Valentin from "./components/Valentin/Valentin"

const App = () => {
	return (
		<>
			<Canvas>
				<CameraControls />

				<pointLight
					distance={100}
					intensity={800}
					position={[0, 10, 10]}
				/>

				<Valentin scale={1} rotation={[0, 0, 0]} position={[0, 0, 0]} />
			</Canvas>
		</>
	)
}

export default App
