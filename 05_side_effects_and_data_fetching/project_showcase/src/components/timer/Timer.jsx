import { useState, useEffect } from "react"

const Timer = () => {
    console.log("The component has rendered");
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        console.log("The useEffect has been fired");
        const intervalId = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000)

        return () => {
            console.log("The cleanup has been fired")
            clearInterval(intervalId)
        }
    }, [])

    return (
        <div>Timer: {timer}</div>
    )
}

export default Timer