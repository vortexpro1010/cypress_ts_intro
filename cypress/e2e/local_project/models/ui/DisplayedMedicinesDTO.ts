export class DisplayedMedicinesDTO {
    medicineName: string;
    medicineBranch: string;
    medicinePrice: string;
    medicineDistance: string;

    constructor(medicineName: string, medicineBranch: string, medicinePrice: string, medicineDistance: string) {
        this.medicineName = medicineName;
        this.medicineBranch = medicineBranch;
        this.medicinePrice = medicinePrice;
        this.medicineDistance = medicineDistance;
    }
}