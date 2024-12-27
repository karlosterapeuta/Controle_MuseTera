import { User, PaymentStatus } from "@/types/user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, Eye, MoreVertical } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UsersListProps {
  users: User[];
}

export const UsersList = ({ users }: UsersListProps) => {
  const navigate = useNavigate();
  const updateUserStatus = useUsers((state) => state.updateUserStatus);

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "PAID":
        return "bg-gradient-to-r from-green-400 to-green-500 text-white";
      case "PENDING":
        return "bg-gradient-to-r from-amber-400 to-amber-500 text-white";
      default:
        return "bg-gray-500";
    }
  };

  const handleStatusChange = (userId: string, newStatus: PaymentStatus) => {
    updateUserStatus(userId, newStatus);
  };

  const toggleStatus = (userId: string, currentStatus: PaymentStatus) => {
    const newStatus = currentStatus === "PAID" ? "PENDING" : "PAID";
    updateUserStatus(userId, newStatus);
  };

  return (
    <div className="rounded-lg border border-gray-100">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700">Nome</TableHead>
            <TableHead className="font-semibold text-gray-700">Contato</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gray-600 hover:text-museprimary-600 transition-colors">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 hover:text-museprimary-600 transition-colors">
                    <Phone className="h-4 w-4" />
                    {user.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  className={`${getStatusColor(user.status)} shadow-sm cursor-pointer hover:opacity-90`}
                  onClick={() => toggleStatus(user.id, user.status)}
                >
                  {user.status === "PAID" ? "Pago" : "Pendente"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-museprimary-50 hover:text-museprimary-600 transition-colors"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          Ver detalhes
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Detalhes do Usuário</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p><strong>Nome:</strong> {user.name}</p>
                          <p><strong>E-mail:</strong> {user.email}</p>
                          <p><strong>Telefone:</strong> {user.phone}</p>
                          <p><strong>Status:</strong> {user.status === "PAID" ? "Pago" : "Pendente"}</p>
                          <p><strong>Cadastrado em:</strong> {new Date(user.registeredAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</p>
                          <div>
                            <strong>Pagamentos:</strong>
                            {user.payments.length > 0 ? (
                              <ul>
                                {user.payments.map((payment) => (
                                  <li key={payment.id}>
                                    {payment.month}/{payment.year} - {payment.status}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>Nenhum pagamento registrado</p>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenuItem onClick={() => handleStatusChange(user.id, "PAID")}>
                      Marcar como Pago
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(user.id, "PENDING")}>
                      Marcar como Pendente
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};