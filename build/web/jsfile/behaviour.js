
//==================================================First sliding image=============================================
let image = document.getElementById('images');
let images = ["images/iesalluminai1.jpg", "images/iesalluminai2.jpg", "images/iesalluminai3.jpg", "images/iesalluminai4.jpg"];
setInterval(function ()
{
    let random = Math.floor(Math.random() * 4);
    image.src = images[random];
}, 10000);


//===========================================Add alumni=================================
//==========================================alumni slider================================2  
 var userid;
 var password;


var carousel = $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1,
            nav: false
        },
        600: {
            items: 2,
            nav: false
        },
        1000: {
            items: 3,
            nav: false
        }
    }
});

//=================================================alumni slider ended==================================

function openForm() {
    let form = `
    <h2 id="top-Text-id"> Alumni Adding form</h2>
    <div class="closeIcon" onclick="closeForm1()">&#x2716;</div>
    <div class="inputs">
      <input type="text" id="name" class="forminputs" placeholder="Enter Full Name"><br>
      <input type="text" id="c_name" class="forminputs" placeholder="Enter Company Name"><br>
      <input type="text" id="linked_id" class="forminputs" placeholder="Enter linked id URL">
      <label for="dog-names">Uplod image:</label> 
      <input type="file" id="imageInput" capture="camera" class="forminputs" accept="image/*" />
      <label for="dog-names">Choose Branch:</label> 
      <select name="dog-names forminputs" id="branch-options" class="forminputs">  
        <option value="CSE">CSE</option> 
        <option value="EX">EX</option> 
        <option value="EC">EC</option>
        <option value="ME">ME</option> 
        <option value="Civil">Civil</option> 
      </select>
       <label for="dateinputs">Select Passing Year:</label>
      <input type="number" min="2010" max="2024" step="1"value="2020" id="dateinputs"class="forminputs"/>
      <button type="submit" onclick="addAlumni()"id="addingalumni">Next</button>
    </div>
  `
    document.getElementById("inputform").innerHTML = form;
    document.getElementById("inputform").style.display = "block";
    document.getElementById("main-body").style.pointerEvents = "none";


    setInterval(() => {
        var result = validateInputs();
        if (result === "yes") {
            document.getElementById("inputform").style.height = '530px';
            hideFun();
        } else {
            $("#addingalumni").hide("slow");
            if (result === "Only JPEG, PNG, and GIF images are allowed.") {
                Swal.fire({
                    title: "Sorry!",
                    text: "Only JPEG, PNG, and GIF images are allowed.!!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000 // Display the message for 1 second
                });
            }
        }
    }, 1)

    function hideFun()
    {
        $("#addingalumni").show("slow");
    }

}

function closeForm1() {
//    document.getElementById("inputform").innerHTML = "";
    document.getElementById("inputform").style.display = "none";
    document.getElementById("main-body").style.pointerEvents = "all";
}
function closeForm2() {
//    document.getElementById("useridandpassword").innerHTML = "";
    document.getElementById("useridandpassword").style.display = "none";
    document.getElementById("main-body").style.pointerEvents = "all";
}

function validateInputs() {

    var name = document.querySelector("#name").value;
    var c_name = document.querySelector("#c_name").value;
    var linked_id = document.querySelector("#linked_id").value;
    var imageFile = $('#imageInput')[0].files[0];

    if (name != "" && c_name != "" && linked_id != "" && imageFile) {
        return "yes";
//        let allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//        if (!allowedTypes.includes(imageFile.type)) {
//            return "Only JPEG, PNG, and GIF images are allowed.";
//        }
    } else
    {
        return "Invalid Please input all the fields";
    }

}

var Name;
var c_name;
var linked_id;
var branch;
var batch;
var imageFile;

function addAlumni() {
    Name = document.querySelector("#name").value;
    c_name = document.querySelector("#c_name").value;
    linked_id = document.querySelector("#linked_id").value;
    branch = document.querySelector("#branch-options").value;
    batch = document.querySelector("#dateinputs").value;
    imageFile = $('#imageInput')[0].files[0];

    document.getElementById("inputform").style.visibility = "hidden";

    let form = `
    <h2 id="top-Text-id"> Admin Validation form</h2>
    <div class="closeIcon" onclick="closeForm2()">&#x2716;</div>
    <div class="inputs">
      <input type="text" id="userid" class="forminputs" placeholder="Enter User Id"><br>
      <input type="password" id="password" class="forminputs" placeholder="Enter Password"><br>
      <button type="submit" onclick="validateUser()" id="addingalumnimain">Admin Validation</button>
    </div>
  `;

    setInterval(() => {
        if (validateAdminInputs() === true) {
            hideFun();
            document.getElementById("useridandpassword").style.height = '260px';
        } else {
            document.getElementById("useridandpassword").style.height = '190px';
            $("#addingalumnimain").hide("slow");

        }
    }, 1);

    function hideFun() {
        $("#addingalumnimain").show("slow");
        document.getElementById("useridandpassword").style.height = '190px';
    }

    document.getElementById("useridandpassword").innerHTML = form;
    document.getElementById("useridandpassword").style.display = "block";
    document.getElementById("main-body").style.pointerEvents = "none";
}


