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
            const res = await ApiService.getTickers();
            const result: ITicker[] = [];
            for (let key in res) {
                result.push({
                    id: res[key].id,
                    name: key,
                    percentChange: res[key].percentChange,
                    last: res[key].last,
                    highestBid: res[key].highestBid
                })
            }
            this.tickers = [...result];
        } catch (e) {
            this.error = e.message;
        } finally {
            this.isLoading = false;
        }
    }
}

export const stockStore = new StockStore();