import React, {useEffect, useState} from 'react'
import axios from 'axios'

const SearchBar = () => {


    const [character, setCharacter] = useState();
    const [startsWith, setStartsWith] = useState('');
  useEffect(() => {
       axios.get(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${startsWith}&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH_KEY}&limit=100`)
       .then(res => {
        setCharacter(res.data.data.results)
        console.log(character);
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
    <input type='text' placeholder='Search Character...' onChange={handleNameChange}/>
    <button>Submit</button>
    {
      startsWith.length === 0 || character?.length === 0 ? (
        <p>No Characters Found</p>
      ) :     
        character && character?.map(c => {
          return (
            <p>{c.name}</p>
          )
        })
    }
    </>
  )
}

export default SearchBar