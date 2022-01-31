import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    
  }
  title = 'ng-a11y-trap';
  sortingOptions = [
    'Send On Ascending',
    'Send On Descending',
    'From Ascending',
    'From Descending',
    'To Ascending',
    'To Descending',
    'Status Ascending',
    'Status Descending',
    'Amount Ascending',
    'Amount Descending',
  ];
  filterOptions = [
    'All Transfers',
    'On Hold',
    'Completed',
    'Stopped',
    'Declined',
    'Failed',
    'Rejected',
    'Pending',
    'Canceled',
    'In Process',
    'Recurring Transfers',
  ];
  minDateFrom = new Date(new Date().setMonth(new Date().getMonth() - 6));
  maxDateFrom = new Date(new Date().setDate(new Date().getDate() - 1));
  minDateTo = new Date(new Date().setDate(new Date().getDate() - 1));
  maxDateTo = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  clearFilter() {}
  applyFilter() {}
  closeFilter() {}
}
