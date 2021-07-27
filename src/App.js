import React,{useState,useEffect} from "react";
import './App.css'

const App=()=>{
  const [news,setNews]=useState([]);
  const [searchQuery,setSearchQuery]=useState('react')
  const [url,setUrl]=useState('https://hn.algolia.com/api/v1/search?query=react')
  const [loading,setLoading]=useState(false)
  

  const fetchNews=()=>{
    setLoading(true)
    fetch(url)
    .then(result=>result.json())
    .then(data=>(setNews(data.hits),setLoading(false)))
    .catch(err=>console.log(err));
  };

  useEffect(()=>{
    fetchNews();
  },[url])

  const handleChange=(e)=>{
    setSearchQuery(e.target.value);
  }

  const handleSubmit=e=>{
    e.preventDefault()
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }


  const showLoading=()=>(loading?<h2>Loading..</h2> :<div>{searchForm()}{showNews()}</div>);

  const searchForm=()=>(
    <form onSubmit={handleSubmit}>
    <input type='text' value={searchQuery} onChange={handleChange}></input>
    <button type='submit'>Search</button>
  </form>
  );

  const showNews=()=> news.map((n,i)=>(<p key={i}>{n.title}</p>));


  return(
    <div>
    <h2 id="head">News</h2>
        {showLoading()}
    </div>
  )
}

export default App;
