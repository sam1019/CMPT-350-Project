var totalPrice = 0;
var para_array = new Array();

var head;
//var food = new Array();
var order1 = new Array();
var order2 = new Array();
var order3 = new Array();

var food1 = new Array();
var food2 = new Array();
var food3 = new Array();

// command
order1[0] = 1;
order2[0] = 1;
order3[0] = 1;

// rest name
order1[6] = 'UmiSushi';
order2[6] = 'Harveys';
order3[6] = 'ExtremePita';

// price
order1[7] = 0;
order2[7] = 0;
order3[7] = 0;

// food order
order1[8] = food1;
order2[8] = food2;
order3[8] = food3;

/*
 * JSon Format:
 * {"orderArray": [
 *        {"command": 1,
 *           "orderId": 123123,
 *           "firstName": "Tom",
 *            "lastName": "Lee",
 *            "phone": 3388438,
 *            "pickUpTime": "2013-02-01 00:00:00",
 *            "restaurant": "UmiSushi",
 *            "price":55.5,
 *            "food": [
 *                {"foodName": "chicken", "quantity": 5},
 *                {"foodName": "egg", "quantity": 2},
 *                {"foodName": "cock", "quantity": 1}
 *            ]
 *        },
 *        {
 *            "command": 1,
 *            "orderId": 456456,
 *            "firstName": "Tom",
 *            "lastName": "Lee",
 *            "phone": 3388438,
 *            "pickUpTime": "2013-02-01",
 *            "restaurant": "Harveys",
 *            "price":12.5,
 *            "food": [
 *                {"foodName": "fruit", "quantity": 5},
 *                {"foodName": "juice", "quantity": 2},
 *                {"foodName": "coffee", "quantity": 1}
 *            ]
 *        }
 * ]}
 */


/*
 * add selected food into shopping cart
 */
function addToCart(resturantName, foodName, foodPrice) {
    //alert(foodName);
    //alert(foodPrice);
    alert("Added To Shopping Cart");

    $('#cart_list').append('<li id="' + foodName + '"><a><h4>' + foodName + '</h4><p>' + resturantName +
        '</p><p> $' + foodPrice + '</p><a href="#" class="ui-icon-delete" onclick="removeFood(' + "'" + resturantName + "'," + "'" + foodName + "'," + foodPrice + ')"></a></a></li>');

    culculateTotalPrice(foodPrice);

    // add data into array
    if (resturantName == 'UmiSushi') {
        order1[7] += foodPrice;
        food1[food1.length] = foodName;
    } else if (resturantName == 'Harveys') {
        order2[7] += foodPrice;
        food2[food2.length] = foodName;
    } else {
        order3[7] += foodPrice;
        food3[food3.length] = foodName;
    }

    //alert(order1[8].toString());
    //alert(order2.toString());
    //alert(order3.toString());

    $('#cart_list').listview('refresh');
}

/*
 * remove selected food from shopping cart
 */
function removeFood(resturantName, foodName, foodPrice) {
    //alert(id);
    //alert(price);

    alert("Removed From Shopping Cart");

    var removeFood = document.getElementById(foodName);
    removeFood.parentElement.removeChild(removeFood);

    foodPrice = foodPrice * (-1);
    culculateTotalPrice(foodPrice);

    // TODO:
    // Will be fixed the floating point calculation BUG!!!!!

    // modify data in array
    if (resturantName == 'UmiSushi') {
        foodPrice = parseFloat(foodPrice.toFixed(2));
        order1[7] += foodPrice;
        delete food1[food1.indexOf(foodName)];
    } else if (resturantName == 'Harveys') {
        foodPrice = parseFloat(foodPrice.toFixed(2));
        order2[7] += foodPrice;
        delete food2[food2.indexOf(foodName)];
    } else {
        foodPrice = parseFloat(foodPrice.toFixed(2));
        order3[7] += foodPrice;
        delete food3[food3.indexOf(foodName)];
    }

    alert(order1.toString());
    alert(order2.toString());
    alert(order3.toString());

    $('#cart_list').listview('refresh');
}

/*
 * calculate the total price of the shopping cart
 */
