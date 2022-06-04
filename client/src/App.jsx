import { Navbar, Footer, SingleNFT } from './components';
import { Anchor } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateNFT from './components/Create/CreateNFT/CreateNFT';
import ProfileSection from './components/ProfileSection/profileSection';
import Create from './components/Create/Create';
import CreateCollection from './components/Create/CreateCollection/CreateCollection';
import { WalletProvider } from './context/WalletContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import SingleCollection from './components/Singlecollection';
import Marketplace from './components/Marketplace';


const App = () => {

  return (
    <Router>
      <WalletProvider>
        <MarketplaceProvider>
          <div className="min-h-screen gradient-bg-welcome">
            <Anchor>
              <Navbar />
            </Anchor>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route exact path='/create' element={<Create />} />
              <Route exact path='/create/nft' element={<CreateNFT />} />
              <Route exact path='/create/collection' element={<CreateCollection />} />
              <Route exact path='/assets/:collectionId' element={<SingleCollection />}
              />
              <Route exact path='/assets/:collectionId/:nftId' element={<SingleNFT />}/>
              <Route exact path='/profile' element={<ProfileSection />} />
              <Route exact path='/marketplace' element={<Marketplace />} />
            </Routes>
            <Footer />
          </div>
        </MarketplaceProvider>
      </WalletProvider>
    </Router>
  )
}

export default App
