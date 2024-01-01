import { useState } from "react";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function App() {
  return (
    <>
      <FilterableProductTable products={PRODUCTS} />
    </>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <>
      <SeachBar filterText={filterText} inStockOnly={inStockOnly} />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </>
  )
}

function SeachBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input type='text' placeholder="Seach..." value={filterText} />
      <label>
        <input type="checkbox" checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category} />
      );
    }
    rows.push(<ProductRow products={product} key={product.name} />)
    lastCategory = product.category;
  });
  console.log(rows);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function ProductCategoryRow({ category }) {
  console.log(category);

  return (
    <tr>
      <th colSpan='2'>
        {category}
      </th>
    </tr>
  )
}

function ProductRow({ products }) {
  const name = products.stocked ? products.name : <span style={{ color: 'red' }}>{products.name}</span>
  return (
    <tr>
      <td>{name}</td>
      <td>{products.price}</td>
    </tr>
  )
}