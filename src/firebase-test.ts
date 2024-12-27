import { db } from './config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function testFirebaseConnection() {
  try {
    // Tenta criar uma coleção de teste
    const testCollection = collection(db, 'test');
    
    // Tenta adicionar um documento
    const docRef = await addDoc(testCollection, {
      test: true,
      timestamp: new Date().toISOString()
    });
    
    console.log('Teste de conexão bem sucedido!', docRef.id);
    
    // Tenta ler a coleção
    const snapshot = await getDocs(testCollection);
    console.log('Documentos na coleção:', snapshot.size);
    
    return true;
  } catch (error) {
    console.error('Erro na conexão com Firebase:', error);
    return false;
  }
} 