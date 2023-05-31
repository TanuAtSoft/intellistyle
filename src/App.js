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

export default App;
