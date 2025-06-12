import { useState, useEffect } from 'react';
import './Patients.css';
import Menu from '../components/Menu'; // Certifique-se de que o caminho está correto
function Patients() {
    // Estado para armazenar a lista de pacientes
    const [patients, setPatients] = useState(() => {
        // Carrega pacientes do localStorage ao iniciar
        const savedPatients = localStorage.getItem('patients');
        return savedPatients ? JSON.parse(savedPatients) : [];
    });

    // Estado para os dados do novo paciente no formulário
    const [newPatient, setNewPatient] = useState({
        fullName: '',
        cpf: '',
        dob: '', // Date of Birth
        gender: '',
        age: '',
        email: '',
        observations: '',
        objectives: ''
    });

    // Efeito para salvar pacientes no localStorage sempre que a lista mudar
    useEffect(() => {
        localStorage.setItem('patients', JSON.stringify(patients));
    }, [patients]);

    // Lida com a mudança nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPatient(prevPatient => ({
            ...prevPatient,
            [name]: value
        }));

        // Calcula a idade automaticamente se a data de nascimento mudar
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
                age: age.toString() // Armazena como string
            }));
        }
    };

    // Lida com o envio do formulário para adicionar um novo paciente
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação básica (você pode adicionar mais)
        if (!newPatient.fullName || !newPatient.cpf || !newPatient.dob) {
            alert('Nome Completo, CPF e Data de Nascimento são obrigatórios!');
            return;
        }

        // Adiciona o novo paciente à lista
        setPatients(prevPatients => [...prevPatients, { ...newPatient, id: Date.now() }]);

        // Limpa o formulário
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
    };

    return (
        <div className="patients-container">
            <Menu />
            <div className="patients-form-box">
                <h2>Cadastrar Novo Paciente</h2>
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
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
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
                            readOnly // A idade será calculada automaticamente
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
                    <button type="submit">Cadastrar Paciente</button>
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
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Patients;