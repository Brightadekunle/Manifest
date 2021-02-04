var express =  require('express');
var cors = require('cors');
var path = require('path');
var ejsLayouts = require('express-ejs-layouts');

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(ejsLayouts);

app.set('port', (process.env.PORT || 8080));

// INDEX PAGE
app.get('/', function(request, res) {

  var employeeCategory = []
  var employeeStatus = []
  var employeeEngineeringCategory = []
  var employees = [
    { "id": 1,"firstName":"Bob","lastName":"Smith", "email":"bob@gmail.com", "yearsOfExperience": "5", "category": "Product Design", "manager": "Babatope Olajide", "status": "Activated", "createdDate": "4-1-2019" },
    { "id": 2,"firstName":"John","lastName":"Jones", "email":"jj@yahoo.com", "yearsOfExperience": "2", "category": "Engineering", "manager": "Adeyemi Joshua", "status": "Pending", "createdDate": "4-2-2020" },
    { "id": 2,"firstName":"James","lastName":"Fortune", "email":"jfortune@yahoo.com", "yearsOfExperience": "10", "category": "Engineering", "manager": "Adeyemi Joshua", "status": "Activated", "createdDate": "4-2-2020" },
    { "id": 3,"firstName":"Tim","lastName":"Berners", "email":"timberners@hotmail.com", "yearsOfExperience": "8", "category": "Engineering", "manager": "Babatope Olajide", "status": "Activated", "createdDate": "4-2-2016" }];
  
  
  employees.forEach(employee => {
      employeeCategory.push(employee.category)
      if (employee.status == "Activated"){
        employeeStatus.push(employee.status)
      }

      if (employee.category == "Engineering"){
        employeeEngineeringCategory.push(employee)
      }
      
    })
    res.render('pages/index', { title: "Homepage", employees, employeeCategory, employeeStatus, employeeEngineeringCategory, layout: 'layouts/main' })
});


// GET ONE EMPLOYEE
app.get('/api/v1/employee/:employee_id', function(req, res, next) {
  // Hard coding for simplicity. Pretend this hits a real database to get all authors in the system
  // dummy author response - no need to call database
  var employee = {"id": 1,"firstName":"Smith","lastName":"Bright","email":"bright@gmail.com", "yearsOfExperience": "5", "category": "Engineering", "manager": "Babatope Olajide", "createdDate": "4-2-2021" };
  // change id = 2 and test for when :author_id
  res.render('pages/employee_detail', { title: 'Employee Details', employee: employee, layout: 'layouts/detail'} );
});

// GET ALL EMPLOYEES
app.get('/api/v1/employees', function(req, res) {
    // Hard coding for simplicity. Pretend this hits a real database to get all authors in the system
   // dummy authors response - no need to call database
   var employees = [
    { "id": 1,"firstName":"Bob","lastName":"Smith", "email":"bob@gmail.com", "yearsOfExperience": "5", "category": "Product Design", "manager": "Babatope Olajide", "status": "Activated", "createdDate": "4-1-2019" },
    { "id": 2,"firstName":"John","lastName":"Jones", "email":"jj@yahoo.com", "yearsOfExperience": "2", "category": "Engineering", "manager": "Adeyemi Joshua", "status": "Pending", "createdDate": "4-2-2020" },
    { "id": 2,"firstName":"James","lastName":"Fortune", "email":"jfortune@yahoo.com", "yearsOfExperience": "10", "category": "Engineering", "manager": "Adeyemi Joshua", "status": "Activated", "createdDate": "4-2-2020" },
    { "id": 3,"firstName":"Tim","lastName":"Berners", "email":"timberners@hotmail.com", "yearsOfExperience": "8", "category": "Engineering", "manager": "Babatope Olajide", "status": "Activated", "createdDate": "4-2-2016" }];
  res.render('pages/employee_list', { title: 'Employee List', employees: employees, layout: 'layouts/detail'} );
});

