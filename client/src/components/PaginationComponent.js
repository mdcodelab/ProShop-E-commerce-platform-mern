import React from 'react';
import { Pagination} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


function PaginationComponent({numberPages, currentPage, isAdmin=false, keyword}) {
  return <>{numberPages > 1 && <Pagination>
    {[...Array(numberPages).keys()].map((x)=> (
        <LinkContainer key={x+1} to={!isAdmin ? keyword ? 
        `/search/${keyword}/page/${x+1}` : `/page/${x+1}` : `/admin/productList/${x+1}`}>
            <Pagination.Item active={x+1 === currentPage}>{x+1}</Pagination.Item>
        </LinkContainer>
    ))}
  </Pagination>}</>;
}

export default PaginationComponent
