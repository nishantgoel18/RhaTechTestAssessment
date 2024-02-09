import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {commonStyles} from '../theme/theme';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={[commonStyles.flex1, commonStyles.center]}>
          <Text style={commonStyles.somethingWentWrongTxt}>
            Something went wrong!
          </Text>
          <Text>We have logged the error and are looking into it</Text>
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}
