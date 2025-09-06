import PropTypes from "prop-types";
import { memo } from "react";
import Button from './Button.js';

function TextBlock(props) {
    const btns = ['yes', 'no']
    const myEl = (
        <>
            <div className="container">
                <h1>{props.copy}</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi blandit nunc leo, id accumsan massa molestie sit amet. Donec quis feugiat magna.</p>
            </div>
            {btns.map((btn, index) => <Button txt={btn} key={`btn${index}`} />)}
        </>
    )
    return myEl;
}

TextBlock.propTypes = {
    copy: PropTypes.string.isRequired,
};

export default memo(TextBlock);