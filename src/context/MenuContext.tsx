import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FEATURED_DISHES as initialDishes } from '../data/mock';
import { supabase } from '../lib/supabase';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  status?: string;
  featured?: boolean;
}

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  removeMenuItem: (id: number) => Promise<void>;
  updateMenuItem: (id: number, item: Partial<MenuItem>) => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    initialDishes.map((dish, idx) => ({
      ...dish,
      id: dish.id || idx + Date.now(), // Fallback if id is missing
      status: 'Available',
      featured: true,
    }))
  );

  useEffect(() => {
    async function loadMenu() {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('id', { ascending: true });
        
        if (error) {
          console.error('Error fetching menu items:', error);
          return;
        }

        if (data && data.length > 0) {
          setMenuItems(data.map(item => ({
            id: Number(item.id),
            name: item.name,
            description: item.description || '',
            price: Number(item.price),
            rating: Number(item.rating || 5.0),
            image: item.image || '',
            category: item.category,
            status: item.status || 'Available',
            featured: item.featured ?? true
          })));
        } else {
          // Table is empty, seed it with default dishes if table exists
          const formattedDishes = initialDishes.map((dish) => ({
            name: dish.name,
            description: dish.description || 'A delicious dish from Kartarpura.',
            price: dish.price,
            rating: dish.rating || 5.0,
            image: dish.image || 'https://images.unsplash.com/photo-1544670691-e4905bece00a?q=80&w=1000&auto=format&fit=crop',
            category: dish.category,
            status: 'Available',
            featured: true
          }));
          
          const { data: insertedData, error: insertError } = await supabase
            .from('menu_items')
            .insert(formattedDishes)
            .select();
          
          if (insertError) {
            console.error('Error seeding menu items:', insertError);
          } else if (insertedData) {
            setMenuItems(insertedData.map(item => ({
              id: Number(item.id),
              name: item.name,
              description: item.description || '',
              price: Number(item.price),
              rating: Number(item.rating || 5.0),
              image: item.image || '',
              category: item.category,
              status: item.status || 'Available',
              featured: item.featured ?? true
            })));
          }
        }
      } catch (err) {
        console.error('Catch block in loadMenu:', err);
      }
    }
    loadMenu();
  }, []);

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .insert([{
          name: item.name,
          description: item.description,
          price: item.price,
          rating: item.rating || 5.0,
          image: item.image,
          category: item.category,
          status: item.status || 'Available',
          featured: item.featured ?? true
        }])
        .select();

      if (error) {
        console.error('Error adding menu item to Supabase:', error);
        // Fallback local state
        setMenuItems((prev) => [
          ...prev,
          { ...item, id: Date.now() },
        ]);
      } else if (data && data[0]) {
        const newItem = {
          ...item,
          id: Number(data[0].id)
        };
        setMenuItems((prev) => [...prev, newItem]);
      }
    } catch (err) {
      console.error('Catch adding menu item:', err);
      setMenuItems((prev) => [
        ...prev,
        { ...item, id: Date.now() },
      ]);
    }
  };

  const removeMenuItem = async (id: number) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting menu item from Supabase:', error);
      }
    } catch (err) {
      console.error('Catch deleting menu item:', err);
    }
    // Update local state is solid
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateMenuItem = async (id: number, updatedFields: Partial<MenuItem>) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({
          name: updatedFields.name,
          description: updatedFields.description,
          price: updatedFields.price,
          rating: updatedFields.rating,
          image: updatedFields.image,
          category: updatedFields.category,
          status: updatedFields.status,
          featured: updatedFields.featured
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating menu item on Supabase:', error);
      }
    } catch (err) {
      console.error('Catch updating menu item:', err);
    }
    // Update local state is solid
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem, updateMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
};
