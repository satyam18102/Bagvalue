import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [registeredUser, setRegisteredUser] = useState(null);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash">
        {props => (
          <SplashScreen
            {...props}
            onFinish={() => props.navigation.replace('Login')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} registeredUser={registeredUser} />}
      </Stack.Screen>
      <Stack.Screen name="Signup">
        {props => <SignupScreen {...props} setRegisteredUser={setRegisteredUser} />}
      </Stack.Screen>
      <Stack.Screen name="MainApp">
        {props => <TabNavigator {...props} user={registeredUser} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;