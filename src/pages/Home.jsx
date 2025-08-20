import React from 'react'
import { RiImageAiFill } from "react-icons/ri";
import { RiImageAddLine } from "react-icons/ri";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { FaArrowUpLong } from "react-icons/fa6";
import { FaPlus }       from "react-icons/fa6";
import "../App.css"
import { useContext } from 'react';
import { dataContext, prevUser, user } from '../context/UserContext';
import Chat from './Chat';
import { generateResponse } from '../gemini';
import { query } from '../huggingFace';

function Home() {

    let {startRes,setStartRes,popUp,setPopUp,input,setInput,feature,setFeature,showresult,setShowresult,prevFeature,setPrevFeature,genImgUrl,setGenImgUrl}=useContext(dataContext)

    async function handleSubmit(e){

        setStartRes(true)
        setPrevFeature(feature)
        setShowresult("")
        prevUser.data=user.data;
        prevUser.mime_type=user.mime_type;
        prevUser.imgUrl=user.imgUrl;
        prevUser.prompt=input
        user.data=null
        user.mime_type=null
        user.imgUrl=null
        setInput("")
        let result=await generateResponse()
        setShowresult(result)
        setFeature("chat")
       


}

function handleImage(e){
    setFeature("upimg")
    let file=e.target.files[0]
    let reader=new FileReader()
    reader.onload=(event)=>{
        let base64=event.target.result.split(",")[1]
        user.data=base64
        user.mime_type=file.type
        user.imgUrl=`data:${user.mime_type};base64,${user.data}`

    }
    
    reader.readAsDataURL(file)
}
async function handleGenerateImg(){
    setStartRes(true)
    setPrevFeature(feature)
    setGenImgUrl("")
    prevUser.prompt=input
let result=await query().then((e)=>{
let url=URL.createObjectURL(e)
    setGenImgUrl(url)
    
})

}






  return (
    <div className='home'>
      <nav>
        <div className="logo" onClick={()=>{
            setStartRes(false)
            setFeature("chat")
            user.data=null
        user.mime_type=null
        user.imgUrl=null
        setPopUp(false)

        }}>
            InSight AI
            
            </div>
      </nav>

      <input type="file" accept='image/*' hidden id='inputImg' onChange={handleImage} />

      {!startRes?<div className="hero">
        <span id="tag">What can I help you?</span>
        <div className="cate">
            <div className="upImg" onClick={()=>{
                document.getElementById("inputImg").click()
            }}>
                <RiImageAddLine />
                <span>Upload Image</span>
            </div>
            <div className="genImg" onClick={()=>setFeature("genimg")}>
                <RiImageAiFill />
                <span>Generate Image</span>
                </div>
            <div className="chat" onClick={()=>setFeature("chat")}>
                <MdOutlineChatBubbleOutline />
                <span>Let's Chat</span>
            </div>

        </div>
    
      </div>:
      <Chat/>
      }

      
      
<form className="input-box" onSubmit={(e)=>{
        e.preventDefault()
      if(input){
        if(feature=="genimg"){
            handleGenerateImg()
        }
        else{
             handleSubmit(e)
        }
       }


        }}>

    <img src={user.imgUrl} alt="" id="im"/>

       

        

        {popUp?<div className="pop-up">
            <div className="select-up" onClick={()=>{
                setPopUp(false)
                setFeature("chat")
                document.getElementById("inputImg").click()
            }}>
                 <RiImageAddLine />
                <span>Upload Image</span>
            </div>
            <div className="select-gen" onClick={()=>{
                setPopUp(false)
                setFeature("genimg")}}>
                 <RiImageAiFill />
                <span>Generate Image</span>

        </div>

        </div>:null}

        
        <div id="add" onClick={()=>{
            setPopUp(prev=>!prev)
        }}>
            {feature=="genimg"?<RiImageAiFill id="genImg" />: <FaPlus />}
           
        </div>
        <input type="text" name="" id="" placeholder='Ask Something...' onChange={(e)=>setInput(e.target.value)} value={input}/>
        {input?<button id="submit">
            <FaArrowUpLong />
        </button>:null}
        
      </form>
    </div>
  )
}

export default Home
