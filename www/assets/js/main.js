var linkTest = "https://test.lalatv.com.vn";
var linkApi = "https://test1.lalatv.com.vn";
var storageLocation = "/storage/emulated/0/Android/data/com.nolyric.app/files/";
var pathApp = `file://${storageLocation}`;
//file:///storage/emulated/0/Android/data/com.nolyric.app/files/1.mp3
var wavesurfer;
var currentSrc;
var currentId;
var currentName;
var currentArtist
var currentFile;
var isPlaying = false;
var lstHeart = [];
var lstPL = [];
var currentPage;
var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId") || 0;
var userName = localStorage.getItem("userName");
var roleName = localStorage.getItem("roleName");
var configSelect2 = { theme: "dark-adminlte", width: "100%" };
// region ======================= document ready =====================
function encodeImageFileAsURL(obj) {
  var file = obj.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    console.log('RESULT', reader.result)
  }
  reader.readAsDataURL(file);
}
$('#btnDownload').click(function () {
    alert('start download')
    alert(cordova.file.dataDirectory);
    alert('done')
});

function playSong(id, title, actor, src) {
  currentSrc = linkTest + src;
  currentName = title;
  currentId = id;
  currentArtist = actor;
  $('#myAudio').attr('src', currentSrc);
  currentPage = '#divPlay';
  $('#divPlay').show();
  $('.player-info .song-name').html(title);
  $('#miniName').html(currentName);
  $('#miniArtist').html(currentArtist);
  $('#allplaylist').hide();
  $('#nav').hide();
}
$(document).ready(function () {
  lstHeart = JSON.parse(localStorage.getItem('lstHeart')) || [];
  lstPL = JSON.parse(localStorage.getItem('lstPL')) || [];
  $('#divPlay').hide();
  $('#divPrice').hide();
  $('#divPlaylist').hide();
  $('#divListHeart').hide();
  $(".nav").hide();
  if (localStorage.getItem('userId')) {
    $(".nav").show();
  }
  // Click đổi bài
  $(document).on({
    click: function () {
      if (currentPage) { $(currentPage).hide() }
      currentPage = '#divPlay';
      let name = $(this).html();
      let src = $(this).parent().data('src');
      let id = $(this).parent().parent().attr('id');
      let artist = $(`div#${id} .artist`).html();
      // $('#divPlay').animate({ width: "toggle" }, 300);
      $('#divPlay').show();
      $('#nav').hide();
      localStorage.setItem('currentSrc', src);
      localStorage.setItem('currentName', name);
      localStorage.setItem('currentId', id);
      localStorage.setItem('currentArtist', artist);
      currentSrc = src;
      currentName = name;
      currentId = id;
      currentArtist = artist;
      $('.player-info .song-name').html(name);
      $('#myAudio').attr('src', src);
      let srcAudio = $('#myAudio').attr('src');
      $('#miniName').html(currentName);
      $('#miniArtist').html(currentArtist);
      let fileName = srcAudio.substring(srcAudio.lastIndexOf('/') + 1);
      try {
        window.resolveLocalFileSystemURL(pathApp + fileName, function () {
          // Đã tồn tại file
          $('#myAudio').attr('src', pathApp + fileName);
          // Đổi icon download thành icon downloaded
          $('#btnDownload').removeClass('fa-download').addClass('fa-check');
        }, function () {
          $('#myAudio').attr('src', src);
          $('#btnDownload').addClass('fa-download').removeClass('fa-check');
        });
      } catch (error) {
        $('#myAudio').attr('src', src);
      }
      currentSrc = $('#myAudio').attr('src');
      // check if is audio running
      if (myAudio.paused) {
        $('.bigPlay img').removeClass('active');
      }
      $('#allplaylist').hide();
      let rmIndex = lstHeart.indexOf(lstHeart.find((x) => x.name == currentName));
      // debugger
      if (rmIndex == 0) {
        $('#btnHeart').addClass('active');
      } else {
        $('#btnHeart').removeClass('active');
      }
    },
  }, ".music-list .song-name");
  // Click play nhạc
  $(document).on({
    click: function () {




      // wavesurfer = undefined;
      // wavesurfer = WaveSurfer.create({
      //   container: '#subws', maxCanvasWidth: 200, hideScrollbar: true, minPxPerSec: 1, maxPxPerSec: 50, backend: 'Mediaobj', partialRender: true,
      //   progressColor: "#444444",
      //   splitChannels: false, barWidth: 2, cursorColor: '#333', fillParent: true, height: 123, mediaControls: false, responsive: true,
      //   plugins: [
      //     // WaveSurfer.regions.create({ regionsMinLength: 2, regions: [], dragSelection: { slop: 5 } }),
      //     WaveSurfer.timeline.create({ container: "#subws_timeline", })
      //   ]
      // });


      // // wavesurfer.load(storageLocation + '1.mp3');
      // wavesurfer.load(src);
      // wavesurfer.play();

      // /* Progress bar */
      // (function () {
      //   const progressDiv = document.querySelector('#progress-bar');
      //   const progressBar = progressDiv.querySelector('.progress-bar');

      //   let showProgress = function (percent) {
      //     progressDiv.style.display = 'block';
      //     progressBar.style.width = percent + '%';
      //   };

      //   let hideProgress = function () {
      //     $('#progress-bar').hide();
      //   };

      //   wavesurfer.on('loading', showProgress);
      //   wavesurfer.on('ready', hideProgress);
      //   wavesurfer.on('ready', function () {
      //     // wavesurfer.params.container.style.opacity = 0.9;
      //     $('#progress-bar').hide();
      //   });
      //   wavesurfer.on('destroy', hideProgress);
      //   wavesurfer.on('error', hideProgress);
      // })();
    },
  }, ".player-info");

  // Click play nhạc
  $(document).on({
    click: function () {
      // $('#btnPlay').toggleClass('active');
      $('#divMiniPlay').toggleClass('hide');
    },
  }, "#btnMiniPlay");
  // Change Volume
  $(document).on({
    change: function () {
      // $('#btnPlay').toggleClass('active');
      $('#divMiniPlay').toggleClass('hide');
    },
  }, "#rangeVolume");
  $(document).on({
    click: function () {
      // $('#btnPlay').toggleClass('active');
      $('#divPrice').animate({ width: "toggle" }, 300);
      if (currentPage && currentPage != "#divPrice") { $(currentPage).hide() }
      currentPage = '#divPrice';
    },
  }, "#btnPrice");
  $(document).on({
    click: function () {
      console.log(currentPage)
      if (currentPage && currentPage != "#divHome") { $(currentPage).hide() }
      currentPage = '#divHome';
      $('#divPlay').hide();
      $('#divPlaylist').hide();
      $('#divPrice').hide();
      $('#divListHeart').hide();
      $('#homepage').show();
      $('.bigPlay img').toggleClass('active');
    },
  }, "#btnHome");
  $('#btnPlaylist').click(function () {
    $('#divPlaylist').animate({ width: "toggle" }, 300);
    if (currentPage && currentPage != "#divPlaylist") { $(currentPage).hide() }
    currentPage = '#divPlaylist';
  });// End 
  $(document).on({
    click: function () {
      $('#divPlay').hide();
      $('#divPlaylist').hide();
      $('#divPrice').hide();
      $('#divListHeart').show();
      // if (currentPage && currentPage != "#divListHeart") { $(currentPage).hide() }
      currentPage = '#divListHeart';
      // $('#divPlay').hide();
      // Hiện danh sách đã tim
      if (lstHeart.length > 0) {
        let html = '';
        for (let i = 0; i < lstHeart.length; i++) {
          const item = lstHeart[i];
          const id = item.id;
          const name = item.name;
          const src = item.src;
          const artist = item.artist;
          html += `<li id="${id}">
                    <label>
                      <input type="checkbox" id="cbSelected" />
                      <a data-src="${src}" data-artist="${artist}">${name}</a>
                      <span> - ${artist}</span>
                    </label>
                  </li>
          `;
        }
        $('#lstPL').html(html);
        // $('#divListHeart').animate({ width: "toggle" }, 300);
      }
    },
  }, "#btnListHeart");

  $(document).on({
    click: function () {
      let lstFav = $('#lstPL li input[type="checkbox"]:checked');
      if (!lstFav) { return; }
      Swal.fire({
        title: "Are you sure?",
        customClass: {
          actions: "my-actions",
          confirmButton: "order-2 btn btn-danger",
          cancelButton: "order-1 right-gap btn btn-secondary",
        },
        confirmButtonText: '<i class="fas fa-trash"></i> Delete',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          for (let i = 0; i < lstFav.length; i++) {
            const element = lstFav[i];
            const id = $(element).parent().parent().attr('id');
            $(`#lstPL li#${id}`).remove();
            // kiểm tra xem đã có trong db chưa, chưa có thì thêm, có rồi thì xóa
            let rmIndex = lstHeart.indexOf(lstHeart.find((x) => x.id == id));
            debugger
            if (rmIndex == 0) {
              lstHeart.splice(rmIndex, 1);
            } else {
              lstHeart.push(objHeart);
            }
          }
          localStorage.setItem('lstHeart', lstHeart);
        }
      });

    },
  }, "#btnRemoveSelected");

  $(document).on({
    click: function () {
      // đổi màu btnHeart
      $('#btnHeart').toggleClass('active');
      // tạo obj để lưu vào db
      let objHeart = {};
      objHeart.src = currentSrc;
      objHeart.artist = currentArtist;
      objHeart.name = currentName;
      objHeart.id = currentId;
      // kiểm tra xem đã có trong db chưa, chưa có thì thêm, có rồi thì xóa
      let rmIndex = lstHeart.indexOf(lstHeart.find((x) => x.name == currentName));
      debugger
      if (rmIndex == 0) {
        lstHeart.splice(rmIndex, 1);
      } else {
        lstHeart.push(objHeart);
      }
      localStorage.setItem('lstHeart', JSON.stringify(lstHeart));
      console.table(lstHeart);
    },
  }, "#btnHeart");

  var myAudio = document.getElementById("myAudio");
  myAudio.onplay = function () {
    $('#btnPlay').toggleClass('active');
    $('.bigPlay img').toggleClass('active');
  };
  myAudio.onpause = function () {
    $('#btnPlay').toggleClass('active');
    $('.bigPlay img').toggleClass('active');
  };
  function togglePlay() {
    return myAudio.paused ? myAudio.play() : myAudio.pause();;
  };
  $(document).on({
    click: function () {
      togglePlay();
    },
  }, "#btnPlay");
  $(document).on({
    click: function () {
      // if(lstHeart && lstHeart.length>0){
      //   for (let i = 0; i < lstHeart.length; i++) {
      //     const item = lstHeart[i];

      //   }
      // }
    },
  }, "#btnSavePL");
  // Click Down
  // $(document).on({
  //   click: function () {
  //     let fileName = currentSrc.substring(currentSrc.lastIndexOf('/') + 1);
  //     window.resolveLocalFileSystemURL(pathApp + fileName, function () {
  //     }, function () {
  //       downloadFile(currentSrc);
  //     });
  //     currentFile = filename;
  //   },
  // }, "#btnDownload");
  function downloadFile(url) {
    let fileName = url.replace(/^.*[\\\/]/, '');
    switch (device.platform) {
      // case "Android": storageLocation = storageLocation; break;
      case "iOS": storageLocation = cordova.file.documentsDirectory; break;
    }
    let filePath = storageLocation + fileName;
    hcShowToast("Save file", filePath);
    $('#btnDownload').toggleClass('fa-beat-fade');
    var fileTransfer = new FileTransfer();
    fileTransfer.download(encodeURI(url), filePath,
      function (entry) {
        entry.getMetadata((metaData) => {
          // + entry.toURL()
          $('#btnDownload').toggleClass('fa-check').toggleClass('fa-download').toggleClass('fa-beat-fade');
          $('#btnDownload').css('color', '#4caf50');
        });
      },
      function (error) {
        switch (error.code) {
          case FileTransferError.FILE_NOT_FOUND_ERR: hcShowToast("File not found", ""); break;
          case FileTransferError.INVALID_URL_ERR: hcShowToast("Error URL", ""); break;
          case FileTransferError.CONNECTION_ERR: hcShowToast("Connection error", ""); break;
          default: hcShowToast(error.code, ""); break;
        }
      }
    );
  }

  $('#btnBack').click(function () {
    $('#divPlay').hide();
    $('#btnPlay').toggleClass('active');
    $('.bigPlay img').toggleClass('active');
    $('#homepage').show();
  });
  $(".reveal").on("click", function () {
    $(this).children("i").toggleClass("fas fa-eye");
    $(this).children("i").toggleClass("fas fa-eye-slash");
    var $pwd = $("#txtPass");
    if ($pwd.attr("type") === "password") {
      $pwd.attr("type", "text");
    } else {
      $pwd.attr("type", "password");
    }
  });
  // Get nhạc ở trang chủ
  async function getHomePage(s = 0, l = 50, vm = false) {

    let cateId = 485; //$("#slFilterByCateAudio option:selected").val() || 0;
    let keyword = '';
    $.ajax({
      url: linkApi + "/api/get_search_audio",
      method: "get",
      data: {
        token: localStorage.getItem("token"),
        keyword: keyword,
        offset: s,
        limit: 50,
        length: 50,
        // catelog_id: cateId,
        // reload: getCurrenISOTime(),
      },
      success: function (a) {
        console.log("Đã tìm thấy dữ liệu với từ khóa: " + keyword);
        if (a.status == 200) {
          let data = a.data;
          console.log(data);
          let html = '';
          for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const title = data[i].title;
            const id = data[i].id;
            const director = data[i].director || "";
            const actor = data[i].actor || "";
            const file = data[i].upload_file;
            html += `
            <div id="${id}" class="song">
              <div class="song-img"><i class="fas fa-music"></i></div>
              <div class="song-detail" data-src="${linkTest}/${file}">
                <div class="song-name overflowing"> ${title}</div>
                <div class="artist">${actor}</div>
              </div>
            </div>
            `;
          }
          $('.music-list').html(html);
        } else {
          console.log("Can't get search data from server with keyword: " + keyword);
          localStorage.clear();
          location.reload();
        }
      },
      error: function (xhr) {
      },
    });
  }


  function slickAlbum() {
    $('#lstAlbum').slick({
      dots: true,
      // centerMode: true,
      // variableWidth: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    });
  }
  slickAlbum();
  // btnLogin
  $("#btnLogin").click(function (e) {
    // e.preventDefault();
    let txtUser = $("#txtUser").val();
    let txtPass = $("#txtPass").val();
    if (!txtUser || !txtPass) {
      return;
    }
    let data_json = {
      username: txtUser,
      password: txtPass,
    };
    $.ajax({
      url: linkApi + "/web/login",
      type: "post",
      data: data_json,
      crossDomain: true,
      dataType: "json",
      success: function (a) {
        //hcShowToast("OK", JSON.stringify(a), "info", 1500);
        if (a.status == 0) {
          if (a.user) {
            let objUser = a.user;
            localStorage.setItem("userId", objUser.id);
            localStorage.setItem("userName", objUser.username);
            localStorage.setItem("token", objUser.token);
            token = objUser.token;
            userName = objUser.username;
            userId = objUser.id;
            if ($("#ckRem").is(":checked")) {
              localStorage.setItem("txtUser", txtUser);
              localStorage.setItem("txtPass", txtPass);
            } else {
              localStorage.clear();
            }
            $("#login").hide();
            $("#homepage").show();
            $(".nav").show();
            getHomePage();
          }
        } else {
          hcShowToast("Login Failed", "User or password is not valid.", "warning");
          return;
        }
      },
      error: function (xhr) {
        alert("API is dead, please check server again.");
        hcShowToast("Error", JSON.stringify(xhr));
      },
    });
  }); // end btnLogin
  /*=====================================# Check Logged ============================================*/
  if (userId > 0) {
    $("#login").hide();
    $("#homepage").show();
    getHomePage();
  } else {
    $("#login").show();
    $("#homepage").hide();
  }
  function findIndex(array, id) {
    if (array && array.length > 0) {
      return array.map((object) => object.id).indexOf(id);
    }
    return -1;
  }
  $("#txtUser")
    .keyup(function (e) {
      if (e.keyCode == 13) {
        $("#btnLogin").trigger("click");
      }
    })
    .dblclick(function (e) {
      //$("#txtUser").select();
    });
  // end txtUser
  $("#txtPass")
    .keyup(function (e) {
      if (e.keyCode == 13) {
        $("#btnLogin").trigger("click");
      }
    })
    .dblclick(function (e) {
      $("#txtPass").select();
    });
  // end txtPass
  $("#txtSearch")
    .keyup(function (e) {
      if (e.keyCode == 13) {
        let keyword = $(this).val();
        $.ajax({
          url: linkApi + "/api/get_search_audio",
          method: "get",
          data: {
            token: localStorage.getItem("token"),
            keyword: keyword,
            offset: 0,
            limit: 50,
            length: 50,
          },
          success: function (a) {
            console.log("Đã tìm thấy dữ liệu với từ khóa: " + keyword);
            if (a.status == 200) {
              let data = a.data;
              console.log(data);
              let html = '';
              for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const title = data[i].title;
                const id = data[i].id;
                const director = data[i].director || "";
                const actor = data[i].actor || "";
                const file = data[i].upload_file;
                html += `
                <div id="${id}" class="song">
                  <div class="song-img"><i class="fas fa-music"></i></div>
                  <div class="song-detail" data-src="${linkTest}/${file}">
                    <div class="song-name overflowing"> ${title}</div>
                    <div class="artist">${actor}</div>
                  </div>
                </div>
                `;
              }
              $('.music-list').html(html);
            } else {
              console.log("Can't get search data from server with keyword: " + keyword);
            }
          },
          error: function (xhr) {
          },
        });
      }
    });
  // end txtSearch
  // Start get all cate
  function GetAllPlayList() {
    let data_ajax = {};
    $.ajax({
      url: `${linkApi}/film_playlist/getall`,
      method: "get",
      data: {
        userId: userId
      },
      success: function (data) {
        console.log(data);
        if (data) {
          let html = '<option value="">-- Select --</option>';
          for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            let title = obj.title;
            let playlistId = obj.id;
            html += `<option value="${playlistId}">${title}</option>`;
          }
          $('#slPlaylist').html(html).select2(configSelect2);;
          $('#slPlaylist1').html(html).select2(configSelect2);;
        }
      },
      error: function (a) { console.log(a.responseText) }
    });
  }
  GetAllPlayList();
  // end get all cate
  $('#btnAddCate').click(function () {
    let playlistId = $('#slPlaylist option:selected').val();
    $('#btnAddCate').attr('disabled', !0);
    let dataSend = {
      videoId: currentId,
      playlistId: playlistId,
    }
    $.ajax({
      url: `${linkApi}/film_playlist_detail/update`, method: "post",
      data: {
        obj: dataSend,
      }, success: function (a) {
        console.log(a);
        if (a && a.result >= 1) {
          hcShowToast('Success', "");
        } else {
          hcShowToast('Error', "");
        }
        $('#btnAddCate').attr('disabled', !1);
      }, error: function (a) {
        console.log(a.responseText)
        hcShowToast('API Error', a.responseText);
        $('#btnAddCate').attr('disabled', !1);
      }
    });
  });
  // Save to cate
  $('#btnNewCate').click(function () {
    let cateName = $('#txtCateName').val();
    let cateDesc = $('#txtCateDesc').val();
    if (!cateName || !description) { return; }
    $('#btnNewCate').attr('disabled', !0);
    let dataSend = {
      title: cateName,
      description: cateDesc,
      userId: userId,
      userName: userName,
      thumb: '',
    }
    $.ajax({
      url: `${linkApi}/film_playlist/update`, method: "post",
      data: {
        obj: dataSend,
      }, success: function (a) {
        console.log(a);
        if (a && a.result >= 1) {
          hcShowToast('Success', "");
          GetAllPlayList();
          setTimeout(function () {
            $(`#slPlaylist`).val(a.result).trigger('change');
          }, 3000);
          $('#txtCateName').val('');
          $('#txtCateDesc').val('');
        } else {
          hcShowToast('Error', "");
        }
        $('#btnNewCate').attr('disabled', !1);
      }, error: function (a) {
        console.log(a.responseText)
        hcShowToast('API Error', a.responseText);
        $('#btnNewCate').attr('disabled', !1);
      }
    });
  });
  // Save to new cate
  $('#btnSavePL').click(function () {
    $('#allplaylist').toggle();
  });// End btnSavePL

  $('#slPlaylist1').change(function () {
    let playlistId = $('#slPlaylist1 option:selected').val();
    if (!playlistId) { return; }
    $.ajax({
      url: `${linkApi}/film_playlist_detail/get`,
      method: "get", data: { playlistId: playlistId },
      success: function (a) {
        console.log(a);
        if (a && a.result) {
          let data = a.result;
          let html = ``;
          for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            let id = obj.id;
            let videoId = obj.videoId;
            let title = obj.videoTitle;
            let actor = obj.videoArtist;
            let src = obj.videoFile;
            html += `<li id="${id}">
                      <span class="simp-source" data-src="${linkTest + src}">${title}</span>
                      <span class="simp-desc">${actor}</span>
                    </li>`;
          }
          $(`#ulPlaylist`).html(html);
          buildPlaylist();
        } else {
          hcShowToast("No data", "");
        }
      },
      error: function (a) {
        console.log(a.responseText)
      }
    });
  });// End 
  $('#btnLogout').click(function () {
    Swal.fire({
      title: "Are you sure?",
      customClass: {
        actions: "my-actions",
        confirmButton: "order-2 btn btn-danger",
        cancelButton: "order-1 right-gap btn btn-secondary",
      },
      confirmButtonText: '<i class="fas fa-sign-out"></i> Logout',
      showCancelButton: true,
    }).then((result) => {
      localStorage.clear();
      location.reload();
    });
  });// End 
  $('#btnPlaying').click(function () {
    $('#divPlay').show();
    $('#divPrice').hide();
    $('#divPlaylist').hide();
    $('#divListHeart').hide();
    $(".nav").hide();
  });// End 
  $('#aaaaaaaaaaaaaaaaaaa').click(function () {

  });// End 
  $('#aaaaaaaaaaaaaaaaaaa').click(function () {

  });// End 
  $('#aaaaaaaaaaaaaaaaaaa').click(function () {

  });// End 

});
// endregion ======================= end document ready =====================