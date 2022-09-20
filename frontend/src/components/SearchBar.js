import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SearchBar = () => {
  const [character, setCharacter] = useState();
  const [startsWith, setStartsWith] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${startsWith}&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH_KEY}&limit=5`
      )
      .then((res) => {
        setCharacter(res.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [startsWith]);

  const handleNameChange = (e) => {
    e.preventDefault();
    const input = e.target.value.trim();
    setStartsWith(input);
  };

  return (
    <StyledForm>
        <input
          type="text"
          placeholder="Search Character..."
          onChange={handleNameChange}
        />
        {startsWith.length === 0 || character?.length === 0 ? (
          <></>
        ) : (
          <StyledCharacters>
            {character &&
              character?.map((c) => {
                return <p>{c.name}</p>;
              })}
          </StyledCharacters>
        )}
    </StyledForm>
  );
};

export default SearchBar;

const StyledForm = styled.div`
text-align: center;
width: 200px;
margin: 20px auto;
input {
  padding: 10px;
  width: 100%;
  :focus{
    outline: none;
  }
}
p{
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
  :hover{
    background-color: grey;
  }
}
`

const StyledCharacters = styled.div`
  border: 1px solid grey;
`