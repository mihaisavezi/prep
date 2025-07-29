import { useState, useMemo, } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const INITIAL_POST_STATE = {
    id: Date.now(),
    title: '',
    text: ''
}


type Post = {
  id: number
  title: string
  text: string
}

function App() {
  const [post, setPost] = useState<Post>(INITIAL_POST_STATE)

  const [posts, setPosts] = useState<Post[]>([]);

  const [selectValue, setSelectValue] = useState('2')

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setSelectValue(() => value);
  };

  const sortedPosts = useMemo(() => {

    const newPosts = [...posts];
    switch (selectValue) {
      case "0":
        {
          newPosts.sort((a, b) => {

            const wordsA = a.text.trim().split(' ');
            const wordsB = b.text.trim().split(' ');


            return wordsA.length - wordsB.length;
          });
          return newPosts;
        }
        break;
      case "1":
        {

          newPosts.sort((a, b) => {
            const wordsA = a.text.trim().split(" ");
            const wordsB = b.text.trim().split(" ");

            return wordsB.length - wordsA.length;
          });
          return newPosts;
        }
        break;
      case "2":
        {
          newPosts.sort((a, b) => a.id - b.id);
          return newPosts;
        }
        break;
      case "3":
        {
          newPosts.sort((a, b) => b.id - a.id);
          return newPosts;
        }
        break;

      default:
        break;
    }

    return newPosts;
  }, [posts, selectValue])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost((post) => ({...post, [e.target.name]: e.target.value}))
  }

  const handleDelete = (id: number) => {
    
    const filteredPosts = posts.filter((post) => post.id !== id);

    setPosts(() => filteredPosts)
  }


  const handleSubmit = () => {

    setPosts((posts) => [...posts, { ...post, id: Date.now() }]);
    setPost(() => INITIAL_POST_STATE);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <input
        value={post.title}
        type="text"
        name="title"
        id="title"
        onChange={handleChange}
      />
      <textarea
        value={post.text}
        name="text"
        id="text"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}> submit</button>
      {sortedPosts.length > 0
        ? sortedPosts.map(({ title, id, text }) => (
            <div key={id}>
              <h2>{title}</h2>
              {text}
              <button onClick={() => handleDelete(id)}>delete</button>
            </div>
          ))
        : null}
      <div style={{ marginTop: "16px" }}>
        <select value={selectValue} onChange={handleSelectChange}>
          <option value="0">shortest to longest</option>
          <option value="1">longest to shortest</option>
          <option value="2">
            old to new
          </option>
          <option value="3">new to old</option>
        </select>
      </div>
    </>
  );
}

export default App
