import { useState, useEffect } from 'react'
import axios from 'axios'
import defaultImg from "./assets/default.png";

function App() {

  const apiurl = {  actresses:  "https://lanciweb.github.io/demo/api/actresses/",
                    actors:     "https://lanciweb.github.io/demo/api/actors/"}

  const [page,setPage] = useState(1)
  const [actresses,setActresses] = useState([])                         //Lista attrici         
  const [actors,setActors] = useState([])                               //Lista attori
  const [list, setList] = useState([])                                  //Lista da visualizzare

    const getData = ()=>{

      axios.get(apiurl.actresses).then(res=>{                           //Chiamata API axios
        const list = [...res.data.map(p=>({...p,genre:"female"}))];     //data contiene l'array di oggetti(attrici), aggiungo proprietà genere f/m 
                                                                        //per gestione id uguale m/f e gestione nome proprietà diverse
        riordina(list);                                                 //chiamo funzione per riordino alfabetico dell'array per nome attore
        setActresses(list);                                             //salvo lo stato actresses con la lista elaborata
      }).catch(error =>{console.error(error+": chiamata fallita")});    //catch per gestione errori

      axios.get(apiurl.actors).then(res=>{                              //come sopra per l'altra chiamata attori
        const list = [...res.data.map(p=>({...p,genre:"male"}))];
        riordina(list);
        setActors(list);
      }).catch(error =>{console.error(error+": chiamata fallita")});

    }

    function riordina(array){
      return (array.sort((a,b)=>a.name<b.name?-1:1));                   //sort riordina array (-1 viene prima, 1 viene dopo)
    }
      

useEffect(() => {                                     //al caricamento pagina - 1 volta
  getData();                                          //fa richiesta axios 
}, [])                                                //nessuna dipendenza: solo 1 volta al caricamento pagina

useEffect(()=>{
 setList(riordina([ ...actresses,...actors]));        //carica lista mista e riordinala
},[actresses,actors])                                 //quando cambiano gli state (dopo chiamate axios)


useEffect(() => {
  console.log(actresses.map(actress=>actress))
}, [actresses])
useEffect(() => {
  console.log(actors.map(actor=>actor))
}, [actors]) 

useEffect(() => {
  setPage(1)
}, [list])


  return(
      <>
        <nav>
          <div>
            <button onClick={() => setList(riordina([ ...actresses,...actors]))}>Tutti</button>
            <button onClick={() => setList(actresses)}>Attrici</button>
            <button onClick={() => setList(actors)}>Attori</button>
          </div>
          <div>
            <button onClick={()=> setPage(1)}>1</button>
            <button onClick={()=> setPage(2)}>2</button>
            <button onClick={()=> setPage(3)}>3</button>
            <button onClick={()=> setPage(4)}>4</button>
            <button onClick={()=> setPage(5)}>5</button>
          </div>
        </nav>
      
        <div className="card-container">
          {(page===1?list.slice(0,8)
          :page===2?list.slice(8,16)
          :page===3?list.slice(16,24)
          :page===4?list.slice(24,32)
          :list.slice(32,40))
          .map(person=>{
            const { id,
                    name,
                    birth_year:year,
                    nationality:country,
                    biography:bio,
                    image,
                    awards,
                    genre,                       //aggiunto con valore "female"(actresses) o "male"(actors)
                    most_famous_movies:movies,   //valido per actresses
                    known_for:film               //valido per actors
                  } = person;

            return(
              <div key={genre+"-"+id} className="card">       {/* per evitare id doppio genre+id = male-1, female-1, male-2 ecc.. */}
                <h3>{name}</h3>
              <img
                src={image}
                alt={name}
                onError={(e) => {
                  e.currentTarget.src = defaultImg;
                  e.currentTarget.onerror = null;
                }}
/>
                <p>Anno di nascita: {year}</p>
                <p>Nazionalità: {country}</p>
                <div>Biografia: {bio}</div>
                <div>Riconoscimenti: 
                  <ul>
                    {(Array.isArray(awards)                       //se la proprietà è un array 
                      ?awards                                     //lascia l'array
                      :awards.split(",")                          //trasforma la stringa in array dividendola ad ogni ","
                    ).map((award,i)=><li key={i}>{award}</li>)    //mappa tutti i premi e mettili in una lista
                    }
                  </ul>
                </div>
                <div>Film:
                  <ul>
                    {(genre==="female"?movies:film).map((movie,i) => (  //ciclo la proprietà movie o film a seconda del genere
                        <li key={i+"-"+movie+"-"+name}>{movie}</li>       
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
