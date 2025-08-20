import React, { useContext } from 'react'
import { dataContext, prevUser } from '../context/UserContext'

function Chat() {
    let {input,setInput,prevInput,setPrevInput,showresult,setShowresult,feature,setFeature,prevFeature,setPrevFeature,genImgUrl,setGenImgUrl}=useContext(dataContext)
  return (
    <div className='chat-page'>
        <div className="user">

            {prevFeature=="upimg"?<> <img src={prevUser.imgUrl} alt="" />
            <span>{prevUser.prompt}</span></>: <span>{prevUser.prompt}</span>}
           
        </div>
        <div className="ai">
            {prevFeature=="genimg"
            ?
            <>
          
            {!genImgUrl?<span>Generating Image...</span>:<img src={genImgUrl} alt="" />}
            </>
            :
            !showresult
            ? 
            <span>Loading...</span>
            :
            <span>{showresult}</span>}
           
           

        </div>
      
    </div>
  )
}

export default Chat

