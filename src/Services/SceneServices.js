import * as THREE from 'three';

export function createScene(canvas) {
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas }); // use element directly
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    // Ground
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 200),
        new THREE.MeshStandardMaterial({ color: 0x9accfd, side: THREE.DoubleSide })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    scene.add(ground);

    // Wall
    const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000),
        new THREE.MeshStandardMaterial({ color: 0x9accfd, side: THREE.DoubleSide })
    );
    wall.position.z = -50;
    wall.receiveShadow = true;
    scene.add(wall);

    return { scene, camera, renderer };
}