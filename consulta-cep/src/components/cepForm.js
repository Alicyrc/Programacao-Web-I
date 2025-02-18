import React, { useState } from 'react';

const CepForm = ({ onSearch }) => {
  const [cep, setCep] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(cep);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Digite o CEP"
      />
      <button type="submit">Consultar</button>
    </form>
  );
};

export default CepForm;