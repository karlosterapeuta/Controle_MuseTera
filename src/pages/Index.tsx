import { Button } from "@/components/ui/button";
import { UsersList } from "@/components/UsersList";
import { UserForm } from "@/components/UserForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

// Dados mockados para exemplo
const mockUsers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    phone: "(11) 99999-9999",
    status: "PAID" as const,
    payments: [],
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "(11) 88888-8888",
    status: "PENDING" as const,
    payments: [],
  },
];

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-museprimary-800">MuseTera - Controle de Pagamentos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-museprimary-600 hover:bg-museprimary-700">
              <Plus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
            </DialogHeader>
            <UserForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <UsersList users={mockUsers} />
      </div>
    </div>
  );
};

export default Index;