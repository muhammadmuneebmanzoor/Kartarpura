import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const dishData = [
  { name: 'Chicken Karahi', orders: 120 },
  { name: 'Beef Nihari', orders: 98 },
  { name: 'Seekh Kebab', orders: 86 },
  { name: 'Halwa Puri', orders: 65 },
];

export function AdminAnalytics() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
      
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
         <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-6">Weekly Revenue Trend</h3>
         <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
               <defs>
                 <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                   <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
               <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rs ${value}`} />
               <Tooltip 
                 contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                 itemStyle={{ color: '#f97316' }}
               />
               <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
             </AreaChart>
           </ResponsiveContainer>
         </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
         <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-6">Best Selling Dishes</h3>
         <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={dishData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
               <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
               <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
               <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
               <Tooltip 
                 contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                 itemStyle={{ color: '#f97316', textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}
                 cursor={{ fill: '#ffffff05' }}
               />
               <Bar dataKey="orders" fill="#f97316" radius={[4, 4, 0, 0]} barSize={40} />
             </BarChart>
           </ResponsiveContainer>
         </div>
      </div>

    </motion.div>
  );
}
