import React from 'react'
import camera from '../assets/camera.png'
import foto from '../assets/foto.png'
const RegistroAlimentar = () => {
  return (
    <div style={{ 
            backgroundColor: '#EFFAF7', 
            padding: '20px', 
            borderRadius: '10px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            gap: '10px',
            display: 'flex',
            flexDirection: 'column',}}>
            <div style={{
                display: 'flex', gap: '10px', alignItems: 'center'}}>
                <img src={camera} alt="" />
                <h3 style={{ color: "#518367"}} >Registro Alimentar</h3>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',}}>
                <div 
                className="item" 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                    gap: '10px', 
                    backgroundColor: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '8px ',
                    alignItems: 'center',
                    }}>
                        <img src={foto} alt="" width={'50px'} height={'50px'} />
                        <div style={{ display: 'flex', flexDirection: "column", gap: '10px'}}>
                            <span>Spencer Shay</span>
                            <span>almoço do dia 15/10/2023</span>
                        </div>
                    
                </div>
            </div>
        </div>
  )
}

export default RegistroAlimentar