import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import * as RNIap from "react-native-iap";

const InAppPurchaseScreen = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const productIds = [
    "com.devusama.25BackgroundChecksPerMonth",
    "com.devusama.product4",
    "com.devusama.product3",
    "com.devusama.product2",
  ];
  const getProducts = async () => {
    try {
      const response = await RNIap.getProducts({ skus: productIds });
      setProducts(response);
      setLoading(false);
    } catch (error) {
      console.log(error, "error1");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const purchaseProduct = async (productId) => {
    // alert(productId);
    try {
      RNIap.initConnection()
        .catch(() => {
          console.log("Error connecting to store.");
        })
        .then(async (result) => {
          const purchase = await RNIap.requestSubscription({
            sku: "com.devusama.product4",
          });
          console.log(purchase, "purchase");
        });

      // You can handle the purchase result here
    } catch (error) {
      console.log(error, "error2");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoading ? (
        <Text>Loading products...</Text>
      ) : (
        products.map((product) => (
          <View key={product.productId}>
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Button
              title={`Buy ${product.localizedPrice}`}
              onPress={() => purchaseProduct("com.devusama.product4")}
            />
          </View>
        ))
      )}
    </View>
  );
};

export default InAppPurchaseScreen;
