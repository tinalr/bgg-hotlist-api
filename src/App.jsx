import * as React from 'react';
import './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import X2JS from 'x2js';
import { CssVarsProvider } from '@mui/joy/styles';
import { Card, CardOverflow, CardContent, Typography, AspectRatio } from '@mui/joy';


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
      <div className="App"
        style={{
          backgroundColor: '',
          margin: '-32px',
          padding: '32px'
        }}
      >

        <Typography level='display1' fontSize='lg' fontWeight='lg'>
          Board Game Geek's "The Hotness":
        </Typography>

        {posts.map((post) => {
          return (
            <Card
              row
              variant='outlined'
              key={post._id}
              sx={{
                '--Card-padding': '16px',
                '--Card-radius': '12px',
                margin: '16px',
              }}
            >

              <CardOverflow>
                <AspectRatio ratio='1/1' sx={{ width: 150 }}>
                  <img src={post.thumbnail._value} />
                </AspectRatio>
              </CardOverflow>

              <CardContent>
                <Typography level='h1' fontSize='md' fontWeight='lg'>
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
