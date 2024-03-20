export class ShopDTO {
    private id: number;
    private name: string;
    private streetName: string;
    private startWorkHour: string;
    private endWorkHour: string;
    private phoneNr: string;
    private latitude: string;
    private longitude: string;

    constructor(
        id: number = 0,
        name: string = '',
        streetName: string = '',
        startWorkHour: string = '',
        endWorkHour: string = '',
        phoneNr: string = '',
        latitude: string = '',
        longitude: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.streetName = streetName;
        this.startWorkHour = startWorkHour;
        this.endWorkHour = endWorkHour;
        this.phoneNr = phoneNr;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    setId(id: number): ShopDTO {
        this.id = id;
        return this;
    }

    setName(name: string): ShopDTO {
        this.name = name;
        return this;

    }

    setStreetName(streetName: string): ShopDTO {
        this.streetName = streetName;
        return this;

    }

    setStartWorkHour(startWorkHour: string): ShopDTO {
        this.startWorkHour = startWorkHour;
        return this;

    }

    setEndWorkHour(endWorkHour: string): ShopDTO {
        this.endWorkHour = endWorkHour;
        return this;

    }

    setPhoneNr(phoneNr: string): ShopDTO {
        this.phoneNr = phoneNr;
        return this;

    }

    setLatitude(latitude: string): ShopDTO {
        this.latitude = latitude;
        return this;

    }

    setLongitude(longitude: string): ShopDTO {
        this.longitude = longitude;
        return this;
    }
}