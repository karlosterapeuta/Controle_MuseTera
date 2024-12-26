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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-museprimary-600 to-museprimary-800 bg-clip-text text-transparent">
                MuseTera
              </h1>
              <p className="text-gray-600 mt-2">Controle de Pagamentos</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-museprimary-600 to-museprimary-700 hover:from-museprimary-700 hover:to-museprimary-800 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Usuário
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-museprimary-800">Cadastrar Novo Usuário</DialogTitle>
                </DialogHeader>
                <UserForm />
              </DialogContent>
            </Dialog>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-6 backdrop-blur-lg bg-opacity-90">
            <UsersList users={mockUsers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;