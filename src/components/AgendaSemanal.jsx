import React, { useState } from 'react';
import lembrete from '../assets/lembrete.png'; // Importando o ícone de lembrete
const AgendaSemanal = () => {
  // Função para calcular os dias restantes para uma data de vencimento.
  // Retorna "Hoje", "Faltam X dias" ou "Há X dias" dependendo da data.
  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normaliza a data de hoje para o início do dia.
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0); // Normaliza a data de vencimento para o início do dia.

    // Calcula a diferença em milissegundos e converte para dias.
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Hoje";
    } else if (diffDays > 0) {
      return `Faltam ${diffDays} dias`;
    } else {
      return `Há ${Math.abs(diffDays)} dias`;
    }
  };

  // Estado para armazenar a lista de afazeres, incluindo a data de vencimento.
  const [todos, setTodos] = useState([
    { id: 1, text: 'Consulta de Spencer Shay', completed: false, dueDate: '2025-06-15' },
    { id: 2, text: 'Agendar consulta de retorno com Dr. Almeida', completed: true, dueDate: '2025-06-08' },
    { id: 3, text: 'Preparar apresentação para a reunião de equipe', completed: false, dueDate: '2025-06-20' },
    { id: 4, text: 'Responder e-mails pendentes', completed: false, dueDate: '2025-06-10' },
    { id: 5, text: 'Revisar prontuários dos pacientes', completed: false, dueDate: '2025-06-12' },
  ]);

  // Função para alternar o estado de conclusão de uma tarefa.
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          .agenda-semanal-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            background-color: #EFFAF7;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            font-family: 'Inter', sans-serif;
            box-sizing: border-box;
          }

          .header-section {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .lembrete-icon {
            width: 24px;
            height: 24px;
          }

          .section-title {
            color: #518367;
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0;
          }

          .todo-list-section {
            padding-left: 8px;
          }

          .todo-list-title {
            color: #518367;
            font-size: 1.125rem;
            font-weight: 500;
            margin-bottom: 16px;
          }

          .todo-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .todo-item {
            margin-bottom: 12px;
            display: flex;
            align-items: center;
          }

          .todo-item-label {
            display: flex;
            align-items: flex-start;
            cursor: pointer;
            width: 100%;
          }

          .custom-checkbox {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border: 2px solid #518367;
            border-radius: 6px;
            margin-right: 12px;
            display: grid;
            place-content: center;
            transition: all 0.2s ease-in-out;
            flex-shrink: 0;
            cursor: pointer;
          }

          .custom-checkbox:checked {
            background-color: #518367;
            border-color: transparent;
          }

          .custom-checkbox:focus {
            outline: none;
            box-shadow: 0 0 0 2px #518367, 0 0 0 4px rgba(255, 255, 255, 0.5);
          }

          .checkmark-svg {
            width: 12px;
            height: 12px;
            color: white;
            position: absolute;
            margin-left: 4px;
            margin-top: 4px;
            pointer-events: none;
          }

          .todo-content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }

          .todo-text {
            color: #333;
            font-size: 1rem;
            word-break: break-word;
          }

          .todo-text.completed-text {
            text-decoration: line-through;
            color: #6b7280;
          }

          .todo-date-info {
            font-size: 0.875rem;
            color: #4b5563;
            margin-top: 2px;
          }

          .status-completed {
            color: #22c55e;
          }

          .status-overdue {
            color: #ef4444;
          }

          .status-upcoming {
            color: #3b82f6;
          }
        `}
      </style>
      <div className="agenda-semanal-container">
        {/* Seção do cabeçalho com ícone e título */}
        <div className="header-section">
          {/* Usando uma imagem placeholder para 'lembrete.png' */}
          <img src={lembrete}/>
          <h3 className="section-title">Próximas Consultas</h3>
        </div>

        {/* Seção da lista de afazeres */}
        <div className="todo-list-section">
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className="todo-item">
                <label className="todo-item-label">
                  {/* Input de checkbox personalizado */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="custom-checkbox"
                  />
                  {/* Checkmark SVG para quando o checkbox estiver marcado */}
                  {todo.completed && (
                    <svg className="checkmark-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}

                  {/* Texto da tarefa e informações de data */}
                  <div className="todo-content">
                    <span className={`todo-text ${todo.completed ? 'completed-text' : ''}`}>
                      {todo.text}
                    </span>
                    {/* Data e dias restantes/passados */}
                    <span className="todo-date-info">
                      {new Date(todo.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      {' - '}
                      <span className={
                        todo.completed
                          ? 'status-completed'
                          : (calculateDaysRemaining(todo.dueDate).includes('Há') ? 'status-overdue' : 'status-upcoming')
                      }>
                        {todo.completed ? 'Concluído' : calculateDaysRemaining(todo.dueDate)}
                      </span>
                    </span>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AgendaSemanal;