import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import X2JS from 'x2js';


// https://boardgamegeek.com/wiki/page/BGG_XML_API2#
// Need to find a way to parse XML data to JSON ???
// Have tried npm packages: xml2js, xml-to-jason, react-xml-parser

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getResponse();
  }, []);

  const getResponse = async () => {
    const response = await axios.get(
      "https://boardgamegeek.com/xmlapi2/hot?type=boardgame",
    );
    if (response.data) {
      let x2js = new X2JS();
      let document = x2js.xml2js(response.data);
      //console.log(document.items.item)
      setPosts(document.items.item)
    }
  }; console.log(posts);

  return (
    <div className="App">
      <Typography variant='h1'>
        Board Game Geek's "The Hotness":
      </Typography>

      {posts.map((post) => {
        return (
          <Card sx={{
            margin: 2,
            boxShadow: 3
          }}>
            <CardContent>
              <div key={post._id}>
                <Typography variant='h2'>
                  #{post._rank} {post.name._value}
                </Typography>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  )
}

export default App;
