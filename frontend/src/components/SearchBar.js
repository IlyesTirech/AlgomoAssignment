import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import axios from 'axios'

const SearchBar = () => {

    const [character, setCharacter] = useState();
    const [startsWith, setStartsWith] = useState('');
  useEffect(() => {
       axios.get(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${startsWith}&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH_KEY}&limit=10`)
       .then(res => {
        setCharacter(res.data.data.results)
       })
       .catch(err => {
        console.log(err);
       })
  },[startsWith])

  const handleNameChange = (e) => {
    e.preventDefault();
    setStartsWith(e.target.value.trim())
    console.log(startsWith);
  }

  return (
    <>
    <StyledSearch>
    <input type='text' placeholder='Search Character...' onChange={handleNameChange}/>
    </StyledSearch>

    {
      startsWith.length === 0 || character?.length === 0 ? (
        <StyledErrorHandle>No Characters Found</StyledErrorHandle>
      ) :     
        character && character?.map(c => {
          return (
            <StyledResults>
            <p>{c.name}</p>
            </StyledResults>
          )
        })
    }
    </>
  )
}

export default SearchBar

const StyledSearch = styled.div`
  display: flex;
  justify-content: center;
  input {
    padding: 5px;
  }
`

const StyledErrorHandle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`

const StyledResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  box-shadow: rgba(0,0,0,0.35) 0px 5px 15px;
  height: 200px;
  width: 50vw;
  margin-top: 10px;
  margin: auto;
  overflow: hidden;
  overflow-y: auto;
p:hover {
  background-color: lightgrey;
  cursor: pointer;
}
`