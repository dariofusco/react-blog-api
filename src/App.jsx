import { useEffect, useState } from "react";
import './App.css'
import Card from './components/Card'
import Form from "./components/Form"
import axios from "axios"

const apiUrl = import.meta.env.VITE_BASE_API_URL;

function App() {

  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    await axios.get(`${apiUrl}/posts`)
      .then(res => {
        const posts = res.data;
        setPosts(posts);
        console.log(posts);
      })
  }

  const [tags, setTags] = useState([]);
  const fetchTags = async () => {
    const url = `${apiUrl}/tags`;
    const { data: array } = await axios.get(url);
    setTags(array);
    console.log(array);
  }

  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    const url = `${apiUrl}/categories`;
    const { data: array } = await axios.get(url);
    setCategories(array);
    console.log(array);
  }

  useEffect(() => {
    fetchPost();
    fetchTags();
    fetchCategories();
  }, [])

  return (
    <>
      <Form
        tags={tags}
        categories={categories}
        onCreate={() => {
          fetchPost()
        }}
      />

      {posts.map(post => (
        <Card
          key={post.id}
          title={post.title}
          content={post.content}
          tags={post.tags.map(tag => tag.name)}
          published={post.published}
        />
      ))}

    </>
  )
}

export default App
