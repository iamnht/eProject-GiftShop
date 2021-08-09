// Start: Modal > Member
$(document).ready(function () {
  $("#member").click(function () {
    $("#memberModal").modal();
  });
});
// End: Modal > Member

// Start: Categories Slide-Box
$(".sub-menu ul").hide();
$(".sub-menu a").click(function () {
  $(this).parent(".sub-menu").children("ul").slideToggle("100");
  $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
});
// End: Categories Slide-Box


// Start: Navbar Transform on-scroll
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("header").style.height = "70px";
    document.getElementById("header").style.padding = "1px";
    document.getElementById("header").style.background = "white";
  } else {
    document.getElementById("header").style.height = "110px";
    document.getElementById("header").style.padding = "30px";
    document.getElementById("header").style.background = "#ffe5d8";
  }
}
// End: Navbar Transform on-scroll


// json code
$(document).ready(function () {
  var data = [];
  $.getJSON("data-catagory.json", function (items) {
    data = items;

    showImage(data);
  });


  //Start: Detail-Item Modal
  $(document).on("click", ".productImg", function () {
    let id = $(this).data("id");

    let product = data.filter((ele) => ele.pdid == id);

    showModal(product[0]);
    $("#showModal").modal("show");
  });
    //End: Detail-Item Modal



// Start: JSON Code / truyền data từ JSON file
    function showImage(items) {
        let s = [];
        
    $.each(items, function (e, json) {
  
      s.push(`<div class="element_gifts" data-name="${json.pdname}" data-id="${json.pdid}" data-item="${json.pdcatogery}" data-brand="${json.pdbrand}" data-size="${json.pdsize}" data-weight="${json.pdweight}" data-color="${json.pdcolor}" data-price="${json.pdprice}">
            
            <img src="${json.pdimage}" data-id="${json.pdid}" class="productImg" alt=""><br>
                        
                    
            <p></p>${json.pdname}</p>
            <p>${json.pdprice}</p>
            
            
            <hr>
            <button data-id="${json.pdid} href="#" class="btn btn-black more">
                  Compare <i class="glyphicon glyphicon-plus"></i>
            </button>
                  
            
            <button class="btn btn-pink btn-buy-now">
                  Add to
                  <i class="glyphicon glyphicon-shopping-cart"></i>
            </button>
            
            </div>
            `);
    });
    $("#products").html(s.join(" "));
    element_gifts = document.querySelectorAll(".element_gifts");
    // End: JSON CODE

    // Function Cart
    let carts = document.querySelectorAll(".btn-buy-now");

    // TEST
    // var products = 
    // [
    //   { 
    //     pdname:"Director Coffee Mugs ",
    //     pdtag: "M-CC-1",
    //     pdprice: 550,
    //     inCart: 0
    // },
    // { 
    //     pdname:"Hilton Coffee Mugs",
    //     pdtag: "M-CC-2",
    //     pdprice:528,
    //     inCart: 0
    // },
    // {
    //     pdname:"Happiness Mugs",
    //     pdtag: "M-CC-3",
    //     pdprice: 499,
    //     inCart: 0
    // }

    // ];

    for(let i = 0; i < carts.length ; i++)
    {
        carts[i].addEventListener("click", () => 
        {
            cartNumbers(products[i]);
            totalCost(products[i]);
        });
    }

    function onLoadCartNumbers()
    {
      let productNumbers = localStorage.getItem("cartNumbers");

      if(productNumbers)
      {
        document.querySelector(".cart span").textContent = productNumbers;
      }
    };

    function cartNumbers(product)
    {
        
        let productNumbers = localStorage.getItem("cartNumbers");
        

        productNumbers = parseInt(productNumbers);

        // if productNumbers exit will run the code productNumber + 1
        if(productNumbers )
        {
          localStorage.setItem("cartNumbers",productNumbers + 1);
          document.querySelector(".cart span").textContent = productNumbers + 1;
        }
        else
        {
          localStorage.setItem("cartNumbers",1);
          document.querySelector(".cart span").textContent = 1;
        }
        
        setItems(product);
    }

    // function setItems(product)
    // {
    //   let cartItems = localStorage.getItem("productsInCart");
    //   cartItems = JSON.parse(cartItems);
      

    //   if(cartItems !== null)
    //   {
    //     if(cartItems[product.pdtag] == undefined)
    //     {
    //       cartItems =
    //       {
    //          ...cartItems,
    //          [product.pdtag]: product
    //       }
    //     }
        
    //     cartItems[product.pdtag].inCart += 1;
    //   }
    //   else
    //   {
    //     product.inCart = 1;
    //     cartItems = 
    //       {
    //         [product.pdtag]: product
    //       }
    //   }
      
    //   localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    // };

    // function totalCost(product)
    // { 
        
    //     let cartCost = localStorage.getItem("totalCost");
        
    //     console.log("My cartCose is", cartCost);
    //     console.log(typeof cartCost);

    //     if(cartCost != null)
    //     {
    //       cartCost = parseInt(cartCost);
    //       localStorage.setItem("totalCost", cartCost + product.pdprice);
    //     }
    //     else
    //     {
    //       localStorage.setItem("totalCost", product.pdprice); 
    //     }
        
    // };

    // function displayCart()
    // {
    //     let cartItems = localStorage.getItem("productsInCart");
    //     cartItems = JSON.parse(cartItems);

    //     let productContainer = document.querySelector(".products");

    //     console.log(cartItems);
    //     if(cartItems && productContainer )
    //     {
    //         productContainer.innerHTML = "";
    //         Object.values(cartItems).map(item =>
    //           {
    //               productContainer.innerHTML += `
    //               <div class="products">
    //               <ion-icon name="close-circle"></ion-icon>
    //               <img src="cart image/${item.pdtag}.jpg">
                  
    //               <span>${item.pdname}</span>
    //               </div>
    //               <div class="price">${item.pdprice}</div>
    //               <div class="quantity">
    //                   <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
    //                   <span>${item.inCart}</span>
    //               </div>
    //               `
    //           });
             
    //     }
    // };
    
    onLoadCartNumbers();
    // displayCart();




  }



//START COMPARE
  var list = [];

  $(document).on("click", ".more", function () {
    $(".comparePanle").show();
    $(this).toggleClass("rotateBtn");
    $(this).parents(".element_gifts").toggleClass("selected");
    var productID = $(this).parents(".element_gifts").attr("data-id");

    var inArray = $.inArray(productID, list);

    if (inArray < 0) {
      if (list.length < 3) {
        list.push(productID);

        var displayTitle = $(this).parents(".element_gifts").attr("data-name");

        var image = $(this).siblings(".productImg").attr("src");

        $(".comparePan").append(
          '<div id="' +
            productID +
            '"class="relPos titleMargin w3-margin-bottom col-lg-4 col-md-4 col-sm-4"><div class="w3-white titleMargin"><a class="selectedItemCloseBtn w3-closebtn pointer-cursor">&times</a><img src="' +
            image +
            '" alt="image" style="width: 100%"/><p id="' +
            productID +
            '" class="titleMargin1">' +
            displayTitle +
            "</p></div></div>"
        );
      } else {
        $("#WarningModal").modal();

        $(this).toggleClass("rotateBtn");
        $(this).parents(".element_gifts").toggleClass("selected");
        return;
      }
    } else {
      list.splice($.inArray(productID, list), 1);
      $("#" + productID).remove();
      hideComparePanel();
    }

    if (list.length > 1) {
      $(".cmprBtn").addClass("active");
      $(".cmprBtn").removeAttr("disabled");
    } else {
      $(".cmprBtn").removeClass("active");
      $(".cmprBtn").attr("disabled", "");
    }
  });

  /*function Click button Compare then show comparision*/
  $(document).on("click", ".cmprBtn", function () {
    if ($(".cmprBtn").hasClass("active")) {
      /* this is to print the  features list statically*/
      $(".contentPop").append(
        '<div class="col-sm-3 col-md-3 compareItemParent relPos">' +
          '<ul class="product">' +
                '<li class="relPos compHeader"></li>' +
                "<li><b>Name</b></li>" +
                "<li><b>Item</b></li>" +
                "<li><b>Size</b></li>" +
                "<li><b>Weight</b></li>" +
                "<li><b>Color</b></li>" +
                "<li><b>Price</b></li>"+
            "</ul>" +
          "</div>"
      );

      for (var i = 0; i < list.length; i++) {
        /* this is to add the items to popup which are selected for comparision */
        product = $('.element_gifts[data-id="' + list[i] + '"]');
        var image = $("[data-id=" + list[i] + "]")
          .find(".productImg")
          .attr("src");
        var title = $("[data-id=" + list[i] + "]").attr("data-name");
        /*appending to div*/
        $(".contentPop").append(
          '<div class="col-sm-3 col-md-3 compareItemParent relPos">' +
                '<ul class="product">' +
                    '<li class="compHeader"><img src="' + image +'" class="compareThumb"></li>' 
                    +
                    "<li>" + title + "</li>" 
                    +
                    "<li>" + $(product).data("item") + "</li>" 
                    +
                    "<li>" + $(product).data("size") + "</li>" 
                    +
                    "<li>" + $(product).data("weight") + "</li>"
                    + 
                    "<li>" + $(product).data("color") + "</li>" 
                    +
                    "<li>" + $(product).data("price") + "</li>" 
                    +
                "</ul>" +
            "</div>"
        );
      }
    }
    $(".modPos").show();
  });

  /* function to close the comparision popup */
  $(document).on("click", ".closeBtn", function () {
    //console.log(e);
    $(".contentPop").empty();
    $(".comparePan").empty();
    $(".comparePanle").hide();
    $(".modPos").hide();
    $(".selectProduct").removeClass("selected");
    $(".cmprBtn").attr("disabled", "");
    list.length = 0;
    $(".rotateBtn").toggleClass("rotateBtn");
  });

  /*function to remove item from preview panel*/
  $(document).on("click", ".selectedItemCloseBtn", function () {
    var test = $(this).siblings("p").attr("id");
    $("[data-id=" + test + "]")
      .find(".more")
      .click();
    hideComparePanel();
  });

  function hideComparePanel() {
    if (!list.length) {
      $(".comparePan").empty();
      $(".comparePanle").hide();
    }
  }
  //END COMPARE

  //Animation Click add cart  
  $(document).on("click",".btn-buy-now",function(e)
  {
      e.preventDefault();
      
      var parent = $(this).parents(".element_gifts");
      var cart = $(document).find("#cart-shop");
      
      var src = parent.find("img").attr("src");
      

      var parTop = parent.offset().top;
      var parLeft = parent.offset().left;

      
      $('<img />',
      {
          class:'flyImg',
          src: src
      }).appendTo("body").css({
          'top' : parTop,
          'left': parLeft + parent.width() - 50
      });

      setTimeout(function()
      {
          $(document).find(".flyImg").css({
              'top' : cart.offset().top,
              'left': cart.offset().left
          });
          setTimeout(function()
          {
              $(document).find(".flyImg").remove();
              // var count = parseInt(cart.find("#count-item").data("count"))+1;
              // cart.find("#count-item").text(count + ' ITEMS').data("count",count);
          },1000);
      },500);
  });
});
// End: Animation Added Item to Cart

