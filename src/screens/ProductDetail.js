import React, {useState, useEffect, Fragment} from 'react';
import {PRODUCTS} from '../utils/api';
import {commonStyles} from '../theme/theme';
import {returnOrThrow} from '../utils/api';

import {SliderBox} from 'react-native-image-slider-box';

import {View, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
const ProductDetail = ({navigation, route}) => {
  const productId = route?.params?.id;
  console.log(productId);
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    const resultJson = await fetch(`${PRODUCTS}/${productId}`, {
      method: 'GET',
    });
    const result = await returnOrThrow(resultJson);
    setProduct(result);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Fragment>
      <SafeAreaView
        style={[commonStyles.safeAreaTop, commonStyles.safeAreaBottom]}>
        <SafeAreaView
          forceInset={commonStyles.forceInset}
          style={commonStyles.safeArea}>
          <ScrollView style={{backgroundColor: 'white', marginVertical: 10}}>
            <Text
              style={(commonStyles.text, {textAlign: 'center', fontSize: 18})}>
              {product.title} Details
            </Text>
            {product?.title?.length > 0 ? (
              <SliderBox images={product.images} />
            ) : null}
            <Text style={[styles.productTitle, styles.productAttr]}>
              Name: {product.title}
            </Text>
            <Text style={[commonStyles.text, styles.productAttr]}>
              Price: ${product.price}
            </Text>
            <Text style={[commonStyles.text, styles.productAttr]}>
              Brand: {product.brand}
            </Text>

            <Text style={[commonStyles.text, styles.productAttr]}>
              Rating: {product.rating}/5
            </Text>
            <Text style={[commonStyles.text, styles.productAttr]}>
              Category: {product.category}
            </Text>
            <Text style={[commonStyles.text, styles.productAttr]}>
              Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}
            </Text>
            <View style={{margin: 10}}></View>
            <Text style={[commonStyles.text, styles.productAttr]}>
              {product.description}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaView>
    </Fragment>
  );
};
export default ProductDetail;

const styles = StyleSheet.create({
  productCard: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  productTitle: {
    color: 'black',
    fontSize: 16,
  },
  productAttr: {
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
});
