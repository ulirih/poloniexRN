import {
    Text,
    View,
    StyleSheet,
    ViewStyle,
    ActivityIndicator, FlatList, TextStyle, Dimensions,
} from "react-native";
import React, {Component} from "react";
import {NavigationScreenOptions} from "react-navigation";
import {inject, observer} from "mobx-react/native";
import {ITicker} from "../stores/StockStore";
import {Colors} from "../resources/Colors";

const windowWidth = Dimensions.get('window').width;

@inject("stockStore")
@observer
export class StockScreen extends Component<any> {
    static navigationOptions: NavigationScreenOptions;

    private handlerId: number;
    private TIME_INTERVAL = 5000;

    constructor(props: any) {
        super(props);
    }

    async componentDidMount(): Promise<void> {
        console.log("Start observe");

        await this.getTickers();
        this.handlerId = setInterval(this.getTickers, this.TIME_INTERVAL);
    }

    componentWillUnmount(): void {
        console.log("End observe");
        clearInterval(this.handlerId);
    }

    private getTickers = async (): Promise<void> => {
        await this.props.stockStore.getTickers();
    };

    render() {
        const {tickers, isLoading, error} = this.props.stockStore;
        const errorPanel = error != null ? this.renderErrorPanel() : <View/>;

        if (tickers.length == 0 && isLoading) {
            return (
                <ActivityIndicator style={styles.spinner}/>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    {errorPanel}
                    <FlatList
                        style={styles.container}
                        data={tickers}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            );
        }
    }

    private renderItem = ({item}: {item: ITicker}): JSX.Element => {
        const percent = parseFloat(item.percentChange);
        const percentStyle = StyleSheet.flatten([styles.baseText, {color: percent < 0 ? Colors.Red : Colors.Green}]);

        return (
            <View style={styles.tickerContainer}>
                <View style={styles.tickerHeader}>
                    <Text style={styles.baseText}>{item.name}</Text>
                    <Text style={percentStyle}>{item.percentChange}%</Text>
                </View>
                <View style={styles.tickerInfo}>
                    <Text>Highest bid: {item.highestBid}</Text>
                    <Text>Last: {item.last}</Text>
                </View>
            </View>
        )
    };

    private renderErrorPanel = (): JSX.Element => {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{this.props.stockStore.error}</Text>
            </View>
        );
    };
}

StockScreen.navigationOptions = {
    title: "Stock",
    headerStyle: {backgroundColor: Colors.HeaderColor},
    headerTintColor: Colors.White,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    } as ViewStyle,
    spinner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    } as ViewStyle,
    baseText: {
        fontSize: 17,
        color: Colors.Black
    } as TextStyle,
    tickerContainer: {
        padding: 12,
        backgroundColor: Colors.White,
        marginHorizontal: 7,
        marginVertical: 5
    } as ViewStyle,
    tickerHeader: {
        flexDirection: "row",
        justifyContent: "space-between"
    } as ViewStyle,
    tickerInfo: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    } as ViewStyle,
    errorContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: windowWidth,
        backgroundColor: Colors.Red,
        padding: 20
    } as ViewStyle,
    errorText: {
        textAlign: "center",
        color: Colors.White
    }
});