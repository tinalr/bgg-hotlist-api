import * as React from 'react';
import './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import X2JS from 'x2js';
import { CssVarsProvider } from '@mui/joy/styles';
import { Card, CardOverflow, CardContent, Typography, AspectRatio } from '@mui/joy';



const App = () => {
  const [posts, setPosts] = useState([]);

  const current = new Date();
  const date = `${current.getMonth() + 1} / ${current.getDate()} / ${current.getFullYear()}`;

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
  };
  console.log(posts);

  return (
    <CssVarsProvider>
      <div className="App"
        style={{
          margin: '-32px',
          padding: '32px',
          width: '100%',
          fontFamily: 'cursive'
        }}
      >

        <Typography level='display1' fontSize='2rem' fontWeight='lg'
          style={{
            color: 'white'
          }}
        >
          Top 50 Trending Board Games
        </Typography>
        <Typography level='display2' fontSize='1.5rem' fontWeight='lg'
          style={{
            color: 'white'
          }}
        >
          {date}
        </Typography>

        {posts.map((post) => {
          return (
            <Card
              row
              variant='outlined'
              key={post._id}
              sx={{
                '--Card-padding': '32px',
                '--Card-radius': '12px',
                margin: '20px auto',
                width: '75%',
                maxWidth: '500px',
                border: 'none',
                boxShadow: 'none'
              }}
            >

              <CardOverflow>
                <AspectRatio ratio='1/1' sx={{ width: 150 }}>
                  <img src={post.thumbnail._value} alt='thumbnail image of game box art' />
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
