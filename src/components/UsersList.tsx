import { User, PaymentStatus } from "@/types/user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, Eye } from "lucide-react";

interface UsersListProps {
  users: User[];
}

export const UsersList = ({ users }: UsersListProps) => {
  const navigate = useNavigate();

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
                <Badge className={`${getStatusColor(user.status)} shadow-sm`}>
                  {user.status === "PAID" ? "Pago" : "Pendente"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/users/${user.id}`)}
                  className="hover:bg-museprimary-50 hover:text-museprimary-600 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};