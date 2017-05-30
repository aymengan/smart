// Initialize app
var myApp = new Framework7({
	smartSelectSearchbar: true,
	smartSelectBackText: 'Zurück',
	modalTitle: 'Smart InterStations',
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('tasks', function (page) {
   myApp.addNotification({
        title: 'Framework7',
        subtitle: 'Notification subtitle',
        message: 'This is a simple notification message with custom icon and subtitle',
        media: '<i class="icon icon-f7"></i>'
    });
})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

$$('.mark').on('click', function () {
  myApp.alert('Mark');
});
$$('.reply').on('click', function () {
  myApp.alert('Die Aufgabe wird an Krankenschwester Laura Müller zugewiesen.');
});
$$('.forward').on('click', function () {
  myApp.alert('Die Aufgabe wurde nun Ihnen zugewiesen.');
});
$$('#aus').on('click', function () {
  $$('#an').removeClass('active');
  $$('#aus').addClass('active');
});
$$('#an').on('click', function () {
  $$('#aus').removeClass('active');
  $$('#an').addClass('active');
});
var conversationStarted = false;

            // Here initiliaze the messages
            var myMessages = myApp.messages('.messages', {
              autoLayout:true
            });

            // Initiliaze the messagebar
            var myMessagebar = myApp.messagebar('.messagebar');

$$('.messagebar .link').on('click', function () {
              // specifies the message text
              var messageText = myMessagebar.value().trim();
              // If there is no message, then exit from there
              if (messageText.length === 0) return;

              // Specifies the empty messagebar
              myMessagebar.clear()

              // Defines the random message type
              var messageType = (['sent', 'received'])[Math.round(Math.random())];

              // Provides the avatar and name for the received message
              var avatar, name;
              if(messageType === 'sent') {
                name = 'Laura Müller';
              }
              // It adds the message
              myMessages.addMessage({
                // It provides the message text
                text: messageText,
                // It displays the random message type
                type: messageType,
                // Specifies the avatar and name of the sender
                avatar: avatar,
                name: name,
                // Displays the day, date and time of the message
                day: !conversationStarted ? 'Heute' : false,
                time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
              })

              // Here you can update the conversation flag
              conversationStarted = true;
});
$$('.open-3-modal').on('click', function () {
  myApp.modal({
	title:  'Smart InterStations',
    text: 'Aufgabe <b>Medicament geben: Ibuprofin </b> wird mit der Priorität <span class="color-green"> Grün </span> der Krankenschwester Laura Müller zugewiesen',
    buttons: [
      {
        text: '<a href="" class="button button-big bg-yellow color-white">Gelb</a>',
        onClick: function() {
          myApp.alert('Aufgabe <b>Medicament geben: Ibuprofin </b> wird mit der Priorität <span class="color-yellow"> Gelb </span> der Krankenschwester Laura Müller zugewiesen')
        }
      },
      {
        text: '<a href="" class="button button-big bg-red color-white">Rot</a>',
        onClick: function() {
          myApp.alert('Aufgabe <b>Medicament geben: Ibuprofin </b> wird mit der Priorität <span class="color-red"> Rot </span> der Krankenschwester Laura Müller zugewiesen')
        }
      },
      {
        text: '<a href="" class="button button-big bg-gray color-white">OK</a>',
        bold: true,
        close:true,
      },
    ]
  })
});
$$('.reload-task').on('click', function () {
  mainView.router.reloadPage(tasks.html)
});