import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'

export default withRouter(({ router, status }) => {
  const title = `EGOIST の ${
    status === 'completed'
      ? 'Completed'
      : status === 'current'
      ? router.query.type === 'manga'
        ? 'Reading'
        : 'Watching'
      : 'Planning'
  } List`
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className="page-title">
        <Link href="/">
          <a>{title}</a>
        </Link>
      </h1>
    </>
  )
})
