var baseurl = "";
var view = "frontpage";
var display = "page";
var nextpage = "#services";




/* When this function is called, the phone has been initialized and is ready to roll */
function onDeviceReady() {

	username = localStorage.phonegapName;
	title = localStorage.phonegapTitle;
	story = localStorage.phonegapStory;
	blat = localStorage.phonegapLat;
	blong = localStorage.phonegapLong;
	baseurl = localStorage.baseUrl;
	view = localStorage.view;
	display = localStorage.display;

	if (baseurl) {
		$("#baseurl").val(baseurl);
	}

	if (username) {
		$("#username").val(username);
	}

	if (title) {
		$("#storytitle").val(title);
	};
	if (story) {
		$("#story").val(story);
	};

	if (view) {
		$("#view").val(view);
	};

	if (display) {
		$("#display").val(display);
	};

	if (localStorage.localLogin == 3) {
		$("#logoutli").show();
		$("#loginli").hide();
	} else {

		$("#footout").hide();
	};

	//$.mobile.changePage("#home");

}

function saveSettings() {
	baseurl = $("#baseurl").val();
	localStorage.baseUrl = baseurl;
	localStorage.view = $("#view").val();
	localStorage.display = $("#display").val();
	$("#status").html("connected");
	//alert("settings saved");
}


function loginout() {
	if (localStorage.localLogin != 3) {
		//$.mobile.changePage("#login");
	} else {
		logout();
	}
}

function listArticles() {



    var showData = $('#latestlist');
	var url = baseurl + '/phonegap/display_view';

    $.getJSON(url, function (data) {
      console.log(data);

      var items = data.items.map(function (item) {
      
		 return '<div id="nid">' +  item.nid + '</div><div id="atitle"> ' + item.title + '</div><div id="aintensity"> ' + item.intensity + '</div><div id="amessage">' + item.message + '</div><div id="aupdated">'+ item.updated + '</div>';
		 
		 
		 
      });

      showData.empty();

      if (items.length) {
        var content = '<li>' + items.join('</li><li>') + '</li>';
        var list = $('<ul />').html(content);
        showData.append(list);
      }
	  	
		
		
				
		var tt = $('#amessage').text();
		$('#message-alert1 p').html(tt);
		//alert(tt);
		//var aa;
		//aa + 2
		
		


		//var aa = parseFloat($('#aintensity').text());
		//var g1val = $("#gauge1").val(aa);
		//var g1val = $("#gauge1").val(aa);
		/*var sq = $('#gg1').setAttribute('value', aa);
alert (sq);*/
		//alert(aa);
		//dd = aa;
		//alert(dd);
		// dd = Number(aa);
	
    });


    showData.text('Loading the JSON file.');
	 
  
}




	




function saveLogin() {
	username = $("#username").val();
	password = $("#password").val();
	var sayhi = function(data) {
		$("#logmsg").html("server result <br />" + data.result + " status: " + data.status);
		localStorage.localLogin = 5;
		if (data.status == "ok") {
			localStorage.localLogin = 3;
			localStorage.hash = data.hash;
			//$.mobile.changePage(nextpage);
		};
	};
	var saybi = function(data) {
		$("#logmsg").html("connection error ");
	};
	if (username) {
		localStorage.phonegapName = username;
		if (password) {
			localStorage.phonegapPass = password;
			$("#logmsg").html("settings locally saved for " + username + " trying to contact server ...");
			purl = baseurl + '/phonegap/login';
			$.ajax({
				type : 'POST',
				url : purl,
				dataType : 'json',
				success : sayhi,
				error : saybi,
				data : {
					username : username,
					password : password
				}
			});
			return false;
		}
	}
};

