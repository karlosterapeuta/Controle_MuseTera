import { salvarContato } from './supabase.js'

async function testarSalvarContato() {
    try {
        const resultado = await salvarContato(
            'João Teste',
            '11999999999',
            'ativo'
        )
        console.log('Contato salvo com sucesso:', resultado)
    } catch (error) {
        console.error('Erro ao salvar contato:', error)
    }
}

// Executar o teste
testarSalvarContato()
