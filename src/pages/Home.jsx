// src/pages/Home.jsx
import Menu from '../components/Menu'; // Import the Menu component
import PacienteList from '../components/PacienteList';
function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: "row", gap: "15px"}}>
      <Menu />
      <div>
        <PacienteList />
      </div>
      
    </div>
  );
}

export default Home;