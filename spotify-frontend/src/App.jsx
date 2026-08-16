import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'


const App = () => {
  const {audioRef, track, songsData, albumsData} = useContext(PlayerContext);

  return (
    <div className=' h-screen bg-black text-white'>
      {songsData.length !== 0 ? (
        <>
          <div className='h-[90%] flex'>
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : (
        <div className='grid place-items-center min-h-screen'>
          <div className='text-center'>
            <div className='w-16 h-16 mx-auto mb-4 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin' />
            <p>Loading songs…</p>
          </div>
        </div>
      )}

      <audio ref={audioRef} src={track ? track.file : ''} preload='auto'></audio>
    </div>
  )

}

export default App