import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
export default function AppHeader({navigation, title, disableBack = false}) {
  return (
    <View style={styles.headerContainer}>
      <ListItem
        containerStyle={{
          backgroundColor: 'white',
          paddingHorizontal: 0,
          paddingVertical: 0,
        }}>
        {!disableBack ? (
          <Pressable
            style={{backgroundColor: 'lightblue', padding: 10, borderRadius: 5}}
            onPress={() => {
              if (disableBack) {
              } else {
                navigation.goBack();
              }
            }}>
            <Text>Go Back</Text>
          </Pressable>
        ) : null}
        <ListItem.Content>
          <ListItem.Title numberOfLines={2} style={styles.heading}>
            {title ?? ''}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    width: '100%',
  },
  heading: {
    color: 'black',
    fontSize: 20,
  },
});
