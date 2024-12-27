import { salvarContato } from '../lib/supabase'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { User, Mail, Phone, Check, Calendar } from 'lucide-react'

export function TesteContato() {
    const [nome, setNome] = useState('')
    const [contato, setContato] = useState('')
    const [status, setStatus] = useState('ativo')
    const [email, setEmail] = useState('')
    const [dataCadastro, setDataCadastro] = useState(new Date().toISOString().split('T')[0])
    const [loading, setLoading] = useState(false)

    const handleSalvar = async () => {
        if (!nome || !contato || !email) {
            alert('Por favor, preencha todos os campos')
            return
        }

        try {
            setLoading(true)
            await salvarContato(
                nome,
                contato,
                status,
                email,
                dataCadastro
            )
            alert('Contato salvo com sucesso!')
            setNome('')
            setContato('')
            setEmail('')
            setStatus('ativo')
        } catch (error) {
            console.error('Erro ao salvar contato:', error)
            alert('Erro ao salvar contato. Verifique o console para mais detalhes.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-200">
            <ThemeToggle />
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                        MuseTera
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">Controle de Pagamentos</p>
                </div>

                <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 space-y-6 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="pl-10 w-full p-3 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 transition-colors"
                            placeholder="Digite o nome"
                            required
                        />
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 w-full p-3 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 transition-colors"
                            placeholder="Digite o email"
                            required
                        />
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={contato}
                            onChange={(e) => setContato(e.target.value)}
                            className="pl-10 w-full p-3 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 transition-colors"
                            placeholder="Digite o telefone"
                            required
                        />
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Check className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="pl-10 w-full p-3 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 transition-colors"
                        >
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                            <option value="pendente">Pendente</option>
                        </select>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="date"
                            value={dataCadastro}
                            onChange={(e) => setDataCadastro(e.target.value)}
                            className="pl-10 w-full p-3 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <button 
                        onClick={handleSalvar}
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Salvando...
                            </span>
                        ) : (
                            'Salvar Contato'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
