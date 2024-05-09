import React, { useState } from 'react';
import './App.css';

function App() {
  const [clientesAtivosInput, setClientesAtivosInput] = useState('');
  const [clientesProcurandoInput, setClientesProcurandoInput] = useState('');
  const [clientesAtivos, setClientesAtivos] = useState([]);
  const [clientesProcurando, setClientesProcurando] = useState([]);
  const [resultado, setResultado] = useState([]);

  const handleClientesAtivosInputChange = (event) => {
    setClientesAtivosInput(event.target.value);
  };

  const handleClientesProcurandoInputChange = (event) => {
    setClientesProcurandoInput(event.target.value);
  };

  const adicionarClienteAtivo = () => {
    const cliente = clientesAtivosInput.trim();
    if (cliente !== "") {
      setClientesAtivos([...clientesAtivos, cliente]);
      setClientesAtivosInput('');
    }
  };

  const adicionarClienteProcurando = () => {
    const cliente = clientesProcurandoInput.trim();
    if (cliente !== "") {
      setClientesProcurando([...clientesProcurando, cliente]);
      setClientesProcurandoInput('');
    }
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      if (type === 'ativos') {
        setClientesAtivos(lines.map(line => line.trim()));
      } else {
        setClientesProcurando(lines.map(line => line.trim()));
      }
    };
    reader.readAsText(file);
  };

  const filtrarEmails = () => {
    const filteredResult = clientesAtivos.filter(cliente => {
      const clienteParts = cliente.split(',');
      if (clienteParts.length < 2) {
        console.error("Cliente ativo mal formatado:", cliente);
        return false;
      }
      const [nomeCompletoAtivo, emailAtivo] = clienteParts.map(part => part.trim());
      return clientesProcurando.some(clienteProcurando => {
        const clienteProcurandoParts = clienteProcurando.split(' @ ');
        let nomeCompletoProcurando, emailProcurando;
        if (clienteProcurandoParts.length > 1) {
          [nomeCompletoProcurando, emailProcurando] = clienteProcurandoParts.map(part => part.trim());
        } else {
          nomeCompletoProcurando = clienteProcurando.trim();
        }
        console.log("Comparando:", nomeCompletoAtivo, emailAtivo, nomeCompletoProcurando, emailProcurando);
        return nomeCompletoProcurando === nomeCompletoAtivo && (!emailProcurando || emailProcurando === emailAtivo);
      });
    });
    console.log("Resultado filtrado:", filteredResult);
    setResultado(filteredResult);
  };
  
  
  
  
  
  
  
  

  return (
    <div className="container">
      <h1>Procurar Emails de Clientes</h1>
      <div className="input-group">
        <label htmlFor="clientesAtivosInput">Clientes da Base:</label>
        <textarea
          id="clientesAtivosInput"
          value={clientesAtivosInput}
          onChange={handleClientesAtivosInputChange}
          rows={5}
          cols={50}
        />
        <button onClick={adicionarClienteAtivo}>Adicionar Clientes da Base</button>
      </div>
      <div className="input-group">
        <label htmlFor="clientesProcurandoInput">Clientes Ativos:</label>
        <textarea
          id="clientesProcurandoInput"
          value={clientesProcurandoInput}
          onChange={handleClientesProcurandoInputChange}
          rows={5}
          cols={50}
        />
        <button onClick={adicionarClienteProcurando}>Adicionar Clientes Ativos</button>
      </div>
      <div className="input-group">
        <label htmlFor="clientesAtivosFileInput">Enviar arquivo CSV para Clientes Ativos:</label>
        <input type="file" id="clientesAtivosFileInput" onChange={(e) => handleFileChange(e, 'ativos')} accept=".csv" />
      </div>
      <div className="input-group">
        <label htmlFor="clientesProcurandoFileInput">Enviar arquivo CSV para Clientes Procurando:</label>
        <input type="file" id="clientesProcurandoFileInput" onChange={(e) => handleFileChange(e, 'procurando')} accept=".csv" />
      </div>
      <button className="btn" onClick={filtrarEmails}>Procurar</button>
      <h2>Resultado:</h2>
      <ul>
        {resultado.map((cliente, index) => (
          <li key={index}>{cliente}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
