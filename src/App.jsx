import { useRef, useState } from "react";
import RepoList from "./components/ReposList";
import Loader from "./components/Loader";

function App() {

  const [error, setError] = useState(false)
  const [repos, setRepos] = useState([])
  const inputRef = useRef('')
  const [summary, setSummary] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  let searchRepo = async (e)=> {
    e.preventDefault()

    if (inputRef.current.value !== '') {
      try {
        setIsLoading(true)
        fetch(`https://api.github.com/search/repositories?q=${inputRef.current.value}&sort=stars&per_page=10&page=1`)
        .then(res=>res.json())
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
          <RepoList repos={repos} summary={summary}/>
        } 
      </div>
    </main> 
  );
}

export default App;
