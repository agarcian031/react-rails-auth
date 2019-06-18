import React, { useState, useEffect } from "react";
import { Header, Image, Card, Button, Icon } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [
    cats,
    setCats
  ] = useState([]);

  useEffect(() => {
    axios.get("/api/cats").then((res) => setCats(res.data));
  }, []);

  const sample = () => {
    // grab one cat from the array
    if (cats.length) {
      const index = Math.floor(Math.random() * cats.length);
      return cats[index];
    } else {
      return null;
    }
  };


  // if we downvote the cat, then it will remove the cat from the array and its gone. 
  const downVote = (id) => {
    setCats(cats.filter( c => c.id !== id)); 
  }; 

  // will save the cats you like into the database and return cats 
  const upVote = (id) => {
    axios.put(`/api/cats/${id}`)
    .then(() => setCats(cats.filter(c => c.id !== id)))
  }



  // will grab us a sample cat from the cats array
  const cat = sample();

  if (cat) {
    return (
      <div>
        <br />
        <Header as="h3" textAlign="center">
          Cat Tinder
        </Header>
        <hr />
        <br />
        <Card>
          <Image src={cat.avatar} />
          <Card.Content>
            <Card.Header>{cat.name}</Card.Header>
            <Card.Description>{cat.breed}</Card.Description>
            <Card.Meta>{cat.registry}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Button.Group size="tiny">
              <Button color="red" icon basic onClick={() => downVote(cat.id)}>
                <Icon name="thumbs down" />
              </Button>
              <Button color="green" icon basic onClick={() => upVote(cat.id)}>
                <Icon name="thumbs up" />
              </Button>
            </Button.Group>
          </Card.Content>
        </Card>
        <Link to="/my-cats">
          <Button color="blue">My Cats</Button>
        </Link>
      </div>
    );
  } else {
    return (
      <Header as="h2" textAlign="center">
        No More Cats
      </Header>
    );
  }
};

export default Home;
