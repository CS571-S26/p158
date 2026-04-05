import { HashRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import loginStatusContext from './loginStatusContext'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateListing from './pages/CreateListing'
import Listings from './pages/Listings'
import MyListings from './pages/MyListings'
import Login from './auth/Login'
import Register from './auth/Register'

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function App() {
  const [user, setUser] = useState(() => loadFromStorage('pos_user', null));
  const [listings, setListings] = useState(() => loadFromStorage('pos_listings', []));

  function handleSetUser(newUser) {
    setUser(newUser);
    saveToStorage('pos_user', newUser);
  }

  function addListing(listing) {
    const updated = [listing, ...listings];
    setListings(updated);
    saveToStorage('pos_listings', updated);
  }

  // Filter for the logged in userr's listings
  const myListings = user
    ? listings.filter(l => l.userId === user.id)
    : [];

  return (
    <loginStatusContext.Provider value={{ user, setUser: handleSetUser }}>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/listings" element={<Listings listings={listings} />} />
          <Route path="/myListings" element={<MyListings myListings={myListings} />} />
          <Route path="/createListing" element={<CreateListing onSubmit={addListing} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </HashRouter>
    </loginStatusContext.Provider>
  )
}

export default App