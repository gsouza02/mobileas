import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from "../TelaInicial";
import Menu from "../Menu"
import CriarFlash from "../criarFlash.js";
import CriarTela from "../criarTela.js"
import EditarFlash from "../EditarFlash.js";

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
                <Stack.Screen name="CriarTela" component={CriarTela} />
                <Stack.Screen name="CriarFlash" component={CriarFlash} />
                <Stack.Screen name="Editar" component={EditarFlash} />

            </Stack.Navigator>

        </NavigationContainer>
    )
}