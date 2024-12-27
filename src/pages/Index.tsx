import { useUsers } from "@/hooks/useUsers";
import { TesteContato } from "@/components/TesteContato";

const Index = () => {
  const users = useUsers((state) => state.users);

  return (
    <div>
      <TesteContato />
    </div>
  );
};

export default Index;