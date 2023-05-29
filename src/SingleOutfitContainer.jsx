/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import formatPrice from "./formatPrice";

function fetchMainProduct(arr, id) {
  const data = arr.filter((item) => {
    if (item.remote_product_categories.includes("Dresses")) return item;
    if (item.remote_product_categories.includes("Trousers")) return item;
    //return item.remote_product_id === id
  });
  return data;
}

function getCatProducts(arr, cat) {
  const data = arr.filter((item) => {
    if (item.remote_product_categories.includes(cat)) return item;
    //return item.remote_product_id === id
  });
  return data;
}

const SingleOutfitContainer = ({ completeOutlook }) => {
  const [mainProduct, setMainProduct] = useState();
  const [completeTheLookArr, setCompleteTheLookArr] = useState();
  const [onTopRight, setOnTopRight] = useState();
  const [onTopLeft, setOnTopLeft] = useState();
  const [onBottomLeft, setOnBottomLeft] = useState();
  const [footwearBottomRight, setFootwearBottomRight] = useState();

  useEffect(() => {
    if (completeOutlook && completeOutlook.garments) {
      const product = fetchMainProduct(completeOutlook?.garments);
      setMainProduct(product);
      const tempArr = completeOutlook?.garments.filter(
        (g) => g.remote_product_id !== product[0].remote_product_id
      );
      const garments = tempArr.length > 4 ? tempArr.slice(0, 4) : tempArr;
      setCompleteTheLookArr(garments);
    }
  }, [completeOutlook, completeOutlook.garments]);

  useEffect(() => {
    if (completeTheLookArr && completeTheLookArr.length > 0) {
      const footwear = completeTheLookArr.filter((item) => {
        if (item.remote_product_categories.includes("Footwear")) return item;
      });
      const topLeft = getCatProducts(completeTheLookArr, "Tops");
      const outerWearRight = getCatProducts(completeTheLookArr, "Outerwear");
      const jewellery = getCatProducts(completeTheLookArr, "Jewellery");
      const bags = getCatProducts(completeTheLookArr, "Bags");
      const accessoriesBottomLeft = getCatProducts(
        completeTheLookArr,
        "Accessories"
      );

      let onTopRightProduct, onTopLeftProduct, onBottomLeftProduct;
      onBottomLeftProduct =
        topLeft.length > 0 &&
        bags.length > 0 &&
        accessoriesBottomLeft.length !== 0
          ? bags
          : accessoriesBottomLeft;
      if (accessoriesBottomLeft.length <= 1) {
        if (accessoriesBottomLeft.length === 1) {
          onBottomLeftProduct = accessoriesBottomLeft;
        } else {
          onBottomLeftProduct = bags.length > 0 ? bags : [];
        }
        if (topLeft.length === 1) {
          onTopLeftProduct = topLeft;
        } else {
          onTopLeftProduct = jewellery.length > 0 ? jewellery : bags;
        }
        if (outerWearRight.length === 1) {
          onTopRightProduct = outerWearRight;
        } else {
          onTopRightProduct = bags.length > 0 ? bags : jewellery;
        }
      }
      if (completeTheLookArr.length <= 3) {
        onTopRightProduct =
          outerWearRight.length > 0 ? outerWearRight : jewellery;
        onTopLeftProduct = topLeft.length > 0 ? topLeft : bags;
        if (accessoriesBottomLeft.length === 0 && jewellery.length > 0) {
          onTopRightProduct = jewellery;
        }
        if (onTopLeftProduct._id === onBottomLeftProduct._id) {
          onTopLeftProduct = [];
        }
      }
      if (completeTheLookArr.length <= 3) {
        onTopRightProduct = outerWearRight.length > 0 ? outerWearRight : jewellery;
        onTopLeftProduct = topLeft.length > 0 ? topLeft : bags;
        if (accessoriesBottomLeft.length === 0 && jewellery.length > 0) {
          onTopRightProduct = jewellery;
        }
        if (onTopLeftProduct._id === onBottomLeftProduct._id) {
          onTopLeftProduct = [];
        }
      }
  
      if (onTopLeftProduct.length === 0) {
        for (let i = 0; i < completeTheLookArr.length; i++) {
          if (
            completeTheLookArr[i].remote_product_categories[0] !==
              onTopRightProduct[0]?.remote_product_categories[0] &&
            completeTheLookArr[i].remote_product_categories[0] !==
              onBottomLeftProduct[0]?.remote_product_categories[0] &&
            completeTheLookArr[i].remote_product_categories[0] !==
            footwear[0]?.remote_product_categories[0]
          ) {
            onTopLeftProduct = [completeTheLookArr[i]];
            break;
          }
        }
        if (onTopLeftProduct[0]?._id === onBottomLeftProduct[0]?._id) {
          onTopLeftProduct = [];
        }
      }
      if (onTopRightProduct.length === 0) {
        for (let i = 0; i < completeTheLookArr.length; i++) {
          if (
            completeTheLookArr[i].remote_product_categories[0] !==
              onTopLeftProduct[0]?.remote_product_categories[0] &&
            completeTheLookArr[i].remote_product_categories[0] !==
              onBottomLeftProduct[0]?.remote_product_categories[0] &&
            completeTheLookArr[i].remote_product_categories[0] !==
            footwear[0]?.remote_product_categories[0]
          ) {
            onTopRightProduct = [completeTheLookArr[i]];
            break;
          }
        }
      }
      if (onBottomLeftProduct.length === 0) {
        for (let i = 0; i < completeTheLookArr.length; i++) {
          if (
            completeTheLookArr[i].remote_product_categories[0] !==
              onTopRightProduct[0]?.remote_product_categories[0] &&
            completeTheLookArr[i].remote_product_categories[0] !==
              onTopLeftProduct[0]?.remote_product_categories[0] &&
            completeTheLookArr[i].remote_product_categories[0] !==
            footwear[0]?.remote_product_categories[0]
          ) {
            onBottomLeftProduct = [completeTheLookArr[i]];
            break;
          }
        }
      }
      setOnTopLeft(onTopLeftProduct);
      setOnBottomLeft(onBottomLeftProduct);
      setFootwearBottomRight(footwear);
      setOnTopRight(onTopRightProduct);
    }
  }, [completeTheLookArr]);
  return (
    <div className="container">
      {mainProduct && (
        <div className="main-products-wrap">
          <img
            className="main-img"
            src={mainProduct[0].garment_images[0].s3_url_removed_bg}
            alt="mainproduct"
            onClick={() => {
              window.location.href = `${mainProduct[0].product_url}`;
            }}
          />

          {mainProduct && mainProduct[0].discount ? (
            <>
              <p className="moodboard-price">
                <s className="cross-text">
                  {formatPrice(
                    mainProduct[0]?.currency_code,
                    mainProduct[0]?.price,
                    true,
                    0,
                    false
                  )}
                </s>
              </p>
              <p className="moodboard-price">
                {formatPrice(
                  mainProduct[0]?.currency_code,
                  mainProduct[0]?.price * (1 - mainProduct[0].discount),
                  false,
                  0,
                  false
                )}
              </p>
            </>
          ) : (
            <p className="moodboard-price">
              {formatPrice(
                mainProduct[0]?.currency_code,
                mainProduct[0]?.price,
                false,
                0,
                false
              )}
            </p>
          )}
          <p className="brand">{mainProduct[0].remote_brand}</p>

          {onTopLeft && (
            <div className="topLeft">
              <img
                src={onTopLeft[0]?.garment_images[0]?.s3_url_removed_bg}
                alt="topLeft"
                onClick={() =>
                  (window.location.href = `${onTopLeft[0].product_url}`)
                }
              />

              {onTopLeft.length > 0 && onTopLeft[0].discount ? (
                <>
                  <p className="moodboard-price">
                    <s className="cross-text">
                      {formatPrice(
                        onTopLeft[0]?.currency_code,
                        onTopLeft[0]?.price,
                        true,
                        0,
                        false
                      )}
                    </s>
                  </p>
                  <p className="moodboard-price">
                    {formatPrice(
                      onTopLeft[0]?.currency_code,
                      onTopLeft[0]?.price * (1 - onTopLeft[0].discount),
                      false,
                      0,
                      false
                    )}
                  </p>
                </>
              ) : (
                <p className="moodboard-price">
                  {formatPrice(
                    onTopLeft[0]?.currency_code,
                    onTopLeft[0]?.price,
                    false,
                    0,
                    false
                  ) == 0
                    ? ""
                    : formatPrice(
                        onTopLeft[0]?.currency_code,
                        onTopLeft[0]?.price,
                        false,
                        0,
                        false
                      )}
                </p>
              )}

              <p className="brand">{onTopLeft[0]?.remote_brand}</p>
            </div>
          )}
          {onTopRight && (
            <div className="topRight">
              <img
                src={onTopRight[0]?.garment_images[0]?.s3_url_removed_bg}
                onClick={() =>
                  (window.location.href = `${onTopRight[0].product_url}`)
                }
              />
              {onTopRight.length > 0 && onTopRight[0].discount ? (
                <>
                  <p className="moodboard-price">
                    <s className="cross-text">
                      {formatPrice(
                        onTopRight[0]?.currency_code,
                        onTopRight[0]?.price,
                        true,
                        0,
                        false
                      )}
                    </s>
                  </p>
                  <p className="moodboard-price">
                    {formatPrice(
                      onTopRight[0]?.currency_code,
                      onTopRight[0]?.price * (1 - onTopRight[0].discount),
                      false,
                      0,
                      false
                    )}
                  </p>
                </>
              ) : (
                <p className="moodboard-price">
                  {formatPrice(
                    onTopRight[0]?.currency_code,
                    onTopRight[0]?.price,
                    false,
                    0,
                    false
                  ) == 0
                    ? ""
                    : formatPrice(
                        onTopRight[0]?.currency_code,
                        onTopRight[0]?.price,
                        false,
                        0,
                        false
                      )}
                </p>
              )}
              <p className="brand">{onTopRight[0]?.remote_brand}</p>
            </div>
          )}
          {onBottomLeft && (
            <div className="bottomLeft">
              <img
                src={onBottomLeft[0]?.garment_images[0]?.s3_url_removed_bg}
                onClick={() =>
                  (window.location.href = `${onBottomLeft[0].product_url}`)
                }
              />
              {onBottomLeft.length > 0 && onBottomLeft[0].discount ? (
                <>
                  <p
                    className={
                      onBottomLeft[0].remote_product_categories[0] ===
                      "Accessories"
                        ? "secondary-single-product-price accessory-title-p1"
                        : "secondary-single-product-price"
                    }
                  >
                    <s className="cross-text">
                      {formatPrice(
                        onBottomLeft[0]?.currency_code,
                        onBottomLeft[0]?.price,
                        true,
                        0,
                        false
                      )}
                    </s>
                  </p>
                  <p className="moodboard-price">
                    {formatPrice(
                      onBottomLeft[0]?.currency_code,
                      onBottomLeft[0]?.price * (1 - onBottomLeft[0].discount),
                      false,
                      0,
                      false
                    )}
                  </p>
                </>
              ) : (
                <p className="moodboard-price">
                  {formatPrice(
                    onBottomLeft[0]?.currency_code,
                    onBottomLeft[0]?.price,
                    false,
                    0,
                    false
                  ) == 0
                    ? ""
                    : formatPrice(
                        onBottomLeft[0]?.currency_code,
                        onBottomLeft[0]?.price,
                        false,
                        0,
                        false
                      )}
                </p>
              )}
              <p className="brand">{onBottomLeft[0]?.remote_brand}</p>
            </div>
          )}
          {footwearBottomRight && (
            <div className="footwearDiv">
              <img
                src={
                  footwearBottomRight[0]?.garment_images[0]?.s3_url_removed_bg
                }
                onClick={() =>
                  (window.location.href = `${footwearBottomRight[0].product_url}`)
                }
              />
              {footwearBottomRight.length > 0 &&
              footwearBottomRight[0].discount ? (
                <>
                  <p className="moodboard-price">
                    <s className="cross-text">
                      {formatPrice(
                        footwearBottomRight[0]?.currency_code,
                        footwearBottomRight[0]?.price,
                        true,
                        0,
                        false
                      )}
                    </s>
                  </p>
                  <p className="moodboard-price">
                    {formatPrice(
                      footwearBottomRight[0]?.currency_code,
                      footwearBottomRight[0]?.price *
                        (1 - footwearBottomRight[0].discount),
                      false,
                      0,
                      false
                    )}
                  </p>
                </>
              ) : (
                <p className="moodboard-price">
                  {formatPrice(
                    footwearBottomRight[0]?.currency_code,
                    footwearBottomRight[0]?.price,
                    false,
                    0,
                    false
                  ) == 0
                    ? ""
                    : formatPrice(
                        footwearBottomRight[0]?.currency_code,
                        footwearBottomRight[0]?.price,
                        false,
                        0,
                        false
                      )}
                </p>
              )}
              <p className="brand">{footwearBottomRight[0]?.remote_brand}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SingleOutfitContainer;
