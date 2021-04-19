
var nav = ["home", "employee_list", "add_employee", "update_employee", "delete_employee"];
var gid;
$('body').on('click', "#home_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#home").css("display", "block");

});

$('body').on('click', "#employee_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    add();
    $("#employee_list").css("display", "block");


});

$('body').on('click', "#add_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#add_employee").css("display", "block");

});

$('body').on('click', "#update_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#update_employee").css("display", "block");
});


$('body').on('click', "#delete_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#delete_employee").css("display", "block");
});

                               // to add data in GUI
 function add() {
    fetch('http://localhost:57852/api/values')
        .then(response => response.json())
        .then(data => {
           
                console.log('hi');
                var list = JSON.parse(data);
                var j = 1;
                var text = '';
                for (let i of list) {
                    text += '<tr><td>' + j + '</td ><td>' + i.emp_code + '</td ><td>' + i.name + '</td ><td>' + i.email + '</td><td>' + i.designation + '</td><td>' + i.join_date + '</td><td><i class="fa fa-pencil text-primary" onclick="edit(' + i.id + ')"></i> <i class="fa fa-trash ml-1 text-danger" onclick="del('+i.id+')"></i></td></tr>';
                    j++;
                }
            $('#emplist').html(text);
            
        });
}

function del (v)
{
    console.log(typeof v);
    fetch('http://localhost:57852/api/values/' + v, {method:'DELETE'})
        .then(response => response.json())
            .then(data => {

                console.log('hi');
                var list = JSON.parse(data);
                var j = 1;
                var text = '';
                for (let i of list) {
                    text += '<tr><td>' + j + '</td ><td>' + i.emp_code + '</td ><td>' + i.name + '</td ><td>' + i.email + '</td><td>' + i.designation + '</td><td>' + i.join_date + '</td><td><i class="fa fa-pencil text-primary" onclick="edit(' + i.id + ')"></i> <i class="fa fa-trash ml-1 text-danger" onclick="del(' + i.id + ')"></i></td></tr>';
                    j++;
                }
                $('#emplist').html(text);

            });

}

function addemployee(data){
  
    fetch('http://localhost:57852/api/values/', {
        method: 'POST', body: JSON.stringify(data), headers: {
            "Content-type": "application/json; charset=UTF-8"
        }})
        .then(response => response.json())
        .then(data => {
            console.log(data);

        });

}

function saveemployee() {
    var obj = {};
    obj.emp_code = document.getElementById('empcode').value;
    obj.name = document.getElementById('ename').value;
    obj.email = document.getElementById('email').value;
    obj.designation = document.getElementById('designation').value;
    obj.join_date = document.getElementById('Join_date').value;
    obj.padd1 = document.getElementById('padd1').value;
    obj.padd2 = document.getElementById('padd2').value;
    obj.cadd1 = document.getElementById('cadd1').value;
    obj.cadd2 = document.getElementById('cadd2').value;
   // obj.emp_code = "3567";
    console.log(obj);
    addemployee(obj);

}


function update() {
    var obj = {};
    obj.emp_code = document.getElementById('ecode').value;
    obj.name = document.getElementById('ename1').value;
    obj.email = document.getElementById('email1').value;
    obj.designation = document.getElementById('designation1').value;
    obj.join_date = document.getElementById('Join_date1').value;
    obj.padd1 = document.getElementById('padd11').value;
    obj.padd2 = document.getElementById('padd22').value;
    obj.cadd1 = document.getElementById('cadd11').value;
    obj.cadd2 = document.getElementById('cadd22').value;
    console.log(obj);
        fetch('http://localhost:57852/api/values/'+gid, {
            method: 'PUT', body: JSON.stringify(obj), headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())     // convert data in Json formate to make it readable
            .then(data => {                               // to get actual data in javascript formate
                console.log(gid);
                console.log(data);
                gid = null;

            });

    }

function edit(id) {

    fetch('http://localhost:57852/api/values/' + id, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            //document.getElementById('per11').checked = false;
            //document.getElementById('per23').checked = false;

            console.log('hi');
            var list = JSON.parse(data);
            list = list[0];
            console.log(list)
            gid = id;
            document.getElementById('ecode').value = list.emp_code;
            document.getElementById('ename1').value = list.name;
            document.getElementById('email1').value = list.email;
            document.getElementById('designation1').value = list.designation;
            document.getElementById('Join_date1').value = list.join_date;
           // if (list.padd1 != '' && list.padd2 != '') {
             //   document.getElementById('per11').checked = true;
           // }
           // if (list.cadd1 != '' && list.cadd2 != '') {
              //  document.getElementById('per23').checked = true;
           // }
            document.getElementById('padd11').value = list.padd1;
            document.getElementById('padd22').value = list.padd2;
            document.getElementById('cadd11').value = list.cadd1;
            document.getElementById('cadd22').value = list.cadd2;
            for (let i of nav) {
                $("#" + i).css("display", "none");
            }
            $("#update_employee").css("display", "block");

        });


}

function search(v) {
    console.log(document.getElementById(v).value);

}

function plus() {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#add_employee").css("display", "block");

}
