import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styles from './newsDetail.module.css' 

const api_key = 'yT1ahXVrFuoQrCLd83mn-c4Tri2gbd32INhsGZk3PIE_cda0';

function DetailPage(props) {
  const router = useRouter()
  const { newsDetail } = router.query; 

  const newsIdToFind = newsDetail
  const news = props.initialData.news.find((news) => news.id === newsIdToFind);

  function goBack() {
    router.back();
  }

  return (
    <>
    <Head>
      <title>{news.title}</title>
      <meta name="description" content="新聞詳細內容及來源" />
    </Head>
    <div className={styles.newsDetailPage}>
      {news.image !== 'None' ? <img src={news.image} className={styles.newsDetailImg}/> : null}
      <div className={styles.newsDetailInfo}>
        <div className={styles.newsDetailText}>
          <p className={styles.newsDetailTitle}>{news.title}</p>
          <p className={styles.newsDetailDescription}>{news.description}</p>
        </div>
        <div className={styles.newsDetailFooter}>
          <p>author: {news.author}</p>
          <p>source: <Link href={news.url} className={styles.newsDetailFooterLink}>here</Link></p>
          <p>published time: {news.published.slice(0, -5)}</p>
          <button className={styles.newsDetailGoBackButton} onClick={goBack}>Go Back</button>
        </div>
      </div>
    </div>
    </>

  )
}

export default DetailPage

export async function getStaticPaths() {
  try {
    const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${api_key}&page_size=10`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const paths = data.news.map((newsItem) => ({
      params: {newsDetail: newsItem.id.toString()}
    }))

    return {
    fallback: "blocking",
    paths: paths,
    }
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      fallback: "blocking",
      paths: []
    }
  }
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