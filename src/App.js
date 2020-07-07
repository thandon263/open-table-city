import React, { useState, useEffect } from 'react';
import axios from "axios"
import Masonry from 'react-masonry-component';
import Logo from "./features/logo"
import Restaurants from "./components/restaurants"
import Card from "./components/reusable/card"
import DialogBox from "./components/reusable/dialog"
import { Modal, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

const masonryOptions = {
  transitionDuration: 1
};

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function App() {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [city, setCity] = useState('toronto')
  const [open, setOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle)
  const [restaurant, setRestaurant] = useState([])

  useEffect(() => {
    async function fetchData() {
      const results = await axios.get(`https://opentable.herokuapp.com/api/restaurants?city=toronto`)
      setData(results.data.restaurants)
    }

    fetchData()
  }, []);

  const handleOpen = (event, info) => {
    setOpen(true);
    setRestaurant(info)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event, city) => {
    event.preventDefault()
    async function fetchData(city) {
      const results = await axios.get(`https://opentable.herokuapp.com/api/restaurants?city=${city}`)
      setData(results.data.restaurants)
    }

    fetchData(city)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{restaurant.name}</h2>
      <p id="simple-modal-description">
        You have a Table Reservation for <span style={{ color: "#f50057" }}>{restaurant.name}</span> in {restaurant.city}.
        Click the link below to get directions for travel <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/search?q=${restaurant.name}`}>Directions</a>
      </p>
      <Button variant="outlined" color="secondary" onClick={handleClose}>Close Window</Button>
    </div>
  );

  return (
    <div className="App">
      <div className="App-nav">
        <Logo />
      </div>
      <header className="App-header">
        <div className="App-header-content">
          <span>Find a restaurant in your city</span>
          <form className="App-form">
            <input  type="text" name="find-bar" onChange={e => setCity(e.target.value)} value={city} placeholder="Seach for restaurant name or city"/>
            <button onClick={e => handleSubmit(e, city)}>Find</button>
          </form>
        </div>
      </header>
      <div className="App-content">
        <p className="App-content-text">Find based on location of restaurant.</p>
        <Restaurants label="Popular Restaurants">
          {data.length !== 0 ? (
          <Masonry
            elementType={'div'} 
            options={masonryOptions} 
            disableImagesLoaded={false} 
            updateOnEachImageLoad={false} 
          >
              {data.map(item => {
                return (
                    <Card 
                      key={item.id}
                      title={item.name}
                      description={item.address}
                      image={item.image_url}
                      price={item.price}
                      area={item.area}
                      state={item.state}
                      postalCode={item.postal_code}
                      onClick={event => handleOpen(event, item)}
                    />
                  )
              })}
            </Masonry>
          ) : <DialogBox openDialog={true} city={city} handleReturn={e => handleSubmit(e, 'toronto')}/>}
        </Restaurants>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <div className="App-footer">
          <p>Powered by React.js &copy;</p>
      </div>
    </div>
  );
}

export default App;
