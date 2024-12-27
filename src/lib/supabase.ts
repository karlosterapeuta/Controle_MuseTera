import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://omjobkaejgpiuokjcdwr.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Função para cadastrar um novo usuário
export async function cadastrarUsuario(email: string, senha: string, nome: string) {
    try {
        // Primeiro, cria a autenticação
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password: senha,
        })

        if (authError) {
            console.error('Erro ao cadastrar autenticação:', authError.message)
            throw authError
        }

        // Depois, insere os dados do usuário na tabela 'usuarios'
        const { data: userData, error: userError } = await supabase
            .from('usuarios')
            .insert([
                {
                    id: authData.user?.id,
                    email: email,
                    nome: nome,
                    created_at: new Date().toISOString(),
                }
            ])
            .select()

        if (userError) {
            console.error('Erro ao inserir dados do usuário:', userError.message)
            throw userError
        }

        return { auth: authData, user: userData }
    } catch (erro) {
        console.error('Erro ao cadastrar usuário:', erro)
        throw erro
    }
}

// Função para fazer login
export async function fazerLogin(email: string, senha: string) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: senha,
        })

        if (error) {
            console.error('Erro ao fazer login:', error.message)
            throw error
        }

        return data
    } catch (erro) {
        console.error('Erro ao fazer login:', erro)
        throw erro
    }
}

// Função para fazer logout
export async function fazerLogout() {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Erro ao fazer logout:', error.message)
            throw error
        }
    } catch (erro) {
        console.error('Erro ao fazer logout:', erro)
        throw erro
    }
}

// Função para salvar um novo contato
export async function salvarContato(
    nome: string,
    contato: string,
    status: string,
    email: string,
    data_cadastro?: string
) {
    try {
        const { data, error } = await supabase
            .from('contatos')
            .insert([
                {
                    nome,
                    contato,
                    status,
                    email,
                    data_cadastro: data_cadastro || new Date().toISOString()
                }
            ])
            .select()

        if (error) {
            console.error('Erro ao salvar contato:', error.message)
            throw error
        }

        return data
    } catch (error) {
        console.error('Erro ao salvar contato:', error)
        throw error
    }
}