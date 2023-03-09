import styled from "styled-components"
import { useState } from "react"
import { AiOutlineSearch } from 'react-icons/ai';
import {DebounceInput} from 'react-debounce-input';
import { useEffect } from "react";
import axios from "axios";



export default function SearchBar(){
    const [search, setSearch] = useState("")
    const [searchResult,setSearchResult] = useState([])
    
    useEffect(()=>{
        if(search.length>2){
            console.log(search)
                const promise = axios.post(process.env.REACT_APP_API_URL + '/search', {username:search})
           promise.then(setSearchResult)
            console.log(promise)
            promise.catch(error => console.log(error))
            
            }
        
    },[search])

    function searchUser(e){
        setSearch(e.target.value)
        console.log(search)
    }

    return (
        <SearchBarContainer  >
             <SearchInput
                minLength={3}
                debounceTimeout={300}
                onChange={searchUser}
                placeholder="Search for people" />
             <SearchIcon  />
             <searchResult>
                {(searchResult? (<></>):
                (searchResult.map((r)=><div>
                    <div>{r.pictureUrl}</div>
                    <div>{r.username}</div>
                </div>
                )))}
             </searchResult>
            </SearchBarContainer>
    )
}

const SearchBarContainer = styled.div`
    display: flex;
    align-items: center;
    width: 563px;
    height: 45px;
    left: 437px;
    top: 13px;
    background: #FFFFFF;
    border-radius: 8px;`

const SearchInput = styled.input`
    flex: 1;
    border: none;
    padding: 10px;
`

const SearchIcon = styled(AiOutlineSearch)`
    font-size: 21px;
    color: #888;
    margin-right: 10px; `
    
const SearchBarResult = styled.div`
width: 563px;
height: 176px;
background-color: white`