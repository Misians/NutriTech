import React from 'react';
import Menu from '../components/Menu';
import PacienteList from '../components/PacienteList';
import ProgressCharts from '../components/ProgressCharts';
import ProximasConsultas from '../components/ProximasConsultas';
import AgendaSemanal from '../components/AgendaSemanal';
import RegistroAlimentar from '../components/RegistroAlimentar';

// --- Fim dos Mock Components ---

function Home() {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          .home-container {
            display: flex;
            flex-direction: column; /* Padrão: layout em coluna para telas pequenas */
            min-height: 100vh; /* Ocupa no mínimo 100% da altura da viewport */
            width: 100%; /* Ocupa 100% da largura disponível */
            gap: 1rem; /* 16px de espaçamento entre os itens */
            box-sizing: border-box; /* Inclui padding e border na largura/altura total */
            font-family: 'Inter', sans-serif;
          }

          /* Media query para telas médias (>= 768px) */
          @media (min-width: 768px) {
            .home-container {
              flex-direction: row; /* Muda para layout em linha (row) */
              gap: 1.5rem; /* 24px de espaçamento entre os itens */
            }
          }

          /* Contêiner do Menu */
          .menu-container {
            width: 100%; /* Largura total em telas pequenas */
            flex-shrink: 0; /* Previne que o menu encolha */
          }

          /* Media query para telas médias (>= 768px) */
          @media (min-width: 768px) {
            .menu-container {
              width: 25%; /* Ocupa 1/4 da largura */
            }
          }

          /* Media query para telas grandes (>= 1024px) */
          @media (min-width: 1024px) {
            .menu-container {
              width: 20%; /* Ocupa 1/5 da largura */
            }
          }

          /* Área principal do conteúdo (PacienteList/ProgressCharts e os outros 3 componentes) */
          .main-content-area {
            display: flex;
            flex-direction: column; /* Padrão: coluna em telas pequenas */
            flex-grow: 1; /* Permite que ocupe o espaço restante */
            gap: 1rem; /* 16px de espaçamento */
          }

          /* Media query para telas médias (>= 768px) */
          @media (min-width: 768px) {
            .main-content-area {
              flex-direction: row; /* Muda para layout em linha (row) */
            }
          }

          /* Colunas de conteúdo (à esquerda e à direita) */
          .content-column {
            display: flex;
            flex-direction: column;
            gap: 1rem; /* 16px de espaçamento */
            flex-grow: 1; /* Permite que cada coluna ocupe espaço igual */
            flex-shrink: 1; /* Permite que cada coluna encolha */
            flex-basis: 0%; /* Base para o cálculo de crescimento/encolhimento */
          }
        `}
      </style>

      <div className="home-container">
        <div className="menu-container">
          <Menu />
        </div>

        <div className="main-content-area">
          <div className="content-column">
            <PacienteList />
            <ProgressCharts />
          </div>

          <div className="content-column">
            <ProximasConsultas />
            <AgendaSemanal />
            <RegistroAlimentar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;