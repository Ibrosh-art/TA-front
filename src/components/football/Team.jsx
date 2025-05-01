import React from 'react'


const PlayerCart = () =>{
    return (
        <div className='w-[35vw] h-[45vh] bg-gradient-to-b from-blue-600 to-blue-400 rounded-lg shadow-xl m-4 transform hover:scale-105 transition-transform duration-300'>
            <img src="https://via.placeholder.com/150" alt="Player" className='w-full h-[60%] rounded-t-lg object-cover' />
            <div className='p-4'>
                <h2 className='text-2xl font-bold text-white mb-2'>Player Name</h2>
                <p className='text-gray-200 text-sm mb-1'>Position</p>
                <p className='text-gray-200 text-sm'>Age: 25</p>
            </div>
        </div>
    )
}

const Team = () => {
return (
    <>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>Игроки</h1>
                    <div className='flex w-full h-[2vh]' style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
                            <div className='bg-blue-400 w-[50%] h-[100%]'></div>
                            <div className='bg-yellow-400 w-[50%] h-[100%]'></div>
                    </div>
                    <div className='flex overflow-x-auto no-scrollbar' style={{ whiteSpace: 'nowrap', padding: '10px' }}>
                        <PlayerCart />
                        <PlayerCart />
                        <PlayerCart />
                        <PlayerCart />
                        <PlayerCart />
                        <PlayerCart />
                        <PlayerCart />
                        <PlayerCart />
                        <PlayerCart />
                        <PlayerCart />
                    </div>
            </div>
    </>
)
}

export default Team