import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Service } from '../models/service';
import { User } from '../models/user';
import { EndRegisterRecord, GetRegisterRecord, RegisterRecord } from '../models/registerrecord';
import { map } from 'rxjs';
import { apiurl } from '../url/apiUrl';
import { Userservices } from '../models/userservices';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {
 
  private api = apiurl.url;
  private apiGetServicesUrl = this.api + "services";
  private apiGetServiceUrl = (id: number) => this.api + "service/" + id;
  private apiGetUserUrl = (userid: number) => this.api + "user/" + userid;
  private apiGetServiceRegisterIdUrl = (service_id: number) => this.api + "serviceregister/" + service_id;
  private apiGetUsersUrl = this.api + "users";
  private apiCreateRegisterRecord = this.api + "serviceregister-create";
  private apiGetServiceRegisterUrl = this.api + "serviceregister";
  private apiEndServiceRegisterUrl = (id: number, hours: number, rating:number) => this.api + "serviceregister/" + id + "/" + hours+ "/" +rating;
  private apiAddServiceUrl = this.api + 'service-create';
  private apiUserServicesUrl = (user_id: number) => this.api + "services-user/" + user_id;
  private apiGetServicesSortUrl = this.api + "services?sort=";
  
  
  constructor(
    private http: HttpClient
  ) {}

  // Get all services function
  getServices(query: string) {
    return this.http.get(this.apiGetServicesSortUrl + query).pipe(map(this.remoteServices));
    console.log(query);
  }
  getServicesAsc(query: string) {
    return this.http.get(this.apiGetServicesSortUrl + query).pipe(map(this.remoteServices));
    console.log(query);
  }

  // Helper for "Services" related functions. Returns services based on service model for mapping.
  remoteServices(res: any): Service[] {
    let services: Service[] = [];
    for (let service of res) {
      services.push(new Service(service.id, service.title, service.User.user_name, service.estimate, service.avg_rating, service.User.phone, service.User.id))
    }
    return services;
  }

    // Get all services of user function

    getUserServices(user_id: number) {
      return this.http.get(this.apiUserServicesUrl(user_id)).pipe(map(this.remoteUserServices));
      console.log(user_id);
    }
  
    // Helper for "UserServices" related functions. Returns services based on service model for mapping.
  
    remoteUserServices(res: any): Userservices[] {
      let userservices: Userservices[] = [];
      for (let userservice of res) {
        userservices.push(new Userservices(userservice.estimate,userservice.phone, userservice.rating,userservice.title ,userservice.user_id, userservice.user_name,userservice.service_id))
        
      }
      return userservices;
      console.log(userservices)
      
    }

  // Creating record in Service Register table.
  createRegisterRecord(addRecord: RegisterRecord){
    return this.http.post(this.apiCreateRegisterRecord, addRecord);
  }

  // Helper for "Register" related functions. Returns records based on service record model for mapping.
  remoteRegister(res: any): RegisterRecord[] {
    let records: RegisterRecord[] = [];
    for (let record of res) {
      records.push(new RegisterRecord(record.service_id, record.consumer_id, record.service_status, record.id, record.end_time,record.rating))
    }
    return records;
  }

  // Helper for "Register" related functions. Returns records based on service record - GetRegisterRecord- model for mapping.
  remoteRegisterRecords(res: any): GetRegisterRecord[] {
    let records: GetRegisterRecord[] = [];
    for (let record of res) {
      records.push(new GetRegisterRecord(record.Service.title, record.Service.id, record.User.id, record.service_status, record.User.phone, record.User.user_name, record.id, record.hours, record.end_time, record.rating))
    }
    return records;
  }

  // Gets records from Service register.
  getRegisterRecords(query: string) {
    return this.http.get(this.apiGetServiceRegisterUrl + query).pipe(map(this.remoteRegisterRecords));
  }

  // Gets single Service based on ID.
  getService(id: number) {
    return this.http.get(this.apiGetServiceUrl(id)).pipe(map(this.remoteServices));
  }

  // Gets all registered users
  getUsers(query: string) {
    return this.http.get(this.apiGetUsersUrl + query).pipe(map(this.remoteUsers));
  }

  // Helper for "Users" related functions. Returns users based on User model for mapping.
  remoteUsers(res: any): User[] {
    let users: User[] = [];
    for (let user of res) {
      users.push(new User(user.id, user.phone, user.user_name, user.time_account))
    }
    return users;
  }

  // Gets single User based on ID.
  getUser(userid: number) {
    return this.http.get(this.apiGetUserUrl(userid)).pipe(map(this.remoteUsers));
  }

  
  // Ends records from Service register based on ID and HOURS.
  endRegisterRecord(id: number, hours: number, rating: number, endRecord: EndRegisterRecord){
    return this.http.put(this.apiEndServiceRegisterUrl(id, hours, rating), endRecord)
  }

  // Save service in Services table.
  saveCreatedService(offer: Service) {
    return this.http.post(this.apiAddServiceUrl, offer);
  }
 // Gets single ServiceRegister based on ID.
 getServiceRegisterId(service_id: number) {
  return this.http.get(this.apiGetServiceRegisterIdUrl(service_id)).pipe(map(this.remoteUsers));
}

}
