import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContestsService {

  constructor() { }

  getActiveContests(){}
  getHeroes(){}
  getContestById(id){}
  shareEntry(){}
  vote(id,data){}
  getEntriesByContest(id){}
  uploadEntryToContest(id){}
  removeEntryFromContest(id){}


}
