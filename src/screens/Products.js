import React, {useState, useEffect, Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {commonStyles} from '../theme/theme';
import {PRODUCTS, returnOrThrow} from '../utils/api';
import {Dropdown} from 'react-native-element-dropdown';

const Products = ({navigation, route}) => {
  const [products, setProducts] = useState([]);
  const [productsMaster, setProductsMaster] = useState([]);
  const [brand, setBrand] = useState('');
  const [sort, setSort] = useState('alphabetically');

  const getProducts = async () => {
    const resultJson = await fetch(`${PRODUCTS}`, {
      method: 'GET',
    });
    const result = await returnOrThrow(resultJson);
    setProducts(result.products);
    setProductsMaster(result.products);
  };

  useEffect(() => {
    getProducts();
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
              Products
            </Text>

            {products.length > 0 ? (
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={products.map(p => p.brand)}
                search
                maxHeight={300}
                labelField="label"
                valueField="brand"
                placeholder={'Select brand'}
                searchPlaceholder="Search..."
                value={brand}
                onChange={item => {
                  setBrand(item);
                }}
              />
            ) : null}

            {products.map(product => {
              return (
                <Pressable
                  onPress={() => {
                    return navigation.navigate('ProductDetail', {
                      id: product.id,
                    });
                  }}>
                  <View
                    key={product.id.toString()}
                    style={[styles.productCard, commonStyles.justifyLeft]}>
                    <Text style={styles.productTitle}>{product.title}</Text>
                    <Text style={commonStyles.text}>
                      Price: ${product.price}
                    </Text>
                    <Text style={commonStyles.text}>
                      Brand: {product.brand}
                    </Text>
                    <Text style={commonStyles.text}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  productTitle: {color: 'black', fontSize: 16},
});
export default Products;
