import "./App.css"
import React from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import RippleCanvas from "./components/RippleCanvas"
import Valentin from "./components/Valentin"
// import Valentin from "./components/Valentin/Valentin"

const App = () => {
	// const { nodes } = useGLTF("./valentin.glb")
	// console.log(nodes)

	return (
		<div id="app-container">
			<RippleCanvas>
				<h1
					style={{
						position: "absolute",
						top: window.innerHeight / 2,
						zIndex: 2,
						pointerEvents: "none",
					}}
				>
					0-you
				</h1>
				<Canvas
					style={{
						position: "absolute",
						top: 0,
						witdh: "100%",
						height: "100%",
					}}
				>
					<ambientLight intensity={4} />
					<OrbitControls enableZoom={false} />
					<Valentin />
				</Canvas>
			</RippleCanvas>
		</div>
	)
}

export default App
