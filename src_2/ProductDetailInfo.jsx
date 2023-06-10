import { useOutletContext } from "react-router-dom";
import Button from "./Button";

export default function ProductDetailInfo({ onProductAdd }) {
  const product = useOutletContext();

  return (
    <>
      <p>
        {product.description} sold at <strong>${product.price}</strong> per
        piece.
      </p>
      <Button onClick={() => onProductAdd(product)}>${product.price}</Button>
    </>
  );
}
