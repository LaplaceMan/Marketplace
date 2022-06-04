import React, { useContext } from 'react'
import Welcome from './Welcome'
import NftSection from './Section'
import { MarketplaceContext } from '../context/MarketplaceContext';

export default function Home() {

  const {allCollections, fetchNFTs} = useContext(MarketplaceContext);

  return (
    <div>
        <Welcome />
        <NftSection 
            allCollections = {allCollections}
            allnfts={fetchNFTs}
        />
    </div>
  )
}
