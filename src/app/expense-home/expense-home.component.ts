import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { IResponse, ITransactionDetail,IChartDisplayData } from '../interface/IResponse';

@Component({
  selector: 'app-expense-home',
  templateUrl: './expense-home.component.html',
  styleUrls: ['./expense-home.component.css']
})
export class ExpenseHomeComponent implements OnChanges {
  selectedRoute = "default value";


  constructor(private service:PostService,private router: Router) {
    console.log("called constructor");
  }
  
  private userId: number;
  tableValues: ITransactionDetail[]; 
  expenseChartData: IChartDisplayData[] = [];
  incomeChartData: IChartDisplayData[] = [];
  incomeCategoryMap:Map<String,number> = new Map<String,number>();
  expenseCategoryMap:Map<String,number> = new Map<String,number>();
  expenseChart: any;
  incomeChart: any;
  

  tableData = [{'detail':'Utility','cost':20,'expenseType':'Expense','expenseSource':'Splitwise'},
  {'detail':'Rental Income','cost':1000,'expenseType':'Income','expenseSource':'Expense App'},
  {'detail':'Food','cost':10,'expenseType':'Expense','expenseSource':'Expense App'}]

  changeRoute(route: string) {
    this.selectedRoute = route;
  }
  ngOnChanges(changes: SimpleChanges): void {

  }



  ngOnInit() {
    console.log("called ng init");
    this.tableValues = [];
    let totalIncome: number = 0;
    let totalExpense: number = 0;
    console.log(localStorage.getItem('user'));
    let userObject = localStorage.getItem('user');
    if(userObject != null){
      console.log("user id is" + userObject);
      this.userId = Number(userObject);
      if(this.userId != 0 || this.userId != null){
        this.service.getUserDetails<IResponse>(this.userId).subscribe(x =>{
          console.log('user details : ' + x.responseBody[0]);
          x.responseBody.forEach((element: ITransactionDetail) => {
            const transactionDetail: ITransactionDetail = element as ITransactionDetail;
            console.log('trasanction detail : ' + JSON.stringify(transactionDetail));
            this.tableValues.push(transactionDetail);
            console.log('table detail: ' + JSON.stringify(this.tableValues));

            if(element.transactionType == 'EXPENSE'){
              totalExpense+= element.trasactionCost;
              let existingVal = this.expenseCategoryMap.get(element.transactionDetail);
              if(this.expenseCategoryMap.has(element.transactionDetail) && existingVal != undefined){
                  this.expenseCategoryMap.set(element.transactionDetail,existingVal+element.trasactionCost);
              }else{
                this.expenseCategoryMap.set(element.transactionDetail,element.trasactionCost);
              }
            }
            if(element.transactionType == 'INCOME'){
              totalIncome+= element.trasactionCost;
              let existingVal = this.incomeCategoryMap.get(element.transactionDetail);
              if(this.incomeCategoryMap.has(element.transactionDetail) && existingVal != undefined){
                  this.incomeCategoryMap.set(element.transactionDetail,existingVal+element.trasactionCost);
              }else{
                this.incomeCategoryMap.set(element.transactionDetail,element.trasactionCost);
              }
            }
          });
        
          console.log('expense map log: ' +  [...this.expenseCategoryMap.entries()]);
          console.log('income map log: ' + [...this.incomeCategoryMap.entries()]);

          for(let entry of this.expenseCategoryMap.entries()){
            let percentage:number = Number(((entry[1]/totalExpense)*100).toFixed(2));
            
            const chartOption: IChartDisplayData = {
              y: percentage,
              name: entry[0]
            }
            this.expenseChartData.push(chartOption);
          }
    
          for(let entry of this.incomeCategoryMap.entries()){
            let percentage:number = Number(((entry[1]/totalIncome)*100).toFixed(2));
            const chartOption: IChartDisplayData = {
              y: percentage,
              name: entry[0]
            }
            this.incomeChartData.push(chartOption);
          }
    
          console.log('expense chart data: ' +  JSON.stringify(this.expenseChartData));
          console.log('income chart data: ' + JSON.stringify(this.incomeChartData));

          this.expenseChartOptions = this.chartOptions1;
          this.incomeChartOptions = this.chartOptions2;

          this.expenseChart.render();
          this.incomeChart.render();
          }
      );
          
      

      }
    }
    
  }
   
  getExpenseChartInstance(chart: object){
    this.expenseChart = chart;
    this.expenseChart.render();
  }

  getIncomeChartInstance(chart: object){
    this.incomeChart = chart;
    this.incomeChart.render();
  }
  populateExpenseChart(expenseChartData: IChartDisplayData[]){

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
		dataPoints: this.expenseChartData
	  }]
	}

  chartOptions2 = {
    animationEnabled: true,
    //theme: "dark2",
    colorSet: "customColorSet",
    title:{
      text: "Overall Income of the current month"
    },
    data: [{
      type: "doughnut",
      indexLabel: "{name}: {y}",
      innerRadius: "90%",
      yValueFormatString: "#,##0.00'%'",
      dataPoints: this.incomeChartData
    }]
    }
    displayStyle = "none";

    openPopup() {
      this.displayStyle = "block";
    }
    closePopup() {
      this.displayStyle = "none";
    }

    expenseChartOptions = this.chartOptions1;
    incomeChartOptions :any = this.chartOptions2;
  
}
