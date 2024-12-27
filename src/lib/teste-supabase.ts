import { cadastrarUsuario } from './supabase'

async function testarCadastro() {
    try {
        const resultado = await cadastrarUsuario('teste@exemplo.com', 'senha123', 'Usuário Teste')
        console.log('Usuário cadastrado com sucesso:', resultado)
    } catch (erro) {
        console.error('Erro no cadastro:', erro)
    }
}

testarCadastro() 