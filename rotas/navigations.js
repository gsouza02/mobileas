import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from "../TelaInicial";
import Menu from "../Menu"

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{
                headerTitle: '', headerShown: false
            }}>
                <Stack.Screen name="Home" 
                component={TelaInicial} 
                options={{headerTitle:"", headerShown:false}}
                />
                <Stack.Screen name="Menu" component={Menu} />   
            </Stack.Navigator>

        </NavigationContainer>
    )
}