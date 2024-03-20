export class AdminDBDTO {
    id: number;
    user_name: string;
    password: string;
    shop_id: number;

    constructor(id: number, user_name: string, password: string, shop_id: number) {
        this.id = id;
        this.user_name = user_name;
        this.password = password;
        this.shop_id = shop_id;
    }

    getId(): number {
        return this.id;
    }

    getUserName(): string {
        return this.user_name;
    }

    getPassword(): string {
        return this.password;
    }

    getShopId(): number {
        return this.shop_id;
    }
}