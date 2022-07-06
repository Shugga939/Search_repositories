import { useEffect, useState } from "react";

function Pagination({page, summary, limit, setPage}) {

  const [numbers, setNumbers] = useState([])

  const switchPage = function (e){
    e.preventDefault()
    setPage(+e.target.innerHTML)
  }

  useEffect(()=> {
    let allPages = Math.ceil(summary/limit)
    let startPage = page-5<1 ? 1 : page-5
    let endPage = (page+4>allPages || allPages<11) ? allPages : (page<6 && allPages>=11)? 10 : page+4
    let pageArr = []
    for (let i = startPage; i <=endPage; i++) {
       pageArr.push(i)
    }
    setNumbers(pageArr)

  },[page,summary])

  return (
    <div className="pagination">
      {numbers.map(el=> {
        return <button 
          className={page === el? "pagination__page active": "pagination__page"} 
          key={el}
          onClick={switchPage}
          > {el} </button>
      })}
    </div>
  );
}

export default Pagination;