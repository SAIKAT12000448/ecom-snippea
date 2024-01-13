import React from 'react'
import dowloadImage from '../../../images/slideshow/download.png'
// import apkFile from '../../../ApkFile/app-debug.apk'

const DownloadBanner = () => {
    // const handleDownload = () => {
        
    //     const link = document.createElement('a');
    //     link.href = apkFile;
    //     link.download = 'app-debug.apk'; 
    
        
    //     document.body.appendChild(link);
    
        
    //     link.click();
    
       
    //     document.body.removeChild(link);
    //   };
  return (
    <div className='mb-3'>
        <button>
        <img src={dowloadImage} alt=''/>
        </button>
       
    </div>
  )
}

export default DownloadBanner