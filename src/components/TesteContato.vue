<template>
  <div>
    <button @click="testarSalvarContato">Testar Salvar Contato</button>
  </div>
</template>

<script setup lang="ts">
import { salvarContato } from '@/lib/supabase'

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
</script>
