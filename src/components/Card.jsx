import { FaTrashAlt } from "react-icons/fa";

export default function ({ title, image, content, tags, published }) {
    return (
        <div className={`card ${published ? 'published' : ''}`}>
            {image &&
                <img src={image} alt="" />
            }
            <h3>{title}</h3>
            <p>{content}</p>
            <div className="badge">
                {tags.map((tag, index) => (
                    <span className="tag" key={index}>{tag}</span>
                ))}
            </div>
            <button><FaTrashAlt /></button>
        </div>
    )
}