function culculateTotalPrice(price) {
    //alert("haha");
    var totalPrice = parseFloat(document.getElementById('price').innerHTML);
    var total = document.getElementById('price');
    totalPrice = parseFloat(totalPrice) + parseFloat(price);
    total.innerHTML = totalPrice.toFixed(2);
}

function checkOut() {
    // order ID
    order1[1] = 1;
    order2[1] = 1;
    order3[1] = 1;

    // First Name
    order1[2] = document.getElementById("firstname").value;
    order2[2] = document.getElementById("firstname").value;
    order3[2] = document.getElementById("firstname").value;

    // Last Name
    order1[3] = document.getElementById("lastname").value;
    order2[3] = document.getElementById("lastname").value;
    order3[3] = document.getElementById("lastname").value;

    // Phone Number
    order1[4] = document.getElementById("phonenum").value;
    order2[4] = document.getElementById("phonenum").value;
    order3[4] = document.getElementById("phonenum").value;

    // Pickup Time
    order1[5] = document.getElementById("bday").value;
    order2[5] = document.getElementById("bday").value;
    order3[5] = document.getElementById("bday").value;

    alert(order1.toString());
    alert(order2.toString());
    alert(order3.toString());

    var sentoutdata = "{\"orderArray\":[";
    sentoutdata += "{\"command\":1,";
    sentoutdata += "\"orderId\":0001,";
    sentoutdata += "\"firstName\":\"" + order1[2] + "\",";
    sentoutdata += "\"lastName\":\"" + order1[3] + "\",";
    sentoutdata += "\"phone\":" + order1[4] + ",";
    sentoutdata += "\"pickeUpTime\":\"" + order1[5] + "\",";
    sentoutdata += "\"restaurant\":\"UmiSushi\",";
    sentoutdata += "\"price\":" + order1[7] + ",";
    sentoutdata += "\"food\":[";


    for (var i = 0; i < food1.length; i++) {
        if (food1[i] != undefined) {
            sentoutdata += "{\"foodName\":\"" + food1[i] + "\",\"quantity\":1},";
        }
    }

    sentoutdata += "]},";


    sentoutdata += "{\"command\":1,";
    sentoutdata += "\"orderId\":0001,";
    sentoutdata += "\"firstName\":\"" + order2[2] + "\",";
    sentoutdata += "\"lastName\":\"" + order2[3] + "\",";
    sentoutdata += "\"phone\":" + order2[4] + ",";
    sentoutdata += "\"pickeUpTime\":\"" + order2[5] + "\",";
    sentoutdata += "\"restaurant\":\"" + order2[6] + "\",";
    sentoutdata += "\"price\":" + order2[7] + ",";
    sentoutdata += "\"food\":[";


    for (var i = 0; i < food2.length; i++) {
        if (food2[i] != undefined) {
            sentoutdata += "{\"foodName\":\"" + food2[i] + "\",\"quantity\":1},";
        }
    }

    sentoutdata += "]},";


    sentoutdata += "{\"command\":1,";
    sentoutdata += "\"orderId\":0001,";
    sentoutdata += "\"firstName\":\"" + order3[2] + "\",";
    sentoutdata += "\"lastName\":\"" + order3[3] + "\",";
    sentoutdata += "\"phone\":" + order3[4] + ",";
    sentoutdata += "\"pickeUpTime\":\"" + order3[5] + "\",";
    sentoutdata += "\"restaurant\":\"" + order3[6] + "\",";
    sentoutdata += "\"price\":" + order3[7] + ",";
    sentoutdata += "\"food\":[";


    for (var i = 0; i < food3.length; i++) {
        if (food3[i] != undefined) {
            sentoutdata += "{\"foodName\":\"" + food3[i] + "\",\"quantity\":1},";
        }
    }

    sentoutdata += "]}]}";
    alert(sentoutdata);
}

function sendOrder() {
    //alert('haha');
    //alert(para_array.toString())
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/CMPT350A3/A3S?books=" + para_array.toString() + "&action=order", false);
    request.send();

    //alert(request.responseText);
    var addedHTML = document.getElementById('response');
    addedHTML.innerHTML = request.responseText;
}