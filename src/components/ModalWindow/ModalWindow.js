import React from 'react';


function ModalWindow(props) {
    const style = {
       position: 'absolute',
       left: '0',
       top: '0',
       width: '100%',
       height: '100%',
       background: '#00000090',
    };
    return (
        <div style={style}>
            {props.children}
        </div>
    );
}


export default ModalWindow;