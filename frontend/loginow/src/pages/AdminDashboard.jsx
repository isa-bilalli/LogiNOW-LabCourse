import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
    </div>
  );
}

export default AdminDashboard;

