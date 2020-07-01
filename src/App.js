import React, { useState, useEffect } from 'react'
import './App.css'

function App(props){
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
  
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || ''
  )
  
  useEffect(
    () => {
      localStorage.setItem('search', searchTerm);
    },
    [searchTerm]
  )
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value)
    
  }
  
  const filterBySearch = (search) => (
    stories.filter(
      (item) => (
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  )
  
  const enterSearch = (event) => {
    if(event.key == 'Enter'){
      setSearchTerm(event.target.value)
      localStorage.setItem('search', event.target.value)
    }
  }
  
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search value={searchTerm} handleChange={handleChange} enterSearch={enterSearch}/>
      <hr />
      <List list={ filterBySearch(searchTerm) }/>
    </div>
  )
}

function Search(props){
  return(
    <>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={props.value}
      onChange={props.handleChange}
      onKeyPress={props.enterSearch}
    />
    </>
  )
}

function List(props){
 return(
    props.list.map( (item) => (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    ))
  )
}

export default App