export default function RangeInput({ label, value, onChange, step, min, max }) {
    const handleNumberBlur = () => {
        let newValue = value;

        if (newValue < min) newValue = min;
        if (newValue > max) newValue = max;

        newValue = Math.round(newValue / step) * step;

        onChange(newValue);
    };

    return (
        <label>
            {label}:{" "}
            <input
                type="range"
                value={value}
                step={step}
                min={min}
                max={max}
                onChange={(e) => onChange(parseFloat(e.target.value))}
            />
            <input
                type="number"
                value={value}
                step={step}
                min={min}
                max={max}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                onBlur={handleNumberBlur}
            />
            <br />
        </label>
    );
}
