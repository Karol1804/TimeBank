export class Service {
    constructor(
        public id: number,
        public title: string,
        public user: string,
        public phone?: string,
        public user_id?: number
    ) {}
}