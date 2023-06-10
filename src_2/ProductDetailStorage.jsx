import { useOutletContext } from "react-router-dom";

export default function ProductDetailStorage() {
  const storage = useOutletContext().storage;

  return (
    <p>
      <strong>Storage instructions:</strong> {storage}
    </p>
  );
}
