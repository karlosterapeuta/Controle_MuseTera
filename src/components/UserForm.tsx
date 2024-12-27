import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useUsers } from "@/hooks/useUsers";
import { PaymentStatus } from "@/types/user";

export const UserForm = () => {
  const { toast } = useToast();
  const addUser = useUsers((state) => state.addUser);
  const updateUserStatus = useUsers((state) => state.updateUserStatus);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    month: "",
    status: "PENDING" as PaymentStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = addUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });
    
    toast({
      title: "Usuário cadastrado com sucesso!",
      description: `${formData.name} foi adicionado ao sistema.`,
      className: "bg-gradient-to-r from-green-500 to-green-600 text-white",
    });
    setFormData({ name: "", email: "", phone: "", month: "", status: "PENDING" });
  };

  const handleStatusChange = () => {
    const newStatus = formData.status === "PAID" ? "PENDING" : "PAID";
    setFormData({ ...formData, status: newStatus });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-700">Nome</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="border-gray-200 focus:border-museprimary-500 focus:ring-museprimary-500 transition-colors"
          placeholder="Digite o nome completo"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="border-gray-200 focus:border-museprimary-500 focus:ring-museprimary-500 transition-colors"
          placeholder="Digite o e-mail"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gray-700">Telefone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="border-gray-200 focus:border-museprimary-500 focus:ring-museprimary-500 transition-colors"
          placeholder="Digite o telefone"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="month" className="text-gray-700">Mês</Label>
        <select
          id="month"
          value={formData.month}
          onChange={(e) => setFormData({ ...formData, month: e.target.value })}
          required
          className="w-full rounded-md border border-gray-200 px-3 py-2 focus:border-museprimary-500 focus:ring-museprimary-500 transition-colors"
        >
          <option value="">Selecione o mês</option>
          <option value="Janeiro">Janeiro</option>
          <option value="Fevereiro">Fevereiro</option>
          <option value="Março">Março</option>
          <option value="Abril">Abril</option>
          <option value="Maio">Maio</option>
          <option value="Junho">Junho</option>
          <option value="Julho">Julho</option>
          <option value="Agosto">Agosto</option>
          <option value="Setembro">Setembro</option>
          <option value="Outubro">Outubro</option>
          <option value="Novembro">Novembro</option>
          <option value="Dezembro">Dezembro</option>
        </select>
      </div>
      <div className="flex gap-4">
        <Button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-museprimary-600 to-museprimary-700 hover:from-museprimary-700 hover:to-museprimary-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Cadastrar Usuário
        </Button>
        <Button 
          type="button"
          onClick={handleStatusChange}
          className={`flex-1 shadow-lg hover:shadow-xl transition-all duration-300 ${
            formData.status === "PAID" 
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
          }`}
        >
          {formData.status === "PAID" ? "Pago" : "Pendente"}
        </Button>
      </div>
    </form>
  );
}