function Repo ({name, author, views, link}) {

  return (
    <div className = 'repo'>
      <span className="repo__title"> 
        <a href={link} target='_blank' rel="noreferrer"> 
          {name}  
        </a> 
      </span>
      <span className="repo__author">  {author} </span>
      <span className="repo__views"> {views} </span>
    </div>
  );
}

export default Repo;