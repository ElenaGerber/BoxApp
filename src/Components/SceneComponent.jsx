import React, {useEffect, useRef, useState} from "react";
import {createScene} from "../Services/SceneServices";
import {createContainer} from "../Services/ContainerServices";
import {AnimateBoxes, BestOrientation, CreateBox} from "../Services/BoxServices";
import Controls from "./Controls";

export default function SceneComponent() {
    const [sceneReady, setSceneReady] = useState(false);
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const containerMeshRef = useRef(null);
    const boxMeshRef = useRef(null);
    const boxesRef = useRef([]);

    const [bestFit, setBestFit] = useState(1);

    const [box, setBox] = useState({width: 1, height: 1, depth: 1});
    const [container, setContainer] = useState({width: 1, height: 1, depth: 1});

    // Initialize scene
    useEffect(() => {
        const {scene, camera, renderer} = createScene(canvasRef.current);
        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;


        const containerMesh = createContainer(container.width, container.height, container.depth);
        scene.add(containerMesh);
        containerMeshRef.current = containerMesh;

        const boxMesh = CreateBox(box.width, box.height, box.depth, 0xffffff);
        boxMesh.position.set(-1, 0.5, 0);
        scene.add(boxMesh);
        boxesRef.current.push(boxMesh);
        boxMeshRef.current = boxMesh;

        AnimateBoxes(boxesRef.current, container.height, container.width);

        cameraRef.current.position.set(0, 1.8, 2.5);
        cameraRef.current.lookAt(0, 1, 0);

        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();
        setSceneReady(true);
        return () => renderer.dispose();
    }, []);

    // Actualize scene
    useEffect(() => {
        if (!sceneReady) return;
        if (!sceneRef.current || !containerMeshRef.current || !cameraRef.current) return;
        boxesRef.current.forEach(b => {
            sceneRef.current.remove(b);
            b.geometry.dispose();
            b.material.dispose();
        });
        boxesRef.current.length = 0;

        if (containerMeshRef.current) {
            sceneRef.current.remove(containerMeshRef.current);
            containerMeshRef.current.geometry.dispose();
            containerMeshRef.current.material.dispose();
        }
        const containerMesh = createContainer(container.width, container.height, container.depth);
        sceneRef.current.add(containerMesh);
        containerMeshRef.current = containerMesh;

        const maxDimension = Math.max(container.width, container.height, container.depth, 1);
        cameraRef.current.position.set(0, maxDimension * 1.5, maxDimension * 1.5);
        cameraRef.current.lookAt(0, container.height, 0);

        const {best, maxCount} = BestOrientation(box, container);
        setBestFit(maxCount);

        if (maxCount !== 0) {
            const countX = Math.floor(container.width / best.dims[0]);
            const countY = Math.floor(container.height / best.dims[1]);
            const countZ = Math.floor(container.depth / best.dims[2]);

            const beginX = -container.width - 0.5;
            const beginY = 0;
            const beginZ = -container.depth / 2;

            for (let x = 0; x < countX; x++) {
                for (let y = 0; y < countY; y++) {
                    for (let z = 0; z < countZ; z++) {
                        const box = CreateBox(...best.dims);
                        box.position.set(
                            beginX + best.dims[0] / 2 + x * best.dims[0],
                            beginY + best.dims[1] / 2 + y * best.dims[1],
                            beginZ + best.dims[2] / 2 + z * best.dims[2]
                        );
                        sceneRef.current.add(box);
                        boxesRef.current.push(box);
                    }
                }
            }
        }

        AnimateBoxes(boxesRef.current, container.height, container.width);

    }, [box, container]);

    return (
        <>
            <canvas ref={canvasRef} id="bg" style={{width: "100%", height: "100%"}}/>
            <h1> How many does it fit?</h1>
            <h2> Fit:{bestFit}</h2>
            <Controls
                box={box} setBox={setBox}
                container={container} setContainer={setContainer}
            />
        </>
    );
}
