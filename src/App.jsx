import { useEffect, useRef, useState } from "react";
import RepoList from "./components/ReposList";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";

function App() {

  const [error, setError] = useState(false)
  const [repos, setRepos] = useState([])
  const inputRef = useRef('')
  const [summary, setSummary] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(null)
  const [desiredValue, setDesiredValue] = useState('')


 useEffect(()=> {
  if (inputRef.current.value !== '') {
    try {
      setIsLoading(true)
      inputRef.current.value = desiredValue
      fetch(`https://api.github.com/search/repositories?q=${desiredValue}&sort=stars&per_page=${limit}&page=${page}`)
      .then(res=>{
        if (res.status===403) {
          setIsLoading(false)
          setError(true)  
          throw new Error('Превышено количество запросов')
        } else {
          return res.json()
        }})
      .then(data=> {
        setRepos(data.items);
        setSummary(data.total_count)
        setIsLoading(false)
      })
    } catch (e) {
      setError(true)
      setIsLoading(false)
      console.log(e)
    }
  }
 },[page,desiredValue])
  
  const searchRepo = (e)=> {
    e.preventDefault()

    if (inputRef.current.value !== '') {
      setDesiredValue(inputRef.current.value)
      setPage(1)
    } else {
      return
    }
  }

  return (
    <main className="app">
      <div className="app__wrapper">
        <h1 className="app__title"> Поиск репозитория в GitHub</h1>
        <form className="app__form">
          <input 
            type="text"
            placeholder='Что найти?'
            ref={inputRef}
          />
          <button
            type='submit'
            onClick={searchRepo}
          > Поиск </button>
        </form>
        {error? 
          <h2 className="repo-list__message"> Произошла ошибка </h2> 
        : 
          isLoading? <Loader/>
          :
          <>
            <RepoList repos={repos} summary={summary}/>
            <Pagination
              page={page} 
              summary={summary} 
              limit={limit}
              setPage={setPage}
              setIsLoading={setIsLoading}
              setRepos={setRepos}
            />
          </>
        }
      </div>
    </main> 
  );
}

export default App;
