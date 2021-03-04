import React, { useEffect, useState } from 'react'
import Link from './Link'
const l = console.log
const Tiles = ({ ...props }) => {
  const [url, setUrl] = useState('https://rickandmortyapi.com/api/character')
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [episode, setEpisode] = useState([])
  const [pager, setPager] = useState([1])
  const [prevPager, setPrevPager] = useState([0])
  const [pagerItems, setPagerItems] = useState([0])
  let activeClass = ''
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result.results)
          document.title = url
          l(result)
          setPager(result.info.next)
          setPrevPager(result.info.prev)
          if (setEpisode(result.episode)) {
            setEpisode(result.episode[0])
          }
          let totalPages = result.info.count
          totalPages = Math.ceil(totalPages / 20)
          let pagerLinks = []
          for (let i = 1; i <= totalPages; i++) {
            pagerLinks.push({
              key: i,
              link: `https://rickandmortyapi.com/api/character?page=${i}`,
            })
          }
          setPagerItems(pagerLinks)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [url])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <>
        <div className="prevnext">
          {prevPager && (
            <button onClick={() => setUrl(prevPager)}>Prev page</button>
          )}
          {pager && <button onClick={() => setUrl(pager)}>Next page</button>}
        </div>
        <div className="grid">
          {items.map((link, index) => (
            <Link
              key={index}
              image={link.image}
              index={index}
              name={link.name}
              location={link.location}
              episode={link.episode[0]}
            />
          ))}
        </div>
        <h3>{url}</h3>
        {pagerItems && (
          <div className="pager">
            <ul>
              {pagerItems.map(
                (pager, index) => (
                  (activeClass = url === pager.link ? 'active' : ''),
                  (
                    <li key={index}>
                      <button
                        className={activeClass}
                        onClick={() => setUrl(pager.link)}
                      >
                        {pager.key}
                      </button>
                    </li>
                  )
                )
              )}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default Tiles
