import React from 'react'

const Notification = ({ message, type }) => {

    if (message == null) {
        return null
    }

    const notificationStyle = {
        color: 'green',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const notificationError = {
        color: 'red',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }


    return (
        <div>{type === 'error' ? (
            <div style={notificationError}>{ message }</div>) : (
            <div style={notificationStyle}>{ message }</div>)
        }
        </div>
    )
}

export default Notification