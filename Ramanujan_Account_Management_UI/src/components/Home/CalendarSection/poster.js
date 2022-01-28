import React from 'react'

import IMG from '../../Assets/img/poster.jpg'

const Poster = () => {
    return (
        <div style={{ width: '100%', height: 'auto'  }}>
            <img style={{ width:'100%', height:'100%', borderRadius: '7px'}} src={IMG} alt="POSTER" />
        </div>
    )
}

export default Poster
