import React, { useState } from 'react';
import CepForm from './components/cepForm';
import CepInfo from './components/cepInfo';
import LoadingSpinner from './components/loadingSpinner';
import ErrorMessage from './components/errorMessage';
import './App.css';

const App = () => {
  const [cepData, setCepData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (cep) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setError('CEP não encontrado.');
      } else {
        setCepData(data);
      }
    } catch (err) {
      setError('Erro ao consultar o CEP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Consultar CEP</h1>
      <CepForm onSearch={handleSearch} />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {cepData && !loading && !error && <CepInfo data={cepData} />}
    </div>
  );
};

export default App;