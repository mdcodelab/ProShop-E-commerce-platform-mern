import React from 'react';
import {Button, Form} from "react-bootstrap";
import {useParams, useNavigate} from "react-router-dom";



function SearchBoxComponent() {
    const {keyword: urlKeyword}=useParams();
    const[keyword, setKeyword]=React.useState(urlKeyword || "");
    const navigate=useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            navigate(`search/${keyword}`)
            setKeyword("");
        } else {
            navigate("/")
        }
    }

  return (
    <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control type="text" value={keyword} name="q" placeholder="Search products..."
        onChange={(e)=>setKeyword(e.target.value)} style={{width: "200px"}}></Form.Control>
        <Button type="submit" variant="outline-light" className="p-2 mx-2">Search</Button>
    </Form>
  )
}

export default SearchBoxComponent