function validateAdminInputs() {
//    alert("admin")
     userid = document.querySelector("#userid").value;
     password = document.querySelector("#password").value;

    if (userid != "" && password != "")
        return true;
    else
        return false;
}

function validateUser() {

    var userid = document.querySelector("#userid").value;
    var password = document.querySelector("#password").value;

    var admin = {
        userid: userid,
        password: password
    };
    $.ajax({
        url: "ValidateAdminController", // my Registration servlet
        type: "POST",
        data: admin,
        success: function (response) {

            response = response.trim();
            if (response === "yes")
            {
                addingAlumniFinally();
            } else {

                Swal.fire({
                    title: "Sorry!",
                    text: "Invalid User'id And Password!!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000 // Display the message for 1 second
                });
            }
        },
        error: function (xhr, status, error) {
            // Handle errors of the servlet response
            console.log("Request failed");
            console.log(error);
        },
    });

}


function addingAlumniFinally() {


    Name = document.querySelector("#name").value;
    c_name = document.querySelector("#c_name").value;
    linked_id = document.querySelector("#linked_id").value;
    branch = document.querySelector("#branch-options").value;
    batch = document.querySelector("#dateinputs").value;
    const formData = new FormData();
    imageFile = $('#imageInput')[0].files[0];

    closeForm1();
    closeForm2();
    formData.append('image', imageFile);
    formData.append('name', Name);
    formData.append('c_name', c_name);
    formData.append('linked_id', linked_id);
    formData.append('branch', branch);
    formData.append('batch', batch);
    const reader = new FileReader();
    reader.onload = function () {
        const imageData = reader.result.split(',')[1]; // Get the base64 data part
        formData.append('imageData', imageData);

        $.ajax({
            url: 'AddNewAlumniController', // Replace with the servlet URL
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {

                data = data.trim();
                if (data === "yes") {
                    Swal.fire({
                        title: "success!",
                        text: "Alumni added successfully Thank you!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500 // Display the message for 1 second
                    });
                    searchAlumni();
                } else {
                    Swal.fire({
                        title: "Sorry!",
                        text: "Due to Server issues Alumni not Added Please Try again!",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2500 // Display the message for 1 second
                    });
                }
            },
            error: function (xhr, status, error) {
                consol.log("Error is occured");
            }
        });
    };
    reader.readAsDataURL(imageFile);
}


//==================================================Search Alumni=============================================

$(document).ready(function () {
    searchAlumni();
});
function searchAlumni()
{

    var branch = document.getElementById("branch-selecter").value;
    var branche = {
        branche: branch
    };
    $.ajax({
        url: "SearchAlumniController", // my Registration servlet
        type: "POST",
        data: branche,
        success: function (response) {
            response = response.trim();

            if (response !== "")
            {
                $("#alumniList-Id").html(response);
                reloadCarousel();
            } else {

                Swal.fire({
                    title: "Sorry!",
                    text: "There is no Alumni in this branch!!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000 // Display the message for 1 second
                });
            }
        },
        error: function (xhr, status, error) {
            // Handle errors of the servlet response
            console.log("Request failed");
            console.log(error);
        },
    });
}


function reloadCarousel() {
    carousel.trigger("destroy.owl.carousel"); // Destroy the existing carousel
    // Reinitialize the carousel with updated options
    carousel.owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2500,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
}

//==================================================Add alumni=============================================



//=======================================================Edit alumni started===========================================



//=======================================================Edit alumni ended===========================================
//=================================Edit alumni started ==================================

function EditAlumni() {

    let form = `
     <h2 id="top-Text-id"> Admin Validation form</h2>
    <div class="closeIcon" onclick="closeForm2()">&#x2716;</div>
    <div class="inputs">
      <input type="text" id="userid" class="forminputs" placeholder="Enter User Id"><br>
      <input type="password" id="password" class="forminputs" placeholder="Enter Password"><br>
      <button type="submit" onclick="validateAdmin()" id="addingalumnimain">Admin Validation</button>
    </div>
  `;

    setInterval(() => {
        if (validateAdminInputs() === true) {
            hideFun();
            document.getElementById("useridandpassword").style.height = '260px';
        } else {
            document.getElementById("useridandpassword").style.height = '190px';
            $("#addingalumnimain").hide("slow");
        }
    }, 1);

    function hideFun() {
        $("#addingalumnimain").show("slow");

    }

    document.getElementById("useridandpassword").innerHTML = form;
    document.getElementById("useridandpassword").style.display = "block";
    document.getElementById("main-body").style.pointerEvents = "none";
}


