import useLoader from './useLoader'
import { useState, useCallback, useRef } from 'react'
import { apiSettings } from './settings'

function App() {
  const [pageNumber, setPageNumber] = useState(1)
  const observer = useRef()
  const { loading, hasMore, error, launches } = useLoader({
    query: apiSettings.query(pageNumber)
  })

  const lastLaunchRef = useCallback(
    (node) => {
      if (loading) return
      if (!observer.current)
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1)
          }
          return
        })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  return (
    <>
      <table>
        {launches.map((item, index) => {
          if (launches.length === index + 1) {
            return (
              <tr ref={lastLaunchRef} key={item.id}>
                <td>mission no.: {item.id}</td>
                <td>
                  <a href={item.links.article_link}>
                    mission name: {item.mission_name}
                  </a>
                </td>
                <td>date: {item.launch_date_local}</td>
              </tr>
            )
          } else {
            return (
              <tr key={item.id}>
                <td>mission no.: {item.id}</td>
                <td>
                  <a href={item.links.article_link}>
                    mission name: {item.mission_name}
                  </a>
                </td>
                <td>date: {item.launch_date_local}</td>
              </tr>
            )
          }
        })}
      </table>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
    </>
  )
}

export default App
