
import { useState } from "react";

export default function Form({ onAddItem }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
  
    function handleSubmit(e) {
      e.preventDefault();
      // alert(quantity + " " + name);
  
      if (!name) return;
  
      const newItem = {
        id: Date.now(),
        name: name,
        quantity: quantity,
        checked: false,
      };
      console.log(newItem);
  
      onAddItem(newItem);
  
      setQuantity(1);
      setName("");
    }
    const quantityNum = [...Array(20)].map((_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>
    ));
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>Hari ini belanja apa?</h3>
        <div>
          <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
            {quantityNum}
          </select>
          <input type="text" placeholder="nama barang..." value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button>Tambah</button>
      </form>
    );
  }