function sendStory() {
	//$.mobile.changePage("#sending");
	title = $("#storytitle").val();
	story = $("#story").val();
	localStorage.phonegapTitle = title;
	localStorage.phonegapStory = story;
	uname = localStorage.phonegapName;
	hash = localStorage.hash;
	url = baseurl + '/phonegap';
	$("#sentmessage").html('<img id="sending" title="sending" alt="sending" src="images/ajax-loader.png" /><br /> Your Message is being sent. If this message does not change after two minutes, please check your network connectivity.')
	$.post(url, {
		username : uname,
		password : hash,
		title : title,
		body : story
	}, function(data) {
		var content = $(data).find('#main');
		if (isNumeric(data)) {
			localStorage.phonegapPosted = 3;
			$("#sentmessage").html('your story has been uploaded with id: ' + data + '<br /> please go to my stories to check your story, before clearing it ready for your next report.<br /> <br /> <a class="ui-btn ui-btn-icon-right ui-li ui-corner-top ui-corner-bottom ui-btn-up-c ui-btn-active" onclick="listArticles();" ><p> &nbsp;Show articles</p></a><br /> <br />');
		} else {
			$("#sentmessage").html('There has been a problem uplaoding your story: ' + data + '<br /> please check your settings and connectivty and try again.<br /> <a onclick="listStories();" ><img src="images/my-stories.png" /></a>');
		}
	});
};

function logout() {
	localStorage.phonegapName = "";
	localStorage.phonegapPass = "";
	localStorage.localLogin = 5;
	$("#username").val("");
	$("#password").val("");
	$("#logoutli").hide();
	$("#loginli").show();
	$("#footout").fadeOut();
}

function how() {
	$.mobile.changePage("#howitworks");
}

function clearData() {

	localStorage.phonegapName = "";
	localStorage.phonegapPass = "";
	localStorage.localLogin = 5;
	$("#username").val("");
	$("#password").val("");
	$("#logoutlia").val("Login");
	clearStoryData();
}

function addStory() {
	if (localStorage.localLogin != 3) {
		nextpage = "#addstory";
		$.mobile.changePage("#login");
	} else {
		$.mobile.changePage("#addstory");
	};
}

function onBodyLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	document.getElementById('baseurl').value = "http://104.238.96.209/~newsimtms/files/drupal";
	document.getElementById('view').value = 'frontpage';
	document.getElementById('display').value ="page";
	saveSettings();
	listArticles();
	starter();
	
	
	//	var tt = $('#amessage').html();
		//$('#message-alert1').html(tt);
		//alert(tt);
	
	//var ss = document.getElementById('#aintensity');
	//document.getElementById('#wee').innerHTML(ss);
	//$('#wee').val(ss);
	
}

function isNumeric(input) {
	return (input - 0) == input && input > 0;
}










//document.getElementById("gauge1").value = aa;


