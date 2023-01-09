import { useEffect, useState } from 'react'
import { useRef } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'


import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'

const App = () => {
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])
    let searchInput = useRef ('')

    const API_URL = 'https://itunes.apple.com/search?term='

    const handleSearch = (e, term) => {
        e.preventDefault()
        // Fetch data from API
        const fetchData = async () => {
            document.title = `${term} music`
            const response = await fetch(API_URL + term)
            const resData = await response.json()
            if (resData.results.length > 0) {
                return setData(resData.results)
            } else {
                return setMessage('Not Found.')
            }
        }
        fetchData()
    }

    return (
        <>
        {message}
            <Router>
                <Routes>
                    <Route path="/" element={
                        //fragment is used to wrap more than one component
                        <>
                            <SearchContext.Provider value={{
                            term: searchInput,
                            handleSearch: handleSearch
                             }}>
                                <SearchBar />
                            </SearchContext.Provider>
                            <DataContext.Provider value={data}>
                                <Gallery />
                            </DataContext.Provider>
                        </>
                            
                    } />
                    <Route path="/album/:id" element={<AlbumView />} />
                    <Route path="/artist/:id" element={<ArtistView />} />
                </Routes>
            </Router>
        </>
    )
    
}

export default App

