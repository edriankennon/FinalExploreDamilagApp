import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../component/styles';
import ExploreScreen from '../component/explorepage/explore';
import MyAccountScreen from '../component/profilepage/profile';
import LoginScreen from '../component/loginpage/login';
import FavoritesScreen from '../component/favoritespage/favorites';
import WelcomeScreen from '../component/welcomepage/welcomenotes';
import SignUpScreen from '../component/signuppage/signup';
import ContactUs from '../component/contactuspage/contactus';
import Prices from '../component/pricespage/prices';
import SideMenu from '../navigation/sidemenu';
import HomeStack from '../component/homestack';
import BusinessDetails from '../component/businessdetailspage/BusinessDetails';
import GuidelinesPage from '../component/guidelinespage/guidelines';
import BrgyOfficials from '../component/brgyofficialpage/BrgyOfficials';
import DamilagAwards from '../component/damilagawardspage/DamilagAwards';
import DamilagGuidelines from '../component/guidelinesbrgypage/DamilagGuidelines';
import HomeScreen from '../component/homepage/home';
import placesData from '../component/placesdatapage/placesdata';
import DamilagContact from '../component/damilagcontactpage/DamilagContact';
import Tricab from '../component/Transpopage/triCab';
import MultiCab from '../component/Transpopage/multiCab';
import Habal from '../component/Transpopage/habal';
import BarangayDamilag from '../component/brgydamilagpage/BarangayDamilagInfo';

const { primary, tertiary } = Colors;
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FavoritesStack = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (place) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.name === place.name)) {
        return [...prevFavorites, place];
      }
      return prevFavorites;
    });
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Pass props via children */}
      <Stack.Screen name="FavoritesList">
        {(props) => (
          <FavoritesScreen {...props} addToFavorites={addToFavorites} favorites={favorites} />
        )}
      </Stack.Screen>
      <Stack.Screen name="BusinessDetails">
        {(props) => (
          <BusinessDetails {...props} addToFavorites={addToFavorites} />
        )}
      </Stack.Screen>
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="Guidelines" component={GuidelinesPage} />
      <Stack.Screen name="Prices" component={Prices} />
      <Stack.Screen name="Favorite" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="LoginScreen"
      >
        {/* Authentication Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />

        {/* Main Navigation */}
        <Stack.Screen name="HomeStack" component={NavBar} options={{ headerShown: false }} />
        <Stack.Screen name="BrgyOfficials" component={BrgyOfficials} options={{ headerShown: false }} />
        <Stack.Screen name="DamilagAwards" component={DamilagAwards} options={{ headerShown: false }} />
        <Stack.Screen name="DamilagGuidelines" component={DamilagGuidelines} options={{ headerShown: false }} />
        <Stack.Screen name="DamilagContact" component={DamilagContact} options={{ headerShown: false }} />
        <Stack.Screen name="BusinessDetails" component={BusinessDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Prices" component={Prices} options={{ headerShown: false }} />
        <Stack.Screen name="Guidelines" component={GuidelinesPage} options={{ headerShown: false }} />
        <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} />
        <Stack.Screen name="Tricab" component={Tricab} options={{ headerShown: false }} />
        <Stack.Screen name="Multicab" component={MultiCab} options={{ headerShown: false }} />
        <Stack.Screen name="Habal" component={Habal} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName = {
              Home: 'home',
              Explore: 'compass',
              Favorites: 'heart',
              'My Account': 'user',
            }[route.name];
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#D3D3D3',
          tabBarStyle: { backgroundColor: '#28a745', paddingVertical: 10 },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Favorites" component={FavoritesStack} />
        <Tab.Screen name="Explore" component={BarangayDamilag} />
        <Tab.Screen name="My Account" component={MyAccountScreen} />
      </Tab.Navigator>

      {/* Render the SideMenu if the menu is open */}
      {isMenuOpen && (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <SideMenu toggleMenu={toggleMenu} />
        </View>
      )}

      {/* Menu Button to Open/Close the Side Menu */}
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 25,
    left: 20,
    padding: 10,
    borderRadius: 50,
    zIndex: 101, // Ensure the button is above other content
  },
});

export default RootStack;
