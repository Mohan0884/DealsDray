import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllEmployeesContext } from '../pages/AllEmployees';
import '../styles/Employee.css'
function PageBtnContainer() {
    const {data:{numOfPages,currentPage}}=useAllEmployeesContext();
    const pages=Array.from({length:numOfPages},( _ ,index) => {
    return index+1;
    });

    const {search,pathname}=useLocation();
    const navigate=useNavigate();
    const handlePageChange=(pageNumber)=>{
        const searchParams=new URLSearchParams(search);
        searchParams.set('page',pageNumber);
        navigate(`${pathname}?${searchParams.toString()}`)
    }
  return (
    <div className='paging-buttons'>
        <button className='paging-button'>
            <HiChevronDoubleLeft onClick={()=>{
                let prevPage=currentPage-1;
                if(prevPage<1){
                    prevPage=numOfPages;
                }
                handlePageChange(prevPage);
            }}/>
            Prev
        </button>
        <div className="btn-container">
            {pages.map((pageNumber)=>{
                return <button className={`paging-button ${pageNumber===currentPage && 'actives'}`} key={pageNumber} onClick={()=>handlePageChange(pageNumber)}>{pageNumber}</button>
            })}
        </div>
        <button className='paging-button'>
        next
            <HiChevronDoubleRight onClick={()=>{
                let nextPage=currentPage+1;
                if(nextPage>numOfPages) nextPage=1;
                handlePageChange(nextPage);
            }}/>
            
        </button>
    </div>
  )
}

export default PageBtnContainer