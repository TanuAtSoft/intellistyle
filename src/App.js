/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import formatPrice from "./formatPrice";
import SingleOutfitContainer from "./SingleOutfitContainer";
import { dressData } from "./dummyData";
import RecomendedOutfitContainer from "./RecomendedOutfitContainer";
import { useMediaQuery } from "react-responsive";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";

const App = () => {
const [outfits, setOutfits] = useState();

const [productId, setProductId] = useState();
const [isLargeScreen, setIsLargeScreen] = useState(false);
const isDesktopOrLaptop = useMediaQuery({
  query: "(min-width: 1025px)",
});
const [activeIndex, setActiveIndex] = useState(0);
useEffect(() => {
  setIsLargeScreen(isDesktopOrLaptop);
}, [isDesktopOrLaptop]);

// useEffect(() => {
//   setProductId(product);
// }, [product]);

//   const fetchOutfits = async() => {
//   try {
//     const outfit = await api.fetchOutfits(productId, {
//       product_id: productId,
//       visitor_id: getVisitorId(),
//       user_id: "62c439a7e9a38c26d99f878e",
//       cached: true,
//       query_restrictions: {
//         user_ids_restriction: "62c439a7e9a38c26d99f878e",
//       },
//       extended_images: true,
//       outfit_restrictions: {
//         user_ids_restriction: "62c439a7e9a38c26d99f878e",
//       },
//     });
//     console.log("outfit", outfit)
//     setOutfits(outfit);
//   } catch (e) {
//     console.log(e);
//   }
// }
const fetchOutfits = () => {
  const res = dressData.outfits;
  setOutfits(res);
};

useEffect(() => {

    fetchOutfits();
 
}, []);
const goToNext = (id) => {
  const total = outfits?.length - 1;
  if (id === total) setActiveIndex(0);
  if (id < total) {
    setActiveIndex((prevState) => prevState + 1);
  }
};
const goToPrevious = (id) => {
  const total = outfits?.length - 1;
  if (id === 0) setActiveIndex(total);
  else setActiveIndex((prevState) => prevState - 1);
};
return (
  <div id="intelistyle-outfits-new" className="intellistyle">
    <h2>Complete The Look</h2>
    <div className="outerContainer">
      <Fragment>
        {outfits && outfits.length > 0 && isLargeScreen ? (
          <Fragment>
            {outfits.map((item, id) => {
              return (
                <RecomendedOutfitContainer key={id} completeOutlook={item} />
              );
            })}
          </Fragment>
        ) : (
          <div></div>
        )}
        {outfits && outfits.length > 0 && !isLargeScreen ? (
          <Fragment>
            <div className="leftButton">
              <button onClick={() => goToPrevious(activeIndex)}>
                <LeftArrow />
              </button>
            </div>

            <RecomendedOutfitContainer
              completeOutlook={outfits[activeIndex]}
            />

            <div className="rightButton">
              <button onClick={() => goToNext(activeIndex)}>
                <RightArrow />
              </button>
            </div>
          </Fragment>
        ) : (
          <div></div>
        )}
      </Fragment>
    </div>
  </div>
);
}
// class App extends React.Component {
//   state = {
//     completeTheLook: [],
//     garment: undefined,
//     user_id: "62c439a7e9a38c26d99f878e",
//     mainProduct: undefined,
//   };
//   componentDidMount() {
//     const fecthData = async () => {
//       try {
//         const payload = {
//           visitor_id: "6679fce4-b4c8-45e1-9e2c-2fdd3789dc48",
//           product_id: "626789b81e7bdd00301bfa6a",
//           user_id: "62c439a7e9a38c26d99f878e",
//           cached: true,
//           extended_images: true,
//           outfit_restrictions: {
//             occasion_restriction: null,
//             min_approved: -2,
//             user_ids_restriction: "62c439a7e9a38c26d99f878e",
//           },
//           ranked: true,
//         };
//         const response = await fetch(
//           "https://services.intelistyle.co.uk:8082/v4/getOutfits",
//           {
//             method: "POST", // *GET, POST, PUT, DELETE, etc.
//             mode: "cors", // no-cors, *cors, same-origin
//             cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//             headers: {
//               "Content-Type": "application/json",
//               Authorization:
//                 "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM0MzlhN2U5YTM4YzI2ZDk5Zjg3OGUiLCJpYXQiOjE2NTkzNjI0OTh9.wf4awbudxDcq3-prx97o3S7gBlB67Ojik0J8ZuR-34M",
//             },
//             body: JSON.stringify(payload), // body data type must match "Content-Type" header
//           }
//         );

