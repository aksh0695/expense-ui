import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-expense-home',
  templateUrl: './expense-home.component.html',
  styleUrls: ['./expense-home.component.css']
})
export class ExpenseHomeComponent implements OnChanges {
  selectedRoute = "default value";

  tableData = [{'detail':'Utility','cost':20,'expenseType':'Expense','expenseSource':'Splitwise'},
  {'detail':'Rental Income','cost':1000,'expenseType':'Income','expenseSource':'Expense App'},
  {'detail':'Food','cost':10,'expenseType':'Expense','expenseSource':'Expense App'}]

  changeRoute(route: string) {
    this.selectedRoute = route;
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  chartOptions1 = {
	  animationEnabled: true,
	  title: {
		text: "Expense chart for current month"
	  },
	  data: [{
		type: "pie",
		startAngle: -90,
		indexLabel: "{name}: {y}",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 14.1, name: "Gas" },
		  { y: 28.2, name: "Electricity" },
		  { y: 14.4, name: "Groceries" },
		  { y: 43.3, name: "Rent" }
		]
	  }]
	}

  chartOptions2 = {
    animationEnabled: true,
    theme: "dark2",
    colorSet: "customColorSet",
    title:{
      text: "Overall Income of the current month"
    },
    data: [{
      type: "doughnut",
      indexLabel: "{name}: {y}",
      innerRadius: "90%",
      yValueFormatString: "#,##0.00'%'",
      dataPoints: [
      { y: 33, name: "Salary" },
      { y: 25, name: "Rental" },
      { y: 13.5, name: "Capital Gain" },
      { y: 11, name: "Divedent" },
      { y: 7.7, name: "Business" },
      { y: 5.5, name: "Royalities" },
      { y: 4, name: "Interest" },
      { y: 0.3, name: "Investments" }
      ]
    }]
    }
    displayStyle = "none";

    openPopup() {
      this.displayStyle = "block";
    }
    closePopup() {
      this.displayStyle = "none";
    }
  chartOptions = this.chartOptions1;
}
