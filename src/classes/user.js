export class User {
    constructor(name, dateOfBirth, motherName, fatherName, cns, cpf, phone, adress, acs) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.motherName = motherName;
        this.fatherName = fatherName;
        this.cns = cns;
        this.cpf = cpf;
        this.phone = phone;
        this.adress = adress;
        this.acs = acs;
        this.requests = [];
    }

    addRequest(request) {
        this.requests.push(request)
    }
}

export class MedicalRequest {
    constructor(user, doctor, date, request) {
        this.user = user;
        this.doctor = doctor;
        this.date = date;
        this.request = request;

        user.addRequest(this)
    }
}
