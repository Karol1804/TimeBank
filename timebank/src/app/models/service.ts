export class Service {
    constructor(
        public id: number,
        public title: string,
        public user: string,
        public estimate: number,
        public avg_rating: number,
        public phone?: string,
        public user_id?: number
    ) {}
}

export class UpdateService {
    constructor(
        public id: number,
        public title: string,
        public estimate: number,
        public user_id?: number
    ) {}
}