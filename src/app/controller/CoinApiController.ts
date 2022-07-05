import { Request, Response } from "express";
import fetch from "node-fetch";

//npm install node-fetch@2

const apiUrl: string = "https://api.coinranking.com/v2/coins";

interface ICoin {
    uuid: string,
    symbol: string,
    name: string,
    color: string,
    iconUrl: string,
    marketCap: string,
    price: string,
    listedAt: number,
    tier: number,
    change: string,
    rank: number,
    sparkline: string[],
    lowVolume: boolean,
    coinrankingUrl: string,
    object: object,
    btcPrice: string
}

interface IResult {
    status: string;
    data: IData
}

interface IData {
    status: object;
    coins: ICoin[]
}

const promise = <T>(fetchPromisse: any) : Promise<T> => {
    return new Promise<T>((resolve, reject)=>{
        fetchPromisse.then((result: any)=>{
            result.json().then((jsonResult: any)=>{
                resolve(jsonResult as Promise<T>)
            })
        })
        .catch((err: any)=>{
            console.log(err);            
        })
    })
}

const fetchApi = <T>(url: string) : Promise<T> =>{
    return promise(fetch(apiUrl));
}

const getCoins = async() : Promise<ICoin[]> => {
    return (await ( await fetchApi<IResult>(apiUrl)).data.coins);
}

class CoinApiController {

    constructor(){
     this.getData()    
    }
    
    public getData() {
        (async () => {
           const coins: ICoin[] = await getCoins(); 
           console.log("=================" + coins[1].name);  
           return("=================" + coins[2].name);                    
                                      
        })().catch((err: any) => {
            console.log(err);
        })
    }

    public coin(req: Request, res: Response) {
        return res.json({
            response: "Coins now",
        });
    }
}

export const coinApiController = new CoinApiController();
