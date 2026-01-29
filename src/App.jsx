import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const apiurl = {  actresses:  "https://lanciweb.github.io/demo/api/actresses/",
                    actors:     "https://lanciweb.github.io/demo/api/actors/"}

  const [actresses,setActresses] = useState([])
  const [actors,setActors] = useState([])

    const getData = ()=>{

      axios.get(apiurl.actresses).then(res=>{
        setActresses(res.data);
      }).catch(error =>{console.error(error+": chiamata fallita")});

      axios.get(apiurl.actors).then(res=>{
        setActors(res.data);
      }).catch(error =>{console.error(error+": chiamata fallita")});

    }
     
useEffect(() => {
  getData()
}, [])

useEffect(() => {
  console.log(actresses.map(actress=>actress.name))
}, [actresses])
useEffect(() => {
  console.log(actors.map(actor=>actor.name))
}, [actors])

  return(
      <>
      </>
  )
}

export default App