function starter(){
	var dd = 0;
						document.addEventListener("DOMContentLoaded", function(event) {
						
						
						var aa;
						if(aa === undefined){
						  //doThis();
						  aa = 5;
						  
						} else {
						  //doThat();
						  aa = aa;
						  
						}
						var ps = aa;
						//alert(dd);
						
						//var yy = document.getElementById("aintensity")
						
													var gg1, gg2, gg3;
													
													var gg1 = new JustGage({
														
													        id: "gg1",
													        value: 50, 
													        min: 0,
													        max: 100,
													
													 		titleFontColor: "#f39c12",
													 		title: "Availability",
													
													 	 pointer: true,
														 pointerOptions: {
														 toplength: 5,
														 bottomlength: 35,
														 bottomwidth: 2,
														 color: 'rgba(255, 255,255,0.3)',
														 stroke: 'rgba(255, 255,255,0.3)',
														 stroke_width: 1,
														 stroke_linecap: 'round'
														},
													counter: true,
													valueFontColor: "#fff",
													startAnimationTime: 5000,
													valueFontFamily: "Roboto",
													refreshAnimationType: "bounce",
													relativeGaugeSize: true,
													gaugeWidthScale: 0.8,
													gaugeColor: "rgba(255,255,255,0.1)",
													customSectors: [{
													color : "#00c0ef",
													lo : 0,
													hi : 30
													 },{
													color : "#00a65a",
													lo : 30,
													hi : 60
													 },{
													color : "#f39c12",
													lo : 60,
													hi : 80
													 },{
													color : "#ff0000",
													lo : 80,
													hi : 100
													 }],
													 counter: true,
													/* textRenderer: function(val) {
													         
													
													if (val < 30) {
													                return 'Low';
													            } 
													if (val < 59) {
													                return 'Medium';
													
													            } 
													if (val < 79) {
													                return 'Critical';
													}
													if (val > 80) {
													                return 'Danger';
													            }
													        },*/
													        onAnimationEnd: function() {
													            console.log('f: onAnimationEnd()');
													        }
													    });
													
													document.getElementById('gg1_refresh').addEventListener('click', function() {
													gg1.refresh(getRandomInt(0, 100));
													        return false;
													    });
													
													
													
													var gg2 = new JustGage({
													        id: "gg2",
													        value: 88,
													        min: 0,
													        max: 100,
													 titleFontColor: "#f39c12",
													 title: "Performance",
													 pointer: true,
														 pointerOptions: {
														 toplength: 5,
														 bottomlength: 35,
														 bottomwidth: 2,
														 color: 'rgba(255, 255,255,0.3)',
														 stroke: 'rgba(255, 255,255,0.3)',
														 stroke_width: 1,
														 stroke_linecap: 'round'
														},
													//counter: true,
													valueFontColor: "#fff",
													startAnimationTime: 5000,
													valueFontFamily: "Roboto",
													refreshAnimationType: "bounce",
													relativeGaugeSize: true,
													gaugeWidthScale: 0.8,
													gaugeColor: "rgba(255,255,255,0.1)",
													customSectors: [{
													color : "#00c0ef",
													lo : 0,
													hi : 30
													 },{
													color : "#00a65a",
													lo : 30,
													hi : 60
													 },{
													color : "#f39c12",
													lo : 60,
													hi : 80
													 },{
													color : "#ff0000",
													lo : 80,
													hi : 100
													 }],
													 counter: true,
													 textRenderer: function(val) {
													         
													
													if (val < 30) {
													                return 'Low';
													            } 
													if (val < 59) {
													                return 'Medium';
													
													            } 
													if (val < 79) {
													                return 'Critical';
													}
													if (val > 80) {
													                return 'Danger';
													            }
													        },
													        onAnimationEnd: function() {
													            console.log('f: onAnimationEnd()');
													        }
													    });
													
													document.getElementById('gg2_refresh').addEventListener('click', function() {
													gg2.refresh(getRandomInt(0, 100));
													        return false;
													    });
													
													
													var gg3 = new JustGage({
													        id: "gg3",
													        value: 69,
													        min: 0,
													        max: 100,
													 titleFontColor: "#f39c12",
													 title: "Exceptions",
													 pointer: true,
														 pointerOptions: {
														 toplength: 5,
														 bottomlength: 35,
														 bottomwidth: 2,
														 color: 'rgba(255, 255,255,0.3)',
														 stroke: 'rgba(255, 255,255,0.3)',
														 stroke_width: 1,
														 stroke_linecap: 'round'
														},
													//counter: true,
													valueFontColor: "#fff",
													startAnimationTime: 5000,
													valueFontFamily: "Roboto",
													refreshAnimationType: "bounce",
													relativeGaugeSize: true,
													gaugeWidthScale: 0.8,
													gaugeColor: "rgba(255,255,255,0.1)",
													customSectors: [{
													color : "#00c0ef",
													lo : 0,
													hi : 30
													 },{
													color : "#00a65a",
													lo : 30,
													hi : 60
													 },{
													color : "#f39c12",
													lo : 60,
													hi : 80
													 },{
													color : "#ff0000",
													lo : 80,
													hi : 100
													 }],
													 counter: true,
													 textRenderer: function(val) {
													         
													
													if (val < 30) {
													                return 'Low';
													            } 
													if (val < 59) {
													                return 'Medium';
													
													            } 
													if (val < 79) {
													                return 'Critical';
													}
													if (val > 80) {
													                return 'Danger';
													            }
													        },
													        onAnimationEnd: function() {
													            console.log('f: onAnimationEnd()');
													        }
													    });
													
													document.getElementById('gg3_refresh').addEventListener('click', function() {
													gg3.refresh(getRandomInt(0, 100));
													        return false;
													    });
														
													/*document.getElementById('ggAll_refresh').addEventListener('click', function() {
													gg1.refresh(getRandomInt(0, 100));
													gg2.refresh(getRandomInt(0, 100));
													gg3.refresh(getRandomInt(0, 100));
													        return false;
													    });
														*/
														var list = document.getElementsByClassName("swiper-pagination-bullet");
														  for (var i = 0; i < list.length; i++) {
														   list[i].setAttribute("id", "box" + i);
														  }
														  
					
									
					
													});
			




}




















