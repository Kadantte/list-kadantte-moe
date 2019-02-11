import { Query } from 'react-apollo'
import { withRouter } from 'next/router'
import mediaListQuery from '../lib/gql/media-list.gql'
import { getList } from '../lib/utils'

export default withRouter(({ status, router }) => {
  const mediaType = (router.query.type || 'anime').toUpperCase()
  return (
    <Query query={mediaListQuery} variables={{ user: 135910, type: mediaType }}>
      {({ loading, data }) => {
        if (loading) {
          return <div>Loading...</div>
        }
        const list = getList(
          data.MediaListCollection.lists,
          status === 'current'
            ? mediaType === 'MANGA'
              ? 'Reading'
              : 'Watching'
            : 'Planning'
        )
        return (
          <div className='media-list'>
            {list.entries.map(entry => (
              <a
                href={entry.media.siteUrl}
                target='blank'
                key={entry.media.id}
                className='media-item'
              >
                <div
                  className='media-cover'
                  style={{
                    backgroundColor: entry.media.coverImage.color,
                    backgroundImage: `url(${entry.media.coverImage.large})`
                  }}
                />
                <div className='media-content'>
                  <div className='media-title'>{entry.media.title.romaji}</div>
                  {status === 'current' && (
                    <div className='media-progress'>
                      Progress: {entry.progress}/{entry.media.chapters || entry.media.episodes || '?'}
                    </div>
                  )}
                  <div
                    className='media-description'
                    dangerouslySetInnerHTML={{
                      __html: entry.media.description
                    }}
                  />
                </div>
              </a>
            ))}
            <style jsx>{`
              .media-list {
                display: grid;
                grid-template-columns: calc((100% - 40px) / 3) calc(
                    (100% - 40px) / 3
                  ) calc((100% - 40px) / 3);
                grid-gap: 20px;
              }
              @media (max-width: 768px) {
                .media-list {
                  grid-template-columns: 100%;
                }
              }
              .media-item {
                display: flex;
                font-size: 16px;
                text-decoration: none;
                padding: 10px;
                color: #000;
                border-radius: 3px;
                background-color: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease-in-out;
              }
              .media-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
                  0 5px 15px 0 rgba(0, 0, 0, 0.08);
              }
              .media-title {
                font-size: 18px;
                margin-bottom: 5px;
              }
              .media-progress {
                font-size: 13px;
                color: #999;
                margin-bottom: 5px;
              }
              .media-description {
                color: #999;
                font-size: 14px;
              }
              .media-cover {
                height: 140px;
                width: 100px;
                background-size: cover;
                margin-right: 20px;
              }
              .media-content {
                width: calc(100% - 120px);
              }
              .media-description {
                max-height: 150px;
                overflow: auto;
              }
            `}</style>
          </div>
        )
      }}
    </Query>
  )
})