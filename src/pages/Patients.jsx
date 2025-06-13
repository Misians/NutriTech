import { useState, useEffect, useCallback } from 'react';
import './Patients.css';
import Menu from '../components/Menu';

// Definindo a URL base da API
const API_BASE_URL = 'http://127.0.0.1:8000/api';

function Patients() {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({
        fullName: '',
        cpf: '',
        dob: '',
        gender: '',
        age: '',
        email: '',
        observations: '',
        objectives: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [editingPatient, setEditingPatient] = useState(null); // State to hold patient being edited

    // --- LÓGICA PARA BUSCAR PACIENTES DA API ---
    const fetchPatients = useCallback(async () => {
        setLoading(true);
        setError(null);
        setMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/clients/`);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro HTTP! Status: ${response.status} - ${errorText}`);
            }
            
            const data = await response.json();
            console.log("Pacientes recebidos da API:", data);
            setPatients(data);
        } catch (err) {
            console.error("Erro ao buscar pacientes:", err);
            setError(err.message);
            setMessage('Erro ao carregar clientes. Verifique o console para detalhes.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    // Lida com a mudança nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPatient(prevPatient => ({
            ...prevPatient,
            [name]: value
        }));

        if (name === 'dob' && value) {
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setNewPatient(prevPatient => ({
                ...prevPatient,
                age: age.toString()
            }));
        }
    };

    // --- LÓGICA PARA ADICIONAR/ATUALIZAR PACIENTE VIA API ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!newPatient.fullName || !newPatient.cpf || !newPatient.dob) {
            setMessage('Nome Completo, CPF e Data de Nascimento são obrigatórios!');
            return;
        }

        const method = editingPatient ? 'PUT' : 'POST'; // Use PUT for update, POST for create
        const url = editingPatient ? `${API_BASE_URL}/clients/${editingPatient.id}/` : `${API_BASE_URL}/clients/`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPatient),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro ao cadastrar/atualizar cliente:", errorData);
                
                // --- TRATAMENTO DE ERROS ESPECÍFICOS COM ALERT ---
                if (errorData.cpf && errorData.cpf.includes('client with this cpf already exists.')) {
                    alert('Erro: Já existe um cliente cadastrado com este CPF.');
                    return; // Retorna para não limpar o formulário e permitir correção
                }
                if (errorData.email && errorData.email.includes('client with this email already exists.')) {
                    alert('Erro: Já existe um cliente cadastrado com este Email.');
                    return; // Retorna para não limpar o formulário e permitir correção
                }
                // --- FIM DO TRATAMENTO ESPECÍFICO ---

                setMessage(`Erro ao ${editingPatient ? 'atualizar' : 'cadastrar'} cliente: ${JSON.stringify(errorData)}`);
                throw new Error(`API Error: ${JSON.stringify(errorData)}`);
            }

            const savedPatient = await response.json();
            console.log(`Cliente ${editingPatient ? 'atualizado' : 'cadastrado'} com sucesso:`, savedPatient);
            setMessage(`Cliente ${editingPatient ? 'atualizado' : 'cadastrado'} com sucesso!`);
            setError(null);

            if (editingPatient) {
                setPatients(prevPatients => prevPatients.map(p => 
                    p.id === savedPatient.id ? savedPatient : p
                ));
                setEditingPatient(null);
            } else {
                setPatients(prevPatients => {
                    const updatedList = [...prevPatients, savedPatient];
                    return updatedList;
                });
            }

            setNewPatient({
                fullName: '',
                cpf: '',
                dob: '',
                gender: '',
                age: '',
                email: '',
                observations: '',
                objectives: ''
            });

        } catch (err) {
            console.error("Erro no processo de cadastro/atualização:", err);
            if (!message) {
                setMessage(`Erro inesperado ao ${editingPatient ? 'atualizar' : 'cadastrar'} cliente: ${err.message}`);
            }
            setError(err.message);
        }
    };

    // --- LÓGICA PARA DELETAR PACIENTE VIA API ---
    const handleDelete = async (patientId) => {
        if (!window.confirm('Tem certeza que deseja excluir este cliente?')) {
            return;
        }

        setMessage('');
        try {
            const response = await fetch(`${API_BASE_URL}/clients/${patientId}/`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro HTTP ao excluir! Status: ${response.status} - ${errorText}`);
            }

            setPatients(prevPatients => prevPatients.filter(p => p.id !== patientId));
            setMessage('Cliente excluído com sucesso!');
            setError(null);
        } catch (err) {
            console.error("Erro ao excluir cliente:", err);
            setMessage(`Erro ao excluir cliente: ${err.message}`);
            setError(err.message);
        }
    };

    // --- LÓGICA PARA INICIAR EDIÇÃO ---
    const handleEditClick = (patient) => {
        setEditingPatient(patient);
        setNewPatient({
            fullName: patient.fullName,
            cpf: patient.cpf,
            dob: patient.dob,
            gender: patient.gender,
            age: patient.age.toString(),
            email: patient.email || '',
            observations: patient.observations || '',
            objectives: patient.objectives || ''
        });
        setMessage('');
    };

    // Lógica para cancelar edição
    const handleCancelEdit = () => {
        setEditingPatient(null);
        setNewPatient({
            fullName: '',
            cpf: '',
            dob: '',
            gender: '',
            age: '',
            email: '',
            observations: '',
            objectives: ''
        });
        setMessage('');
    };

    if (loading) {
        return (
            <div className="patients-container" style={{ textAlign: 'center', marginTop: '50px' }}>
                <Menu />
                <p>Carregando clientes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="patients-container" style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
                <Menu />
                <p>Erro: {error}</p>
                <p>Verifique se o backend está rodando e as configurações de CORS.</p>
            </div>
        );
    }

    return (
        <div className="patients-container">
            <Menu />
            <div className="patients-form-box">
                <h2>{editingPatient ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}</h2>
                {message && <div className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Nome Completo:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={newPatient.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={newPatient.cpf}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Data de Nascimento:</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={newPatient.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gênero:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={newPatient.gender}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="O">Outro</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Idade:</label>
                        <input
                            type="text"
                            id="age"
                            name="age"
                            value={newPatient.age}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={newPatient.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="observations">Observações:</label>
                        <textarea
                            id="observations"
                            name="observations"
                            value={newPatient.observations}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="objectives">Objetivos:</label>
                        <textarea
                            id="objectives"
                            name="objectives"
                            value={newPatient.objectives}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button type="submit">{editingPatient ? 'Salvar Edição' : 'Cadastrar Cliente'}</button>
                    {editingPatient && (
                        <button type="button" onClick={handleCancelEdit} className="cancel-button">
                            Cancelar Edição
                        </button>
                    )}
                </form>
            </div>

            <div className="patients-list-box">
                <h2>Clientes Cadastrados</h2>
                {patients.length === 0 ? (
                    <p>Nenhum cliente cadastrado ainda.</p>
                ) : (
                    <ul className="patients-list">
                        {patients.map(patient => (
                            <li key={patient.id} className="patient-card">
                                <h3>{patient.fullName}</h3>
                                <p><strong>CPF:</strong> {patient.cpf}</p>
                                <p><strong>Nascimento:</strong> {patient.dob}</p>
                                <p><strong>Idade:</strong> {patient.age} anos</p>
                                <p><strong>Gênero:</strong> {patient.gender}</p>
                                <p><strong>Email:</strong> {patient.email}</p>
                                {patient.observations && <p><strong>Observações:</strong> {patient.observations}</p>}
                                {patient.objectives && <p><strong>Objetivos:</strong> {patient.objectives}</p>}
                                <div className="patient-actions">
                                    <button onClick={() => handleEditClick(patient)} className="edit-button">Editar</button>
                                    <button onClick={() => handleDelete(patient.id)} className="delete-button">Excluir</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Patients;
