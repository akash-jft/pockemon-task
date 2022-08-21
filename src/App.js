import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import './App.css';
import LandingPage from './component/landingPage'
import DescriptionPage from './component/descriptionPage'
function App() {

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(true);
  const [itemsId, setItemsId] = useState('');
  const [pageCount, setpageCount] = useState(0);
  const [searchVal,setSearchVal] = useState('')

  let limit = 20;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0.`
      );
      const data = await res.json();
      const total = data.count;
      setpageCount(Math.ceil(total / limit));
      setItems(data.results);
    };

    getComments();
  }, [limit]);

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = ((data.selected+1)*20)-20;

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentPage}.`
    );
    const response = await res.json();
    setItems(response.results);

  };

  const descriptionPage=(data)=>{
       console.log(data)
       setPage(prev=>!prev)
       setItemsId(data)
  }

  const onSearch=async()=>{
    let res;
    if(searchVal == ''){
      res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0.`
      );
      const data = await res.json();
      setItems(data.results);
    }else{
      res = await fetch(
        `http://pokeapi.co/api/v2/pokemon/${searchVal}`
      );
    if(res.status == 404){
      alert('not found')
    }
      const response = await res.json();
      let obj={
        name:response.name,
        url:`https://pokeapi.co/api/v2/pokemon/${response.location_area_encounters.split('/')[6]}`
      }
      setItems([obj]);
    }
  }

  return (
    <div className="container">
      {page?
      <>
      <div style={{justifyContent:'center',display:'flex',marginTop:10}}>
      <input value={searchVal} onChange={(e)=>setSearchVal(e.target.value)}/><button onClick={()=>onSearch()}>Search</button>
      </div>
      <LandingPage items={items} descriptionPage={descriptionPage}/>
      
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      </>
      :
      <DescriptionPage    setPage={setPage} itemsId={itemsId}/>
      }
    </div>
  );
}

export default App;
