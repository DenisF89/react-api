import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const apiurl = {  actresses:  "https://lanciweb.github.io/demo/api/actresses/",
                    actors:     "https://lanciweb.github.io/demo/api/actors/"}

  const [actresses,setActresses] = useState([])
  const [actors,setActors] = useState([])
  const [list, setList] = useState([])

    const getData = ()=>{

      axios.get(apiurl.actresses).then(res=>{
        const list = [...res.data.map(p=>({...p,genre:"female"}))];
        setActresses(list);
      }).catch(error =>{console.error(error+": chiamata fallita")});

      axios.get(apiurl.actors).then(res=>{
        const list = [...res.data.map(p=>({...p,genre:"male"}))];
        setActors(list);
      }).catch(error =>{console.error(error+": chiamata fallita")});

    }

useEffect(() => {
  getData();
}, [])

useEffect(()=>{
 setList([ ...actresses,...actors]);
},[actresses,actors])

useEffect(() => {
  console.log(actresses.map(actress=>actress.name))
}, [actresses])
useEffect(() => {
  console.log(actors.map(actor=>actor.name))
}, [actors])

  return(
      <>
        <nav>
        <button onClick={() => setList([ ...actresses,...actors])}>Tutti</button>
        <button onClick={() => setList(actresses)}>Attrici</button>
        <button onClick={() => setList(actors)}>Attori</button>
        </nav>
      
        <div className="card-container">
          {list.map(person=>{
            const { id,
                    name,
                    birth_year:year,
                    nationality:country,
                    biography:bio,
                    image,
                    awards,
                    genre,
                    most_famous_movies:movies,
                    known_for:film
                  } = person;

            return(
              <div key={genre+"-"+id} className="card">
                <h3>{name}</h3>
                <img src={image} alt={name} />
                <p>Anno di nascita: {year}</p>
                <p>Nazionalità: {country}</p>
                <div>Biografia: {bio}</div>
                <div>Riconoscimenti: {awards}</div>
                <div>Film:
                  <ul>
                    {(genre==="female"?movies:film).map((movie,i) => (
                        <li key={movie+"-"+i}>{movie}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );

          })}
        </div>
      </>
  )
}

export default App
