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

const getData = () => {
  return new Promise((resolve, reject) => {
    let list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 88 }]

    setTimeout(() => {
      resolve(list)
    }, 300)
  })
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
  return { props: { post }, revalidate: 10 }
}
