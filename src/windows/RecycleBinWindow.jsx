import './RecycleBinWindow.css'

const deleted = [
  { name: 'Sleep_Schedule.exe',        date: 'Deleted during finals',    size: '∞ KB' },
  { name: 'Free_Time.dll',             date: 'Deleted Apr 2026',         size: '0 KB' },
  { name: 'Easy_Major.txt',            date: 'Never existed',            size: '—'    },
  { name: 'Startup_Idea_Taken.zip',    date: 'Deleted 3 weeks too late', size: '42 KB'},
  { name: 'Working_Merge_First_Try.py',date: 'Corrupted immediately',    size: '1 KB' },
  { name: 'git_push_no_bugs.sh',       date: 'Permanently deleted',      size: '—'    },
  { name: 'My_Sanity_Hackathon.bak',   date: 'Deleted 24hr into SDx',    size: '0 KB' },
  { name: 'Social_Life_Q1.doc',        date: 'Deleted Sep 2024',         size: '—'    },
]

export default function RecycleBinWindow() {
  return (
    <div className="recycle-window">
      <div className="recycle-toolbar raised">
        <span className="toolbar-label">Recycle Bin — Things Dat Sacrificed for Code</span>
      </div>

      <div className="recycle-notice inset">
        <img src="/icons/recycle-bin.svg" alt="" style={{ width: 24, height: 24, imageRendering: 'pixelated' }} />
        <span>These items were permanently deleted. They cannot be recovered.</span>
      </div>

      <div className="recycle-list sunken">
        <div className="filelist-header">
          <span className="col-name">Name</span>
          <span className="col-type">Date Deleted</span>
          <span className="col-date">Size</span>
        </div>
        {deleted.map((f, i) => (
          <div key={i} className="filelist-row">
            <img src="/icons/file.svg" alt="" className="file-icon" />
            <span className="col-name">{f.name}</span>
            <span className="col-type">{f.date}</span>
            <span className="col-date">{f.size}</span>
          </div>
        ))}
      </div>

      <div className="recycle-footer">
        <button className="btn95" disabled>Empty Recycle Bin</button>
        <span className="recycle-tip">Tip: Dat regrets none of this.</span>
      </div>
    </div>
  )
}
