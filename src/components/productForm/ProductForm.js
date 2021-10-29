import React from "react";
import { ProductFormStyled } from "./ProductForm.styled";

const ProductForm = ({
  productName,
  productWeight,
  productsVariants,
  handleChange,
  handleSubmit,
  errorMsg,
}) => {
  const onChange = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <ProductFormStyled>
      <form className="productForm-form" onSubmit={onSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <label className="productForm-form__label">
          Введите название продукта
          <input
            name="productName"
            type="text"
            list="productSearch"
            className="productForm-form__input"
            value={productName}
            onChange={onChange}
            autoComplete="off"
          />
          <datalist id="productSearch">
            {productsVariants &&
              productsVariants.map((product) => (
                <option value={product.title.ru} key={product._id} />
              ))}
          </datalist>
        </label>
        <label className="productForm-form__label">
          Граммы
          <input
            name="productWeight"
            type="number"
            value={productWeight}
            className="productForm-form__input"
            onChange={onChange}
          />
        </label>
        <button type="submit">+</button>
      </form>
    </ProductFormStyled>
  );
};

export default ProductForm;

//===============================================================

// import React from "react";
// import { Field, Formik } from "formik";
// import * as yup from "yup";
// import axios from "axios";
// import { endpoint } from "../../db.json";
// import { ProductFormStyled } from "./ProductForm.styled";

// const ProductForm = ({ userDate }) => {
//   const formikInitValues = {
//     productWeight: "",
//     productName: "",
//     productsArr: [],
//   };
//   const getProduct = (query) => {
//     axios(`${endpoint.product}${query}`)
//       .then(({ data }) => {
//         formikInitValues.productsArr = data;
//         console.log(formikInitValues);
//         console.log(formikInitValues.productsArr.length);
//       })
//       .catch(console.log);
//   };

//   console.log(formikInitValues);

//   const validationsSchema = yup.object().shape({
//     productName: yup
//       .string()
//       //   .typeError("Числовое значение от 100  до 250")
//       .required("Обязательное поле"),

//     productWeight: yup
//       .number()
//       .min(1)
//       .typeError("Числовое значение должно быть больше 0")
//       .required("Обязательное поле"),
//   });

//   return (
//     <ProductFormStyled>
//       <form className="productForm-form">
//         <Formik
//           initialValues={formikInitValues}
//           validateOnBlur
//           onSubmit={(values) => {
//             console.log(values);
//           }}
//           validationSchema={validationsSchema}
//         >
//           {({ values, errors, touched, isValid, handleSubmit }) => {
//             values.productName &&
//               values.productName.length > 1 &&
//               getProduct(values.productName);
//             return (
//               <div className="productForm-form__input-wrapper">
//                 <div className="group">
//                   <div className="sub-group">
//                     <div className="productForm-form__sub-wrapper">
//                       <Field
//                         type="text"
//                         name="productName"
//                         list="poductsList"
//                         placeholder="Введите название продукта"
//                         autoComplete="off"
//                       />
//                       <datalist id={`poductsList`}>
//                         {values.productsArr.length &&
//                           values.productsArr.map((product) => (
//                             <option
//                               value={product.title.ru}
//                               key={product._id}
//                             />
//                           ))}
//                         <ul>
//                           {values.productsArr.length &&
//                             values.productsArr.map((product) => (
//                               <li key={product._id}>{product.title.ru}</li>
//                             ))}
//                         </ul>
//                       </datalist>
//                       {touched.productName && errors.productName && (
//                         <span className="productForm-form__alert">
//                           {errors.productName}
//                         </span>
//                       )}
//                     </div>

//                     <div className="productForm-form__sub-wrapper">
//                       <Field
//                         type="number"
//                         name="productWeight"
//                         placeholder="Граммы"
//                         autoComplete="off"
//                       />
//                       {touched.productWeight && errors.productWeight && (
//                         <span className="productForm-form__alert">
//                           {errors.productWeight}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   disabled={!isValid}
//                   onClick={handleSubmit}
//                   type={`submit`}
//                   className="productForm-form__btn"
//                 >
//                   +
//                 </button>
//                 <hr className="productForm-form__line" />
//               </div>
//             );
//           }}
//         </Formik>
//       </form>
//     </ProductFormStyled>
//   );
// };

// export default ProductForm;
