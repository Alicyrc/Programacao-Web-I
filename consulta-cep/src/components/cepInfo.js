import React from 'react';

const CepInfo = ({ data }) => {
  return (
    <div>
      <p><strong>Logradouro:</strong> {data.logradouro}</p>
      <p><strong>Bairro:</strong> {data.bairro}</p>
      <p><strong>Cidade:</strong> {data.localidade}</p>
      <p><strong>Estado:</strong> {data.uf}</p>
    </div>
  );
};

export default CepInfo;