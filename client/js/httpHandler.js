(function () {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //

  // TEST SERVER RESPONSE:
  var fetchRandomSwimmer = (success, errorCB) => {
    $.ajax({
      url: serverUrl,
      type: 'GET',
      success: success,
      error: errorCB || function (error) {
        console.error('Failed to fetch command', error);
      }
    });
  }

  var callbackForRandomSwimmer = (data) => {
    SwimTeam.move(data);
  }

  setInterval(() => (fetchRandomSwimmer(callbackForRandomSwimmer)), 10000);
  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function (e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();



