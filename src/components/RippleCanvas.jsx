import React, { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"

const RippleShaderMaterial = ({ mouse }) => {
	const shaderRef = useRef()

	// GLSL shader code for the ripple effect
	const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

	const fragmentShader = `
    uniform float time; // Time variable, for animating the waves
    uniform vec2 resolution; // The resolution of the canvas
    uniform vec2 mouse; // Mouse position, normalized to [0,1]

    void main() {
        vec2 position = gl_FragCoord.xy / resolution.xy; // Normalized pixel coordinates
        vec2 direction = position - mouse; // Direction from mouse to current pixel

        float distance = length(direction); // Distance from mouse to current pixel

        // Wave parameters
        float speed = 2.0; // Speed of wave propagation
        float frequency = 20.0; // Frequency of the waves
        float amplitude = 0.32; // Amplitude of the waves

        // Calculate wave pattern based on distance and time, creating a circular wave
        float wave = sin(distance * frequency - time * speed) * amplitude;

        // Color based on wave pattern
        vec3 color = vec3(wave + 0.85, wave + 0.3, wave + 0.3);

        gl_FragColor = vec4(color, 1.0); // Output color
    }
  `

	// Uniforms for the shader
	const uniforms = useMemo(
		() => ({
			time: { value: 0 },
			resolution: { value: [window.innerWidth, window.innerHeight] },
			mouse: { value: mouse },
		}),
		[mouse]
	)

	// Update loop for the shader material
	useFrame(({ clock }) => {
		if (shaderRef.current) {
			shaderRef.current.uniforms.time.value = clock.getElapsedTime()
		}
	})

	return (
		<shaderMaterial
			ref={shaderRef}
			vertexShader={vertexShader}
			fragmentShader={fragmentShader}
			uniforms={uniforms}
		/>
	)
}

const RippleCanvas = ({ children }) => {
	const mouse = useRef([0.5, 0.5])

	const handleMouseMove = (event) => {
		mouse.current = [
			event.clientX / window.innerWidth,
			1.0 - event.clientY / window.innerHeight,
		]
	}

	return (
		<>
			<Canvas
				onMouseMove={handleMouseMove}
				style={{ position: "absolute", top: 0 }}
			>
				<mesh>
					<planeGeometry
						attach="geometry"
						args={[
							Math.max(window.innerWidth, window.innerHeight),
							Math.max(window.innerWidth, window.innerHeight),
						]}
					/>
					<RippleShaderMaterial mouse={mouse.current} />
				</mesh>
			</Canvas>
			<div
				style={{
					position: "relative",
					display: "flex",
					flexFlow: "column",
					alignItems: "center",
					width: "100%",
					height: "100%",
				}}
			>
				{children}
			</div>
		</>
	)
}

export default RippleCanvas
