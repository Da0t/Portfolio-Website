import { useState } from 'react'
import CommitStatsPage from './CommitStatsPage'
import './InternetExplorerWindow.css'

const MENUS = ['File', 'Edit', 'View', 'Go', 'Favorites', 'Help']
const PAGE_ADDRESS = 'http://dats-nguyen.vercel.app/meta/'

export default function InternetExplorerWindow() {
  // Changing the key remounts the page, which refetches and redraws it.
  const [loadCount, setLoadCount] = useState(0)
  const reload = () => setLoadCount(count => count + 1)

  return (
    <div className="ie-window">
      <div className="ie-menubar">
        {MENUS.map(menu => <span key={menu}>{menu}</span>)}
      </div>
      <div className="ie-toolbar">
        <button className="btn95" disabled>Back</button>
        <button className="btn95" disabled>Forward</button>
        <button className="btn95" disabled>Stop</button>
        <button className="btn95" onClick={reload}>Refresh</button>
        <button className="btn95" onClick={reload}>Home</button>
        <img className="ie-throbber sunken" src="/icons/internet-explorer.svg" alt="" draggable={false} />
      </div>
      <div className="ie-addressbar">
        <span>Address</span>
        <div className="ie-address sunken">{PAGE_ADDRESS}</div>
      </div>
      <div className="ie-page sunken">
        <CommitStatsPage key={loadCount} />
      </div>
    </div>
  )
}
