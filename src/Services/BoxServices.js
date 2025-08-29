import * as THREE from 'three';
import { getRandomColor } from './Helpers';
import {gsap} from "gsap";

export function CreateBox(width, height, depth, color=null) {
    const texLoader = new THREE.TextureLoader();
    const texture = texLoader.load('./textures/cardboard.jpg')
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({
        color: color || new THREE.Color(getRandomColor()).multiplyScalar(0.5),
        map: texture
    });
    const box = new THREE.Mesh(geometry, material);
    box.castShadow = true;
    box.receiveShadow = true;
    return box;
}

export function AnimateBoxes(boxes, containerHeight, containerWidth) {
    const tl = gsap.timeline({ delay: 1 });
    tl.to(boxes.map(b => b.position), { duration: 1, y: `+=${containerHeight}`, ease: "power2.out" });
    tl.to(boxes.map(b => b.position), { duration: 1, x: `+=${containerWidth + 1}`, ease: "power2.out" });
    tl.to(boxes.map(b => b.position), { duration: 1, y: `-=${containerHeight}`, ease: "power2.out" });
}

export function BestOrientation(box, container) {
    const bw = box.width, bh = box.height, bd = box.depth;
    const cw = container.width, ch = container.height, cd = container.depth;

    const orientations = [
        {dims: [bw, bh, bd], rotation: new THREE.Euler(0, 0, 0)},
        {dims: [bw, bd, bh], rotation: new THREE.Euler(Math.PI / 2, 0, 0)},
        {dims: [bh, bw, bd], rotation: new THREE.Euler(0, 0, Math.PI / 2)},
        {dims: [bh, bd, bw], rotation: new THREE.Euler(Math.PI / 2, 0, Math.PI / 2)},
        {dims: [bd, bw, bh], rotation: new THREE.Euler(0, Math.PI / 2, 0)},
        {dims: [bd, bh, bw], rotation: new THREE.Euler(Math.PI / 2, Math.PI / 2, 0)}
    ];

    let best = null, maxCount = 0;
    for (const o of orientations) {
        const [w, h, d] = o.dims;
        const total = Math.floor(cw / w) * Math.floor(ch / h) * Math.floor(cd / d);
        if (total > maxCount) { maxCount = total; best = o; }
    }

    return { best, maxCount };
}