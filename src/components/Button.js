import PropTypes from "prop-types";
import { memo } from "react";

function Button(props) {
    const doSomething = (a) => {
        console.log(`test ${a.type}`);
    }

    return <button onClick={doSomething}>{props.txt}</button>;
}

Button.propTypes = {
    txt: PropTypes.string.isRequired,
};

export default memo(Button);