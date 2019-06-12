$("#signup").click(function() {
  $("#first").fadeOut("fast", function() {
  $("#second").fadeIn("fast");
  });
  });
  
  $("#signin").click(function() {
  $("#second").fadeOut("fast", function() {
  $("#first").fadeIn("fast");
  });
  });
  
  
    
           $(function() {
             $("form[name='login']").validate({
               rules: {
                 
                 email: {
                   required: true,
                   email: true
                 },
                 password: {
                   required: true,
                   
                 }
               },
                messages: {
                 email: "Please enter a valid email address",
                
                 password: {
                   required: "Please enter password",
                  
                 }
                 
               },
               submitHandler: function(form) {
                 form.submit();
               }
             });
           });
           
  
  
  $(function() {
    
    $("form[name='registration']").validate({
      rules: {
        firstname: "required",
        lastname: "required",
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 5
        }
      },
      
      messages: {
        firstname: "Please enter your firstname",
        lastname: "Please enter your lastname",
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
        },
        email: "Please enter a valid email address"
      },
    
      submitHandler: function(form) {
        form.submit();
      }
    });
  });
  

/*
  $(document).ready(function () {
    

  $("form[name='login']").on('submit', function () {
    // Validation
    $("form[name='login']").validate({
      rules: {

        email: {
          required: true,
          email: true
        },
        password: {
          required: true,

        }
      },
      messages: {
        email: "Please enter a valid email address",

        password: {
          required: "Please enter password",

        }

      }
    });

    var formData = $("form[name='login']").serializeArray();
    var credentials = {};

    // [{"name" : "" , value ""} , {"name" : "" , value "" ]
    formData.map((item) => {
      credentials[item.name] = item.value;
    });

    credentials = JSON.stringify(credentials);
    $.ajax({
      type: "POST",
      url: "/users/signin",
      data: credentials,
      contentType:"application/json"
    });

    return false;

  });

  $("form[name='registration']").on('submit', function () {
    // Validation
    $("form[name='registration']").validate({
      rules: {
        firstname: "required",
        lastname: "required",
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 8
        }
      },

      messages: {
        firstname: "Please enter your firstname",
        lastname: "Please enter your lastname",
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 8 characters long"
        },
        email: "Please enter a valid email address"
      }
    });

   var formData = $("form[name='registration']").serializeArray();
    var credentials = {};

    // [{"name" : "" , value ""} , {"name" : "" , value "" ]
    formData.map((item) => {
      credentials[item.name] = item.value;
    });

    credentials = JSON.stringify(credentials);

    $.ajax({
      type: "POST",
      url: "/users/signup",
      data: credentials,
      contentType: "application/json"
    });

    return false;

  });
});
*/