import Repo from "./Repo";
import List from "./List";

function RepoList({repos, summary}) {

  const renderItem = (item) => {
    return (
      <Repo 
      name={item.name}
      author={item.owner.login}
      views={item.watchers}
      link={item.html_url}
      key={item.html_url}
      />
    )
  }

  return (
    <div className="app__list">
      {repos?.length?
        <>
        <div className = 'repo fist-row'>
          <span className="repo__title"> Наименование </span>
          <span className="repo__author"> Автор </span>
          <span className="repo__views"> Просмотры </span>
        </div>
        <List items={repos} renderItem={renderItem}/>
        <h3 className="repo__sum">{`Найдено всего ${summary} репозиториев`}</h3>
        </>
      :
        <>
          {summary===0 ? 
            <h2 className="repo-list__message"> Ничего не нашлось </h2>
          :
            <h2 className="repo-list__message"> Список пуст </h2>
          }
        </>
      }
    </div>
  );
}

export default RepoList;