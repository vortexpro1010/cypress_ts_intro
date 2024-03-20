import { ShopDTO } from '../api/ShopDTO';

export class AdminRequestDTO {
    private userName: string = '';
    private password: string = '';
    private shop: ShopDTO;

    constructor(userName: string = '', password: string = '', shop: ShopDTO = new ShopDTO()) {
        this.userName = userName;
        this.password = password;
        this.shop = shop;
    }

    getUserName(): string {
        return this.userName;
    }

    getPassword(): string {
        return this.password;
    }

    getShop(): ShopDTO {
        return this.shop;
    }

    setUserName(userName: string): AdminRequestDTO {
        this.userName = userName;
        return this;
    }

    setPassword(password: string): AdminRequestDTO {
        this.password = password;
        return this;
    }

    setShop(shop: ShopDTO): AdminRequestDTO {
        this.shop = shop;
        return this;
    }
}