//         const json = await response.json();
//         const outfit = json.outfits[0];
//         const product = fetchMainProduct(outfit.garments);
//         console.log("product", outfit);
//         this.setState({ mainProduct: product });
//         outfit.garments = outfit?.garments.filter(
//           (g) => g.remote_product_id !== product[0].remote_product_id
//         );
//         this.setState({
//           garment: outfit.garments,
//         });
//       } catch (e) {
//         console.log(e);
//       }
//     };
//     fecthData();
//   }
//   render() {
//     const arr = this.state.garment ? this.state.garment : [];
//     const completeTheLookArr = arr.length > 4 ? arr.slice(0, 4) : arr;
//     const topLeft = getCatProducts(completeTheLookArr, "Tops");
//     const outerWearRight = getCatProducts(completeTheLookArr, "Outerwear");
//     const jewellery = getCatProducts(completeTheLookArr, "Jewellery");
//     const bags = getCatProducts(completeTheLookArr, "Bags");
//     const AccessoriesBootomLeft = getCatProducts(
//       completeTheLookArr,
//       "Accessories"
//     );

//     let onTopRight, onTopLeft, onBottomLeft;
//     onBottomLeft =
//       topLeft.length > 0 &&
//       bags.length > 0 &&
//       AccessoriesBootomLeft.length !== 0
//         ? bags
//         : AccessoriesBootomLeft;
//     if (AccessoriesBootomLeft.length <= 1) {
//       if (AccessoriesBootomLeft.length === 1) {
//         onBottomLeft = AccessoriesBootomLeft;
//       } else {
//         onBottomLeft = bags.length > 0 ? bags : [];
//       }
//       if (topLeft.length === 1) {
//         onTopLeft = topLeft;
//       } else {
//         onTopLeft = jewellery.length > 0 ? jewellery : bags;
//       }
//       if (outerWearRight.length === 1) {
//         onTopRight = outerWearRight;
//       } else {
//         onTopRight = bags.length > 0 ? bags : jewellery;
//       }
//     }
//     const FootwearBootomRight = completeTheLookArr.filter((item) => {
//       if (item.remote_product_categories.includes("Footwear")) return item;
//     });
//     if (completeTheLookArr.length <= 3) {
//       onTopRight = outerWearRight.length > 0 ? outerWearRight : jewellery;
//       onTopLeft = topLeft.length > 0 ? topLeft : bags;
//       if (AccessoriesBootomLeft.length === 0 && jewellery.length > 0) {
//         onTopRight = jewellery;
//       }
//       if (onTopLeft._id === onBottomLeft._id) {
//         onTopLeft = [];
//       }
//     }

//     if (onTopLeft.length === 0) {
//       for (let i = 0; i < completeTheLookArr.length; i++) {
//         if (
//           completeTheLookArr[i].remote_product_categories[0] !==
//             onTopRight[0]?.remote_product_categories[0] &&
//           completeTheLookArr[i].remote_product_categories[0] !==
//             onBottomLeft[0]?.remote_product_categories[0] &&
//           completeTheLookArr[i].remote_product_categories[0] !==
//             FootwearBootomRight[0]?.remote_product_categories[0]
//         ) {
//           onTopLeft = [completeTheLookArr[i]];
//           break;
//         }
//       }
//       if (onTopLeft[0]?._id === onBottomLeft[0]?._id) {
//         onTopLeft = [];
//       }
//     }
//     if (onTopRight.length === 0) {
//       for (let i = 0; i < completeTheLookArr.length; i++) {
//         if (
//           completeTheLookArr[i].remote_product_categories[0] !==
//             onTopLeft[0]?.remote_product_categories[0] &&
//           completeTheLookArr[i].remote_product_categories[0] !==
//             onBottomLeft[0]?.remote_product_categories[0] &&
//           completeTheLookArr[i].remote_product_categories[0] !==
//             FootwearBootomRight[0]?.remote_product_categories[0]
//         ) {
//           onTopRight = [completeTheLookArr[i]];
//           break;
//         }
//       }
//     }
//     if (onBottomLeft.length === 0) {
//       for (let i = 0; i < completeTheLookArr.length; i++) {
//         if (
//           completeTheLookArr[i].remote_product_categories[0] !==
//             onTopRight[0]?.remote_product_categories[0] &&
//           completeTheLookArr[i].remote_product_categories[0] !==
//             onTopLeft[0]?.remote_product_categories[0] &&
//           completeTheLookArr[i].remote_product_categories[0] !==
//             FootwearBootomRight[0]?.remote_product_categories[0]
//         ) {
//           onBottomLeft = [completeTheLookArr[i]];
//           break;
//         }
//       }
//     }
//     console.log("onBottomLeft", onBottomLeft)