function validateAdmin() {

    var userid = document.querySelector("#userid").value;
    var password = document.querySelector("#password").value;

    var admin = {
        userid: userid,
        password: password
    };
    $.ajax({
        url: "ValidateAdminController", // my Registration servlet
        type: "POST",
        data: admin,
        success: function (response) {

            response = response.trim();
            if (response === "yes")
            {
                showEditableJspFun();
                closeForm2();

            } else {

                Swal.fire({
                    title: "Sorry!",
                    text: "Invalid User'id And Password!!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000 // Display the message for 1 second
                });
            }
        },
        error: function (xhr, status, error) {
            // Handle errors of the servlet response
            console.log("Request failed");
            console.log(error);
        },
    });

}

function showEditableJspFun() {
    var CloseBtn = `<button type="button" id="add-alumni-btn"onclick="closeEditAlumni()">Close Edit Alumni</button>`;
    document.getElementById("edit-alumni-id").innerHTML = CloseBtn;
    var branche = {
        branche: "all"
    };
    $.ajax({
        url: "EditingServletController", // my Registration servlet
        type: "POST",
        data: branche,
        success: function (response) {
            response = response.trim();

            if (response !== "")
            {
                $("#alumniList-Id").html(response);
                reloadCarousel();
                Swal.fire({
                    title: "success!",
                    text: "Now you can Edit!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500 // Display the message for 1 second
                })
            } else {

                Swal.fire({
                    title: "Sorry!",
                    text: "There is no Alumni now!!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000 // Display the message for 1 second
                }).then(function () {
                    closeEditAlumni();
                });
            }
        },
        error: function (xhr, status, error) {
            // Handle errors of the servlet response
            console.log("Request failed");
            console.log(error);
        },
    });
}



//=================================Edit alumni ended ==================================








const editButtons = document.querySelectorAll('.edit');
const deleteButtons = document.querySelectorAll('.delete');
const cancelButtons = document.querySelectorAll('.cancel');

editButtons.forEach(button => button.addEventListener('click', editFun));
deleteButtons.forEach(button => button.addEventListener('click', deleteFun));
cancelButtons.forEach(button => button.addEventListener('click', cancelFun));






var rid;
function editFun() {

    const cardElement = event.target.parentElement;

    // Get all the values from the card
    const name = cardElement.querySelector('.name').innerText;
    const c_name = cardElement.querySelector('.c_name').innerText;
    const batch = cardElement.querySelector('.batch').innerText;
    rid = cardElement.querySelector('.rid').innerText;
    const branch = cardElement.querySelector('.branch').innerText;
    const linkedId = cardElement.querySelector('.linkedin_id').getAttribute('href');


    // Get the Base64-encoded image data from the hidden input field

    const BatchYear = batch.match(/\d+/); // This regex matches one or more digits


    var form = `
     <h2 id="top-Text-id">Alumni Updation form</h2>
              <div class="closeIcon" onclick="closeForm1()">&#x2716;</div>
    <div class="inputs">
      <input type="text" id="name" class="forminputs" placeholder="Enter Full Name"value=` + name + `><br>
      <input type="text" id="c_name" class="forminputs" placeholder="Enter Company Name"value=` + c_name + `><br>
      <input type="text" id="linked_id" class="forminputs" placeholder="Enter linked id URL"value=` + linkedId + `>
      <label for="dog-names">Uplod image (Optional):</label> 
      <input type="file" id="imageInput" capture="camera" class="forminputs" accept="image/*" />
      <label for="dog-names">Choose Branch:</label> 
      <select name="dog-names forminputs" id="branch-options" class="forminputs"> 
        <option value="CSE">CSE</option> 
        <option value="EX">EX</option> 
        <option value="EC">EC</option>
        <option value="Me">ME</option> 
        <option value="Civil">Civil</option> 
      </select>
       <label for="dateinputs">Select Passing Year:</label>
      <input type="number" min="2010" max="2024" step="1" value=` + BatchYear + ` id="dateinputs"class="forminputs"/>
      <div id="save-cancel-btn-div-di">
        <button type="submit" onclick="updateAlumni()"id="save-alumni-id">Save</button>
      <button type="submit" onclick="cancel()"id="cancel-alumni-id">Cancel</button>    
      </div>
    </div>
          `
    isFormPopulated = false;
    reloadCarousel();
    document.getElementById("inputform").style.height = '440px';
    document.getElementById("inputform").innerHTML = form;
    document.getElementById("inputform").style.display = "block";
    document.getElementById("main-body").style.pointerEvents = "none";

    document.getElementById("inputform").style.height = '530px';
    const selectElement = document.getElementById("branch-options");
    const arr = branch.split(":");
    const Branch = arr[1].toUpperCase();
    for (let option of selectElement.options) {

        if (option.value === Branch) {
            option.selected = true;
            break; // No need to check other options if a match is found
        }
    }


}

