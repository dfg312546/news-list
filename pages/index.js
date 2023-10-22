import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router';
import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

const api_key = 'yT1ahXVrFuoQrCLd83mn-c4Tri2gbd32INhsGZk3PIE_cda0';

export default function Home(props) {
  const [news,setNews] = useState(props.initialData.news)
  const [newsPage,setNewsPage] = useState(1)
  const { data } = useQuery(['newspage'], () => fetchNewsData());

  
  async function fetchNewsData(prevOrNext) {
    let updatedPage = newsPage;
    
    if (prevOrNext === 'next') {
      updatedPage += 1;
      window.scrollTo({top :0 ,left :0 ,behavior: "smooth"});
    } else if (prevOrNext === 'prev') {
      updatedPage -= 1;
      if ( updatedPage < 1) { updatedPage = 1}
      window.scrollTo({top :0 ,left :0 ,behavior: "smooth"});
    }

    const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${api_key}&page_number=${updatedPage}&page_size=10`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log(data)
    setNews(data.news)
    setNewsPage(updatedPage)
    return data;
  }

  return (
    <>
      <Head>
        <title>新聞列表project</title>
        <meta name="description" content="練習用project" />
        <meta name="keywords" content="即時新聞API" />
      </Head>
      <h2 className={styles.h1}>Welcome to Next ! Here are the lastest News for  you !</h2>
      <NewsList lastestNews={news}/>
      <Footer news={news} setNews={setNews} page={newsPage} setNewsPage={setNewsPage} fetchNewsData={fetchNewsData}/>
    </>
  )
}


export async function getStaticProps() {
  try {
    const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${api_key}&page_size=10`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    return {
      props: {
        initialData: data, // 将数据传递给组件的 initialData 属性
      },
    };
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return {
      props: {
        initialData: {}, // 如果发生错误，可以传递一个空对象
      },
    };
  }
}



//以下components

export const MainNav = (props) => {
  return (
    <>
    <ul className={styles.mainNavUl}>
      <li className={styles.mainNavLi}>
        <Link className={styles.mainNavLink} href='/'>Home</Link>
      </li>
      <li className={styles.mainNavLi}>
        <Link className={styles.mainNavLink} href='/about'>About</Link>
      </li>
    </ul>
    {props.children}
    </>

  )
}

export function NewsList(props) {

  return (
    <ul>
      {
        props.lastestNews.map((news) => 
        <NewsItem
         key={news.id} 
         id={news.id}
         image={news.image} 
         title={news.title} 
         description={news.description}
         author={news.author}
         url={news.url}
         published={news.published}
        />)
      }
    </ul>
  )
}

export function NewsItem(props) {
  const router = useRouter();
  function goDetailPage() {
    router.push({
      pathname: `/${props.id}`,
      query: {
        image: props.image,
        title: props.title,
        description: props.description,
        author: props.author,
        url: props.url,
        published: props.published
      },
    })
  }

  return (
    <li className={styles.newsItemLi}>
      {props.image !== 'None' ? <img src={props.image} className={styles.newsItemImg} /> : <div className={styles.newsItemNoImg}>No picture</div>}
      <div className={styles.newsItemInfo}>
        <p className={styles.newsItemTitle}>{props.title}</p>
        <p className={styles.newsItemDescription}>{props.description}</p>
        <button className={styles.newItemViewDetailButton} onClick={goDetailPage}>view detail</button>
      </div>
    </li>
  )
}

export function Footer(props) {
  async function handleSubmit(event) {
    event.preventDefault();

    let updatedPage = props.page;

    const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${api_key}&page_number=${updatedPage}&page_size=10`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log(data)
    props.setNews(data.news)
    props.setNewsPage(updatedPage)
    window.scrollTo({top :0 ,left :0 ,behavior: "smooth"})
    return data;
  }

  return (
    <div className={styles.footerContainer}>
    <button onClick={() => {props.fetchNewsData('prev')}} className={styles.footerButton}>prev</button>
    <form className={styles.footerPage} onSubmit={handleSubmit}>
      <input className={styles.footerPageInput} value={props.page} onChange={(event) => {props.setNewsPage(event.target.value)}}/>
      <button className={styles.footerPageBtn} type='submit'>Go</button>
    </form>
    {/* <p className={styles.footerPage}>{props.page}</p> */}
    <button onClick={() => props.fetchNewsData('next')} className={styles.footerButton}>next</button>
    </div>
  )
}
