function NewsItem(props) {
  return (
    <li>
      <div>
        <p>Title: {props.title}</p>
        <p>description: {props.description}</p>
      </div>
    </li>
  )
}

export default NewsItem