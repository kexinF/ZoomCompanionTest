"use client";
import React, { useState } from 'react';
import Header from '../header';
import Footer from '../footer';
import Modal from 'react-modal';

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [newButtonText, setNewButtonText] = useState('');
  const [buttons, setButtons] = useState([
    { id: 1, text: 'I have an important voice!' },
    { id: 2, text: 'Me Too!' },
  ]);

  const openModal = (button) => {
    setModalIsOpen(true);
    setCurrentEditId(button.id);
    setEditText(button.text);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEdit = () => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === currentEditId ? { ...button, text: editText } : button
      )
    );
    closeModal();
  };

  const deleteButton = (id) => {
    setButtons((prevButtons) => prevButtons.filter((button) => button.id !== id));
  };

  const addButton = () => {
    const newId = Math.max(0, ...buttons.map((b) => b.id)) + 1; // Create a new ID
    const newButton = { id: newId, text: newButtonText };
    setButtons((prevButtons) => [...prevButtons, newButton]);
    setNewButtonText(''); // Reset input field
  };

  const handleTitleChange = () => {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString();
    localStorage.setItem('title', formattedTime);
    window.location.reload();
  };

  return (
    <div className="bg-white w-screen h-screen">
      <div className="flex w-full justify-between">
        <Header />
      </div>

      <button onClick={handleTitleChange}>Change Title to Current Time</button>

      {buttons.map((button) => (
        <div key={button.id} className="dropdown">
          <button className="dots-button"> {button.text}</button>
          <div className="dropdown-content">
            <button style={{ border: '0.5px solid black' }} onClick={() => {}}>Apply</button>
            <button style={{ border: '0.5px solid black' }} onClick={() => openModal(button)}>Edit</button>
            <button style={{ border: '0.5px solid black' }} onClick={() => deleteButton(button.id)}>Delete</button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Button Text"
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <div className="Modal-Body">
          <textarea
            placeholder="Edit text"
            className="large-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          ></textarea>
        </div>
        <button onClick={handleEdit}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>

      <Footer />
    </div>
  );
}

export default Home;
