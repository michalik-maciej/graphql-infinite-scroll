import axios from 'axios'
import { apiSettings } from './settings'
import { useEffect, useState } from 'react'

function useLoader({ query }) {
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [launches, setLaunches] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)

    axios(apiSettings.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { query }
    })
      .then((res) => {
        const payload = res.data.data.launchesPast
        setLaunches((prevLaunches) => {
          return [...new Set([...prevLaunches, ...payload])]
        })
        setHasMore(payload.length > 0)
        setLoading(false)
      })
      .catch(() => setError(true))
  }, [query])

  return { loading, error, hasMore, launches }
}

export default useLoader
