import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { FaRegPlayCircle } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";

function Anime_Shows () {
    const [animeShows, setAnimeShows] = useState([]);
    const [trailer, setTrailer] = useState("");
    const apiKey = "cf9f8c36866c23046aad7733bb2641eb";   
    const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&with_genres=16`;

    useEffect(() => {
        axios.get(apiUrl)
            .then((response) => {
                const shows = response.data.results;
                setAnimeShows(shows);
            });
    }, []);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls:0,
        },
    }

    const handleClick = (details) => {
        movieTrailer(details?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailer(urlParams.get('v'));
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <section className='pop-con' id='anime'>
                <p className='popular-text'>Anime Shows</p>
                <div className='pop-box-cont'>
                    {animeShows.map((details, index) => ( 
                        <div key={index} className="pop_box" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${details.poster_path})`, backgroundSize: 'cover',objectPosition:'center,',backgroundPosition:'center '}}>
                            <div className='play-video'>
                             <div style={{textAlign:'center'}}>
                             <a onClick={() => handleClick(details)}  ><FaRegPlayCircle style={{fontSize:'50px'}} className='play-icons' /></a>
                             </div>
                           <div style={{display:'flex',justifyContent:'space-between',padding:'5px',fontSize:'20px'}}>
                           <p style={{color:'red'}}>
                              {details?'13+':'18+'}
                            </p>
                            <p >
                          Anime
                            </p>
                            <p style={{textTransform:'uppercase',color:'red'}}>
                                {details.original_language}
                            </p>
                           </div>
                           
                           <p className='text-center '>{details.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <div className='youtube-video'>
                {trailer && <YouTube 
                    videoId={trailer}
                    opts={opts}
                />}
            </div>
        </>
    );
}

export default Anime_Shows;