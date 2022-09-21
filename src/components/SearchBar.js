import React, {useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SearchBar = () => {
  const [character, setCharacter] = useState();
  const [startsWith, setStartsWith] = useState("");

  const fetchData = async (searchInput) => {
    const apikey = process.env.REACT_APP_API_KEY;
    const hash = process.env.REACT_APP_HASH_KEY;
    const res = await axios.get(
      `https://gateway.marvel.com/v1/public/characters`,
      {
        params: {
          nameStartsWith: searchInput,
          apikey,
          hash,
          limit: 5,
        },
      }
    );
    setCharacter(res.data.data.results);
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    const input = e.target.value.trim();
    if (!input || input.length < 2) {
      setStartsWith(input);
      return;
    }
    fetchData(input);
    setStartsWith(input);
  };

  return (
    <StyledForm>
      <h4>Search</h4>
      <input
        type='text'
        placeholder='Search Character...'
        onChange={handleNameChange}
      />
      {startsWith.length < 2 || character?.length === 0 ? (
        <></>
      ) : (
        <StyledCharacters>
          {character &&
            character?.map((c) => {
              return <h5 key={c.id}>{c.name}</h5>;
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
  h4 {
    text-align: left;
  }
  input {
    padding: 10px;
    width: 100%;
    :focus {
      outline: none;
    }
  }
  h5 {
    padding: 5px;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
    :hover {
      background-color: grey;
    }
  }
`;

const StyledCharacters = styled.div`
  border: 1px solid grey;
`;
