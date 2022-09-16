import * as React from 'react';
//import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
//import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
//import Typography from '@mui/material/Typography';
import './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import X2JS from 'x2js';
//import { Container, maxWidth } from '@mui/system';
//import { Grid } from '@mui/material';
import { CssVarsProvider } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';
//import Card from '@mui/joy/Card';
import { Card, CardOverflow, CardContent, Typography } from '@mui/joy';


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
    <CssVarsProvider>
      <div className="App">


        <h1>Board Game Geek's "The Hotness":</h1>

        {posts.map((post) => {
          return (
            <Card
              key={post._id}
              sx={{
                '--Card-padding': '16px'
              }}
            >


              <CardOverflow>
                <AspectRatio ratio='1/1' sx={{ maxWidth: 100 }}>
                  <img src={post.thumbnail._value} />
                </AspectRatio>
              </CardOverflow>

              <CardContent>
                <Typography>
                  #{post._rank} {post.name._value}
                </Typography>
              </CardContent>

            </Card>
          );
        })}

      </div>
    </CssVarsProvider>
  )
}

export default App;
