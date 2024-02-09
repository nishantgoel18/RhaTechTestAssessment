import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {commonStyles} from '../theme/theme';

const ErrorBoundary = function ({}) {
  const [hasError, setHasError] = useState(false);

  return (
    <SafeAreaView style={[commonStyles.flex1, commonStyles.center]}>
      <Text style={commonStyles.error}>Something Went Wrong!</Text>
      <Text>We have logged the error and are looking into it</Text>
    </SafeAreaView>
  );
};

export default ErrorBoundary;
