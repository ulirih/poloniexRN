/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {MainScreen} from "./screens/MainScreen";
import { createStackNavigator } from 'react-navigation';
import {StockScreen} from "./screens/StockScreen";
import {Provider} from "mobx-react/native";
import {stockStore} from "./stores/StockStore";

const RootStack = createStackNavigator({
        MainScreen: MainScreen,
        StockScreen: StockScreen
    }, {
        initialRouteName: "MainScreen"
    }
);

export default class App extends Component {
    render() {
        return (
            <Provider stockStore={stockStore}>
                <RootStack/>
            </Provider>
        )
    }
}