//Modal
function showModal(json) {
  let s = `
    <div class="row">
        <div class="col-sm-7 col-md-7 col-lg-7">
            <div><img src="${json.pdimage}" style="width: 95%; border: 3px solid black"  alt=""></div>
        </div>
        <div class="col-sm-5 col-md-5 col-lg-5 modal-item-detail">
            <h3 style="color: black; text-align: center;"><b>${json.pdname}</b></h3>
            <hr>
            <p><b>Price:</b> ${json.pdprice}</p>
            <p><b>ID:</b> ${json.pdid}</p>
            <p><b>Catogery:</b> ${json.pdcatogery}</p>
            <p><b>Brands:</b> ${json.pdbrand}</p>
            <p><b>Material:</b> ${json.pdmaterial}</p>
            <p><b>Color:</b> ${json.pdcolor}</p>
            <p><b>Size:</b> ${json.pdsize}</p>
            <p><b>Weight:</b> ${json.pdweight}</p>
            <p><b>Package:</b> ${json.pdpackage}</p>
            <p><b>Details:</b> ${json.pdspec}</p>
            
        </div>
    </div>           
    `;

  $(".modal-item").html(s);
}

//START FILTER CATEGORIES

var element_gifts = document.querySelectorAll(".element_gifts");
const filter_button = document.querySelectorAll("#filter_button .filter");
const filter_brand = document.querySelectorAll(".filter-brand");
//console.log(filter_button);

