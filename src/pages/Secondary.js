import { useState, useEffect } from "react";

const spaceApi = 'http://api.open-notify.org/astros.json';

const updateCount = (count, setCount) => {
    setCount((count) => count + 1);
}

const getPeopleInSpace = (setPeople) => {
    fetch(spaceApi)
        .then(response => response.json())
        .then((data) => {
            setPeople(data.people.length);
        });
}

const Secondary = () => {
    const [color, setColor] = useState("red");
    const [count, setCount] = useState(0);
    const [people, setPeople] = useState(0);

    useEffect(() => {
        updateCount(count, setCount);
        getPeopleInSpace(setPeople);
    }, []);

    const page = (
        <>
            <h1>Secondary</h1>
            <p>My favorite color is {color}!</p>
            <p>{people} people in space!</p>
            <button type="button" onClick={() => setColor("blue")}>Blue</button>
            <button type="button" onClick={() => setColor("red")}>Red</button>
            <button type="button" onClick={() => setColor("pink")} >Pink</button>
            <button type="button" onClick={() => setColor("green")}>Green</button>
            <p>I&apos;ve rendered {count} times!</p>
        </>
    )
    return page;
};

export default Secondary;