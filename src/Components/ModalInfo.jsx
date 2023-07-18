export function ModalInfo({setShowModalInfo}){
    return (
        <div className='modal-container'>
            <h1>Today Near Earth Asteroids Tracker</h1>
            <p>
            The Today Near Earth Asteroids Tracker is a cutting-edge application that provides real-time information about asteroids that come close to Earth's orbit. Powered by NASA's extensive database and utilizing their Near Earth Object Web Service (NeoWs) API, this app offers users an immersive experience in exploring the celestial wonders that surround our planet.
            </p>
            <button onClick={()=>{setShowModalInfo(false)}}>Close</button>
        </div>
    )
}