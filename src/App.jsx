import { useRef, useState } from "react";
import RepoList from "./components/ReposList";

function App() {

  const [error, setError] = useState(false)
  const [repos, setRepos] = useState([])
  const inputRef = useRef('')
  const [summary, setSummary] = useState(null)


  let searchRepo = async (e)=> {
    e.preventDefault()

    if (inputRef.current.value !== '') {
      try {
        fetch(`https://api.github.com/search/repositories?q=${inputRef.current.value}&sort=stars&per_page=10&page=1`)
        .then(res=>res.json())
        .then(data=> {
          setRepos(data.items);
          setSummary(data.total_count)
        })
  
      } catch (e) {
        setError(true)
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
        <RepoList repos={repos} error={error} summary={summary}/>
         {error? <h2 className="repo-list__message"> Произошла ошибка </h2> : ''}
      </div>
    </main> 
  );
}

export default App;
