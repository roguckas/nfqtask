let array = [];

const deleteData = () =>
{
    window.localStorage.clear();
    window.location.reload();
    return array = [];
};

//Level 1 sorting.
const sortData = () =>
{
    array.sort(function (a, b) {
        const specialistA = a.specialist; // ignore upper and lowercase
        const specialistB = b.specialist; // ignore upper and lowercase
        if (specialistA < specialistB) {
            return -1;
        }
        if (specialistA > specialistB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
    array.sort(function(a, b){return a.number - b.number});
};
//Function to fetch data from package.json file and save it to array in localStorage.
const saveExampleData = () =>
{
    fetch("./package.json").then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        array = data.customers;
        // array.push(data.customers);
        sortData();
        window.localStorage.setItem("CustomersArray", JSON.stringify(array));
        window.localStorage.setItem("key", 'true');
    });
};

let key = window.localStorage.getItem("key");

const saveInputData = () =>
{
    if (key === null)
    {
        // Fetching input data.
        const name = document.getElementById("customerName").value;
        let specialistValue = '';
        function specialistFunction()
        {
            if (document.getElementById("j_a").checked) {
                specialistValue = document.getElementById("j_a").value;
            } else if (document.getElementById("f_a").checked) {
                specialistValue = document.getElementById("f_a").value;
            } else if (document.getElementById("p_s").checked) {
                specialistValue = document.getElementById("p_s").value;
            }
            return specialistValue;
        }
        // Pushing new data to array.
        array.push({customerName:name, number:Math.floor(Math.random() * 100), specialist:specialistFunction()});
        // Function to sort data by condition: Duomenys atvaizduojami surikiuoti pagal specialistą ir tada pagal kliento numerį (švieslentės puslapis)
        sortData();
        window.localStorage.setItem("CustomersArray", JSON.stringify(array));
        document.getElementById("confirm").innerHTML = `Klientas "${name}" sėkmingai įtrauktas į laukimo eilę.`;
    }
    // Adding data on top of 'Example data'.
    else
    {
        array = JSON.parse(window.localStorage.getItem('CustomersArray'));
        const name = document.getElementById("customerName").value;
        let specialistValue = '';
        function specialistFunction()
        {
            if (document.getElementById("j_a").checked) {
                specialistValue = document.getElementById("j_a").value;
            } else if (document.getElementById("f_a").checked) {
                specialistValue = document.getElementById("f_a").value;
            } else if (document.getElementById("p_s").checked) {
                specialistValue = document.getElementById("p_s").value;
            }
            return specialistValue;
        }
        array.push({customerName:name, number:Math.floor(Math.random() * 100), specialist:specialistFunction()});
        //Sorting array
        sortData();
        window.localStorage.setItem("CustomersArray", JSON.stringify(array));
        document.getElementById("confirm").innerHTML = `Klientas "${name}" sėkmingai įtrauktas į pavyzdinių klientų laukimo eilę.`;
    }
};

const displayData = () =>
{
    //Fetching data from localStorage.
    array = JSON.parse(window.localStorage.getItem('CustomersArray'));
    //Dislaying each element.
    array.forEach(function (element)
    {
        document.getElementById("data").innerHTML += "<p id='customer'>" + "Klientas: " + element.customerName + "<br>" + "Kliento numeris: " + element.number + "<br>" + "Specialistas: " + element.specialist + "<p/>";
    });
};

// Sorting customers which by selected specialist.
const sortBySpecialist = (value) =>
{
    array = JSON.parse(window.localStorage.getItem('CustomersArray'));
    let filteredCustomersArray = array.filter(element => element.specialist === value);
    filteredCustomersArray.forEach(function (element)
    {
        document.getElementById("filtered").innerHTML += "<p>" + "Klientas: " + element.customerName + "<br>" + "Kliento numeris: " + element.number + "<br>" + "Specialistas: " + element.specialist + "<br>" + "<button id='deleteIndividual' onclick='deleteIndividualCustomer();'>Šis klientas aptarnautas</button>" + "<p/>";
    });
    window.localStorage.setItem("CustomersArrayFiltered", JSON.stringify(filteredCustomersArray));
};

const deleteIndividualCustomer = () =>
{
    let filteredArray = JSON.parse(window.localStorage.getItem('CustomersArrayFiltered'));
    array = JSON.parse(window.localStorage.getItem('CustomersArray'));
    let filteredSpecialist = '';
    filteredArray.forEach(function (element)
    {
        filteredSpecialist = element.specialist;
        return filteredSpecialist;
    });
    array = array.filter(element => element.specialist !== filteredSpecialist);
    console.log("veikia filtruotas array: ", array);
    window.localStorage.setItem("CustomersArray", JSON.stringify(array));
    window.location.reload();
};

//Deleting customers.
const deleteCustomer = () =>
{
    array = JSON.parse(window.localStorage.getItem('CustomersArray'));
    array.shift();
    console.log("After array",array);
    document.getElementById("data").innerHTML = array;
    window.localStorage.setItem("CustomersArray", JSON.stringify(array));
};
