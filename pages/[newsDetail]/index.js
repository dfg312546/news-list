import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styles from './newsDetail.module.css' 

const api_key = 'yT1ahXVrFuoQrCLd83mn-c4Tri2gbd32INhsGZk3PIE_cda0';

function DetailPage() {
  const router = useRouter()
  const { title, description, image, published, author, url } = router.query; 
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

// export async function getStaticPaths() {
//   try {
//     const paths = [
//       { params: { newsDetail } }, // 可以直接使用解构后的变量作为属性值
//     ];
    
//     return {
//     fallback: "blocking",
//     paths: paths,
//     }
//   } catch (error) {
//     console.error('Error in getStaticPaths:', error);
//     return {
//       fallback: "blocking",
//       paths: []
//     }
//   }
// }

// export async function getStaticProps() {
//   try {
//     const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${api_key}&page_size=200`, {
//       method: 'GET',
//     });

//     const data = await response.json();
//     return {
//       props: {
//         initialData: data, // 将数据传递给组件的 initialData 属性
//       },
//     };
//   } catch (error) {
//     console.error('There was a problem with the fetch operation:', error);
//     return {
//       props: {
//         initialData: {}, // 如果发生错误，可以传递一个空对象
//       },
//     };
//   }
// }

// export async function getStaticProps() {
//   try {
//     // let dataNewsArray = [];
//     // for ( let i=1 ; i<10 ; i++) {
//     //   const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${api_key}&page_number=${i}&page_size=200`, {
//     //     method: 'GET',
//     //   });
//     //   const data = await response.json();
//     //   dataNewsArray = dataNewsArray.concat(data.news)
//     // };
//     // const dataNewsObject = dataNewsArray.reduce((acc, newsItem) => {
//     //   acc[newsItem.id] = newsItem;
//     //   return acc;
//     // }, {});

//     return {
//       props: {
//         // initialData: dataNewsObject,
//         // 将数据传递给组件的 initialData 属性
//       },
//     };
//   } catch (error) {
//     console.error('There was a problem with the fetch operation:', error);
//     return {
//       props: {
//         initialData: {}, // 如果发生错误，可以传递一个空对象
//       },
//     };
//   }
// }