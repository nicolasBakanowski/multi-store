import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ProductCard from "../../components/ProductCard";
import { fetchProductsByCategory, editProduct } from "@/redux/actions/productAction";
import { Product } from "@/interfaces/Products";
import ProductEditModal from "@/components/ProductEditModal";
import Notification from "@/components/Notification";
const CategoryPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    (state: RootState) => state.category.currentCategory
  );
  const products = useSelector((state: RootState) => state.product.products);
  const userToken = useSelector((state: RootState) => state.user.token);

  const [editModalStates, setEditModalStates] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (currentCategory) {
      dispatch(fetchProductsByCategory(currentCategory.id) as any);
    }
  }, [currentCategory, dispatch]);

  const handleEditClick = (product: Product) => {
    setEditModalStates((prevStates) => ({
      ...prevStates,
      [product.id]: true,
    }));
  };

  const handlerOnSave = async(formData: FormData, idProduct:number) => {
    userToken && dispatch(editProduct(idProduct,formData,userToken) as any)
  };

  return (
    <div>
      <main className="container mx-auto mr-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: Product) => (
            <div className="items-center" key={product.id}>
              <ProductCard
                product={product}
                onEditClick={() => handleEditClick(product)}
              />
              {editModalStates[product.id] && (
                <ProductEditModal
                  isOpen={editModalStates[product.id]}
                  onClose={() => setEditModalStates((prevStates) => ({ ...prevStates, [product.id]: false }))}
                  product={product}
                  onSave={(formData) => handlerOnSave(formData, product.id)}
                  onHide={() => setEditModalStates((prevStates) => ({ ...prevStates, [product.id]: false }))}
                />
              )}
            </div>
          ))}
        </div>
      </main>
      <Notification/>
    </div>
  );
};

export default CategoryPage;
