import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, Filter, X } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';

export function AdminMenu() {
  const { menuItems, addMenuItem, removeMenuItem, updateMenuItem } = useMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Breakfast',
    price: '',
    description: '',
    image: '',
    status: 'Available',
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', category: 'Breakfast', price: '', description: '', image: '', status: 'Available' });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description || '',
      image: item.image || '',
      status: item.status || 'Available',
    });
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Please pick an image smaller than 3MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    
    if (editingId) {
      updateMenuItem(editingId, {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        description: formData.description,
        image: formData.image,
        status: formData.status,
      });
    } else {
      addMenuItem({
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        description: formData.description || 'A delicious dish from Kartarpura.',
        image: formData.image || 'https://images.unsplash.com/photo-1544670691-e4905bece00a?q=80&w=1000&auto=format&fit=crop',
        rating: 5.0,
        status: formData.status,
        featured: true,
      });
    }
    
    setIsModalOpen(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-white uppercase tracking-widest">Menu Management</h3>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-xl font-bold text-sm tracking-widest uppercase transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search menu..." className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-orange-500 outline-none placeholder:text-gray-600" />
        </div>
        <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-white/10">
              <th className="pb-4 font-bold">Dish Name</th>
              <th className="pb-4 font-bold">Category</th>
              <th className="pb-4 font-bold">Price</th>
              <th className="pb-4 font-bold">Status</th>
              <th className="pb-4 font-bold">Featured</th>
              <th className="pb-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm">
            {menuItems.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 font-bold text-white flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                  {item.name}
                </td>
                <td className="py-4 font-light">{item.category}</td>
                <td className="py-4 font-bold text-orange-500">Rs {item.price}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    item.status === 'Available' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                    {item.status || 'Available'}
                  </span>
                </td>
                <td className="py-4 text-gray-400">{item.featured ? 'Yes' : 'No'}</td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEditModal(item)} className="p-2 text-gray-400 hover:text-blue-400 transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => removeMenuItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Item Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-dark-900 border border-white/10 rounded-3xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dish Name *</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="e.g. Special Chicken Sajji" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price (Rs) *</label>
                    <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="e.g. 1500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none">
                      <option className="bg-dark-900">Breakfast</option>
                      <option className="bg-dark-900">Nihari & Paya</option>
                      <option className="bg-dark-900">BBQ</option>
                      <option className="bg-dark-900">Karahi</option>
                      <option className="bg-dark-900">Breads</option>
                      <option className="bg-dark-900">Desserts</option>
                      <option className="bg-dark-900">Beverages</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none">
                    <option className="bg-dark-900">Available</option>
                    <option className="bg-dark-900">Out of Stock</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dish Image</label>
                    {formData.image && (
                      <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Image selected</span>
                    )}
                  </div>
                  
                  {formData.image && (
                    <div className="relative w-28 h-20 rounded-lg overflow-hidden border border-white/20 mb-1">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
                        title="Remove Image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex items-center justify-center gap-2 bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/25 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors cursor-pointer text-center">
                      Browse Computer
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                      />
                    </label>
                    <input 
                      value={formData.image && formData.image.startsWith('data:') ? '' : formData.image} 
                      onChange={e => setFormData(prev => ({...prev, image: e.target.value}))} 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-orange-500 transition-colors" 
                      placeholder="Or paste image URL" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={2} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none" placeholder="Short description of the dish..." />
                </div>

                <button type="submit" className="mt-4 w-full py-4 bg-orange-500 hover:bg-orange-600 text-black font-bold uppercase tracking-widest text-xs rounded-xl transition-colors">
                  {editingId ? 'Save Changes' : 'Save Item'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
