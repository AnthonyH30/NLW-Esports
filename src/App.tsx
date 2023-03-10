import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';


import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdModal } from './components/CreateAdModal';


interface Game{
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(response =>{
      setGames(response.data)
    })
  }, [])

  return (
    <div className='max-w-[1368px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="logo nlw esports" className='w-[200px] sm:w-[320px]' />
      <h1 className='text-[35px] sm:text-6xl text-white font-black mt-20'>Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.</h1>
    
      <div className='flex overflow-x-auto w-[90%] gap-6 mt-16'>
      {games.map(game => {
          return(
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads}/>
          )
        })}
      
      </div>

      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal />
      </Dialog.Root>
      
    </div>
  )
}

export default App
