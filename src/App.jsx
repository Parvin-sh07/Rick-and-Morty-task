
import { allCharacters } from "../data/data";
import "./App.css";
import Navbar, {SearchResult} from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Search } from "./components/Navbar";




function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [query , setQuery]= useState("");
  const [selectedId, setSelectedId]= useState(null);


  //? Using axios:
  useEffect(()=>{
    async function fetchData(){
     try {
       setIsLoading(true);
       const {data} =  await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`);
        setCharacters(data.results)
     }
     catch(err) {
      setCharacters([])
      // console.log(err.response.data.error);
      toast.error(err.response.data.error)
     }
     finally{
      setIsLoading(false);
     }
    }
    if(query.length <3){
    setCharacters([])
      return;
    }
     fetchData();
  }, [query]);


  const handleSelectCharacter = (id) => {
    setSelectedId(id);
  };

  console.log(selectedId);
  

  //todo:  dependency array => role? when to run effect function
 //?  1.useEffect(()=>{}) -> on every render
 //?  2.useEffect(()=>{},[]) -> mount
  //? 3.useEffect(()=>{},[states,props]) ->dep. array changes
  
       
  // useEffect(()=>{
  //   console.log("call effect on every render");
  // })
  
  // useEffect(()=>{
  //   console.log("call effect on first mount");
  // },[])
  
  // useEffect(()=>{
  //   console.log("call effect on change query");
  // },[query])
  
  // console.log("rendering component");

//? Using fetch:
  // useEffect(()=>{
  //    async function fetchData(){
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/characterj")
  //       if(!res.ok) throw new Error("something went wrong");
  //       const data = await res.json();
  //       setCharacters(data.results.slice(0,4));
       // setIsLoading(false);
  //     } 
  //     catch (err) {
      // setIsLoading(false);
  //       console.log(err.message);
  //       toast.error(err.message)
  //     }
  //     finally {
  //       setIsLoading(false);
  //     }
  //    }
  //    fetchData();
  // },[])




    //! Not To Fetch In This Way:
  // fetch("https://rickandmortyapi.com/api/character")
  // .then((res) => res.json())
  // .then((data) => console.log(data));

  
    //? With  Event Handler:
  // const loadCharacter = ()=> {
  //   fetch("https://rickandmortyapi.com/api/character")
  //   .then((res) => res.json())
  //   .then((data) => setCharacters(data.results.slice(0,3))); 
  // }
  
  return (
    <div className="app">
      <Toaster />
      <Navbar>
      <Search  query={query} setQuery={setQuery}/>
        <SearchResult numOfResult={characters.length}/>
        </Navbar>
      <Main >
      <CharacterList characters={characters} 
      isLoading={isLoading} 
      onSelectCharacter={handleSelectCharacter} />

      <CharacterDetail selectedId={selectedId} />
      </Main>
    </div>
  );
}

export default App;

function Main({children}){
  return <div className="main">{children}</div>
  
}