function updateAlumni() {

    var Name = document.querySelector("#name").value;
    var c_name = document.querySelector("#c_name").value;
    var linked_id = document.querySelector("#linked_id").value;
    var branch = document.querySelector("#branch-options").value;
    var batch = document.querySelector("#dateinputs").value;
    const formData = new FormData();
    const imageFile = $('#imageInput')[0].files[0];
    closeForm1();

    var isImageGoing = true;
    alert(imageFile)
    if (imageFile != undefined)
    {

        formData.append('image', imageFile);
        formData.append('isImage', 'yes');
    } else {

        formData.append('isImage', 'no');
        isImageGoing = false;
    }
    formData.append('name', Name);

    formData.append('rid', rid);
    formData.append('c_name', c_name);
    formData.append('linked_id', linked_id);
    formData.append('branch', branch);
    formData.append('batch', batch);
    const reader = new FileReader();
    if (isImageGoing) {

        reader.onload = function () {

            const imageData = reader.result.split(',')[1]; // Get the base64 data part
            formData.append('imageData', imageData);


            $.ajax({
                url: 'UpdateAlumniController', // Replace with the servlet URL
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {

                    data = data.trim();
                    if (data === "yes") {
                        Swal.fire({
                            title: "success!",
                            text: "Alumni updated successfully Thank you!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2500 // Display the message for 1 second
                        });
                        showEditableJspFun();
                    } else {
                        Swal.fire({
                            title: "Sorry!",
                            text: "Due to Server issues Alumni can't updated Please Try again!",
                            icon: "error",
                            showConfirmButton: false,
                            timer: 2500 // Display the message for 1 second
                        });
                    }
                },
                error: function (xhr, status, error) {
                    consol.log("Error is occured");
                }
            });

        };
        reader.readAsDataURL(imageFile);
    } else {
        $.ajax({
            url: 'UpdateAlumniController', // Replace with the servlet URL
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                alert("response is " + data)
                data = data.trim();
                if (data === "yes") {
                    Swal.fire({
                        title: "success!",
                        text: "Alumni updated successfully Thank you!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500 // Display the message for 1 second
                    });
                    showEditableJspFun()
                } else {
                    Swal.fire({
                        title: "Sorry!",
                        text: "Due to Server issues Alumni can't updated Please Try again!",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2500 // Display the message for 1 second
                    });
                }
            },
            error: function (xhr, status, error) {
                consol.log("Error is occured");
            }
        });
    }

}

function closeEditAlumni() {
    searchAlumni();
    var editBtn = `<button type="button" id="add-alumni-btn"onclick="EditAlumni()">Edit Alumni</button>`;
    document.getElementById("edit-alumni-id").innerHTML = editBtn;
}



function cancel() {
    closeForm1();
    document.getElementById("main-body").style.pointerEvents = "all";
}

function deleteFun() {

    const cardElement = event.target.parentElement;
    rid = cardElement.querySelector('.rid').innerText;
    swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
    }).then(function (confirmation) {
        if (confirmation.isConfirmed === true) {
            var deletingData = {
                rid: rid
            };
            $.ajax({
                url: "DeletingAlumniController", // my deltetions servlet page
                type: "POST",
                data: deletingData,
                success: function (response) {
                    response = response.trim();
                    if (response === "yes")
                    {
                        Swal.fire({
                            title: "Success!",
                            text: "Alumni Deleted Successfully!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000 // Display the message for 1 second
                        });
                        showEditableJspFun();
                    } else {

                        Swal.fire({
                            title: "Sorry!",
                            text: "Due to Server issues can't delete alumni please try again!",
                            icon: "error",
                            showConfirmButton: false,
                            timer: 2000 // Display the message for 1 second
                        });
                    }
                },
                error: function (xhr, status, error) {
                    // Handle errors of the servlet response
                    console.log("Request failed");
                    console.log(error);
                },
            });
        } else {

            Swal.fire({
                title: "Success!",
                text: "Alumni not Deleted!!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000 // Display the message for 1 second
            });
        }
    });
}






