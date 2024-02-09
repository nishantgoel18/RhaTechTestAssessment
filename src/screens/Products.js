import React, {useState, useEffect, Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import {commonStyles} from '../theme/theme';
import {ListItem, Input} from 'react-native-elements';
import {PRODUCTS, PRODUCTS_SEARCH, returnOrThrow} from '../utils/api';
import {Dropdown} from 'react-native-element-dropdown';
import AppHeader from '../components/AppHeader';

const Products = ({navigation, route}) => {
  const [products, setProducts] = useState([]);
  const [productsMaster, setProductsMaster] = useState([]);

  const [search, setSearch] = useState('');
  const [brands, setBrands] = useState([]);

  const getProducts = async () => {
    const resultJson = await fetch(
      search.length > 0 ? `${PRODUCTS_SEARCH}?q=${search}` : `${PRODUCTS}`,
      {
        method: 'GET',
      },
    );
    const result = await returnOrThrow(resultJson);
    setProducts(result.products);
    setProductsMaster(result.products);

    setBrands(result.products.map(p => p.brand));
  };

  const filterProducts = () => {
    if (search.length > 0) {
      const filteredData = productsMaster.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      return filteredData;
    } else {
      return productsMaster;
    }
  };
  useEffect(() => {
    getProducts();
  });

  return (
    <Fragment>
      <SafeAreaView
        style={[commonStyles.safeAreaTop, commonStyles.safeAreaBottom]}>
        <SafeAreaView
          forceInset={commonStyles.forceInset}
          style={commonStyles.safeArea}>
          <ScrollView style={{backgroundColor: 'white', marginVertical: 10}}>
            <AppHeader
              navigation={navigation}
              disableBack={true}
              title={'Products'}
            />

            <Input
              inpurtStyle={{
                fontSize: 12,
                alignSelf: 'center',
              }}
              onEndEditing={() => {
                setProducts(filterProducts());
              }}
              autoCapitalize="none"
              inputContainerStyle={styles.input}
              placeholder={'Search products'}
              labelStyle={{fontSize: 10}}
              onChangeText={value => {
                setSearch(value);
              }}
              autoCorrect={false}
              value={search}
            />
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
                    style={
                      (styles.productCard,
                      {paddingHorizontal: 10, paddingVertical: 10})
                    }>
                    <ListItem
                      containerStyle={{
                        backgroundColor: 'white',
                        paddingHorizontal: 0,
                        paddingVertical: 0,
                      }}>
                      <Image
                        style={{height: 50, width: 50}}
                        src={product.thumbnail}
                      />
                      <ListItem.Content>
                        <ListItem.Title
                          numberOfLines={2}
                          style={styles.productTitle}>
                          {product.title}
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.productSubTitle}>
                          Price: ${product.price}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.productSubTitle}>
                          Brand: {product.brand}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
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
  productTitle: {color: 'black', fontSize: 18},
  productSubTitle: {color: 'black', fontSize: 14},
});
export default Products;
