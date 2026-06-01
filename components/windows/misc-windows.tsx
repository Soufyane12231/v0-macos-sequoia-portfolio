'use client'

export function TrashWindow() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <div className="text-6xl mb-4">🗑️</div>
      <h2 className="text-[#e8e8f0] text-xl font-semibold mb-2">Trash is Empty</h2>
      <p className="text-[#8888aa] text-sm mb-6">
        Cannot delete: soufyane.exe is a critical system process
      </p>
      <div className="text-[#555] text-xs font-mono">
        [ERROR 0x80070005: Access Denied]
      </div>
    </div>
  )
}

export function FinderWindow() {
  const folders = [
    { name: 'Applications', icon: '📁', count: 6 },
    { name: 'Documents', icon: '📄', count: 12 },
    { name: 'Projects', icon: '💻', count: 4 },
    { name: 'Downloads', icon: '⬇️', count: 8 },
  ]
  
  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-48 border-r border-[rgba(0,240,255,0.08)] p-3">
        <div className="text-[#555] text-xs uppercase tracking-wider mb-2 px-2">
          Favorites
        </div>
        {['Home', 'Desktop', 'Documents', 'Downloads'].map((item) => (
          <button
            key={item}
            className="w-full text-left px-3 py-1.5 rounded-md text-sm text-[#e8e8f0] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            {item}
          </button>
        ))}
        
        <div className="text-[#555] text-xs uppercase tracking-wider mt-4 mb-2 px-2">
          Tags
        </div>
        {[
          { name: 'Work', color: '#00f0ff' },
          { name: 'Personal', color: '#7b2fff' },
          { name: 'Important', color: '#ff5f57' },
        ].map((tag) => (
          <button
            key={tag.name}
            className="w-full text-left px-3 py-1.5 rounded-md text-sm text-[#e8e8f0] hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-2"
          >
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: tag.color }}
            />
            {tag.name}
          </button>
        ))}
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-4">
          {folders.map((folder) => (
            <button
              key={folder.name}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            >
              <div className="text-4xl">{folder.icon}</div>
              <span className="text-[#e8e8f0] text-sm">{folder.name}</span>
              <span className="text-[#555] text-xs">{folder.count} items</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