//     return (
//       <div id="intelistyle-outfits">
//         <h2>Complete The Look</h2>
//         <div className="outerContainer">
//         <div className="container">
//           {this.state.mainProduct && (
//             <div className="main-products-wrap">
//               <img
//               className="main-img"
//                 src={
//                   this.state.mainProduct[0].garment_images[0].s3_url_removed_bg
//                 }
//                 alt="mainproduct"
//                 onClick={() => {
//                   window.location.href = `${this.state.mainProduct[0].product_url}`;
//                 }}
//               />

//               {this.state.mainProduct[0].discount ? (
//                 <>
//                   <p className="moodboard-price">
//                     <s className="cross-text">
//                       {formatPrice(
//                         this.state.mainProduct[0]?.currency_code,
//                         this.state.mainProduct[0]?.price,
//                         true,
//                         0,
//                         false
//                       )}
//                     </s>
//                   </p>
//                   <p className="moodboard-price">
//                     {formatPrice(
//                       this.state.mainProduct[0]?.currency_code,
//                       this.state.mainProduct[0]?.price *
//                         (1 - this.state.mainProduct[0].discount),
//                       false,
//                       0,
//                       false
//                     )}
//                   </p>
//                 </>
//               ) : (
//                 <p className="moodboard-price">
//                   {formatPrice(
//                     this.state.mainProduct[0]?.currency_code,
//                     this.state.mainProduct[0]?.price,
//                     false,
//                     0,
//                     false
//                   )}
//                 </p>
//               )}
//                <p className="brand">
//                 {this.state.mainProduct[0].remote_brand}
//               </p>

//               {onTopLeft && (
//                 <div className="topLeft">
//                   <img
//                     src={onTopLeft[0]?.garment_images[0]?.s3_url_removed_bg}
//                     alt="topLeft"
//                     onClick={() =>
//                       (window.location.href = `${onTopLeft[0].product_url}`)
//                     }
//                   />

//                   {onTopLeft.length > 0 && onTopLeft[0].discount ? (
//                     <>
//                       <p  className="moodboard-price">
//                         <s className="cross-text">
//                           {formatPrice(
//                             onTopLeft[0]?.currency_code,
//                             onTopLeft[0]?.price,
//                             true,
//                             0,
//                             false
//                           )}
//                         </s>
//                       </p>
//                       <p className="moodboard-price">
//                         {formatPrice(
//                           onTopLeft[0]?.currency_code,
//                           onTopLeft[0]?.price * (1 - onTopLeft[0].discount),
//                           false,
//                           0,
//                           false
//                         )}
//                       </p>
//                     </>
//                   ) : (
//                     <p className="moodboard-price">
//                       {formatPrice(
//                         onTopLeft[0]?.currency_code,
//                         onTopLeft[0]?.price,
//                         false,
//                         0,
//                         false
//                       ) == 0
//                         ? ""
//                         : formatPrice(
//                             onTopLeft[0]?.currency_code,
//                             onTopLeft[0]?.price,
//                             false,
//                             0,
//                            false
//                           )}
//                     </p>
//                   )}

