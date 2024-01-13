
    
import React, {  useState } from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import styled from 'styled-components';


const ScrollButton = () => {

    const[visible,setVisible] = useState(false);

    const toogleVisible = ()=>{

        const scrolled = document.body.scrollTop||document.documentElement.scrollTop;
    



        if(scrolled>300){
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    }

    const scrollTop = ()=>{
        window.scroll({
            top:0,
            behavior:"smooth"
        });

       
    }
    window.addEventListener('scroll',toogleVisible)

    return (

        <Wrapper >
          { 
            visible &&   <button className='topBottom' onClick={scrollTop} style={{border:'5px solid #035570'}}>
            <FaArrowCircleUp className='arrow'
            ></FaArrowCircleUp>
            </button>
          }
        </Wrapper>
    );

};
const Wrapper = styled.section`
 display:flex;
    justify-content: center;
    align-items: center;


.topBottom {
    position: fixed;
    border-radius: 50%;
    display:flex;
    justify-content: center;
    align-items: center;
    
    color:#035570;
    bottom:5rem;
    right:3rem;
    background-color: black;
    z-index: 1;
    cursor:pointer;

}
.arrow{
    height:40px;
    width:100%;
    
}


`;

export default ScrollButton;