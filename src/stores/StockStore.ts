import {action, observable} from "mobx";
import {ApiService} from "../services/Api";

export interface ITicker {
    id: number,
    name: string,
    last: string,
    highestBid: string,
    percentChange: string;
}

class StockStore {
    @observable tickers: ITicker[] = [];
    @observable isLoading: boolean = false;
    @observable error: string | null = null;

    @action
    async getTickers(): Promise<void> {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await ApiService.getTickers();
            const result: ITicker[] = [];
            for (let key in response) {
                result.push({
                    id: response[key].id,
                    name: key,
                    percentChange: response[key].percentChange,
                    last: response[key].last,
                    highestBid: response[key].highestBid
                })
            }
            this.tickers = [...result];
        } catch (e) {
            console.log("Get tickers error: ", e);
            this.error = e.message;
        } finally {
            this.isLoading = false;
        }
    }
}

export const stockStore = new StockStore();