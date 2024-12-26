import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export const UserForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Novo usuário:", formData);
    toast({
      title: "Usuário cadastrado com sucesso!",
      description: `${formData.name} foi adicionado ao sistema.`,
      className: "bg-gradient-to-r from-green-500 to-green-600 text-white",
    });
    setFormData({ name: "", email: "", phone: "" });
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
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-museprimary-600 to-museprimary-700 hover:from-museprimary-700 hover:to-museprimary-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Cadastrar Usuário
      </Button>
    </form>
  );
};