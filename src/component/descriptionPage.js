import { useEffect, useState } from "react";

import '../App.css';

function App(props) {
    const [items, setItems] = useState('');

    useEffect(()=>{
        const Data= async()=>{
        const res = await fetch(
            `${props.itemsId.url}`
          );
          const response = await res.json();
          setItems(response)
          console.log(props,response)
        }
        Data()
    },[])

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${items.id}.png`} alt={items.name} className="card-img-top" 
           style={{backgroundColor:"#e6e8ea",width:'50%',height:'20%',margin:10}}/>
          <h6>Height: {items.height}</h6>
          <h6>Weight: {items.weight}</h6>
          <div>
          <h6>Abilities:</h6>
            <ul>
                {
                   items !== '' && items.abilities.map((data,i)=>{
                    return(
                        <li key={i}>{data.ability.name}</li>
                    )
                    })
                }
               
            </ul>
            <h6>Moves:</h6>
            <ul>
                {
                   items !== '' && items.moves.map((data,i)=>{
                    if(i<5){
                    return(
                        <li key={i}>{data.move.name}</li>
                    )}
                    })
                }
               
            </ul>
            <h6>Stats:</h6>
            <ul>
                {
                   items !== '' && items.stats.map((data,i)=>{
                    if(i<5){
                    return(
                        <li key={i}>{data.stat.name}:{data.base_stat}</li>
                    )}
                    })
                }
               
            </ul>
          </div>
          <button onClick={()=>props.setPage(prev=>!prev)} style={{margin:10}}>Back</button>
  </div>
  );
}

export default App;
