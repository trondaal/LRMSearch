import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TruncateText = ({ text, maxLength }) => {
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleIsTruncated = () => {
        setIsTruncated(!isTruncated);
    };

    if (text.length <= maxLength * 2) {
        maxLength = text.length
    }

    const pos = text.indexOf("--", maxLength);
    maxLength = pos === -1 ? maxLength : pos;

    const renderText = () => {
        if (isTruncated) {
            return text.substring(0, maxLength);
        }
        return text;
    };

    return (
        <span>
      {renderText()}
            {text.length > maxLength && (
                <>
                    {isTruncated ? '... ' : '...'}
                    <a className={'truncateText'}
                        href="#!"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleIsTruncated();
                        }}
                    >
                        {isTruncated ? 'show more' : 'show less'}
                    </a>
                </>
            )}
    </span>
    );
};

TruncateText.propTypes = {
    text: PropTypes.string.isRequired,
    maxLength: PropTypes.number.isRequired
};

export default TruncateText;