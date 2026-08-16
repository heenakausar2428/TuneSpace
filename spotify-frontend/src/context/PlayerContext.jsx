import { createContext, useEffect, useState, useRef } from "react";
import axios from 'axios';

export const PlayerContext= createContext();

const PlayerContextProvider= (props) =>{

    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })

    const audioRef= useRef();
    const seekBg= useRef();
    const seekBar= useRef();

    const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    const [songsData, setSong]= useState([]);
    const [albumsData, setAlbumsData]= useState([]);



    const play= ()=>{
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause= ()=>{
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId= async(id)=>{
       await songsData.map((item)=>{
        if(id == item._id){
            setTrack(item);
        }
        
       })
       await audioRef.current.play();
       setPlayStatus(true);
    }

    const previous = async()=>{
       songsData.map(async(item, index)=>{
        if(track._id == item._id && index>0){
            await setTrack(songsData[index-1]);
            await audioRef.current.play();
            setPlayStatus(true);
        } 

       })

    }

    const next = async()=>{
         songsData.map(async(item, index)=>{
        if(track._id == item._id && index < songsData.length - 1){
            await setTrack(songsData[index+1]);
            if (audioRef.current) await audioRef.current.play();
            setPlayStatus(true);
        } 

       })

    }

    const seekSong= async(e)=>{

        console.log(e);
        audioRef.current.currentTime= ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    const getSongsData= async()=>{
        try{
            const respone= await axios.get(`${url}/api/song/list`);
            setSong(respone.data.songs);
            setTrack(respone.data.songs[0]);
        }catch(error){

        }
    }

    const getAlbumsData= async()=>{
        try{

            const response= await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);

        }catch(error){

        }
    }

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            if (!audioRef.current) return;
            audioRef.current.ontimeupdate = () =>{
                const duration = audioRef.current.duration || 0;
                const current = audioRef.current.currentTime || 0;
                if (seekBar.current) {
                    seekBar.current.style.width = (duration ? Math.floor(current / duration * 100) : 0) + "%";
                }
                setTime({
                    currentTime: {
                        second: Math.floor(current % 60),
                        minute: Math.floor(current / 60)
                    },
                    totalTime: {
                        second: Math.floor(duration % 60),
                        minute: Math.floor(duration / 60)
                    }
                })
            }
        }, 1000);

        return () => clearTimeout(timeout);
    },[audioRef])

    useEffect(()=>{
        getSongsData();
        getAlbumsData();
    }, []);

    const contextValue= {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time,setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData
        

    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {
                props.children
            }
        </PlayerContext.Provider>
    )
}
export default PlayerContextProvider;


/*so here, the PlayerContextProvider will be 
passing app as a prop, 
so in the return we are giving rights to the passed prop children
so that they can use the data provided by the provider 

*/