import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const DynamicLayout = dynamic(() => import('../../components/layout'))
const Test = dynamic(() => import('../../components/test'))
const Mdy = dynamic(() => import('../../components/m'))

export default function FirstPost(props) {
  const num = props.post.num
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Head>
        <title>第一次post</title>
      </Head>

      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <p>{JSON.stringify(props)}</p>
      {num === '1' && <DynamicLayout />}
      <Test />
      <Mdy />
    </>
  )
}

const getData = async () => {
  const response = await fetch('https://getman.cn/mock/api')
  const max = await response.json()
  const length = +max || 10

  const list = [{ id: length }]

  return list
}

export async function getStaticPaths() {
  const posts = await getData()
  const paths = posts.map((post) => ({
    params: { id: `${post.id}` },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

const getDataProps = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        num: id,
      })
    }, 300)
  })
}

export async function getStaticProps({ params }) {
  const post = await getDataProps(params.id)
  return { props: { post }, revalidate: 120 }
}
