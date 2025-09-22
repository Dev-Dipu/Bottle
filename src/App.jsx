// App.jsx
import Scene from "./components/Scene";

const App = () => {
    return (
        <div className='h-screen w-screen bg-[#191919] bg-[url("/images/foshhhbg.png")] bg-cover bg-center'>
            <Scene />
            <div className="fixed top-0 left-0 h-screen w-full text-white font-[switzer] flex flex-col justify-between">
                <header className="px-10 py-8 flex items-center justify-between relative ">
                    <h3>Alcohol Bottle</h3>
                    <img
                        src="/images/fosh.svg"
                        alt="Wine Bottle"
                        className="scale-125 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1"
                    />
                    <nav className="flex gap-12">
                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">Brand</a>
                        <a href="#">Shop</a>
                    </nav>
                </header>
                <div className="content text-[#E9E9E9] px-52 flex justify-between items-center relative">
                    <div className="text w-[35%]">
                        <h1 className="text-[40px] leading-none">
                            FOSH A Taste of Timeless Elegance
                        </h1>
                        <p className="leading-none mt-3">
                            Experience rich flavors and <span className="font-[ppedit]">timeless elegance</span> in
                            every sip of FOSH.
                        </p>
                    </div>
                    <div className="h-48 aspect-video bg-zinc-400 overflow-hidden translate-y-[120%]">
                        <img className="h-full w-full object-cover" src="/images/partyimg.png" alt="party" />
                    </div>
                </div>
                <footer className="px-10 py-6 flex justify-between items-end">
                    <img src="/images/irish.svg" alt="irish" />
                    <h2 className="font-[ppedit] text-[26px]">Since 1990.</h2>
                </footer>
            </div>
        </div>
    );
};

export default App;
