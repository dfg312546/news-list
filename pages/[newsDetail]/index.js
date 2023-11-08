import { useRouter } from "next/router";
import Head from "next/head";
import styles from './newsDetail.module.css' 

const api_key = 'yT1ahXVrFuoQrCLd83mn-c4Tri2gbd32INhsGZk3PIE_cda0';

function DetailPage() {
  const router = useRouter()
  const { title, description, image, published, author, url } = router.query; //可透過query接收屬性
  console.log(router.query.newsDetail)

  function goBack() {
    router.back();
  }

  return (
    <>
    <Head>
      <title>News-List</title>
      <meta name="description" content="新聞詳細內容及來源" />
    </Head>
    <div className={styles.newsDetailPage}>
      {image !== 'None' ? <img src={image} className={styles.newsDetailImg}/> : null}
      <div className={styles.newsDetailInfo}>
        <div className={styles.newsDetailText}>
          <p className={styles.newsDetailTitle}>{title}</p>
          <p className={styles.newsDetailDescription}>{description}</p>
        </div>
        <div className={styles.newsDetailFooter}>
          <p>author: {author}</p>
          <p>source: <a href={url} className={styles.newsDetailFooterLink}>here</a></p>
          <p>published time: {published}</p>
          <button className={styles.newsDetailGoBackButton} onClick={goBack}>Go Back</button>
        </div>
      </div>
    </div>
    </>

  )
}

export default DetailPage