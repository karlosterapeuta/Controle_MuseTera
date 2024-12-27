import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';

export const TestFirebase = () => {
  const { users, loading, error, addUser } = useUsers();
  const [message, setMessage] = useState('');

  const handleTest = async () => {
    try {
      const result = await addUser({
        name: 'Teste',
        email: 'teste@teste.com',
        phone: '123456789',
        status: 'PENDING',
        payments: [],
        registeredAt: new Date().toISOString()
      });

      if (result) {
        setMessage('Usuário adicionado com sucesso!');
      }
    } catch (err) {
      setMessage('Erro ao adicionar usuário');
      console.error(err);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <button onClick={handleTest}>Testar Firebase</button>
      <p>{message}</p>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}; 