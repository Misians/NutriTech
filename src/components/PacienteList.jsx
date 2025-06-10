import React from 'react'

const PacienteList = () => {
  return (
    <div style={{ 
        backgroundColor: '#EFFAF7', 
        display: "flex",
        flexDirection: "column",
        padding: '20px',
        gap: '10px',
        borderRadius: '10px',
        border: '1px solid #eaeaea' }}>
      <input style={{
        width: '300px',
        height: '20px',
        padding: '10px',
        border: '1px solid #eaeaea',
        borderRadius: '5px',

      }} type="text" placeholder='Digite o nome do Paciente' />
      <div style={{ 
        backgroundColor: '#ffffff',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #eaeaea',
        display: 'flex',
        gap: "15px"

        }}>
            <div style={{ 
                width: '50px', 
                height:'50px', 
                borderRadius: "50%", 
                backgroundColor: "#eaeaea" }}>

            </div>
            <div>
                <h2 style={{ fontSize: "16px", color: "#FD9D7B" }}>
                    Sam Pucket
                </h2>
                <p style={{ fontSize: "14px", color: "#666" }}>
                    Modificado em 24/05/2025 - 10:35        
                </p>
            </div>
        
      </div>
      <div style={{ 
        backgroundColor: '#ffffff',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #eaeaea',
        display: 'flex',
        gap: "15px"

        }}>
            <div style={{ 
                width: '50px', 
                height:'50px', 
                borderRadius: "50%", 
                backgroundColor: "#eaeaea" }}>

            </div>
            <div>
                <h2 style={{ fontSize: "16px", color: "#FD9D7B" }}>
                    Sam Pucket
                </h2>
                <p style={{ fontSize: "14px", color: "#666" }}>
                    Modificado em 24/05/2025 - 10:35        
                </p>
            </div>
        
      </div>
      <div style={{ 
        backgroundColor: '#ffffff',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #eaeaea',
        display: 'flex',
        gap: "15px"

        }}>
            <div style={{ 
                width: '50px', 
                height:'50px', 
                borderRadius: "50%", 
                backgroundColor: "#eaeaea" }}>

            </div>
            <div>
                <h2 style={{ fontSize: "16px", color: "#FD9D7B" }}>
                    Sam Pucket
                </h2>
                <p style={{ fontSize: "14px", color: "#666" }}>
                    Modificado em 24/05/2025 - 10:35        
                </p>
            </div>
        
      </div>
    </div>
  )
}

export default PacienteList
