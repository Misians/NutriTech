import diario from '../assets/diario.png'
import { FaAppleAlt } from "react-icons/fa";

const ProximasConsultas = () => {
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
            <img src={diario} alt="" />
            <h3 style={{ color: "#518367"}} >Proximas Consultas</h3>
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',}}>
            <div 
            className="item" 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                backgroundColor: '#ffffff',
                padding: '10px 20px',
                borderRadius: '8px ',

                
                }}>
                <FaAppleAlt color='#FD9D7B' />
                <span>Spencer Shay</span>
                <span>15/10/2023</span>
                <span>14:00</span>
            </div>
            <div 
            className="item" 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                backgroundColor: '#ffffff',
                padding: '10px 20px',
                borderRadius: '8px ',

                
                }}>
                <FaAppleAlt color='#FD9D7B' />
                <span>Spencer Shay</span>
                <span>15/10/2023</span>
                <span>14:00</span>
            </div>
            <div 
            className="item" 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                backgroundColor: '#ffffff',
                padding: '10px 20px',
                borderRadius: '8px ',

                
                }}>
                <FaAppleAlt color='#FD9D7B' />
                <span>Spencer Shay</span>
                <span>15/10/2023</span>
                <span>14:00</span>
            </div>
        </div>
    </div>
  )
}

export default ProximasConsultas