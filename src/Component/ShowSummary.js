import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import './ShowSummary.css'; 

const ShowSummary = () => {
    const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const data = await response.json();
      setShow(data);
    }
    fetchData();
  }, [id]);

  const handleBookTicketClick = () => {
    setName(show.name);
    setShowModal(true);;
  };



  // Load from data from local storage 
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedPhoneNumber) setPhoneNumber(storedPhoneNumber);
  }, []);

  // Saving data to local storage 
  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('phoneNumber', phoneNumber);
  }, [name, email, phoneNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
   
  localStorage.setItem('name', name);
  localStorage.setItem('email', email);
  localStorage.setItem('phoneNumber', phoneNumber);
  window.alert('your data has stored in local storage');
  };

  if (!show) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
    <h1>{show.name}</h1>
    {show.image?.medium && <img src={show.image.medium} alt={show.name} />}
    <p>{show.summary}</p>
    <button  onClick={handleBookTicketClick}>Book Ticket</button>
    {showModal && (
  <ReactModal
    isOpen={showModal}
    onRequestClose={() => setShowModal(false)}
    contentLabel="Book Ticket Form"
  >
    <div className="style"><h2>Book Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <button type="submit" style={{ alignSelf: 'center' }}>
          Submit
        </button>
      </form>
    </div>
    
  </ReactModal>
)}

  </div>

  )
}

export default ShowSummary;
