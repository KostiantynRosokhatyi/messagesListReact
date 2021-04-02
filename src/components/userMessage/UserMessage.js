import React from 'react';

function UserMessage(props) {
    const {message} = props
    return (
        <div>
            {message}
        </div>
    );
}

export default UserMessage;
