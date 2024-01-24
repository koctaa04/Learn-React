import { useState } from "react";
import Item from "./Item";
export default function GroceryList({ items, onDeleteItem, onToggleChecked, onClearItems }) {
    const [sortBy, stateSortBy] = useState("input");
  
    let sortedItems;
    
    switch (sortBy) {
      case 'name':
        sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'checked':
        sortedItems = items.sort((a, b) => b.checked - a.checked);
        break;
      default:
        // eslint-disable-next-line no-unused-vars
        sortedItems = items;
        break;
    }
  
    return (
      <>
        <div className="list">
          <ul>
            {items.map((item) => (
              <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleChecked={onToggleChecked} />
            ))}
          </ul>
        </div>
        <div className="actions">
          <select value={sortBy} onChange={(e) => stateSortBy(e.target.value)}>
            <option value="input">Urutkan berdasarkan urutan input</option>
            <option value="name">Urutkan berdasarkan nama barang</option>
            <option value="checked">Urutkan berdasarkan ceklis</option>
          </select>
          <button onClick={onClearItems}>Bersihkan Daftar</button>
        </div>
      </>
    );
  }