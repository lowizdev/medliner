class Patient{

    constructor(name, identifier, cellphone, smsOption, whatsappOption){ //TODO: SEPARATE OPTIONS FROM PATIENT
        //TODO: VALIDATE FIELDS
        this.name = name;
        this.identifier = identifier;
        this.cellphone = cellphone;
        this.smsOption = smsOption;
        this.whatsappOption = whatsappOption;
    }

}

module.exports = Patient;