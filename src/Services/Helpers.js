export function removeFaceFromGeometry(geometry, faceNum) {
    const index = geometry.index.array;
    const indicesToRemove = new Set();
    const start = faceNum * 6;

    for (let i = start; i < start + 6; i++) indicesToRemove.add(i);

    const newIndex = [];
    for (let i = 0; i < index.length; i++) {
        if (!indicesToRemove.has(i)) newIndex.push(index[i]);
    }

    geometry.setIndex(newIndex);
}

export function getRandomColor() {
    return Math.floor(Math.random() * 0xffffff);
}