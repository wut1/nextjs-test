

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'

export default function Layout() {
  return (
    <div className={styles.container}>
     我是{name}
    </div>
  )
}
