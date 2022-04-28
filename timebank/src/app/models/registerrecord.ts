export class RegisterRecord {
    constructor(
        public service_id: any,
        public consumer_id: any,
        public service_status: string,
        public id?: number,
        public hours?: number,
        public end_time?: Date
    ) {}
}

export class GetRegisterRecord {
    constructor(
        public title: string,
        public service_id: number,
        public consumer_id: number,
        public service_status: string,
        public phone: string,
        public user_name: string,
        public id?: number,
        public hours?: number,
        public end_time?: Date
    ) {}
}

export class EndRegisterRecord {
    constructor(
        public id: number,
        public hours: number
    ) {}
}