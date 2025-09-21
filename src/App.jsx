// App.jsx
import Scene from './components/Scene'

const App = () => {
  return (
    <div className='h-screen w-screen bg-[#191919] bg-[url("/texturebg.png")] bg-cover bg-center'>
      <Scene />
      <div className='h-screen text-white w-full fixed top-0 p-6 pointer-events-none font-[switzer] flex flex-col' >
        <header className='flex justify-between items-center border-y-2 py-5 px-4 pointer-events-auto'>
          <img src="/fosh.svg" alt="fosh logo" className='scale-125' />
          <nav className='flex items-center gap-12'>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#brands">Brands</a>
            <a href="#shop">Shop</a>
          </nav>
        </header>
        
        {/* Main Content */}
        <div className="grow relative flex items-center justify-between h-full px-8 pointer-events-none">
          {/* Left side - Photos */}
          <div className="flex flex-col gap-8">
            <div className="bg-white p-2 rotate-[-5deg] shadow-lg">
              <img src="/photo1.jpg" alt="Wine tasting" className="w-32 h-24 object-cover" />
            </div>
            <div className="bg-white p-2 rotate-[8deg] shadow-lg ml-8">
              <img src="/photo2.jpg" alt="Wine cellar" className="w-28 h-20 object-cover" />
            </div>
          </div>
          
          {/* Right side - Text and Photos */}
          <div className="text-right flex flex-col items-end gap-8">
            <div>
              <h2 className="text-5xl font-light mb-4">FOSH A Taste of<br/>Timeless Elegance</h2>
              <p className="text-lg opacity-80">Experience rich flavors and <span className="font-[ppedit]">timeless elegance</span> in every<br/>sip of FOSH.</p>
            </div>
            <div className="bg-white p-2 rotate-[3deg] shadow-lg">
              <img src="/photo3.jpg" alt="Wine collection" className="w-36 h-28 object-cover" />
            </div>
            <div className="text-2xl opacity-60 italic absolute bottom-1 right-4 font-[ppedit]">Since 1990</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App