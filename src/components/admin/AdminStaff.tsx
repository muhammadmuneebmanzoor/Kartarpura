import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Shield } from 'lucide-react';

const mockStaff = [
  { id: 'STAFF-01', name: 'Usman Ali', role: 'Owner', email: 'owner@kartarpura.com', status: 'Active' },
  { id: 'STAFF-02', name: 'Bilal Qureshi', role: 'Manager', email: 'bilal@kartarpura.com', status: 'Active' },
  { id: 'STAFF-03', name: 'Hassan', role: 'Staff', email: 'hassan@kartarpura.com', status: 'Active' },
];

export function AdminStaff() {
  const [staff, setStaff] = useState(mockStaff);
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-white uppercase tracking-widest">Staff Roles & Permissions</h3>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-xl font-bold text-sm tracking-widest uppercase transition-colors">
          <Plus className="w-4 h-4" /> Add Staff Profile
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-white/10">
              <th className="pb-4 font-bold">ID</th>
              <th className="pb-4 font-bold">Name</th>
              <th className="pb-4 font-bold">Role</th>
              <th className="pb-4 font-bold">Email</th>
              <th className="pb-4 font-bold">Status</th>
              <th className="pb-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm">
            {staff.map((member) => (
              <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 font-bold text-white">{member.id}</td>
                <td className="py-4 font-bold">{member.name}</td>
                <td className="py-4">
                   <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs bg-orange-500/10 w-fit px-3 py-1 rounded-full border border-orange-500/20">
                      <Shield className="w-3 h-3" /> {member.role}
                   </div>
                </td>
                <td className="py-4 font-light text-gray-400">{member.email}</td>
                <td className="py-4 font-bold text-green-500">{member.status}</td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors" title="Edit Permissions">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Remove Staff">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