//                   <p  className="brand">
//                     {onTopLeft[0]?.remote_brand}
//                   </p>
//                 </div>
//               )}
//                 {onTopRight && (
//                 <div className="topRight">
//                   <img
//                     src={onTopRight[0]?.garment_images[0]?.s3_url_removed_bg}
//                     onClick={() =>
//                       (window.location.href = `${onTopRight[0].product_url}`)
//                     }
//                   />
//                   {onTopRight.length > 0 && onTopRight[0].discount ? (
//                     <>
//                       <p  className="moodboard-price">
//                         <s className="cross-text">
//                           {formatPrice(
//                             onTopRight[0]?.currency_code,
//                             onTopRight[0]?.price,
//                             true,
//                             0,
//                            false
//                           )}
//                         </s>
//                       </p>
//                       <p  className="moodboard-price">
//                         {formatPrice(
//                           onTopRight[0]?.currency_code,
//                           onTopRight[0]?.price * (1 - onTopRight[0].discount),
//                           false,
//                           0,
//                           false
//                         )}
//                       </p>
//                     </>
//                   ) : (
//                     <p className="moodboard-price">
//                       {formatPrice(
//                         onTopRight[0]?.currency_code,
//                         onTopRight[0]?.price,
//                         false,
//                         0,
//                         false
//                       ) == 0
//                         ? ""
//                         : formatPrice(
//                             onTopRight[0]?.currency_code,
//                             onTopRight[0]?.price,
//                             false,
//                             0,
//                           false
//                           )}
//                     </p>
//                   )}
//                   <p  className="brand">
//                     {onTopRight[0]?.remote_brand}
//                   </p>
//                 </div>
//               )}
//                {onBottomLeft && (
//                 <div className="bottomLeft">
//                   <img
//                     src={onBottomLeft[0]?.garment_images[0]?.s3_url_removed_bg}
//                     onClick={() =>
//                       (window.location.href = `${onBottomLeft[0].product_url}`)
//                     }
//                   />
//                   {onBottomLeft.length > 0 && onBottomLeft[0].discount ? (
//                     <>
//                       <p className={onBottomLeft[0].remote_product_categories[0] === "Accessories"? "secondary-single-product-price accessory-title-p1":"secondary-single-product-price"}>
//                         <s className="cross-text">
//                           {formatPrice(
//                             onBottomLeft[0]?.currency_code,
//                             onBottomLeft[0]?.price,
//                             true,
//                             0,
//                             false
//                           )}
//                         </s>
//                       </p>
//                       <p  className="moodboard-price">
//                         {formatPrice(
//                           onBottomLeft[0]?.currency_code,
//                           onBottomLeft[0]?.price *
//                             (1 - onBottomLeft[0].discount),
//                           false,
//                           0,
//                           false
//                         )}
//                       </p>
//                     </>
//                   ) : (
//                     <p className="moodboard-price">
//                       {formatPrice(
//                         onBottomLeft[0]?.currency_code,
//                         onBottomLeft[0]?.price,
//                         false,
//                         0,
//                         false
//                       ) == 0
//                         ? ""
//                         : formatPrice(
//                             onBottomLeft[0]?.currency_code,
//                             onBottomLeft[0]?.price,
//                             false,
//                             0,
//                            false
//                           )}
//                     </p>
//                   )}
//                   <p className="brand">
//                     {onBottomLeft[0]?.remote_brand}
//                   </p>
//                 </div>
//               )}
//                {FootwearBootomRight && (
//                 <div className="footwearDiv">
//                   <img
//                     src={
//                       FootwearBootomRight[0]?.garment_images[0]
//                         ?.s3_url_removed_bg
//                     }
//                     onClick={() =>
//                       (window.location.href = `${FootwearBootomRight[0].product_url}`)
//                     }
//                   />
//                   {FootwearBootomRight.length > 0 &&
//                   FootwearBootomRight[0].discount ? (
//                     <>
//                       <p className="moodboard-price">
//                         <s className="cross-text">
//                           {formatPrice(
//                             FootwearBootomRight[0]?.currency_code,
//                             FootwearBootomRight[0]?.price,
//                             true,
//                             0,
//                            false
//                           )}
//                         </s>
//                       </p>
//                       <p className="moodboard-price">
//                         {formatPrice(
//                           FootwearBootomRight[0]?.currency_code,
//                           FootwearBootomRight[0]?.price *
//                             (1 - FootwearBootomRight[0].discount),
//                           false,
//                           0,
//                           false
//                         )}
//                       </p>
//                     </>
//                   ) : (
//                     <p className="moodboard-price">
//                       {formatPrice(
//                         FootwearBootomRight[0]?.currency_code,
//                         FootwearBootomRight[0]?.price,
//                         false,
//                         0,
//                         false
//                       ) == 0
//                         ? ""
//                         : formatPrice(
//                             FootwearBootomRight[0]?.currency_code,
//                             FootwearBootomRight[0]?.price,
//                             false,
//                             0,
//                             false
//                           )}
//                     </p>
//                   )}
//                   <p className="brand">
//                     {FootwearBootomRight[0]?.remote_brand}
//                   </p>
//                 </div>
//               )}

//             </div>
//           )}
//         </div>
//         </div>
//       </div>
//     );
//   }
// }

export default App;