// GET ALL EMPLOYEES THAT BELONGS TO A SPECIFIC MANAGER
app.get('/api/v1/employees/manager', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database to get all authors in the system
 // dummy authors response - no need to call database

 var employees = [
  { "id": 1,"firstName":"Bob","lastName":"Smith", "email":"bob@gmail.com", "yearsOfExperience": "5", "category": "Product Design", "manager": "Babatope Olajide", "status": "Activated", "createdDate": "4-1-2019" },
  { "id": 2,"firstName":"John","lastName":"Jones", "email":"jj@yahoo.com", "yearsOfExperience": "2", "category": "Engineering", "manager": "Adeyemi Joshua", "status": "Pending", "createdDate": "4-2-2020" },
  { "id": 2,"firstName":"James","lastName":"Fortune", "email":"jfortune@yahoo.com", "yearsOfExperience": "10", "category": "Engineering", "manager": "Adeyemi Joshua", "status": "Activated", "createdDate": "4-2-2020" },
  { "id": 3,"firstName":"Tim","lastName":"Berners", "email":"timberners@hotmail.com", "yearsOfExperience": "8", "category": "Engineering", "manager": "Babatope Olajide", "status": "Activated", "createdDate": "4-2-2016" }];

  res.render('pages/employee_list', { title: 'Employee Manager', employees: employees,  layout: 'layouts/detail'} );
});

// GET ALL EMPLOYEES THAT BELONGS TO A CATEGORY
app.get('/api/v1/employees/category', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database to get all authors in the system
 // dummy authors response - no need to call database

 var employees = [
  { "id": 1,"firstName":"Bob","lastName":"Smith", "email":"bob@gmail.com", "yearsOfExperience": "5", "category": "Product Design", "manager": "Babatope Olajide", "status": "Activated", "createdDate": "4-1-2019" },
  { "id": 2,"firstName":"John","lastName":"Jones", "email":"jj@yahoo.com", "yearsOfExperience": "2", "category": "Engineering", "manager": "Adeyemi Joshua", "status": "Pending", "createdDate": "4-2-2020" },
  { "id": 2,"firstName":"James","lastName":"Fortune", "email":"jfortune@yahoo.com", "yearsOfExperience": "10", "category": "Engineering", "manager": "Adeyemi Joshua", "status": "Activated", "createdDate": "4-2-2020" },
  { "id": 3,"firstName":"Tim","lastName":"Berners", "email":"timberners@hotmail.com", "yearsOfExperience": "8", "category": "Engineering", "manager": "Babatope Olajide", "status": "Activated", "createdDate": "4-2-2016" }];

  res.render('pages/employee_list', { title: 'Employee Category', employees: employees,  layout: 'layouts/detail'} );
});

// GET ALL EMPLOYEES THAT BELONGS TO A PARTICULAR STATUS
app.get('/api/v1/employees/status', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database to get all authors in the system
 // dummy authors response - no need to call database

 var employees = [
  { "id": 1,"firstName":"Bob","lastName":"Smith", "email":"bob@gmail.com", "yearsOfExperience": "5", "category": "Product Design", "manager": "Babatope Olajide", "status": "Activated", "createdDate": "4-1-2019" },
  { "id": 2,"firstName":"John","lastName":"Jones", "email":"jj@yahoo.com", "yearsOfExperience": "2", "category": "Engineering", "manager": "Adeyemi Joshua", "status": "Pending", "createdDate": "4-2-2020" },
  { "id": 2,"firstName":"James","lastName":"Fortune", "email":"jfortune@yahoo.com", "yearsOfExperience": "10", "category": "Engineering", "manager": "Adeyemi Joshua", "status": "Activated", "createdDate": "4-2-2020" },
  { "id": 3,"firstName":"Tim","lastName":"Berners", "email":"timberners@hotmail.com", "yearsOfExperience": "8", "category": "Engineering", "manager": "Babatope Olajide", "status": "Activated", "createdDate": "4-2-2016" }];

res.render('pages/employee_list', { title: 'Employee Status', employees: employees,  layout: 'layouts/detail'} );
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});