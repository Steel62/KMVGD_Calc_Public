import React from 'react';


function ModalWindow(props) {
    const style = {
       position: 'fixed',
       left: '0',
       top: '0',
       width: '100vw',
       height: '100vh',
       background: '#00000090',
    };
    return (
        <div style={style}>
            {props.children}
        </div>
    );
}


export default ModalWindow;