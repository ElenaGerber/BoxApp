import React, { useState } from "react";
import RangeInput from "./RangeInput";

export default function Controls({ box, setBox, container, setContainer }) {
    const [localBox, setLocalBox] = useState(box);
    const [localContainer, setLocalContainer] = useState(container);

    const applyChanges = () => {
        setBox(localBox);
        setContainer(localContainer);
    };

    return (
        <div id="controls">
            <h3>Box Size</h3>
            <RangeInput label="Width" value={localBox.width} onChange={val => setLocalBox({...localBox, width: val})} step={0.01} min={0.01} max={2} />
            <RangeInput label="Height" value={localBox.height} onChange={val => setLocalBox({...localBox, height: val})} step={0.01} min={0.01} max={2} />
            <RangeInput label="Depth" value={localBox.depth} onChange={val => setLocalBox({...localBox, depth: val})} step={0.01} min={0.01} max={2} />

            <h3>Container Size</h3>
            <RangeInput label="Width" value={localContainer.width} onChange={val => setLocalContainer({...localContainer, width: val})} step={0.01} min={0.01} max={2} />
            <RangeInput label="Height" value={localContainer.height} onChange={val => setLocalContainer({...localContainer, height: val})} step={0.01} min={0.01} max={2} />
            <RangeInput label="Depth" value={localContainer.depth} onChange={val => setLocalContainer({...localContainer, depth: val})} step={0.01} min={0.01} max={2} />

            <button id="apply" onClick={applyChanges} style={{ marginTop: 10 }}>Apply</button>
        </div>
    );
}