import {Text, View, StyleSheet, ViewStyle, TouchableOpacity, Image, ImageStyle, TextStyle} from "react-native";
import React, {Component} from "react";
import {ImageResources} from "../resources/images/ImageResources";
import {NavigationScreenOptions} from "react-navigation";

export class MainScreen extends Component<any> {
    static navigationOptions: NavigationScreenOptions;
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.logoContainer} onPress={this.onLogoPress} activeOpacity={0.7}>
                    <Image source={ImageResources.logo} style={styles.image}/>
                    <Text style={styles.label}>Котировки</Text>
                </TouchableOpacity>
            </View>
        );
    }

    private onLogoPress = (): void => {
        this.props.navigation.push("StockScreen");
    }
}

MainScreen.navigationOptions = {header: null};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    } as ViewStyle,
    logoContainer: {
        padding: 20
    } as ViewStyle,
    image: {
        height: 80,
        width: 80,
        margin: 10
    } as ImageStyle,
    label: {
        textAlign: "center",
        fontSize: 16
    } as TextStyle
});