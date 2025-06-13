// src/PacienteList.js
import React, { useState, useEffect } from 'react';

const PacienteList = () => {
  const [pacientes, setPacientes] = useState([]); // Estado para armazenar a lista de pacientes
  const [loading, setLoading] = useState(true);   // Estado para indicar se os dados estão sendo carregados
  const [error, setError] = useState(null);     // Estado para armazenar possíveis erros na requisição
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        // Altere para a sua rota de pacientes se for diferente
        const response = await fetch('http://127.0.0.1:8000/api/clients/'); 
        
        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Pacientes recebidos:", data); // Log para verificar os dados recebidos
        setPacientes(data); // Atualiza o estado com os dados recebidos
      } catch (err) {
        console.error("Erro ao buscar pacientes:", err);
        setError(err); // Armazena o erro
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchPacientes(); // Chama a função para buscar os dados quando o componente é montado
  }, []); // O array vazio assegura que a função roda apenas uma vez, similar a componentDidMount

  // Filtra os pacientes com base no termo de busca
  const filteredPacientes = pacientes.filter(paciente => {
    // CORREÇÃO AQUI: Use paciente.name OU paciente.nome, com fallback para string vazia
    const patientName = paciente.fullName || ''; 
    return patientName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        Carregando pacientes...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#D9534F' }}>
        Erro ao carregar pacientes: {error.message}.
        <br/> Verifique se o backend está rodando e as configurações de CORS.
      </div>
    );
  }

  return (
    <div style={{ 
        backgroundColor: '#EFFAF7', 
        display: "flex",
        flexDirection: "column",
        padding: '20px',
        gap: '10px',
        borderRadius: '10px',
        border: '1px solid #eaeaea' }}>
      
      <input 
        style={{
          width: '300px',
          height: '20px',
          padding: '10px',
          border: '1px solid #eaeaea',
          borderRadius: '5px',
        }} 
        type="text" 
        placeholder='Digite o nome do Paciente' 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
      />

      {filteredPacientes.length > 0 ? (
        filteredPacientes.map(paciente => (
          <div 
            key={paciente.id || paciente.pk} // Use 'id' ou 'pk' dependendo do seu serializador Django
            style={{ 
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
                {/* Aqui você pode adicionar uma imagem de perfil do paciente se disponível */}
            </div>
            <div>
                {/* Adapte 'paciente.name' ou 'paciente.nome' e outros campos conforme seu modelo Django */}
                <h2 style={{ fontSize: "16px", color: "#FD9D7B" }}>
                    {paciente.fullName || paciente.nome} 
                </h2>
                <p style={{ fontSize: "14px", color: "#666" }}>
                    Email: {paciente.email || 'N/A'} <br />
                </p>
            </div>
          </div>
        ))
      ) : (
        <div style={{ 
          backgroundColor: '#ffffff',
          padding: '10px',
          borderRadius: '10px',
          border: '1px solid #eaeaea',
          textAlign: 'center',
          color: '#666'
        }}>
          Nenhum paciente encontrado.
        </div>
      )}
    </div>
  );
}

export default PacienteList;
