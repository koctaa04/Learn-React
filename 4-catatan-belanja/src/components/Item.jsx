export default function Item({ item, onDeleteItem, onToggleChecked }) {
    return (
      <li key={item.id}>
        <input type="checkbox" checked={item.checked} onChange={() => onToggleChecked(item.id)} />
        <span style={{ textDecoration: item.checked ? "line-through" : "none" }}>
          {item.quantity} {item.name}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>&times;</button>
      </li>
    );
  }
  