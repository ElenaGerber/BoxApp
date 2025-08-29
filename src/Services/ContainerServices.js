import * as THREE from 'three';
import { removeFaceFromGeometry } from './Helpers.js';

export function createContainer(width, height, depth, epsilon = 0.01) {
    const geometry = new THREE.BoxGeometry(width + epsilon, height + epsilon, depth + epsilon);
    removeFaceFromGeometry(geometry, 2);

    const material = new THREE.MeshStandardMaterial({
        color: 0x688aab,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });

    const container = new THREE.Mesh(geometry, material);
    container.position.set(width/2+0.5, height / 2, 0);

    container.geometry.computeBoundingBox();
    return container;
}