// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import SplashScreen from './src/screens/SplashScreen';
// import LoginScreen from './src/screens/LoginScreen';
// import SignupScreen from './src/screens/SignupScreen';

// export default function App() {
//   const [showSplash, setShowSplash] = useState(true);
//   const [isLogin, setIsLogin] = useState(true);
//   const [registeredUser, setRegisteredUser] = useState(null); // Store signup info

//   if (showSplash) {
//     return <SplashScreen onFinish={() => setShowSplash(false)} />;
//   }

//   return (
//     <View style={styles.container}>
//       {isLogin ? (
//         <LoginScreen
//           switchToSignup={() => setIsLogin(false)}
//           registeredUser={registeredUser}
//         />
//       ) : (
//         <SignupScreen
//           switchToLogin={() => setIsLogin(true)}
//           setRegisteredUser={setRegisteredUser}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
