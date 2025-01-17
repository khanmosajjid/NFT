import React from 'react'
import Home from '../../home/Home'
import CardSlider from '../../slidercard/CardSlider'
import TrandingNft from '../../trandingnft/TrandingNft'
import Collections from '../../collections/Collections'
import CreateNft from '../../createnft/CreateNft'
const Main = () => {
    return (
        <>
            <Home />
            <CardSlider />
            <TrandingNft />
            <Collections />
            <CreateNft />
        </>
    )
}

export default Main