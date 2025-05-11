import React from 'react'

const Youtube = () => {
return (
    <>
        <div className='w-full h-[100vh] flex-col justify-around flex items-center justify-center bg-blue-800'>
            <div>
                <h1 className='text-white text-2xl font-bold'>Следите за нами в YouTube</h1>
            </div>
        
        <div className='w-full flex items-center justify-center'>
            <iframe
                className='w-[80%] h-[70vh] rounded-lg shadow-lg'
                src="https://www.youtube.com/embed/bqSmw9L1B6g?si=GRh3Di60Ki334KWw"                 title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
        </div>
    </>
)
}

export default Youtube