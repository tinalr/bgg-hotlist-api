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
      <h1>Board Game Geek's "The Hotness":</h1>
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <h2>#{post._rank} {post.name._value}</h2>
          </div>
        );
      })}
    </div>
  )
}

export default App;
