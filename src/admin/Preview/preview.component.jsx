import React from 'react';

import './preview.styles.scss';

const Preview = () => {
    return (
            <div className="web">
                <object type="text/html" data="https://desolate-sierra-70172.herokuapp.com/" className="webpre" aria-labelledby="Error"></object>
            </div>
    );
}

export default Preview;