//FILLTER BY EVENT CLICK id#filter_button

filter_button.forEach(function (e) {
  e.addEventListener("click", function (e1) {
    //Click to get data filter
    let button_filter = e1.target.dataset.filter;
    //console.log(button_filter);
    element_gifts.forEach(function (e2) {
      let element_filter = e2.dataset.item;

      if (button_filter === element_filter || button_filter === "all") {
        e2.style.display = "block";
      } else {
        e2.style.display = "none";
      }
    });
  });
});

//FILTER BY BRANDS
filter_brand.forEach(function (e) {
  e.addEventListener("click", function (e1) {
    let button_brand = e1.target.dataset.filter;
    //console.log(button_brand);
    element_gifts.forEach(function (e2) {
      let element_filter = e2.dataset.brand;
      //console.log(element_filter);

      if (button_brand === element_filter || button_brand === "all") {
        e2.style.display = "block";
      } else {
        e2.style.display = "none";
      }
    });
  });
});


// Contact Page
$(document).ready(function(e)
{
  $("#form1").submit(function(e)
  {
    e.preventDefault();

    let name = $("#name").val();
    let email = $("#email").val();
    let message = $("#message").val();
    let re = /^[\w\-\.]+@([\w\-]+\.)+[a-zA-Z]{2,4}$/g;
    if(!re.test(email))
    {
        alert("Format email Invallid !!! ( abc@abc.com )")
        $("#email").focus();
        return false;
    }
    let s = [];

    s.push(`Your Information !!!`);
    s.push(`=============================`);
    s.push(`Your Name: ${name}`);
    s.push(`Email: ${email}`);
    s.push(`Comment: ${message}`);
    s.push(`=============================`);
    s.push(`Thanks for sending message for us, we will reply you as soon as possible !!!`);

    let sbill = s.join("\n");
    alert(sbill);
  });
});

function show(obj)
{
  obj.style.backgroundColor="#ffe5d8";
}
  function hide(obj)
{
  obj.style.backgroundColor="#FFFFFF";
}

// End Contact Page