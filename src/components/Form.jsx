import { useState, useEffect } from 'react'
import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_API_URL;

function Form({ tags, categories, onCreate }) {

    //const tagsList = ['html', 'css', 'js', 'php'];

    //const [posts, setPosts] = useState([]);

    const defaultPostData = {
        title: "",
        slug: "",
        image: "",
        content: "",
        published: false,
        tags: [],
        categoryId: ""
    }

    const [postData, setPostData] = useState(defaultPostData);

    //const isEmpty = postData.title.trim().length === 0;

    const handleSubmit = async (event) => {
        event.preventDefault();

        /*if (isEmpty) {
            return;
        }*/

        const post = await axios.post(`${apiUrl}/posts`, postData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(post);

        onCreate();

        setPostData(defaultPostData);
    }

    const changePostData = (key, newValue) => {
        setPostData(data => ({ ...data, [key]: newValue }));
    }

    const removePost = (indexToDelete) => {
        setPosts(array => array.filter((post, index) => index !== indexToDelete));
    }

    return (
        <>

            <form onSubmit={handleSubmit}>

                <h1>Aggiungi un Post:</h1>

                <div className="form-element">
                    <label><strong>Titolo:</strong></label>
                    <input
                        type="text"
                        value={postData.title}
                        onChange={event => changePostData('title', event.target.value)}
                    />
                </div>

                <div className="form-element">
                    <label><strong>Slug:</strong></label>
                    <input
                        type="text"
                        value={postData.slug}
                        onChange={event => changePostData('slug', event.target.value)}
                    />
                </div>

                <div className="form-element">
                    <label><strong>Immagine:</strong></label>
                    <input
                        type="text"
                        value={postData.image}
                        onChange={event => changePostData('image', event.target.value)}
                    />
                </div>

                <div className="form-element">
                    <label><strong>Contenuto:</strong></label>
                    <input
                        type="text"
                        value={postData.content}
                        onChange={event => changePostData('content', event.target.value)}
                    />
                </div>

                <div className="form-element">
                    <ul>
                        <label><strong>Tags:</strong></label>
                        {tags.map(({ id, name }, index) => (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    checked={postData.tags.includes(id)}
                                    onChange={() => {
                                        const current = postData.tags
                                        const newTags = current.includes(id) ?
                                            current.filter(element => element !== id) :
                                            [...current, id];
                                        changePostData('tags', newTags)
                                    }}
                                />
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="form-element">
                    <label><strong>Categoria:</strong></label>
                    <select
                        name="categoryId"
                        value={postData.categoryId}
                        onChange={event => changePostData("categoryId", Number(event.target.value))}
                    >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-element">
                    <label><strong>Pubblicare:</strong></label>
                    <select
                        name="published"
                        value={postData.published}
                        onChange={event => changePostData("published", event.target.value)}
                    >
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <button>Aggiungi</button>

            </form>

            {/* <div className="container">
                {posts.map((post, index) => (
                    <div className={`card ${post.published ? 'published' : ''}`} key={index}>
                        <img src={post.image} alt="" />
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <div className="badge">
                            {post.tags.map((tag, index) => (
                                <span className="tag" key={index}>{tag}</span>
                            ))}
                        </div>
                        <button onClick={() => removePost(index)}><FaTrashAlt /></button>
                    </div>
                ))}
            </div> */}

        </>
    )
}

export default Form