import './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

// Need to find a way to parse XML data to JSON
// Have tried npm packages: xml2js, xml-to-jason, react-xml-parser

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(
      "https://boardgamegeek.com/xmlapi2/hot?type=boardgame",
      { "Content-Type": "application/xml; charset=utf-8" }
    ).then((response) => {
      const resData = response.data;
      setPosts(resData.toArray());
    })
  }, [])

  console.log(posts);

  return (
    <div className="App">

      <h1>Board Game Geek's "The Hotness":</h1>
      {posts.map((post) => {

        return (
          <div>
            <h2>{post}</h2>
          </div>
        );
      })}

    </div>
  )
}

export default App;
