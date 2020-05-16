import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator }from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Competicoes from './pages/Competicoes';
import Detalhe from './pages/Detalhes';

export default function Routes(){
    return(
        <NavigationContainer>

            <AppStack.Navigator screenOptions= {{ headerShown: false}}>
                <AppStack.Screen name="Competicoes" component={Competicoes}/>
                <AppStack.Screen name="Detalhe"component={Detalhe}/>
            </AppStack.Navigator>

        </NavigationContainer>
    );
}