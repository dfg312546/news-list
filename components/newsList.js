import NewsItem from "./newsItem"

function NewsList(props) {

  return (
    <ul>
      {
        props.lastestNews.map((news) => <NewsItem key={news.id} title={news.title} description={news.description
        }/>)
      }
    </ul>
  )
}

export default NewsList