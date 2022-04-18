import React, { useState,useRef, useEffect, memo } from 'react'
import Head from 'next/head'
import cheerio from 'cheerio'
import axios from 'axios'
import Image from 'next/image'


export default function Home() {

  const [imdbID, setimdbID] = useState('tt11138512');
  const [imdbfullURL, setimdbfullURL] = useState('');
  const prefixImdb = 'https://www.imdb.com/title/'
  
  // MOVIE DATA
  const [movieTitle, setTitle] = useState('');
  const [movieActors, setActors] = useState('');
  const [movieDirector, setDirector] = useState('');
  const [movieGenre, setGenre] = useState('');
  const [movieWriter, setWriter] = useState('');
  const [moviePoster, setPoster] = useState('');

  function random_item(items)
  {    
    return items[Math.floor(Math.random()*items.length)];      
  }
 

  useEffect(() => {
    setimdbfullURL(prefixImdb+imdbID+'/');


    // JOSN
    let imdb_api = ['324cd2a4' , 'd8aeceda' , '966416c9' , '620c240b' , '612dd3b4' , '153abde9' , '8bcb0764' , '8e877e85' , 'a76564b8' , 'c953f46a' , '9c6cc01a']
    const http = require('http');
    // let url = "https://www.reddit.com/r/popular.json";
    let url = "http://www.omdbapi.com/?apikey="+random_item(imdb_api)+"&i="+imdbID+"&plot=full";
    http.get(url,(res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                // do something with JSON
                console.log(json);
                setTitle(json.Title);
                setActors(json.Actors);
                setDirector(json.Director);
                setWriter(json.Writer);
                setGenre(json.Genre);
                setPoster(json.Poster);
            } catch (error) {
                console.error(error.message);
            };
        });
    }).on("error", (error) => {
        console.error(error.message);
    });
    
  }, [imdbID]);
  
  

  // RETURN 
  return (
    <div className="h-full px-4 py-3">
      <main className="container max-w-screen-md mx-auto my-6 py-3 px-7 bg-[#FFFFFF] shadow-lg rounded-lg">
        {/* <h1>IMDB DATA</h1>
        <div>Latest Comic: {props.title}</div>
        <div>Last scraped: {props.lastScraped}</div> */}

        <h1 className="text-4xl text-black bg-yellow-400 py-1 px-2 rounded-lg font-bold text-center mt-3 inline-block font-extrabold">IMDb</h1>
        <span className='block text-sm text-neutral-400 mb-6'>by Bomboonsan</span>

        <input className="w-full py-1 px-4 border border-nuetral-300 rounded-lg bg-[#fafafa] mb-4 shadow-sm" value={imdbID}  name="imdbID" onChange={e => setimdbID(e.target.value)} />
        
        <div className='result'>
          <p><strong>URL</strong>     <a className='text-blue-600' href={imdbfullURL} target="_blank">{imdbfullURL}</a></p>
          <p><strong>TItle</strong>     {movieTitle}</p>
          <p><strong>Director</strong>     {movieDirector}</p>
          <p><strong>Actors</strong>     {movieActors}</p>
          <p><strong>Writer</strong>     {movieWriter}</p>
          <p><strong>Genre</strong>     {movieGenre}</p>
        </div>        

        <div className='postwrap mb-5'>
          <img className='block mx-auto rounded-lg shadow-lg' src={moviePoster} width="300" height="auto" />

        </div>

      </main>
    </div>
  )
}


// export async function getStaticProps() {
//   const imdbUrl = 'https://www.imdb.com/title/tt11138512/';
//   console.log(imdbUrl)
//   const { data } = await axios.get(imdbUrl)
//   const $ = cheerio.load(data)
//   const title = $('h1.sc-b73cd867-0').text()
//   const lastScraped = new Date().toISOString()
//   return {
//     props: { title, lastScraped },
//     revalidate: 10,
//   }
// }