var devMode = false;
// var linkApi = "http://171.244.10.137:9011";
var linkTest = "https://test.lalatv.com.vn";
var linkApi = "https://test1.lalatv.com.vn";
var link9010 = "http://210.245.90.204:9010";
var link13000 = "http://210.245.90.204:13000";
var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId") || 0;
var userName = localStorage.getItem("userName");
var currentTab = "tabAudio";
var modeRender = "manual";
var nodata = `<div class="nodata">No data found</div>`;
var nomoredata = `<div class="nodata">No more data found</div>`;
var typeSearch = $('input[name="optSearch"]:checked').val();
var configSelect2 = { theme: "dark-adminlte", width: "100%" };
var lstAccChan_html = "";
var checkStatusRender = !1;
var time = 10;
var timeGenVideo = 5;
var itvHistoryRender;
var itvGenVideo;
var lstVideo2D;
var flagSearchAudio;
var flagSearchVideo;
var lstQueueImage = [];
var flagQueueImage = false;
var controls = [
  // 'play-large',
  // 'restart',
  // 'rewind',
  // 'fast-forward',
  // 'current-time',
  // 'captions',
  "play",
  "progress",
  "duration",
  "mute",
  "volume",
  "settings",
  "pip",
  "airplay",
  "download",
  "fullscreen",
];
var ma = 5,
  mv = 5,
  me = 5,
  ml = 5,
  mi = 5,
  mh = 5;
m2 = 5;
mi2d = 5;
mhp = 0;
mhis_render = 5;
mhis_upload = 5;
var lstAllAccount = {
  facebook: [],
  tiktok: [],
  youtube: [],
};
var lstConfig = {
  audios: [],
  videos: [],
  logos: [],
  images: [],
  images2d: [],
  effects: [],
  video2ds: [],
  title: "",
  token: "",
};
var lstCollectionHomePage = {
  audios: [],
  videos: [],
  logos: [],
  images: [],
  images2d: [],
  effects: [],
  video2ds: [],
  title: "",
  token: "",
};
var lstCollection = {
  audios: [],
  videos: [],
  logos: [],
  images: [],
  images2d: [],
  effects: [],
  video2ds: [],
  title: "",
  token: "",
};
var lstCollectionName = {
  audios: [],
  videos: [],
  logos: [],
  images: [],
  images2d: [],
  effects: [],
  video2ds: [],
  title: "",
  token: "",
};
// List all data from API
var lstAllAudio = [];
var lstAllImage = [];
var lstAllVideo = [];
var lstAllLogo = [];
var lstAll2D = [];
var lstAllEffect = [];
// List account from API
var lstFacebook = [];
var lstYoutube = [];
var lstTiktok = [];
// List video get from API
var lstRenderedVideo = [];
var lstHomeSearch = [];
var lstRandomResult = [];
// List selected data to export collection
var lstSelectedAudio = [];
var lstSelectedVideo = [];
var lstSelectedImage = [];
var lstSelectedLogo = [];
var lstSelectedEffect = [];
var lstSelected2D = [];
// List collection selected data
var lstSelectedCollectionAudio = [];
var lstSelectedCollectionVideo = [];
var lstSelectedCollectionImage = [];
var lstSelectedCollectionLogo = [];
var lstSelectedCollectionEffect = [];
var lstSelectedCollection2D = [];
// List config for upload video
var lstConfigUpload = {
  videoId: 0,
  videoTitle: 0,
  title: "",
  descrition: "",
  tags: [],
  lstAccTiktok: [],
  lstAccFacebook: [],
  lstAccYoutube: [],
};
$(document).ready(function () {
  // Check remember account
  if (localStorage.getItem("txtUser") && localStorage.getItem("txtPass")) {
    $("#txtUser").val(localStorage.getItem("txtUser"));
    $("#txtPass").val(localStorage.getItem("txtPass"));
    $("#ckRem").prop('checked', !0);
  }

  $("#slModeImage").select2(configSelect2);
  $("#slModeImage2D").select2(configSelect2);
  $("#tblHomeSearch").hide();
  if (userId > 0) {
    $("#login").hide();
    $("#navMain").hide();
    $("#navTabContent").hide();
    $("#homepage").show();
  } else {
    $("#login").show();
    $("#navMain").hide();
    $("#navTabContent").hide();
    $("#homepage").hide();
  }
  // btnLogout
  $("#btnLogout").click(function (e) {
    Swal.fire({
      title: `Current account <b>"${userName}"</b>`,
      text: `Are you sure you wanna logout?`,
      customClass: {
        actions: "my-actions",
        confirmButton: "order-2 btn btn-danger",
        cancelButton: "order-1 right-gap btn btn-secondary",
      },
      confirmButtonText: '<i class="fas fa-sign-out-alt"></i> Logout!',
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        userId = 0;
        userName = "";
        token = "";
        $("#txtUser").val("");
        $("#txtPass").val("");
        //window.location.reload();
        $("#navMain").hide();
        $("#navTabContent").hide();
        $("#homepage").hide();
        $("#login").show();
        if (localStorage.getItem("txtUser") && localStorage.getItem("txtPass")) {
          $("#txtUser").val(localStorage.getItem("txtUser"));
          $("#txtPass").val(localStorage.getItem("txtPass"));
        }
      }
    });
  });
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
            localStorage.setItem("userId", a.user.id);
            localStorage.setItem("userName", a.user.username);
            localStorage.setItem("token", a.user.token);
            token = a.user.token;
            userName = a.user.username;
            userId = a.user.id;
            if ($("#ckRem").is(":checked")) {
              localStorage.setItem("txtUser", txtUser);
              localStorage.setItem("txtPass", txtPass);
            } else {
              localStorage.removeItem("txtUser");
              localStorage.removeItem("txtPass");
            }
            $("#login").hide();
            $("#navMain").hide();
            $("#navTabContent").hide();
            $("#homepage").show();
            appRender.getSelectAudio();
            appRender.getSelectVideo();
            // window.location.reload();
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
  // Start Gen image tab Image
  $("#btnGenImage2D").click(function (e) {
    if (lstCollection.images.length <= 0) {
      hcShowToast("Warning", "Select an image", "warning", 3000);
      return;
    }
    $(this).attr("disabled", !0);
    let id = lstCollection.images[0].id;
    let mode = $("#slModeImage option:selected").val() || "cartoon";
    $.ajax({
      url: linkApi + "/api/film_effect/gen_ai",
      method: "post",
      data: {
        id: id,
        token: token,
        mode: mode,
        reload: getCurrenISOTime(),
      },
      beforeSend: function (a) {
        hcShowToast("Info", "Added to the queue to proceed.", "warning", 1000);
      },
      success: function (a) {
        console.log(a);
        if (a.status && a.status == 500) {
          hcShowToast("Error", a.message, "error", 1000);
          return;
        }
        hcShowToast("Info", `Gen IMG 2D success. New ID: ${a.result.id}`, "success", 5000);
        appRender.searchImage2D();
        setTimeout(function(){
          appRender.searchImage2D();
        },5000);
      },
      error: function (xhr) {
        console.log(xhr.responseText);
        hcShowToast("Error", `API error: ${xhr.responseText}`, "error", 1000);
      },
    });
    $(this).attr("disabled", !1);
  }); // end btnGenImage2D
  $('#navImage2D').click(function(){
    appRender.searchImage2D();
  });
  // Start Gen Video
  function getDataInQueue() {
    console.log("Lấy dữ liệu của các ảnh đang convert hiệu ứng mây trôi, ngày sang đêm");
    if (lstQueueImage && lstQueueImage.length <= 0) {
      clearInterval(itvGenVideo);
      return;
    }
    for (let i = 0; i < lstQueueImage.length; i++) {
      const imgId = lstQueueImage[i];
      $.ajax({
        url: `${linkApi}/api/film_effect/get_by_id?id=${imgId}&token=${token}&reload=${getCurrenISOTime() + Math.random()}`,
        method: "get",
        success: function (a) {
          console.log(a);
          if (a.status) {
            switch (a.status) {
              case 500:
                hcShowToast("Error", a.message, "error", 1000);
                return;
              case 200:
                if (a.data) {
                  let item = a.data;
                  if (item.file) {
                    appRender.searchVideo();
                    gotoNav(currentTab, "Video");
                    $(`#tblVideo li#${item.id}`)[0].scrollIntoView();
                    flashControl($(`#tblVideo li#${item.id}`));
                    removeElement(lstQueueImage, lstQueueImage[i]);
                    localStorage.setItem('lstQueueImage', lstQueueImage);
                    if(lstQueueImage.length <= 0) {
                      console.info('Đã lấy hết dữ liệu trong queue convert hiệu ứng');
                      flagQueueImage = false;
                      localStorage.removeItem('lstQueueImage');
                    }
                  }
                }
                return;
              default:
                return;
            }
          }
        },
        error: function (xhr) {
          console.log(xhr.responseText);
          hcShowToast("Error", `API error: ${xhr.responseText}`, "error", 1000);
        },
      });
    }
  }
  function resetIntervalGetGenVideo() {
    if (itvGenVideo) {
      return;
    }
    itvGenVideo = setInterval(function () {
      // console.log("Reload data in " + timeGenVideo-- + "s left");
      timeGenVideo--;
      if (timeGenVideo <= -1) {
        timeGenVideo = 5;
        getDataInQueue();
      }
    }, 1000);
  }
  function GenVitualDomVideo() {
    //  // Tạo DOM video ảo
    // debugger;
    if(localStorage.getItem('lstQueueImage')){
      lstQueueImage = localStorage.getItem('lstQueueImage').split(',');
    }
    if (lstQueueImage && lstQueueImage.length <= 0 || flagQueueImage == true) {
      return;
    }
    lstQueueImage = lstQueueImage.reverse();
    let demo_html = ``;
    for (let i = 0; i < lstQueueImage.length; i++) {
      let id = lstQueueImage[i];
      demo_html += `<li class="dom_vitual" id="${id}">
                      <div class="checkbox new">
                        <label>
                          <input disabled class="export_selected" type="checkbox" id="export_selected">
                          ${id} - Video in progress, please wait... <i class="fas fa-spinner fa-spin"></i>
                        </label>
                      </div>
                      <img class="lazy" data-src="assets/images/cs.png" style="width:100%" />
                    </li>`;
    }
    console.log(demo_html);
    $("#tblVideo li:first-child").before(demo_html);
    for (let i = 0; i < lstQueueImage.length; i++) {
      let id = lstQueueImage[i];
      flashControl($(`#tblVideo li#${id}`));
    }
    flagQueueImage = true;
  }
  $("#btnGenVideo").click(function (e) {
    // resetIntervalGetGenVideo();
    // return;
    if (lstCollection.images2d.length <= 0) {
      hcShowToast("Warning", "Select an IMG 2D", "warning", 3000);
      return;
    }
    $(this).attr("disabled", !0);
    let id = lstCollection.images2d[0].id;
    let mode = $("#slModeImage2D option:selected").val() || "animation_flowing";
    $.ajax({
      url: linkApi + "/api/film_effect/gen_ai",
      method: "post",
      // timeout: 100000000,
      data: {
        id: id,
        token: token,
        mode: mode,
        reload: getCurrenISOTime(),
      },
      beforeSend: function (a) {
        //hcShowToast("Info", "Added to the queue to proceed.", "warning", 1000);
      },
      success: function (a) {
        console.log(a);
        //debugger;
        // hcShowToast("Info", "Added to the queue to proceed.", "warning", 1000);
        if (a.status) {
          switch (a.status) {
            case 500:
              hcShowToast("Error", a.message, "error", 1000);
              return;
            case 200:
              let id = a.result.id;
              hcShowToast("Info", `New video ID: ${id} is proceesing. Video will update automatically after successful creation.`, "Info", 5000);
              lstQueueImage.push(id);
              localStorage.setItem('lstQueueImage', lstQueueImage);
              appRender.searchVideo();
              // gotoNav(currentTab, "Video");
              $("#navVideo").trigger("click");
              flagQueueImage = false;
              // // Call interval check status
              resetIntervalGetGenVideo();
              //  // Gen html ảo
              setTimeout(function(){
                GenVitualDomVideo();
              }, 3000);
              return;
            default:
              hcShowToast("Error", a.message, "error", 1000);
              return;
          }
        }
      },
      error: function (xhr) {
        console.log(xhr.responseText);
        hcShowToast("Error", `API error: ${xhr.responseText}`, "error", 1000);
      },
    });
    $(this).attr("disabled", !1);
  }); // end btnGenVideo

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
  const appRender = {
    getSelectVideo: () => {
      $.ajax({
        url: linkApi + "/api/catelog_video/get_search",
        method: "get",
        data: {
          token: token,
          offset: 0,
          limit: -1,
          keyword: "",
          reload: getCurrenISOTime(),
        },
        success: function (a) {
          console.log("Đã lấy xong dữ liệu danh mục(video)");
          console.log(a);
          if (a.status == 200) {
            let data = a.data;
            lstAllVideo = data;
            appRender.buildSelectVideo();
          } else {
            console.log("Can't get video data from server");
          }
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    getSelectEffect: () => {
      $.ajax({
        url: linkApi + "/api/get_search_hieuung",
        method: "get",
        data: {
          token: token,
          offset: 0,
          limit: -1,
          keyword: "",
          reload: getCurrenISOTime(),
        },
        success: function (a) {
          console.log("Đã lấy xong dữ liệu Effect");
          console.log(a);
          if (a.status == 200) {
            let data = a.data;
            lstAllEffect = data;
            appRender.buildSelectEffect();
          } else {
            console.log("Can't get video data from server");
          }
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    buildSelectEffect: () => {
      let html = "";
      if (lstAllEffect) {
        html += `<option value="">-- Choose an item --</option>`;
        for (let i = 0; i < lstAllEffect.length; i++) {
          let effect = lstAllEffect[i];
          html += `<option value="${effect.id}">${effect.title}</option>`;
        }
      } else {
        html = `<option value=''>No data</option>`;
      }
      $("#slListEffect").html(html).select2(configSelect2);
    },
    buildSelectManualEffect: () => {
      let html = "";
      if (lstAllEffect) {
        html += `<option value="">-- Choose an item --</option>`;
        for (let i = 0; i < lstAllEffect.length; i++) {
          let effect = lstAllEffect[i];
          html += `<option value="${effect.id}">${effect.title}</option>`;
        }
      } else {
        html = `<option value=''>No data</option>`;
      }
      $("#slManualEffect").html(html).select2({ theme: "dark-adminlte" });
    },
    buildSelectVideo: () => {
      if (lstAllVideo) {
        let html = "";
        html += `<option value="">-- Choose an item --</option>`;
        for (let i = 0; i < lstAllVideo.length; i++) {
          let cate = lstAllVideo[i];
          html += `<option value="${cate.id}">${cate.title}</option>`;
        }
        // tabAuto
        $("#slVideo").html(html).select2(configSelect2);
        // Add item to cate tabVideo
        $("#slVideoCate").html(html).select2({ theme: "dark-adminlte", width: "100%" });
        // homepage filter
        $("#slFilterByCateVideo").html(html).select2(configSelect2);
      }
    },
    getSelectLogo: () => {
      $.ajax({
        url: linkApi + "/api/get_search_logo",
        method: "get",
        data: {
          token: token,
          offset: 0,
          limit: -1,
          keyword: "",
          reload: getCurrenISOTime(),
        },
        success: function (a) {
          console.log("Đã lấy xong dữ liệu Logo");
          console.log(a);
          if (a.status == 200) {
            let data = a.data;
            lstAllLogo = data;
            appRender.buildSelectLogo();
          } else {
            console.log("Can't get logo data from server");
          }
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    buildSelectLogo: () => {
      if (lstAllLogo) {
        let html = "";
        html += `<option value="">-- Choose an item --</option>`;
        for (let i = 0; i < lstAllLogo.length; i++) {
          let logo = lstAllLogo[i];
          let path = logo.filePath;
          if (path && path.includes(link9010)) {
            path = path.replace(link9010, linkTest);
          } else if (path.startsWith("/logos/")) {
            path = linkTest + path;
          }
          html += `<option data-link="${path}" value="${logo.id}">${logo.title}</option>`;
        }
        $("#slLogo").html(html);
        $("#slListLogo").html(html);
        $("#slLogo").select2(configSelect2);
        $("#slListLogo").select2(configSelect2);
      }
    },
    buildSelectAudio: () => {
      if (lstAllAudio) {
        let html = "";
        html += `<option value="">-- Choose an item --</option>`;
        for (let i = 0; i < lstAllAudio.length; i++) {
          let cate = lstAllAudio[i];
          html += `<option value="${cate.id}">${cate.title}</option>`;
        }
        // tabAuto
        $("#slAudio").html(html).select2(configSelect2);
        // tabAudio add audio to cate
        $("#slAudioCate").html(html).select2({ theme: "dark-adminlte", width: "100%" });
        // homepage filter
        $("#slFilterByCateAudio").html(html).select2(configSelect2);
      }
    },
    getSelectAudio: () => {
      $.ajax({
        url: linkApi + "/api/catelog_audio/get_search",
        method: "get",
        data: {
          token: token,
          offset: 0,
          limit: -1,
          keyword: "",
          reload: getCurrenISOTime(),
        },
        success: function (a) {
          console.log("Đã lấy xong dữ liệu audio");
          console.log(a);
          if (a.status == 200) {
            let data = a.data;
            lstAllAudio = data;
            appRender.buildSelectAudio();
          } else {
            console.log("Can't get audio data from server");
          }
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    getSelectImage: () => {},
    getSearchUpload: (s = 0, l = 5, m = !1) => {
      hcShowToast("Info", "Feature under development.", "info", 20000);
      return;
      let html = ``;
      $.ajax({
        url: linkApi + "/api/get_upload",
        method: "get",
        success: function (a) {
          if (a && a.status == 200) {
            if (a.data.length > 0) {
              let data = a.data;
              for (let i = 0; i < data.length; i++) {
                let upload = data[i];
                let status = upload.status;
                let title = upload.title;
                let file = upload.file;
                let cls = ``;
                let disabled = `disabled`;
                let statusText = ``;
                switch (status) {
                  case 1:
                    cls = `bg-error`;
                    statusText = `Error`;
                    break;
                  case 2:
                    cls = `bg-success`;
                    statusText = `Done`;
                    disabled = "";
                    break;
                  default:
                    cls = `progress-bar-striped progress-bar-animated bg-warning`;
                    statusText = `Uploading`;
                    break;
                }
                html += `<tr>
                          <td>
                            <div class="checkbox">
                              <label>
                                <input class="export_selected" type="checkbox" id="export_selected" />
                                ${title}
                                <br>
                                <div class="progress">
                                  <div class="progress-bar ${cls}" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">${statusText}</div>
                                </div>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                  <a href="${file}" ${disabled} class="btn btn-primary" title="Download"><i class="fas fa-download"></i>
                                    Download</a>
                                  <button type="button" class="btn btn-danger" title="Delete"><i class="fas fa-trash"></i>
                                    Delete</button>
                                </div>
                              </label>
                            </div>
                          </td>
                        </tr>`;
              }
            } else {
              html = nodata;
            }
            if (m) {
              $("#tblUpload tbody").append(html);
            } else {
              $("#tblUpload tbody").html(html);
            }
          } else {
            hcShowToast("Error", "Failed to get history upload", "error");
          }
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    getSearchRender: (s = 0, l = 5, m = !1) => {
      $.ajax({
        url: linkApi + "/api/bientap/get_search",
        method: "get",
        data: {
          token: token,
          offset: s,
          limit: l,
          keyword: "",
          reload: getCurrenISOTime(),
        },
        success: function (a) {
          console.log("Đã lấy xong dữ liệu search render");
          console.log(a);
          let html = "";
          if (a.status == 200) {
            let data = a.data;
            lstRenderedVideo = data;
            // Build select option for upload
            appRender.buildSlRenderedVideo();
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                let id = data[i].id;
                let path = data[i].path;
                let title = data[i].title;
                let convert_status = "Rendering...";
                let disabledCss = "disabled";
                let statusCss = "";
                let classCss = " progress-bar-striped progress-bar-animated bg-warning";
                if (path && path.includes(link13000)) {
                  path = path.replace(link13000, linkTest);
                }
                switch (data[i].convert_status) {
                  case -1:
                    classCss = " bg-danger";
                    convert_status = "Error";
                    statusCss = "btn-secondary";
                    break;
                  case 1:
                    convert_status = "Rendering...";
                    statusCss = "btn-secondary";
                    break;
                  case 2:
                    classCss = " bg-success";
                    convert_status = "Done";
                    disabledCss = "";
                    statusCss = "btn-primary";
                    break;
                  case 3:
                    convert_status = "Ordered convert";
                    statusCss = "btn-secondary";
                    break;
                  default:
                    classCss = " bg-warning";
                    convert_status = "Not render yet";
                    statusCss = "btn-secondary";
                    break;
                }
                html += `<tr id="${id}">
                          <td >
                            <div class="checkbox">
                            <video preload="metadata" playsinline class="playerHistoryRender" controls><source src="${path}#t=0.1" type="video/mp4"></source></video><br>
                              <label style="display:block">
                                <input class="export_selected" type="checkbox" id="export_selected">
                                ${id} - ${title}
                                <br>
                                <div class="progress">
                                  <div class="progress-bar${classCss}"
                                    role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0"
                                    aria-valuemax="100">${convert_status}</div>
                                </div><br>
                                <div class="btn-group d-flex" role="group" aria-label="View">
                                  <button data-id="${id}" ${disabledCss} type="button" class="btn ${statusCss}" title="Upload"><i class="fas fa-upload"></i> Upload</button>
                                <button style="display:none" data-id="${id}" ${disabledCss} type="button" class="btn ${statusCss}" title="View"><i class="fas fa-eye"></i> View</button>
                                  <button style="display:none" data-id="${id}" ${disabledCss} type="button" class="btn ${statusCss}" title="Share"><i class="fas fa-share-alt"></i> Share</button>
                                  <button data-id="${id}" type="button" class="btn btn-danger" title="Delete"><i class="fas fa-trash"></i> Delete</button>
                                </div>
                              </label>
                            </div>
                          </td>
                        </tr>`;
              }
            } else {
              html = nodata;
            }
          }
          if (m) {
            $("#tblRender tbody").append(html);
          } else {
            $("#tblRender tbody").html(html);
          }
          if (time <= 0) {
            resetIntervalHisRender();
          }
          // const players = Array.from(document.querySelectorAll(".playerHistoryRender")).map((p) => new Plyr(p, { controls }));
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    checkRenderStatus: (s = 0, l = 5, m = !1) => {
      $.ajax({
        url: linkApi + "/api/bientap/get_search",
        method: "get",
        data: {
          token: token,
          offset: s,
          limit: l,
          keyword: "",
          reload: getCurrenISOTime(),
        },
        success: function (a) {
          // console.clear();
          console.log("Đã lấy xong dữ liệu check render status");
          console.log(a);
          let html = "";
          if (a.status == 200) {
            let data = a.data;
            lstRenderedVideo = data;
            // Build select option for upload
            //appRender.buildSlRenderedVideo();
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                let id = data[i].id;
                let path = data[i].path;
                let title = data[i].title;
                let convert_status = "Rendering...";
                let disabledCss = "";
                let statusCss = "";
                let classCss = " progress-bar-striped progress-bar-animated bg-warning";
                if (path && path.includes(link13000)) {
                  path = path.replace(link13000, linkTest);
                }
                switch (data[i].convert_status) {
                  case -1:
                    classCss = " bg-danger";
                    convert_status = "Error";
                    statusCss = "btn-secondary";
                    disabledCss = "disabled";
                    break;
                  case 1:
                    convert_status = "Rendering...";
                    statusCss = "btn-secondary";
                    disabledCss = "disabled";
                    break;
                  case 2:
                    classCss = " bg-success";
                    convert_status = "Done";
                    statusCss = "btn-primary";
                    break;
                  case 3:
                    convert_status = "Ordered convert";
                    statusCss = "btn-secondary";
                    disabledCss = "disabled";
                    break;
                  default:
                    classCss = " bg-warning";
                    convert_status = "Not render yet";
                    statusCss = "btn-secondary";
                    disabledCss = "disabled";
                    break;
                }
                // Check TR status by id
                let tr = $(`#tblRender tr#${id}`);
                let progress = $(`#tblRender tr#${id} .progress-bar`);
                progress.html(convert_status);
                progress.removeClass(`bg-success bg-warning bg-danger`);
                progress.removeClass(`progress-bar-striped progress-bar-animated bg-warning`);
                progress.addClass(`progress-bar ${classCss}`);
                // Button disabled
                $(`#tblRender tr#${id} button[title="View"]`).attr("disabled", disabledCss.length > 0 ? !0 : !1);
                $(`#tblRender tr#${id} button[title="Upload"]`).attr("disabled", disabledCss.length > 0 ? !0 : !1);
                // Remove button css
                $(`#tblRender tr#${id} button[title="View"]`).removeClass("btn-primary btn-secondary btn-danger btn-warning");
                $(`#tblRender tr#${id} button[title="Upload"]`).removeClass("btn-primary btn-secondary btn-danger btn-warning");
                // Add button css again
                $(`#tblRender tr#${id} button[title="View"]`).addClass(statusCss);
                $(`#tblRender tr#${id} button[title="Upload"]`).addClass(statusCss);
                // Video source
                $(`#tblRender tr#${id} video source`).attr("src", path);
              }
            }
          }
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    searchImage: (txtSearch = $("#tabImage #txtSearch").val(), s = 0, l = 5, m = !1) => {
      if (txtSearch.length <= 0) {
        l = 10;
        s = 0;
      }
      $.ajax({
        url: linkApi + "/api/get_search_image",
        method: "get",
        data: {
          token: token,
          offset: s,
          limit: l,
          keyword: txtSearch,
          reload: getCurrenISOTime(),
        },
        success: function (a) {
          console.log("Đã lấy xong dữ liệu Image");
          console.log(a);
          if (a.status == 200) {
            let data = a.data;
            lstAllImage = data;
            appRender.buildListImage(data, m);
          }
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    searchImage2D: (txtSearch = $("#tabImage2D #txtSearch").val(), s = 0, l = 5, m = !1) => {
      if (txtSearch.length <= 0) {
        l = 10;
        s = 0;
      }
      $.ajax({
        url: linkApi + "/api/get_search_image",
        method: "get",
        data: {
          reload: Math.random() + getCurrenISOTime(),
          token: token,
          offset: s,
          topic: "image2d",
          limit: l,
          keyword: txtSearch,
        },
        success: function (a) {
          console.log("Đã lấy xong dữ liệu Image2D");
          console.log(a);
          if (a.status == 200) {
            let data = a.data;
            lstAllImage = data;
            appRender.buildListImage2D(data, m);
          }
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    buildListImage: (data, m) => {
      let html = "";
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let file = data[i].file;
          // console.log(file);
          if (file.includes(link13000)) {
            file = file.replace(link13000, linkTest);
          }
          let clsNew = checkNew(data[i].dateupdated);
          html += `<li id="${data[i].id}">
                    <div class="checkbox ${clsNew}">
                      <label>
                        <input class="export_selected" type="checkbox" id="export_selected">
                        ${data[i].id} - ${data[i].title}
                        <img class="lazy" data-src="${file}" />
                      </label>
                    </div>
                  </li>`;
        }
      } else {
        html = nodata;
      }
      if (m) {
        $("#tblImage").append(html);
      } else {
        $("#tblImage").html(html);
      }
      lazyLoading();
    },
    buildListImage2D: (data, m) => {
      let html = "";
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let file = data[i].file;
          // console.log(file);
          if (file.includes(link13000)) {
            file = file.replace(link13000, linkTest);
          }
          let clsNew = checkNew(data[i].dateupdated);
          html += `<li id="${data[i].id}">
                    <div class="checkbox ${clsNew}">
                      <label>
                        <input class="export_selected" type="checkbox" id="export_selected">
                        ${data[i].id} - ${data[i].title}
                        <img class="lazy" data-src="${file}" />
                      </label>
                    </div>
                  </li>`;
        }
      } else {
        html = nodata;
      }
      if (m) {
        $("#tblImage2D").append(html);
      } else {
        $("#tblImage2D").html(html);
      }
      lazyLoading();
    },
    searchLogo: (txtSearch = $("#tabLogo #txtSearch").val(), s = 0, l = 5, m = !1) => {
      if (txtSearch.length <= 0) {
        l = 10;
        s = 0;
      }
      $.ajax({
        url: linkApi + "/api/get_search_logo",
        method: "get",
        data: {
          token: token,
          offset: s,
          limit: l,
          keyword: txtSearch,
          reload: getCurrenISOTime(),
        },
        success: function (a) {
          console.log("Đã lấy xong dữ liệu Logo");
          console.log(a);
          let html = "";
          if (a.status == 200) {
            let data = a.data;
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                let clsNew = checkNew(data[i].dateupdated);
                html += ` <li id="${data[i].id}">
                            <td class="${clsNew}">
                              <div class="checkbox">
                                <label>
                                  <input class="export_selected" type="checkbox" id="export_selected">
                                  ${data[i].id} - ${data[i].title} <br />
                                  <img class="lazy" data-src="${link9010 + data[i].filePath}" />
                                </label>
                              </div>
                            </td>
                          </tr>`;
              }
            } else {
              html = nodata;
            }
          }
          if (m) {
            $("#tblLogo tbody").append(html);
          } else {
            $("#tblLogo tbody").html(html);
          }
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    searchVideo2D: (txtSearch = $("#tabVideo2D #txtSearch").val(), s = 0, l = 5, m = !1) => {
      if (txtSearch.length <= 0) {
        l = 10;
        s = 0;
      }
      $.ajax({
        url: linkApi + "/api/get_search_video2d",
        method: "get",
        data: {
          token: token,
          offset: s,
          limit: l,
          keyword: txtSearch,
          reload: getCurrenISOTime(),
        },
        success: function (a) {
          console.log("Đã lấy xong dữ liệu 2D");
          console.log(a);
          let html = "";
          if (a.status == 200) {
            let data = a.data;
            lstVideo2D = data;
            appRender.buildSlVideo2D(m);
            appRender.buildSelectModeListVideo2D();
            // if (data.length > 0) {
            //   for (let i = 0; i < data.length; i++) {
            //     let file = data[i].file;
            //     if (file.includes(link13000)) {
            //       file = file.replace(link13000, linkTest);
            //     }
            //     html += ` <li id="${data[i].id}">
            //                 <div class="checkbox">
            //                   <label>
            //                     <input class="export_selected" type="checkbox" id="export_selected">
            //                     ${data[i].title} <br />
            //                     </label>
            //                 </div>
            //                <video preload="metadata" playsinline class="player2D" controls><source src="${file}#t=0.1" type="video/mp4"></source></video>
            //               </li>`;
            //   }
            // } else {
            //   html = nodata;
            // }
          }
          // if (m) {
          //   $("#tblVideo2D").append(html);
          // } else {
          //   $("#tblVideo2D").html(html);
          // }
          // const players = Array.from(document.querySelectorAll(".player2D")).map((p) => new Plyr(p, { controls }));
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    buildSlVideo2D: (m) => {
      // console.log(lstRenderedVideo);
      let html = "";
      if (lstVideo2D.length > 0) {
        for (let i = 0; i < lstVideo2D.length; i++) {
          let file = lstVideo2D[i].file;
          if (file.includes(link13000)) {
            file = file.replace(link13000, linkTest);
          }
          html += ` <li id="${lstVideo2D[i].id}">
                      <div class="checkbox">
                        <label>
                          <input class="export_selected" type="checkbox" id="export_selected">
                          ${lstVideo2D[i].id} - ${lstVideo2D[i].title} <br />
                          </label>
                      </div>
                    <!-- <video preload="metadata" playsinline class="player2D" controls><source src="${file}#t=0.1" type="video/mp4"></source></video> -->
                    </li>`;
        }
      } else {
        html = nodata;
      }
      if (m) {
        $("#tblVideo2D").append(html);
      } else {
        $("#tblVideo2D").html(html);
      }
    },
    buildSelectModeListVideo2D: () => {
      let html = `<option value=''>-- Choose an item --</option>`;
      // debugger;
      if (lstVideo2D && lstVideo2D.length > 0) {
        // html += `<option value="">-- Choose an item --</option>`;
        for (let i = 0; i < lstVideo2D.length; i++) {
          let video = lstVideo2D[i];
          html += `<option value="${video.id}">${video.title}</option>`;
        }
      } else {
        html = `<option value=''>No data</option>`;
      }
      // $(`#tabRender #slManualVideo2D`).html("")
      // $(`#tabRender #slManualVideo2D`).html(html).select2({ theme: "dark-adminlte" });
      $("#slManualVideo2D").html(html).select2({ theme: "dark-adminlte" });
    },
    searchEffect: (txtSearch = $("#tabEffect #txtSearch").val(), s = 0, l = 5, m = !1) => {
      if (txtSearch.length <= 0) {
        l = 10;
        s = 0;
      }
      $.ajax({
        url: linkApi + "/api/get_search_hieuung",
        method: "get",
        data: {
          token: token,
          offset: s,
          limit: l,
          keyword: txtSearch,
          reload: getCurrenISOTime(),
        },
        success: function (a) {
          console.log("Đã lấy xong dữ liệu Effect");
          console.log(a);
          let html = "";
          if (a.status == 200) {
            let data = a.data;
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                let file = data[i].file;
                if (file.includes(link13000)) {
                  file = file.replace(link13000, linkTest);
                }
                let clsNew = checkNew(data[i].dateupdated);
                html += ` <tr id="${data[i].id}">
                            <td class="${clsNew}">
                              <div class="checkbox">
                                <label>
                                  <input class="export_selected" type="checkbox" id="export_selected">
                                  ${data[i].id} - ${data[i].title} <br />
                                  </label>
                              </div>
                            <video preload="metadata" controls playsinline><source src="${file}#t=0.1"></source></video>
                            </td>
                          </tr>`;
              }
            } else {
              html = nodata;
            }
          }
          if (m) {
            $("#tblEffect tbody").append(html);
          } else {
            $("#tblEffect tbody").html(html);
          }
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    searchAudio: (txtSearch = $("#tabAudio #txtSearch").val(), s = 0, l = 5, m = !1) => {
      if (txtSearch.length <= 0) {
        l = 10;
        s = 0;
      }
      let data_search = {
        token: token,
        offset: s,
        limit: l,
        keyword: txtSearch,
        reload: getCurrenISOTime(),
        catelog_id: $("#slAudioCate option:selected").val() || 0,
      };

      $.ajax({
        url: linkApi + "/api/get_search_audio",
        method: "get",
        data: data_search,
        success: function (a) {
          console.log("Đã lấy xong dữ liệu Audio");
          console.log(a);
          let html = "";
          if (a.status == 200) {
            let data = a.data;
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                let file = data[i].upload_file;
                if (file.includes(link13000)) {
                  file = file.replace(link13000, linkTest);
                } else {
                  file = linkTest + "/" + file;
                }
                let clsNew = checkNew(data[i].dateupdated);
                html += ` <tr id="${data[i].id}">
                            <td class="${clsNew}">
                              <div class="checkbox">
                                <label>
                                  <input class="export_selected" type="checkbox" id="export_selected">
                                  ${data[i].id} - ${data[i].title}
                                </label>
                              </div>
                              <audio preload="none" controls class="playerAudio">
                                <source src="${file}" type="audio/mp3">
                              </audio>
                            </td>
                          </tr>`;
              }
            } else {
              html = nodata;
            }
          }
          if (m) {
            $("#tblAudio tbody").append(html);
          } else {
            $("#tblAudio tbody").html(html);
          }
          const players = Array.from(document.querySelectorAll(".playerAudio")).map((p) => new Plyr(p, { controls }));
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    searchVideo: (txtSearch = $("#tabVideo #txtSearch").val(), s = 0, l = 5, m = !1) => {
      if (txtSearch.length <= 0) {
        l = 10;
        s = 0;
      }
      $.ajax({
        url: linkApi + "/api/get_search_video",
        method: "get",
        data: {
          token: token,
          offset: s,
          limit: l,
          keyword: txtSearch,
          reload: getCurrenISOTime(),
          catelog_id: $("#slAudioCate option:selected").val() || 0,
        },
        success: function (a) {
          console.log("Đã lấy xong dữ liệu Video");
          console.log(a);
          let html = "";
          if (a.status == 200) {
            let data = a.data;
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                let file = data[i].file;
                if (file.includes(link13000)) {
                  file = file.replace(link13000, linkTest);
                }
                let clsNew = checkNew(data[i].dateupdated);
                html += `<li id="${data[i].id}">
                          <div class="checkbox ${clsNew}">
                            <label>
                              <input class="export_selected" type="checkbox" id="export_selected">
                              ${data[i].id} - ${data[i].title}
                            </label>
                          </div>
                         <video preload="metadata" playsinline class="playerVideo" controls><source src="${file}#t=0.1"></source></video>
                        </li>`;
              }
            } else {
              html = nodata;
            }
          }
          if (m) {
            $("#tblVideo").append(html);
          } else {
            $("#tblVideo").html(html);
          }
          // const players = Array.from(document.querySelectorAll(".playerVideo")).map((p) => new Plyr(p, { controls }));
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    getAllFonts: () => {
      $.ajax({
        url: linkApi + "/api/font_manager/get",
        method: "get",
        success: function (a) {
          console.log("Đã lấy xong dữ liệu Font");
          console.log(a);
          let html = "";
          if (a.status == 200) {
            let data = a.data;
            if (a.data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                html += `<tr id="${data[i].id}">
                          <td><i class="fas fa-file-alt"></i> ${data[i].id} - ${data[i].name}</td>
                          <td style='font-family:"Time New Roman"'>Sample text</td>
                        </tr>`;
              }
            } else {
              html = nodata;
            }
          } else {
            html = `Error API`;
          }
          $("#tblFont tbody").html(html);
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    getListAccount: () => {
      $.ajax({
        url: linkApi + "/api/account/getall",
        method: "get",
        success: function (a) {
          console.log("Đã lấy xong dữ liệu Account");
          console.log(a);
          if (a.status == 200) {
            let data = a.data;
            if (a.data.length > 0) {
              for (let i = 0; i < data.length; i++) {}
            }
          }
        },
        error: function (xhr) {
          hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
        },
      });
    },
    buildSlRenderedVideo: () => {
      // console.log(lstRenderedVideo);
      if (lstRenderedVideo.length > 0) {
        let html = "";
        html += `<option value="">-- Choose an item --</option>`;
        for (let i = 0; i < lstRenderedVideo.length; i++) {
          let video = lstRenderedVideo[i];
          if (video.convert_status == 2) {
            html += `<option value="${video.id}">${video.title}</option>`;
          }
        }
        $("#slRenderedVideo").html("");
        $("#slRenderedVideo").html(html);
        $("#slRenderedVideo").select2({ theme: "dark-adminlte", width: "80%" });
      }
    },
    buildSlAccountChannel: () => {
      // Get list Account
      lstYoutube = [
        { id: 1, name: "Youtube 1" },
        { id: 2, name: "Youtube 2" },
        { id: 3, name: "Youtube 3" },
        { id: 4, name: "Youtube 4" },
        { id: 5, name: "Youtube 5" },
      ];
      lstFacebook = [
        { id: 6, name: "Facebook 1" },
        { id: 7, name: "Facebook 2" },
        { id: 8, name: "Facebook 3" },
        { id: 9, name: "Facebook 4" },
        { id: 10, name: "Facebook 5" },
      ];
      lstTiktok = [
        { id: 11, name: "TikTok 1" },
        { id: 12, name: "TikTok 2" },
        { id: 13, name: "TikTok 3" },
        { id: 14, name: "TikTok 4" },
        { id: 15, name: "TikTok 5" },
      ];
      lstAccChan_html += '<optgroup label="Youtube">';
      for (let i = 0; i < lstYoutube.length; i++) {
        lstAccChan_html += `<option type="youtube" value="${lstYoutube[i].id}"> ${lstYoutube[i].name}</option>`;
      }
      lstAccChan_html += "</optgroup>";
      lstAccChan_html += '<optgroup label="TikTok">';
      for (let i = 0; i < lstTiktok.length; i++) {
        lstAccChan_html += `<option type="tiktok" value="${lstTiktok[i].id}">${lstTiktok[i].name}</option>`;
      }
      lstAccChan_html += "</optgroup>";
      lstAccChan_html += '<optgroup label="Facebook">';
      for (let i = 0; i < lstFacebook.length; i++) {
        lstAccChan_html += `<option type="facebook" value="${lstFacebook[i].id}">${lstFacebook[i].name}</option>`;
      }
      lstAccChan_html += "</optgroup>";
      $("#slAccountChannel").html("");
      $("#slAccountChannel").html(lstAccChan_html);
      $("#slAccountChannel").multiselect({
        numberDisplayed: 3,
        enableFiltering: true,
        maxHeight: 400,
        maxHeight: 400,
        enableCaseInsensitiveFiltering: true,
        buttonClass: "btn btn-default btn-sm",
        buttonContainer: '<div id="grpMutilAcc" class="grpMutil btn-group" />',
        buttonWidth: "100%",
      });
      $("li.multiselect-item i.glyphicon.glyphicon-search").removeClass("glyphicon glyphicon-search").addClass("fa fa-search");
    },
    slickAll: () => {
      $(".lstSelected").slick({
        slidesToShow: 3,
        autoplay: !0,
        arrows: !0,
        centerMode: !0,
        speed: 500,
        responsive: [
          { breakpoint: 768, settings: { slidesToShow: 1 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
      });
    },
    reloadListAudio: () => {
      $(".lstSelected").slick("unslick");
      this.slickAll();
    },
    reloadListVideo: () => {},
    reloadListImage: () => {},
  };
  function delay(callback, ms) {
    var timer = 0;
    return function () {
      var context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }
  // Xoá danh sách đã chọn
  $(".lstSelected i.fa-window-close").click(function () {
    //$(this).parent().remove()
  });
  $("#btnBackspace").hide();
  $("#txtTitle").focus(function () {
    $("#btnBackspace").show();
  });
  $("#btnBackspace").click(function () {
    $("#txtTitle").val("");
  });
  // Logo
  $("#btnSearchLogo").click(function () {
    changeBtnSearch();
    appRender.searchLogo($("#tabLogo #txtSearch").val(), 0, $("#tabLogo #txtSearchMore").val(), !1);
    resetBtnSearch();
  });
  $("#tabLogo #txtSearch").keyup(
    delay(function (e) {
      changeBtnSearch();
      $("#btnSearchLogo").trigger("click");
      resetBtnSearch();
    }, 500)
  );
  // Effect
  $("#btnSearchEffect").click(function () {
    changeBtnSearch();
    appRender.searchEffect($("#tabEffect #txtSearch").val(), 0, $("#tabEffect #txtSearchMore").val(), !1);
    resetBtnSearch();
  });
  $("#tabEffect #txtSearch").keyup(
    delay(function (e) {
      changeBtnSearch();
      $("#btnSearchEffect").trigger("click");
      resetBtnSearch();
    }, 500)
  );
  // Audio
  $("#btnSearchAudio").click(function () {
    changeBtnSearch();
    appRender.searchAudio($("#tabAudio #txtSearch").val(), 0, $("#tabAudio #txtSearchMore").val(), !1);
    resetBtnSearch();
  });
  $("#tabAudio #txtSearch").keyup(
    delay(function (e) {
      changeBtnSearch();
      $("#btnSearchAudio").trigger("click");
      resetBtnSearch();
    }, 500)
  );
  // Image
  $("#btnSearchImage").click(function () {
    changeBtnSearch();
    appRender.searchImage($("#tabImage #txtSearch").val(), 0, $("#tabImage #txtSearchMore").val(), !1);
    resetBtnSearch();
  });
  $("#tabImage #txtSearch").keyup(
    delay(function (e) {
      changeBtnSearch();
      $("#btnSearchImage").trigger("click");
      resetBtnSearch();
    }, 500)
  );
  // Image2D
  $("#btnSearchImage2D").click(function () {
    changeBtnSearch();
    appRender.searchImage2D($("#tabImage2D #txtSearch").val(), 0, $("#tabImage2D #txtSearchMore").val(), !1);
    resetBtnSearch();
  });
  $("#tabImage2D #txtSearch").keyup(
    delay(function (e) {
      changeBtnSearch();
      $("#btnSearchImage2D").trigger("click");
      resetBtnSearch();
    }, 500)
  );
  // Video
  $("#btnSearchVideo").click(function () {
    changeBtnSearch();
    appRender.searchVideo($("#tabVideo #txtSearch").val(), 0, $("#tabVideo #txtSearchMore").val(), !1);
    resetBtnSearch();
  });
  $("#tabVideo #txtSearch").keyup(
    delay(function (e) {
      changeBtnSearch();
      $("#btnSearchVideo").trigger("click");
      resetBtnSearch();
    }, 500)
  );
  // Video2D
  $("#btnSearchVideo2D").click(function () {
    changeBtnSearch();
    appRender.searchVideo2D($("#tabVideo2D #txtSearch").val(), 0, $("#tabVideo2D #txtSearchMore").val(), !1);
    resetBtnSearch();
  });
  $("#tabVideo2D #txtSearch").keyup(
    delay(function (e) {
      changeBtnSearch();
      $("#btnSearchVideo2D").trigger("click");
      resetBtnSearch();
    }, 500)
  );
  function changeBtnSearch() {
    $(`#${currentTab} [id^=btnSearch] i`).removeClass("fas fa-search");
    $(`#${currentTab} [id^=btnSearch] i`).addClass("fas fa-redo fa-spin");
  }
  function resetBtnSearch() {
    $(`#${currentTab} [id^=btnSearch] i`).removeClass("fas fa-redo fa-spin");
    $(`#${currentTab} [id^=btnSearch] i`).addClass("fas fa-check");
    $(`#${currentTab} [id^=btnSearch] i`).css("color", "#8bc34a");
    setTimeout(function () {
      $(`#${currentTab} [id^=btnSearch] i`).removeAttr("style");
      $(`#${currentTab} [id^=btnSearch] i`).removeClass("fas fa-check");
      $(`#${currentTab} [id^=btnSearch] i`).addClass("fas fa-search");
    }, 2000);
  }
  // Min, Max tabLogo, tabEffect
  $("#btnLogoMin").click(function () {
    $("#tabLogo").slideUp(400);
  });
  $("#btnEffectMin").click(function () {
    $("#tabEffect").slideUp(400);
  });
  $("#btnLogoClose").click(function () {
    $("#tabLogo").toggle();
  });
  $("#btnEffectClose").click(function () {
    $("#tabEffect").toggle();
  });
  $("#btnAutoAddLogo").click(function () {
    $("#tabLogo").slideDown(400);
  });
  $("#btnAutoAddEffect").click(function () {
    $("#tabEffect").slideDown(400);
  });
  $("#btnRenderAddLogo").click(function () {
    $("#tabLogo").slideDown(400);
  });
  $("#slAudio").change(function () {
    if ($("#slAudio option:selected").val() == "") {
      return;
    }
    flashControl($("#btnDurAudio"));
    flashControl($("#txtDurationAudio"));
  });
  $(document).on(
    {
      click: function () {
        $(this).select();
      },
    },
    'input[type="number"]'
  );

  $("#slVideo").change(function () {
    if ($("#slVideo option:selected").val() == "") {
      return;
    }
    flashControl($("#btnDurVideo"));
    flashControl($("#txtDurationVideo"));
  });
  function flashControl(control, time = 1500) {
    control.addClass("btn-flash");
    control.focus();
    setTimeout(function () {
      control.removeClass("btn-flash");
    }, time);
  }
  $("#btnAutoRandom").click(function () {
    if (lstCollection.title) {
      initlstCollection();
      //initlstConfig();
    }
    // console.clear();
    lstConfig.token = token;
    lstConfig.name = lstConfig.title;
    lstConfig.random = 1;
    lstConfig.bientap_catelog_audios = lstConfig.audios;
    lstConfig.bientap_catelog_videos = lstConfig.videos;
    if (lstConfig.audios && lstConfig.audios.length <= 0) {
      hcShowToast("Warning", "Please Select ant least one audio category", "warning", 1500);
      flashControl($("#select2-slAudio-container"));
      return;
    }
    if (lstConfig.videos && lstConfig.videos.length <= 0) {
      hcShowToast("Warning", "Please Select ant least one audio category", "warning", 1500);
      flashControl($("#slVideo"));
      return;
    }
    if ($("#tabAuto #txtTitle").val() == "") {
      $("#tabAuto #btnRandomTitle").trigger("click");
      lstCollection.title = $(this).val();
    }
    console.log("Dữ liệu gửi lên API Auto render");
    console.log(lstConfig);
    // return;
    $.ajax({
      url: linkApi + "/api/bientap/random",
      method: "post",
      data: { obj: lstConfig },
      success: function (a) {
        console.log(`Data received`);
        console.log(a);
        if (a.status == 200) {
          hcShowToast("Success", "Random success", "success", 700);
          $("#btnAutoRender").removeAttr("disabled");
          $("#navAutoConfig").removeClass("active");
          $("#tabAutoConfig").removeClass("active show");
          $("#navAutoResult").addClass("active");
          $("#tabAutoResult").addClass("active show");
          // setup data result
          buildTableProceedRender(a.data);
          lstRandomResult = a.data;
        } else {
          hcShowToast("Error", "Failed, please contact admin: " + a.message, "error", 1500);
        }
      },
      error: function (xhr) {
        hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
      },
    });
  });
  function buildTableProceedRender(data) {
    if (data) {
      let htmlAudio = ``,
        htmlVideo = ``;
      if (data.audios && data.audios.length > 0) {
        for (let j = 0; j < data.audios.length; j++) {
          let item = data.audios[j];
          let id = item.id;
          let title = item.title;
          let file = link13000 + item.upload_file;
          if (file.includes(link13000)) {
            file = file.replace(link13000, linkTest);
          }
          htmlAudio += `<tr data-type="audios" data-index="${j}"><td><i class="fas fa-music"></i> ${id}</td><td>${title}</td><td><i class="fas fa-eye" data-src="${file}"  data-title="${title}"></i> <i class="fas fa-trash"></i></td></tr>`;
          lstCollection.audios.push({ id: id, title: title, file: file, upload_file: file });
        }
      }
      if (data.videos && data.videos.length > 0) {
        for (let j = 0; j < data.videos.length; j++) {
          let item = data.videos[j];
          let id = item.id;
          let title = item.title;
          let file = item.file;
          if (file.includes(link13000)) {
            file = file.replace(link13000, linkTest);
          }
          htmlVideo += `<tr data-type="videos" data-index="${j}"><td><i class="fas fa-video"></i> ${id}</td><td>${title}</td><td><i class="fas fa-eye" data-src="${file}"  data-title="${title}"></i> <i class="fas fa-trash"></i></td></tr>`;
          lstCollection.videos.push({ id: id, title: title, file: file });
        }
      }
      $("#tblAutoResult tbody").html("");
      $("#tblAutoResult tbody").html(htmlAudio + htmlVideo);
      lstCollection.title = lstConfig.title;
      lstCollection.id_x = data.id_x;
    }
  }
  $(document).on(
    {
      click: function () {
        let src = $(this).data("src");
        let title = $(this).data("title");
        if (src) {
          Swal.fire({
            title: `<strong>${title}</strong>`,
            html: `<video autoplay preload="metadata" playsinline id="previewAutoResult" src="${src}#t=0.1" controls></video>`,
            showCloseButton: true,
          });
        }
      },
    },
    "#tblAutoResult td i.fas.fa-eye"
  );
  $("#tblRender").click(function () {
    if (time <= 0) {
      resetIntervalHisRender();
    }
  });
  $("#btnAutoRender").click(function () {
    // console.clear();
    // Setup info
    // let dataSend = modeRender == "list" ? lstCollectionName : lstCollection;
    let dataSend = lstCollection;
    let title = lstCollection.title || $("#tabAuto #txtTitle").val();
    if (title == "") {
      hcShowToast("Warning", "Please enter title", "warning");
      flashControl($(`#tabAuto #txtTitle`));
      $(`#tabAuto #txtTitle`).focus();
      return;
    }
    dataSend.title = title;
    dataSend.name = title;
    dataSend.token = token;
    // dataSend.video2ds = dataSend.video2ds;
    // dataSend.hieuungs = dataSend.effects;
    dataSend.id_x = dataSend.id_x;
    dataSend.id = dataSend.id_x;
    dataSend.convert = 1;
    console.log(`Dữ liệu gửi lên API process render`);
    // dataSend = {
    //   token: token,
    //   id: dataSend.id,
    //   id_x: dataSend.id,
    // }
    console.log(dataSend);
    // Confirm process render
    Swal.fire({
      title: "OK! Do proceed render now?",
      customClass: {
        actions: "my-actions",
        confirmButton: "order-2 btn btn-danger",
        cancelButton: "order-1 right-gap btn btn-secondary",
      },
      confirmButtonText: '<i class="fab fa-airbnb"></i> Run',
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: linkApi + "/api/bientap/add",
          method: "post",
          data: { obj: dataSend },
          success: function (a) {
            console.log(a);
            if (a.status == 200) {
              console.log(`Đã gửi dữ liệu lên API add render`);
              $("#btnAutoRender").attr("disabled", !0);
              console.log("Đã chuyển sang tab danh sách render và lấy xong dữ liệu");
              hcShowToast("Success", "Add successful, please wait to show history render", "success", 1000);
              setTimeout(function () {
                appRender.getSearchRender();
                $('#navHistory').trigger('click');
              }, 2000);
              initlstCollection();
              initlstCollectionName();
              initlstConfig();
              $("#tabAuto #txtTitle").val("");
              $(`input[type="checkbox"]`).prop("checked", false);
              $(`input[type="search"]`).val("");
              $(`input[type="text"]`).val("");
              $(`#tabAuto select`).val("").trigger('change');
              $(`#tblAutoConfig tbody`).html("");
              $(`#tblAutoResult tbody`).html("");
            } else {
              hcShowToast("Error", "Failed, please contact admin", "error", 1000);
            }
          },
          error: function (xhr) {
            hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
          },
        });
      }
    });
  });
  function initlstCollection() {
    // Init again data
    console.log("Init again data: lstCollection");
    lstCollection = {
      audios: [],
      videos: [],
      logos: [],
      images: [],
      images2d: [],
      effects: [],
      video2ds: [],
      title: "",
      token: "",
    };
  }
  function initlstCollectionHomePage() {
    // Init again data
    console.log("Init again data: initlstCollectionHomePage");
    lstCollectionHomePage = {
      audios: [],
      videos: [],
      logos: [],
      images: [],
      images2d: [],
      effects: [],
      video2ds: [],
      title: "",
      token: "",
    };
  }
  function initlstConfig() {
    // Init again data
    console.log("Init again data: initlstConfig");
    lstConfig = {
      audios: [],
      videos: [],
      logos: [],
      images: [],
      images2d: [],
      effects: [],
      video2ds: [],
      title: "",
      token: "",
    };
  }
  function initlstCollectionName() {
    // Init again data
    console.log("Init again data: lstCollectionName");
    lstCollectionName = {
      audios: [],
      videos: [],
      logos: [],
      images: [],
      images2d: [],
      effects: [],
      video2ds: [],
      title: "",
      token: "",
    };
  }
  $("#btnRender").click(function () {
    // console.clear();
    let title = $(`#tabRender #txtTitle`).val();
    if (title == "") {
      hcShowToast("Warning", "Please enter title", "warning");
      $(`#tabRender #txtTitle`).focus();
      flashControl($(`#tabRender #txtTitle`));
      return;
    }
    // Setup info
    let dataSend = modeRender == "list" ? lstCollectionName : lstCollection;
    dataSend.title = title;
    dataSend.name = title;
    dataSend.token = token;
    dataSend.audios = modeRender == "list"? dataSend.audios[0] : dataSend.audios;
    dataSend.videos = modeRender == "list"? dataSend.videos[0] : dataSend.videos;
    dataSend.video2ds = dataSend.video2ds;
    dataSend.hieuungs = dataSend.effects;
    dataSend.convert = 1;
    console.log(`Dữ liệu gửi lên API render theo ${modeRender}`);
    console.log(dataSend);
    // return;
    $.ajax({
      url: linkApi + "/api/bientap/add",
      method: "post",
      data: { obj: dataSend },
      success: function (a) {
        console.log(a);
        if (a.status == 200) {
          console.log(`Đã gửi dữ liệu lên API render theo ${modeRender}`);
          hcShowToast("Success", "Add new Render is success", "success", 1000);
          console.log("Đã chuyển sang tab danh sách render và lấy xong dữ liệu");
          appRender.getSearchRender();
          gotoNav("Render", "HistoryRender");
          initlstCollection();
          initlstCollectionName();
          initlstConfig();
          $(`input[type="checkbox"]`).prop("checked", false);
          $(`input[type="search"]`).val("");
          $(`input[type="text"]`).val("");
          $(`#tabRender select`).val("").trigger('change');
        } else {
          hcShowToast("Error", "Failed, please check again data", "error", 1000);
        }
      },
      error: function (xhr) {
        hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
      },
    });
  });
  function gotoNav(curName = "Auto", name = "navHistoryRender") {
    $(`#navMain .nav-item`).removeClass("active show");
    if (name && name.includes("History")) {
      $(`#navMain .nav-item`).removeClass("active show");
      $(`#navTabContent .tab-pane`).removeClass("active show");
      $(`#navHistory`).addClass("active");
      $(`#tabHistory`).addClass("active show");
    }
    $(`#nav${curName}`).removeClass("active");
    $(`#tab${curName}`).removeClass("active show");
    $(`#nav${name}`).addClass("active");
    $(`#tab${name}`).addClass("active show");
  }
  $("#btnAutoAddEffect").click(function () {
    $("#tabEffect").slideDown(400);
  });
  $("#btnDurAudio").click(function (e) {
    e.preventDefault();
    if (lstConfig.audios == undefined) {
      lstConfig.audios = [];
    }
    if ($("#slAudio option:selected").val() == "") {
      return;
    }
    lstConfig.audios.push({ catelog_id: $("#slAudio option:selected").val(), title: $("#slAudio option:selected").text(), count_audio: $("#txtDurationAudio").val() });
    buildConfigAuto();
  });
  $("#btnDurVideo").click(function (e) {
    e.preventDefault();
    if (lstConfig.videos == undefined) {
      lstConfig.videos = [];
    }
    if ($("#slVideo option:selected").val() == "") {
      return;
    }
    lstConfig.videos.push({ catelog_id: $("#slVideo option:selected").val(), title: $("#slVideo option:selected").text(), count_video: $("#txtDurationVideo").val() });
    buildConfigAuto();
  });
  $("#btnPosLogo").click(function (e) {
    e.preventDefault();
    if (lstConfig.logos == undefined) {
      lstConfig.logos = [];
    }
    lstConfig.logos.push({ id: $("#slLogo option:selected").val(), link: $("#slLogo option:selected").data("link"), title: $("#slLogo option:selected").text(), pos: $("#slPosLogo option:selected").text(), position: $("#slPosLogo option:selected").val() });
    buildConfigAuto();
  });
  $("#slListPosLogo").change(function (e) {
    e.preventDefault();
    if (lstCollectionName.logos == undefined) {
      lstCollectionName.logos = [];
    }
    if ($("#slListLogo option:selected").val() == "") {
      return;
    }
    lstCollectionName.logos.push({ id: $("#slListLogo option:selected").val(), link: $("#slListLogo option:selected").data("link"), title: $("#slListLogo option:selected").text(), pos: $("#slListPosLogo option:selected").text(), position: $("#slListPosLogo option:selected").val() });
    BuildListLogo();
  });
  $("#slListPosLogo").select2(configSelect2);
  $("#btnListPosLogo").click(function (e) {
    // e.preventDefault();
    // if (lstCollectionName.logos == undefined) {
    //   lstCollectionName.logos = [];
    // }
    // if ($("#slListLogo option:selected").val() == "") {
    //   return;
    // }
    // lstCollectionName.logos.push({ id: $("#slListLogo option:selected").val(), link: $("#slListLogo option:selected").data("link"), title: $("#slListLogo option:selected").text(), pos: $("#slListPosLogo option:selected").text(), position: $("#slListPosLogo option:selected").val() });
    // BuildListLogo();
  });
  function BuildListLogo() {
    console.log(lstCollectionName);
    let html = ``;
    if (lstCollectionName.logos && lstCollectionName.logos.length > 0) {
      lstCollection.logos = lstCollectionName.logos;
      for (let i = 0; i < lstCollectionName.logos.length; i++) {
        let data = lstCollectionName.logos[i];
        if (data && data.title) {
          html += `<tr><td><img class="lazy" data-src="${data.link}" /></td><td>${data.id} - ${data.title}</td><td>${data.position}</td><td data-type="logos" data-name="logos" data-index="${i}"><i class="fas fa-trash"></i></td></tr>`;
        }
      }
      // $(`#tblListLogo thead`).html(`<tr><th style="text-align:center;" colspan="4">List of "Logo"</th></tr>`);
    } else {
      html = nodata;
    }
    if (html == "") {
      html = nodata;
    }
    $(`#tblListLogo tbody`).html(html);
    gotoNavChildRender("ListLogo");
  }
  function gotoNavChildRender(name) {
    $(`#tabList .nav-link`).removeClass("active");
    $(`#tabList .tab-content .tab-pane`).removeClass("active").removeClass("show");
    $(`#nav${name}`).addClass("active");
    $(`#tab${name}`).addClass("active show");
  }
  function getCurrenISOTime() {
    let tzoffset = new Date().getTimezoneOffset() * 60000;
    let localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
    return localISOTime.replace(/-/g, "").replace(/:/g, "").slice(0, -4);
  }
  $("#btnRandomTitle").click(function (e) {
    let title = "Auto_" + getCurrenISOTime();
    $("#tabAuto #txtTitle").val(title);
    lstConfig.title = title;
  });
  $("#btnRenderRandomTitle").click(function (e) {
    let title = "Render_" + getCurrenISOTime();
    $("#tabRender #txtTitle").val(title);
    lstConfig.title = title;
    lstCollectionName.title = title;
  });
  $("#btnRandomAudio").click(function (e) {
    $("#tabAudio #txtName").val("ListAudio_" + getCurrenISOTime());
  });
  $("#btnRandomVideo").click(function (e) {
    $("#tabVideo #txtName").val("ListVideo_" + getCurrenISOTime());
  });
  $("#btnRandomImage").click(function (e) {
    $("#tabImage #txtName").val("ListImage_" + getCurrenISOTime());
  });
  $("#btnRandomVideo2D").click(function (e) {
    $("#tabVideo2D #txtName").val("ListVideo2D_" + getCurrenISOTime());
  });
  $("#tblAutoConfig").hide();
  function buildConfigAuto() {
    let audio = lstConfig.audios;
    let video = lstConfig.videos;
    let logo = lstConfig.logos;
    let effect = lstConfig.effects;
    let htmlAudio = "";
    let htmlVideo = "";
    let htmlLogo = "";
    let htmlEffect = "";
    if (audio) {
      for (let i = 0; i < audio.length; i++) {
        htmlAudio += `<tr>
                      <td><i class="fas fa-music"></i> ${audio[i].title}</td>
                      <td data-type="audio" data-index="${i}" class="col-3"><input type="number" value="${audio[i].count_audio}"  class="form-control" /></td>
                      <td data-type="audio" data-index="${i}"><i class="fas fa-trash"></i></td>
                    </tr>
                    `;
      }
    }
    if (video) {
      for (let i = 0; i < video.length; i++) {
        htmlVideo += `<tr>
                      <td><i class="fas fa-video"></i> ${video[i].title}</td>
                      <td data-type="video" data-index="${i}" class="col-3"><input type="number" value="${video[i].count_video}" class="form-control" /></td>
                      <td data-type="video" data-index="${i}"><i class="fas fa-trash"></i></td>
                    </tr>
                    `;
      }
    }
    if (logo) {
      for (let i = 0; i < logo.length; i++) {
        htmlLogo += `<tr>
                      <td><img class="lazy" data-src="${logo[i].link}" />${logo[i].title}</td>
                      <td>${logo[i].position}</td>
                      <td data-type="logo" data-index="${i}"><i class="fas fa-trash"></i></td>
                    </tr>
                    `;
      }
    }
    $("#tblAutoConfig tbody").html(htmlAudio + htmlVideo + htmlLogo + htmlEffect);
    $("#tblAutoConfig").show();
    $("#tabChildAuto .nav-link").removeClass("active");
    $("#tabChildAuto .tab-pane").removeClass("active show");
    $("#navAutoConfig").addClass("active");
    $("#tabAutoConfig").addClass("active show");
  }
  $(document).on(
    {
      change: function () {
        let type = $(this).parent().data("type");
        let val = $(this).val();
        let index = $(this).parent().data("index");
        console.log(type);
        console.log(index);
        console.log(lstConfig.audios[index]);
        switch (type) {
          case "audio":
            lstConfig.audios[index].count_audio = val;
            break;
          case "video":
            lstConfig.videos[index].count_video = val;
            break;
        }
        console.log(lstConfig);
      },
    },
    "#tblAutoConfig tbody td:nth-child(2) input"
  );
  function removeElement(array, elem) {
    let index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
      console.log(`Found & deleted item: ${index}`);
      console.log(array);
    } else {
      console.log(`Not found item: ${elem}`);
    }
  }
  $(document).on(
    {
      click: function () {
        let type = $(this).parent().data("type");
        let index = $(this).parent().data("index");
        console.log(type);
        console.log(index);
        console.log(lstConfig.audios[index]);
        Swal.fire({
          title: "Do you want to delete?",
          customClass: {
            actions: "my-actions",
            confirmButton: "order-2 btn btn-danger",
            cancelButton: "order-1 right-gap btn btn-secondary",
          },
          confirmButtonText: '<i class="fas fa-trash"></i> Delete',
          showCancelButton: true,
          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            switch (type) {
              case "audio":
                removeElement(lstConfig.audios, lstConfig.audios[index]);
                break;
              case "video":
                removeElement(lstConfig.videos, lstConfig.videos[index]);
                break;
              case "logo":
                removeElement(lstConfig.logos, lstConfig.logos[index]);
                break;
              case "effect":
                removeElement(lstConfig.effects, lstConfig.effects[index]);
                break;
            }
            buildConfigAuto();
          }
        });
      },
    },
    "#tblAutoConfig tbody i.fas.fa-trash"
  );
  //btnView tabRender
  $(document).on(
    {
      click: function () {
        let video = $(this).parent().parent().parent().children("video");
        if (video) {
          // if (video[0].offsetWidth == 85) {
          //   video.css("width", "100%");
          // } else {
          //   video.removeAttr("style");
          // }
          $(this).children("i").toggleClass("fas fa-eye");
          $(this).children("i").toggleClass("fas fa-eye-slash");
        }
      },
    },
    "#tblRender td button[title='View']"
  );
  $(document).on(
    {
      click: function () {
        let id = $(this).data("id");
        if (id) {
          Swal.fire({
            title: "Do you want to delete item ID: " + id,
            customClass: {
              actions: "my-actions",
              confirmButton: "order-2 btn btn-danger",
              cancelButton: "order-1 right-gap btn btn-secondary",
            },
            confirmButtonText: '<i class="fas fa-trash"></i> Delete',
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              $.ajax({
                url: linkApi + "/api/bientap/delete",
                method: "post",
                data: { token: token, id: id },
                success: function (a) {
                  if (a && a.status == 200) {
                    hcShowToast("Deleted", "Success", "success", 500);
                    appRender.getSearchRender();
                  } else {
                    hcShowToast("Failed", "Failed to delete", "error");
                  }
                },
                error: function (xhr) {
                  hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
                },
              });
            }
          });
        }
      },
    },
    "#tblRender td button[title='Delete']"
  );
  $(document).on(
    {
      click: function () {
        $("#navMain").toggle();
        $("#navTabContent").toggle();
        $("#homepage").toggle();
        $("#txtTags").tagsinput();
        // Main
        // appRender.slickAll();
        // tabAuto
        // appRender.getSelectVideo();
        // appRender.getSelectAudio();
        appRender.getSelectLogo();
        appRender.getSelectEffect();
        // tabAudio
        appRender.searchAudio();
        appRender.searchVideo();
        //appRender.getAllFonts();
        appRender.searchLogo();
        appRender.searchImage();
        appRender.searchImage2D();
        appRender.searchVideo2D();
        appRender.searchEffect();
        appRender.getSearchRender();
        appRender.buildSlAccountChannel();
      },
    },
    "#btnEditor"
  );
  // tabAuto
  appRender.getSelectVideo();
  appRender.getSelectAudio();
  $(document).on(
    {
      click: function () {
        if (!token) {
          return;
        }
        $("#navMain").toggle();
        $("#navTabContent").toggle();
        $("#homepage").toggle();
      },
    },
    "#btnHome"
  );
  $("#btnReload").click(function (e) {
    window.location.reload();
  });
  $("#btnAuthor").click(function (e) {
    Swal.fire({
      title: "About",
      html: `<table id="tblAbout" class="table table-dark" style="text-align:left">
              <tbody>
                <tr>
                  <td>Account</td>
                  <td><b>${userName || ""}</b></td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>Render Video</td>
                </tr>
                <tr>
                  <td>Version</td>
                  <td>1.0.3</td>
                </tr>
                <tr>
                  <td>Release</td>
                  <td>3/06/2022</td>
                </tr>
                <tr>
                  <td>Dev</td>
                  <td>Hoan Chu<br /><a href="tel:0865259420">0865259420</a></td>
                </tr>
                <tr>
                  <td>Copyright</td>
                  <td>Hồng Ân Entertainment</td>
                </tr>
              </tbody>
            </table>
      `,
    });
  });
  $("#btnNewContent").click(function (e) {
    $("#homepage #txtSearch").val("");
    $("#filter_audio").show();
    $("#btnHomeSearch").trigger("click");
  });
  $("#tabAuto #txtTitle")
    .keyup(function (e) {
      lstConfig.title = $(this).val();
      console.log(lstConfig.title);
    })
    .blur(function () {
      if ($(this).val() == "") {
        $(this).val("Auto_" + getCurrenISOTime());
      }
    });
  $("#row_tab .btn-group-toggle .btn").click(function (e) {
    typeSearch = $(this).children("input").val();
    mhp = 0;
    // if ($("#homepage #txtSearch").val().length > 0) {
    // }
    $("#btnHomeSearch").trigger("click");
  });

  $("#homepage #txtSearch").keyup(
    delay(function (e) {
      typeSearch = $(this).children("input").val();
      $("#btnHomeSearch").trigger("click");
    }, 500)
  );
  $("#slFilterByCateAudio").change(function (e) {
    //$("#btnHomeSearch").trigger("click");
  });
  $("#btnAddslFilterByCateAudio").click(function (e) {
    //$("#btnHomeSearch").trigger("click");
  });
  $("#filter_video").hide();
  $("#filter_audio").hide();
  function getHomePage(s = 0, l = 50, vm = false) {
    let apiSearch = "get_search_audio";
    let keyword = $("#homepage #txtSearch").val();
    switch (typeSearch) {
      case "video":
        apiSearch = "get_search_video";
        $("#filter_video").show();
        $("#filter_audio").hide();
        break;
      case "image":
        $("#filter_video").hide();
        $("#filter_audio").hide();
        apiSearch = "get_search_image";
        break;
      case "video2d":
        $("#filter_video").hide();
        $("#filter_audio").hide();
        apiSearch = "get_search_video2d";
        break;
      case "audio":
        $("#filter_video").hide();
        $("#filter_audio").show();
        apiSearch = "get_search_audio";
        break;
    }
    // hcShowToast('Please wait','Loading data from server...','info',1000);
    $.ajax({
      url: linkApi + "/api/" + apiSearch,
      method: "get",
      data: {
        token: token,
        keyword: keyword,
        offset: s,
        limit: 50,
        length: 50,
        catelog_id: $("#slFilterByCateAudio option:selected").val(),
        reload: getCurrenISOTime(),
      },
      success: function (a) {
        console.log("Đã tìm thấy dữ liệu với từ khóa: " + keyword);
        if (a.status == 200) {
          let data = a.data;
          lstHomeSearch = data;
          // console.log(data);
          buildHomeSearch(typeSearch, lstHomeSearch, vm);
          // hcShowToast('Done','Data is loaded','success',1000);
          lstHomeSearch = [];
          mhp += 50;
        } else {
          console.log("Can't get search data from server with keyword: " + keyword);
        }
      },
      error: function (xhr) {
        hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
      },
    });
  }
  $("#vmHomepage").click(function (e) {
    if (typeSearch == undefined) {
      typeSearch = "audio";
    }
    console.log(typeSearch);
    console.log(mhp);
    getHomePage(mhp, 50, true);
  });

  $("#btnHomeSearch").click(function (e) {
    if (typeSearch == undefined) {
      typeSearch = $('input[name="optSearch"]:checked').val();
    }
    getHomePage(mhp, 50, false);
  });
  function buildHomeSearch(typeSearch = "audio", data = [], vm = false) {
    if (data) {
      let html = "";
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          let id = item.id;
          let title = item.title;
          let datecreated = data[i].datecreated;
          let dateupdated = data[i].dateupdated;
          let cls = ``;
          let today = new Date().toISOString().slice(0, 10);
          let diffInMs = new Date(today) - new Date(dateupdated);
          let diffInDays = diffInMs / (1000 * 60 * 60 * 24);
          if (diffInDays <= 7) {
            cls = `new`;
          }
          switch (typeSearch) {
            case "video":
              let upload_file = item.file;
              if (upload_file && upload_file.includes(link13000)) {
                upload_file = upload_file.replace(link13000, linkTest);
              }
              html += `<tr id="${id}" title="${dateupdated}">
                        <td class="${cls}">
                          <div class="checkbox">
                            <label>
                              <input class="export_selected" type="checkbox" id="export_selected">
                              ${data[i].id} - ${data[i].title}
                            </label>
                          </div>
                          <video class="hpVideo" preload="metadata" controls playsinline style="width:100%"><source src="${upload_file}#t=0.1"></source></video>
                        </td>
                      </tr>`;
              break;
            case "image":
              let file = item.file;
              if (file && file.includes(link13000)) {
                file = file.replace(link13000, linkTest);
              }
              html += `<tr id="${id}" title="${dateupdated}"><td class="${cls}"><p>${id} - ${title}</p><img class="lazy" data-src="${file}"  style="width:100%" /></td></tr>`;
              break;
            case "video2d":
              html += `<tr id="${id}" title="${dateupdated}"><td class="${cls}">${id} - ${title}</td></tr>`;
              break;
            case "audio":
              let audio_file = item.upload_file;
              if (audio_file && audio_file.includes(link13000)) {
                audio_file = audio_file.replace(link13000, linkTest);
              } else {
                audio_file = linkTest + "/" + audio_file;
              }
              html += `<tr id="${id}" title="${dateupdated}">
                        <td class="${cls}">
                          <div class="checkbox">
                            <label>
                              <input class="export_selected" type="checkbox" id="export_selected">
                              ${data[i].id} - ${data[i].title}
                            </label>
                          </div>
                          <audio preload="none" class="hpAudio" controls style="width:100%">
                            <source src="${audio_file}"></source></audio>
                        </td>
                      </tr>`;
              break;
            default:
              html += `<tr id="${id}" title="${dateupdated}"><td class="${cls}">${id} - ${title}</td></tr>`;
              break;
          }
        }
      } else {
        html = nodata;
        data.length = 0;
      }
      let rsLen = data.length;
      if (vm) {
        $("#tblHomeSearch tbody").append(html);
        let countTdHomeSearch = $("#tblHomeSearch tbody tr").length || 0;
        rsLen += countTdHomeSearch;
      } else {
        $("#tblHomeSearch tbody").html("");
        $("#tblHomeSearch tbody").html(html);
      }
      $("#lblResult").html(`Result(${rsLen})`);
      $("#tblHomeSearch").show();
      if(typeSearch == 'image'){
        lazyLoading();
      }
      if(typeSearch == 'audio'){
        let players = Array.from(document.querySelectorAll(".hpAudio")).map((p) => new Plyr(p, { controls }));
      }
      if(typeSearch == 'video'){
        let players = Array.from(document.querySelectorAll(".hpVideo")).map((p) => new Plyr(p, { controls }));
      }
    }
  }
  $(document).on(
    {
      click: function () {
        initlstCollectionHomePage();
        let len = $("#tblHomeSearch tr").length || 0;
        $(`#homepage #lblResult`).html(`Result (${len})`);
        $(`#clsClearHomePage`).remove();
      },
    },
    "#homepage #clsClearHomePage"
  );
  $(document).on("change", `#homepage #tblHomeSearch .export_selected`, function () {
    let tr_id = $(this).parent().parent().parent().parent();
    let id = tr_id.attr("id");
    let tr_title = $(this).parent()[0].innerText.trim();
    if (this.checked) {
      $(tr_id).addClass("active");
      lstCollectionHomePage.audios.push({ id: tr_id.attr("id"), title: tr_title });
    } else {
      $(tr_id).removeClass("active");
      let rmIndex = lstCollectionHomePage.audios.indexOf(lstCollectionHomePage.audios.find(x => x.id == id));
      lstCollectionHomePage.audios.splice(rmIndex, 1);
    }
    if (lstCollectionHomePage.audios && lstCollectionHomePage.audios.length > 0) {
      $(`#homepage #lblResult`).html(`Item selected(${lstCollectionHomePage.audios.length})`);
      $("#clsClearHomePage").show();
    } else {
      $("#clsClearHomePage").hide();
      let len = $("#tblHomeSearch tr").length || 0;
      $(`#homepage #lblResult`).html(`Result (${len})`);
    }
  });
  $(document).on("change", `#tabAudio .export_selected`, function () {
    let tr_id = $(this).parent().parent().parent().parent();
    let id = tr_id.attr("id");
    let tr_title = $(this).parent()[0].innerText.trim();
    if (this.checked) {
      $(tr_id).addClass("active");
      lstCollection.audios.push({ id: tr_id.attr("id"), title: tr_title });
    } else {
      $(tr_id).removeClass("active");
      let rmIndex = lstCollection.audios.indexOf(lstCollection.audios.find(x => x.id == id));
      lstCollection.audios.splice(rmIndex, 1);
    }
    $(`#tabAudio #count_selected`).html(` selected(${lstCollection.audios.length})`);
  });
  $(document).on("change", `#tabVideo .export_selected`, function () {
    let tr_id = $(this).parent().parent().parent();
    let id = tr_id.attr("id");
    let tr_title = $(this).parent()[0].innerText.trim();
    if (this.checked) {
      $(tr_id).addClass("active");
      lstCollection.videos.push({ id: tr_id.attr("id"), title: tr_title });
    } else {
      $(tr_id).removeClass("active");
      let rmIndex = lstCollection.videos.indexOf(lstCollection.videos.find(x => x.id == id));
      lstCollection.videos.splice(rmIndex, 1);
    }
    $(`#tabVideo #count_selected`).html(` selected(${lstCollection.videos.length})`);
  });
  $(document).on("change", `#tabImage .export_selected`, function () {
    let tr_id = $(this).parent().parent().parent();
    let id = tr_id.attr("id");
    let tr_title = $(this).parent()[0].innerText.trim();
    if (this.checked) {
      $(tr_id).addClass("active");
      lstCollection.images.push({ id: tr_id.attr("id"), title: tr_title });
    } else {
      $(tr_id).removeClass("active");
      let rmIndex = lstCollection.images.indexOf(lstCollection.images.find(x => x.id == id));
      lstCollection.images.splice(rmIndex, 1);
    }
    $(`#tabImage #count_selected`).html(` selected(${lstCollection.images.length})`);
  });
  $(document).on("change", `#tabImage2D .export_selected`, function () {
    let tr_id = $(this).parent().parent().parent();
    let id = tr_id.attr("id");
    let tr_title = $(this).parent()[0].innerText.trim();
    if (this.checked) {
      $(tr_id).addClass("active");
      lstCollection.images2d.push({ id: tr_id.attr("id"), title: tr_title });
    } else {
      $(tr_id).removeClass("active");
      let rmIndex = lstCollection.images2d.indexOf(lstCollection.images2d.find(x => x.id == id));
      lstCollection.images2d.splice(rmIndex, 1);
    }
    $(`#tabImage2D #count_selected`).html(` selected(${lstCollection.images2d.length})`);
  });
  $(document).on("change", `#tabVideo2D .export_selected`, function () {
    let tr_id = $(this).parent().parent().parent();
    let id = tr_id.attr("id");
    let tr_title = $(this).parent()[0].innerText.trim();
    if (this.checked) {
      $(tr_id).addClass("active");
      lstCollection.video2ds.push({ id: tr_id.attr("id"), title: tr_title });
    } else {
      $(tr_id).removeClass("active");
      let rmIndex = lstCollection.video2ds.indexOf(lstCollection.video2ds.find(x => x.id == id));
      lstCollection.video2ds.splice(rmIndex, 1);
    }
    $(`#tabVideo2D #count_selected`).html(` selected(${lstCollection.video2ds.length})`);
  });
  $("#btnExportAudio").click(function (e) {
    let txtName = $(`#${currentTab} #txtName`);
    // Check null
    if (txtName.val() == "") {
      hcShowToast("Warning", "Enter name of the list audio.", "warning");
      txtName.focus();
      return;
    }
    // Add to list audio
    lstCollectionName.audios.push(lstCollection.audios);
    lstCollectionName.audios.name = txtName.val();
    hcShowToast("Success", "Export list success", "success", 500);
    console.log("List collection name");
    console.log(lstCollectionName);
    // Save to database
    SaveAudioToCategory(0, txtName.val());
    lstCollection.audios = [];
    $(`#${currentTab} #txtName`).val("");
    $(`#${currentTab} input[type="checkbox"]`).prop("checked", false);
    $(`#${currentTab} tr`).removeClass("active");
    $(`#${currentTab} #count_selected`).html("");
    $(`#${currentTab} #tblAudio thead th`).html("List audio");
  }); // #end click #btnExportAudio
  $(".nav-item").click(function (e) {
    $(`#navMain .nav-item`).removeClass("active show");
    currentTab = $(this).attr("aria-controls");
    // Turn off player
    turnOffAllPlayer();
  });
  // Turn off player
  function turnOffAllPlayer() {
    $("video").each(function () {
      $(this).get(0).pause();
    });
    $("audio").each(function () {
      $(this).get(0).pause();
    });
  }
  $(".nav-link").click(function (e) {
    currentTab = $(this).attr("aria-controls");
  });
$("#navRender").click(function (e) {
    if (modeRender == "manual") {
      $("#btnManual").trigger("click");
      setTimeout(function(){
        $("#btnRLManualVideo2D").trigger("click");
      },1000);
    }
    // $("#btnManual").trigger("click");
  });
  function resetIntervalHisRender() {
    if (itvHistoryRender) {
      return;
    }
    itvHistoryRender = setInterval(function () {
      $("#lblRenderHistory").html("Reload data in " + time-- + "s left");
      if (time <= -1) {
        time = 10;
        let tr;
        if ($("#tblRender tr")) {
          tr = $("#tblRender tr").length;
        }
        let len = mhis_render > 5 ? mhis_render : tr;
        appRender.checkRenderStatus(0, len, true);
      }
    }, 1000);
  }
  $("#navHistory").click(function (e) {
    $("#navHistoryRender").trigger("click");
    resetIntervalHisRender();
  });
  $("#navVideo").click(function (e) {
    $('.dom_vitual').remove();
    resetIntervalGetGenVideo();
    GenVitualDomVideo();
    flagQueueImage = false;
  });
  $("#navHistoryUpload").click(function (e) {
    appRender.getSearchUpload();
  });
  $("#btnExportVideo").click(function (e) {
    let txtName = $(`#${currentTab} #txtName`);
    // Check null
    if (txtName.val() == "") {
      hcShowToast("Warning", "Enter name of the list video.", "warning");
      txtName.focus();
      return;
    }
    // Add to list video
    lstCollectionName.videos.push(lstCollection.videos);
    lstCollectionName.videos.name = txtName.val();
    hcShowToast("Success", "Export list success", "success", 1000);
    // Save to database
    SaveVideoToCategory(0, txtName.val());
    console.log("List collection name");
    console.log(lstCollectionName);
    lstCollection.videos = [];
    $(`#${currentTab} #txtName`).val("");
    $(`#${currentTab} input[type="checkbox"]`).prop("checked", false);
    $(`#${currentTab} li`).removeClass("active");
    $(`#${currentTab} #count_selected`).html("");
    $(`#${currentTab} #tblVideo thead th`).html("List video");
  }); // #end click #btnExportVideo
  $("#btnExportVideo2D").click(function (e) {
    let txtName = $(`#${currentTab} #txtName`);
    // Check null
    if (txtName.val() == "") {
      hcShowToast("Warning", "Enter name of the list video 2D.", "warning");
      txtName.focus();
      return;
    }
    // Add to list video 2D
    lstCollectionName.video2ds.push(lstCollection.video2ds);
    lstCollectionName.video2ds.name = txtName.val();
    hcShowToast("Success", "Export list success", "success", 1000);
    console.log("List collection name");
    console.log(lstCollectionName);
    lstCollection.video2ds = [];
    $(`#${currentTab} #txtName`).val("");
    $(`#${currentTab} input[type="checkbox"]`).prop("checked", false);
    $(`#${currentTab} li`).removeClass("active");
    $(`#${currentTab} #count_selected`).html("");
    $(`#${currentTab} #tblVideo2D thead th`).html("List video");
  }); // #end click #btnExportVideo2D
  $("#btnExportImage").click(function (e) {
    let txtName = $(`#${currentTab} #txtName`);
    // Check null
    if (txtName.val() == "") {
      hcShowToast("Warning", "Enter name of the list image.", "warning");
      txtName.focus();
      return;
    }
    // Add to list image
    lstCollectionName.images.push(lstCollection.images);
    lstCollectionName.images.name = txtName.val();
    hcShowToast("Success", "Export list success", "success", 1000);
    console.log("List collection name");
    console.log(lstCollectionName);
    lstCollection.images = [];
    $(`#${currentTab} #txtName`).val("");
    $(`#${currentTab} input[type="checkbox"]`).prop("checked", false);
    $(`#${currentTab} li`).removeClass("active");
    $(`#${currentTab} #count_selected`).html("");
    $(`#${currentTab} #tblImage thead th`).html("List image");
  }); // #end click #btnExportImage
  $("#btnBackToTop").click(function (e) {
    window.scrollTo(0, 0);
  });
  /*=====================================#end click #btnExportImage============================================*/
  $(document).on(
    {
      click: function () {
        let id = $(this).data("id");
        $("#slRenderedVideo").val(id);
        $("#navHistory").removeClass("active");
        $("#tabHistory").removeClass("active show");
        $("#slRenderedVideo").trigger("change");
        gotoNav("HistoryRender", "Upload");
      },
    },
    "#tblRender td button[title='Upload']"
  );
  $("#tabUpload #btnUpload").click(function (e) {
    if ($("#slRenderedVideo").val() == "") {
      return;
    }
    hcShowToast("Warning", "API đang trong quá trình thử nghiệm", "error");
    return;
    e.preventDefault();
    // console.clear();
    // Set video info
    let videoId = $("#tabUpload #slRenderedVideo option:selected").val();
    let videoTitle = $("#tabUpload #slRenderedVideo option:selected").text();
    let title = $("#tabUpload #txtTitle").val();
    let descrition = $("#tabUpload #txtDesc").val();
    let tags = $("#tabUpload #txtTags").val();
    // Get selected account channel
    let slAccountChannel = $("#tabUpload #slAccountChannel option:selected");
    let lstSelectedYoutube = [];
    let lstSelectedFacebook = [];
    let lstSelectedTikTok = [];
    let error = ``;
    if (!title) {
      error += `- Title <br>`;
    }
    if (!descrition) {
      error += `- Description <br>`;
    }
    if (!tags) {
      error += `- Tag <br>`;
    }
    if (slAccountChannel.length <= 0) {
      error += `- Account or Channel`;
    }
    if (error != "") {
      hcShowToast("Info Required", `${error}`, "warning", 5000);
      return;
    }
    // Disabled button and setup info
    $(this).prop("disabled", !0);
    for (let i = 0; i < slAccountChannel.length; i++) {
      let $option = slAccountChannel[i];
      let val = $($option)[0].attributes["value"].value.trim();
      let text = $($option)[0].innerText.trim();
      let type = $($option)[0].attributes["type"].value.trim();
      switch (type) {
        case "tiktok":
          lstSelectedTikTok.push({ id: val, title: text });
          break;
        case "facebook":
          lstSelectedFacebook.push({ id: val, title: text });
          break;
        case "youtube":
          lstSelectedYoutube.push({ id: val, title: text });
          break;
      }
    }
    // Set data for lstConfigUpload
    lstConfigUpload.videoId = videoId;
    lstConfigUpload.videoTitle = videoTitle;
    lstConfigUpload.title = title;
    lstConfigUpload.descrition = descrition;
    lstConfigUpload.tags = tags;
    lstConfigUpload.lstAccYoutube = lstSelectedYoutube;
    lstConfigUpload.lstAccFacebook = lstSelectedFacebook;
    lstConfigUpload.lstAccTiktok = lstSelectedTikTok;
    console.log(lstConfigUpload);
    // Call API
    console.log("Call API Upload");
    $.ajax({
      url: linkApi + "/api/upload/add",
      method: "post",
      data: { obj: lstConfigUpload },
      success: function (a) {
        console.log(a);
        if (a && a.status == 200) {
          // Clear form Upload
          appRender.buildSlRenderedVideo();
          appRender.buildSlAccountChannel();
          console.log("Clear Config Upload");
          $("#slAccountChannel").multiselect("refresh");
          $("#slRenderedVideo").select2(configSelect2);
          $("#tabUpload #txtTitle").val("");
          $("#tabUpload #txtDesc").val("");
          $("#tabUpload #txtTags").tagsinput("removeAll");
          initConfigUpload();
          // Go to tab History Upload
          console.log("Goto Nav");
          gotoNav("Upload", "HistoryUpload");
          $(this).prop("disabled", !1);
          hcShowToast("Success", "Upload is in progress.", "success");
        } else {
          hcShowToast("Error", "Get a error when call api upload.", "error");
        }
      },
      error: function (xhr) {
        hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
      },
    });
  });
  function initConfigUpload() {
    console.log(`Init again data: lstConfigUpload`);
    lstConfigUpload = {
      videoId: 0,
      videoTitle: 0,
      title: "",
      descrition: "",
      tags: [],
      lstAccTiktok: [],
      lstAccFacebook: [],
      lstAccYoutube: [],
    };
  }
  /*=====================================#end click #btnUpload============================================*/
  function BuildReloadList(lstItem, select) {
    let html = `<option value=''>-- Choose an item --</option>`;
    if (lstItem && lstItem.length > 0) {
      // for (let i = 0; i < lstItem.length; i++) {
      //   let item = lstItem[i];
      //   // if (!item.name.includes("manual")) {
      //     html += `<option value='${item.name}'>${item.name} (${item.length} item)</option>`;
      //   // }
      // }
      let len = lstItem[0] ? ` (${lstItem[0].length} item)` : "";
      html += `<option value='${lstItem.name}'>${lstItem.name} ${len}</option>`;
    } else {
      html = `<option value=''>No data</option>`;
    }
    $(`#tabRender ${select}`).html("");
    $(`#tabRender ${select}`).html(html).select2({ theme: "dark-adminlte" });
    // $(`#tabRender ${select}`).html(html).select2(configSelect2);
    if ($(`#tabRender ${select}`)) {
      $(`#tabRender ${select}`).prop("disabled", !1);
    }
  }
  function BuildTest(lstItem, select) {
    let html = `<option value=''>-- Choose an item --</option>`;
    if (lstItem && lstItem.length > 0) {
      for (let i = 0; i < lstItem.length; i++) {
        let item = lstItem[i];
        html += `<option value='${item.id}'>${item.title}</option>`;
      }
    } else {
      html = `<option value=''>No data</option>`;
    }
    $(`#tabRender ${select}`).html("");
    $(`#tabRender ${select}`).html(html).select2({ theme: "dark-adminlte" });
  }
  function checkToken(tk = localStorage.getItem("token")) {
    if (!tk) {
      return;
    }
    $.ajax({
      url: linkApi + "/check_token?userId=" + userId + "&reload=" + getCurrenISOTime(),
      method: "get",
      success: function (a) {
        if (a && a.length > 0 && a != tk) {
          hcShowToast("Warning", "Someone has logged into your account, please login again!", 1500);
          setTimeout(function () {
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            localStorage.removeItem("token");
            window.location.reload();
          }, 2000);
        }
      },
      error: function (xhr) {
        hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
      },
    });
  }
  checkToken(token);
  setInterval(function () {
    let tk = localStorage.getItem("token") || undefined;
    checkToken(tk);
  }, 30000);
  $("#btnReloadList").click(function (e) {
    e.preventDefault();
    // console.clear();
    $("#btnReloadList").addClass("btn-secondary");
    $("#btnManual").removeClass("btn-secondary");
    // $("#divslManualEffect").addClass("hide");
    // $("#divslListEffect").removeClass("hide");
    $(".divlst").removeClass("hide");
    modeRender = "list";
    let lstAudio = lstCollectionName.audios;
    let lstVideo = lstCollectionName.videos;
    let lstImage = lstCollectionName.images;
    let lstEffect = lstCollectionName.effects;
    // let lstVideo2D = lstCollectionName.video2ds;
    BuildReloadList(lstAudio, "#slListAudio");
    BuildReloadList(lstVideo, "#slListVideo");
    BuildReloadList(lstImage, "#slListImage");
    // BuildReloadList(lstVideo2D, "#slListVideo2D");
    BuildReloadList(lstEffect, "#slListEffect");
    appRender.buildSelectModeListVideo2D();
    appRender.buildSelectManualEffect();
  });
  $("#btnRLAudio").click(function (e) {
    BuildReloadList(lstCollectionName.audios, "#slListAudio");
    changeDoneClass($(this));
  });
  $("#btnRLVideo").click(function (e) {
    BuildReloadList(lstCollectionName.videos, "#slListVideo");
    changeDoneClass($(this));
  });
  $("#btnRLImage").click(function (e) {
    console.log(lstCollectionName.lstImage);
    BuildReloadList(lstCollectionName.images, "#slListImage");
    changeDoneClass($(this));
  });
  // $("#btnRLVideo2D").click(function (e) {
  //   BuildReloadList(lstCollectionName.video2ds, "#slListVideo2D");
  //   changeDoneClass($(this));
  // });
  $("#btnRLManualVideo2D").click(function (e) {
    appRender.buildSelectModeListVideo2D();
    changeDoneClass($(this));
  });
  $("#btnRLEffect").click(function (e) {
    BuildReloadList(lstCollectionName.effects, "#slListEffect");
    changeDoneClass($(this));
  });
  $("#btnRLManualEffect").click(function (e) {
    appRender.buildSelectModeListVideo2D();
    changeDoneClass($("#btnRLManualEffect i"));
  });
  function changeDoneClass(el) {
    el.toggleClass("fas fa-retweet");
    el.toggleClass("fas fa-check");
    el.css("color", "#28a745");
    setTimeout(function () {
      el.toggleClass("fas fa-check");
      el.toggleClass("fas fa-retweet");
      el.removeAttr("style");
    }, 100);
  }
  /*=====================================#end click #btnReloadList============================================*/
  $("#btnManual").click(function (e) {
    modeRender = "manual";
    setTimeout(function () {
      appRender.buildSelectManualEffect();
    }, 2000);
    $("#btnRLManualVideo2D").trigger("click");
    $("#btnManual").addClass("btn-secondary");
    $(".divlst").addClass("hide");
    // $("#divslManualEffect").removeClass("hide");
    // $("#divslListEffect").addClass("hide");
    $("#btnReloadList").removeClass("btn-secondary");
    $("#slListAudio").prop("disabled", !0);
    $("#slListVideo").prop("disabled", !0);
    // $("#slListVideo2D").prop("disabled", !0);
    $("#slListEffect").prop("disabled", !0);
    // Build Table Manual
    // lstCollectionName.audios = [];
    // lstCollectionName.videos = [];
    // lstCollectionName.effects = [];
    // lstCollectionName.logos = [];
    // lstCollectionName.video2ds = [];
    // lstCollectionName.images = [];
    if (lstConfig.audios && lstConfig.audios.length > 0) {
      lstCollectionName.audios.push(lstConfig.audios );
      lstCollectionName.audios.name =  "manualaudios";
    }
    if (lstConfig.videos && lstConfig.videos.length > 0) {
      lstCollectionName.videos.push(lstConfig.videos );
      lstCollectionName.videos.name =  "manualvideos";
    }
    if (lstConfig.effects && lstConfig.effects.length > 0) {
      lstCollectionName.effects.push(lstConfig.effects );
      lstCollectionName.effects.name =  "manualeffects";
    }
    if (lstConfig.logos && lstConfig.logos.length > 0) {
      lstCollectionName.logos.push(lstConfig.logos );
      lstCollectionName.logos.name =  "manuallogos";
    }
    if (lstConfig.video2ds && lstConfig.video2ds.length > 0) {
      lstCollectionName.video2ds.push(lstConfig.video2ds );
      lstCollectionName.video2ds.name =  "manualvideo2ds";
    }
    if (lstConfig.images && lstConfig.images.length > 0) {
      lstCollectionName.images.push(lstConfig.images );
      lstCollectionName.images.name =  "manualimages";
    }
    BuildTableListManual("audios", "audio manual mode", "#tblListAudio");
    BuildTableListManual("videos", "video manual mode", "#tblListVideo");
    BuildTableListManual("images", "image manual mode", "#tblListImage");
    BuildTableListManual("effects", "effect manual mode", "#tblListEffect");
    BuildTableListManual("logos", "logo manual mode", "#tblListLogo");
    BuildTableListManual("video2ds", "2D manual mode", "#tblListVideo2D");
  });
  /*=====================================#end click #btnManual============================================*/
  // audio
  $("#navListAudio").click(function (e) {
    if (modeRender == "list") {
      BuildTableSelectedList("audios", "#slListAudio", "#tblListAudio");
    } else {
      BuildTableListManual("audios", "audio manual mode", "#tblListAudio");
    }
    gotoNavChildRender("ListAudio");
  });
  $("#slListAudio").change(function (e) {
    if ($("#slListAudio option:selected").val() == "") {
      return;
    }
    BuildTableSelectedList("audios", "#slListAudio", "#tblListAudio");
    gotoNavChildRender("ListAudio");
  });
  // video
  $("#navListVideo").click(function (e) {
    if (modeRender == "list") {
      BuildTableSelectedList("videos", "#slListVideo", "#tblListVideo");
    } else {
      BuildTableListManual("videos", "video manual mode", "#tblListVideo");
    }
    gotoNavChildRender("ListVideo");
  });
  $("#slListVideo").change(function (e) {
    if ($("#slListVideo option:selected").val() == "") {
      return;
    }
    BuildTableSelectedList("videos", "#slListVideo", "#tblListVideo");
    gotoNavChildRender("ListVideo");
  });
  // image
  $("#navListImage").click(function (e) {
    if (modeRender == "list") {
      BuildTableSelectedList("images", "#slListImage", "#tblListImage");
    } else {
      BuildTableListManual("images", "image manual mode", "#tblListImage");
    }
    gotoNavChildRender("ListImage");
  });
  $("#slListImage").change(function (e) {
    if ($("#slListImage option:selected").val() == "") {
      return;
    }
    BuildTableSelectedList("images", "#slListImage", "#tblListImage");
    gotoNavChildRender("ListImage");
  });
  // video2ds
  $("#navListVideo2D").click(function (e) {
    if (modeRender == "list") {
      BuildTableSelectedList("video2ds", "#slListVideo2D", "#tblListVideo2D");
    } else {
      BuildTableListManual("video2ds", "2D manual mode", "#tblListVideo2D");
    }
    gotoNavChildRender("ListVideo2D");
  });
  $("#slListVideo2D").change(function (e) {
    if ($("#slListVideo2D option:selected").val() == "") {
      return;
    }
    BuildTableSelectedList("video2ds", "#slListVideo2D", "#tblListVideo2D");
    gotoNavChildRender("ListVideo2D");
  });
  // effect
  $("#navListEffect").click(function (e) {
    if (modeRender == "list") {
      BuildTableSelectedList("effects", "#slListEffect", "#tblListEffect");
    } else {
      BuildTableListManual("effects", "effect manual mode", "#tblListEffect");
    }
    gotoNavChildRender("ListEffect");
  });
  $("#slListEffect").change(function (e) {
    if ($("#slListEffect option:selected").val() == "") {
      return;
    }
    BuildTableSelectedList("effects", "#slListEffect", "#tblListEffect");
    gotoNavChildRender("ListEffect");
  });
  // manual effect
  $("#slManualEffect").change(function (e) {
    lstCollection.effects = [];
    if ($("#slManualEffect option:selected").val() == "") {
      return;
    }
    lstCollection.effects.push({ id: $("#slManualEffect option:selected").val(), title: $("#slManualEffect option:selected").text() });
    lstCollectionName.effects.push({ id: $("#slManualEffect option:selected").val(), title: $("#slManualEffect option:selected").text() });
    BuildTableListManual("effects", "#slListEffect", "#tblListEffect");
    gotoNavChildRender("ListEffect");
  });
  // manual 2D
  $("#slManualVideo2D").change(function (e) {
    lstCollection.video2ds = [];
    if ($("#slManualVideo2D option:selected").val() == "") {
      return;
    }
    lstCollection.video2ds.push({ id: $("#slManualVideo2D option:selected").val(), title: $("#slManualVideo2D option:selected").text() });
    lstCollectionName.video2ds.push({ id: $("#slManualVideo2D option:selected").val(), title: $("#slManualVideo2D option:selected").text() });
    BuildTableListManual("video2ds", "#slListVideo2D", "#tblListVideo2D");
    gotoNavChildRender("ListVideo2D");
  });
  // logo
  $("#navListLogo").click(function (e) {
    BuildListLogo();
  });
  function BuildTableListManual(type, slListName, table) {
    console.log(slListName);
    let html = "";
    let lstItem;
    switch (type) {
      case 'audios': lstItem = modeRender == "list" ?  lstCollectionName['audios'][0] : lstCollection.audios; break;
      case 'videos': lstItem = modeRender == "list" ? lstCollectionName['videos'][0] : lstCollection.videos; break;
      case 'images': lstItem =  modeRender == "list" ?  lstCollectionName['images'][0] : lstCollection.images; break;
      case 'video2ds': lstItem = lstCollectionName['video2ds']; break;
      case 'effects': lstItem = lstCollectionName['effects']; break;
      case 'logos': lstItem = lstCollectionName['logos']; break;
      default:  lstItem = modeRender == "list" ? lstCollectionName['audios'][0] : lstCollection.audios; break;
    }
    if (lstItem && lstItem.length > 0) {
      console.log(lstItem);
      console.log(lstItem.length);
      for (let i = 0; i < lstItem.length; i++) {
        let data = lstItem[i];
        html += `<tr><td>${data.id}</td><td>${data.title}</td><td data-type="${type}" data-name="${slListName}" data-index="${i}"><i class="fas fa-trash"></i></td></tr>`;
        // if (item && item.length > 0) {
        //   for (let j = 0; j < item.length; j++) {
        //     let data = item[j];
        //     html += `<tr><td>${data.id}</td><td>${data.title}</td><td data-type="${type}" data-name="${slListName}" data-index="${j}"><i class="fas fa-trash"></i></td></tr>`;
        //   }
        // }
      }
      // $(`${table} thead`).html(`<tr><th style="text-align:center;" colspan="3">List of "${slListName}"</th></tr>`);
    } else {
      html = nodata;
    }
    // if (lstItem.length > 0) {
    //   html = ``;
    //   console.log(lstItem);
    //   console.log(lstItem.length);
    //   // debugger;
    //   for (let i = 0; i < lstItem.length; i++) {
    //     let data = lstItem[i];
    //     html += `<tr><td>${data.id}</td><td>${data.title}</td><td data-type="${type}" data-name="${slListName}" data-index="${i}"><i class="fas fa-trash"></i></td></tr>`;
    //   }
    //   // $(`${table} thead`).html(`<tr><th style="text-align:center;" colspan="3">List of "${slListName}"</th></tr>`);
    // } else {
    //   html = nodata;
    // }
    $(`${table} tbody`).html(html);
  }
  function BuildTableSelectedList(type, select, table) {
    let html = "";
    // console.clear();
    console.log(lstCollectionName);
    // debugger;
    console.log("Tải dữ liệu từ danh sách đã xuất");
    let lstItem;
    // switch (type) {
    //   case 'audios':  lstItem = lstCollectionName['audios'][0]; break;
    //   case 'videos':  lstItem = lstCollectionName['videos'][0]; break;
    //   case 'images':  lstItem = lstCollectionName['images'][0]; break;
    //   case 'video2ds':  lstItem = lstCollectionName['video2ds']; break;
    //   case 'effects':  lstItem = lstCollectionName['effects']; break;
    //   case 'logos':  lstItem = lstCollectionName['logos']; break;
    //   default: lstItem = lstCollectionName['audios'][0]; break;
    // }
    switch (type) {
      case 'audios': lstItem = modeRender == "list" ?  lstCollectionName['audios'][0] : lstCollection.audios; break;
      case 'videos': lstItem = modeRender == "list" ? lstCollectionName['videos'][0] : lstCollection.videos; break;
      case 'images': lstItem =  modeRender == "list" ?  lstCollectionName['images'][0] : lstCollection.images; break;
      case 'video2ds': lstItem = lstCollectionName['video2ds']; break;
      case 'effects': lstItem = lstCollectionName['effects']; break;
      case 'logos': lstItem = lstCollectionName['logos']; break;
      default:  lstItem = modeRender == "list" ? lstCollectionName['audios'][0] : lstCollection.audios; break;
    }
    if (lstItem && lstItem.length > 0) {
      let slListName = $(`${select} option:selected`).val();
      console.log(select);
      console.log(slListName);
      console.log(lstItem.length);
      for (let i = 0; i < lstItem.length; i++) {
        let item = lstItem[i];
        // if (item && (item.name == slListName || item.name == "video2ds")) {
          // for (let j = 0; j < item.length; j++) {
            // let data = item[j];
            let data = item;
            console.log(data);
            html += `<tr><td>${data.id}</td><td>${data.title}</td><td data-type="${type}" data-name="${slListName}" data-index="${i}"><i class="fas fa-trash"></i></td></tr>`;
          // }
        // }
      }
      $(`${table} thead`).html(`<tr><th style="text-align:center;" colspan="3">${slListName}</th></tr>`);
    } else {
      html = nodata;
    }
    $(`${table} tbody`).html(html);
  }
  /*=====================================#end click #navListAudio============================================*/
  // Remove item in collection random result
  $(document).on(
    {
      click: function () {
        let type = $(this).parent().parent().data("type");
        let index = $(this).parent().parent().data("index");
        let title = $(this).parent().parent().data("title");
        // $(this).parent().parent().remove();
        Swal.fire({
          title: "Do you want to delete item: " + title,
          customClass: {
            actions: "my-actions",
            confirmButton: "order-2 btn btn-danger",
            cancelButton: "order-1 right-gap btn btn-secondary",
          },
          confirmButtonText: '<i class="fas fa-trash"></i> Delete',
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            removeElement(lstCollection[type], lstCollection[type][index]);
            let htmlAudio = ``,
              htmlVideo = ``;
            let data = [];
            data.audios = lstCollection.audios;
            if (data.audios && data.audios.length > 0) {
              for (let j = 0; j < data.audios.length; j++) {
                let item = data.audios[j];
                let id = item.id;
                let title = item.title;
                let file = link13000 + item.upload_file;
                if (file.includes(link13000)) {
                  file = file.replace(link13000, linkTest);
                }
                htmlAudio += `<tr data-type="audios" data-index="${j}"><td><i class="fas fa-music"></i> ${id}</td><td>${title}</td><td><i class="fas fa-eye" data-src="${file}"  data-title="${title}"></i> <i class="fas fa-trash"></i></td></tr>`;
              }
            }
            data.videos = lstCollection.videos;
            if (data.videos && data.videos.length > 0) {
              for (let j = 0; j < data.videos.length; j++) {
                let item = data.videos[j];
                let id = item.id;
                let title = item.title;
                let file = item.file;
                if (file.includes(link13000)) {
                  file = file.replace(link13000, linkTest);
                }
                htmlVideo += `<tr data-type="videos" data-index="${j}"><td><i class="fas fa-video"></i> ${id}</td><td>${title}</td><td><i class="fas fa-eye" data-src="${file}"  data-title="${title}"></i> <i class="fas fa-trash"></i></td></tr>`;
              }
            }
            $("#tblAutoResult tbody").html("");
            $("#tblAutoResult tbody").html(htmlAudio + htmlVideo);
          }
        });
      },
    },
    "#tblAutoResult tbody i.fas.fa-trash"
  );
  // Remove item in collection list
  $(document).on(
    {
      click: function () {
        let type = $(this).parent().data("type");
        let index = $(this).parent().data("index");
        let name = $(this).parent().data("name");
        $(this).parent().parent().remove();
        removeInList(type, name, index);
      },
    },
    "#tabList tbody i.fas.fa-trash"
  );
  function removeInList(type, name, index) {
    let colType = lstCollectionName[type]; // audios, videos, effects, video2ds
    if (colType.length > 0) {
      for (let i = 0; i < colType.length; i++) {
        if (type != "logos") {
          let audio = colType[i]; // item 0
          if (audio && audio.name == name && audio.length > 0) {
            for (let j = 0; j < audio.length; j++) {
              if (index == j) {
                console.log(lstCollectionName[type][i][j]);
                removeElement(lstCollectionName[type][i], lstCollectionName[type][i][index]);
              }
            }
          }
        } else {
          // Remove items logo
          removeElement(lstCollectionName.logos, lstCollectionName.logos[index]);
        }
      }
    }
  }
  /*=====================================#end xóa trong danh sách render list ============================================*/
  $("#vmAudio").click(function (e) {
    viewMore("audio", ma, $("#tabAudio #txtSearchMore").val(), "#tblAudio tbody");
  });
  $("#vmVideo").click(function (e) {
    viewMore("video", mv, $("#tabVideo #txtSearchMore").val(), "#tblVideo");
  });
  $("#vmImage").click(function (e) {
    viewMore("image", mi, $("#tabImage #txtSearchMore").val(), "#tblImage");
  });
  $("#vmImage2D").click(function (e) {
    viewMore("image2d", mi, $("#tabImage2D #txtSearchMore").val(), "#tblImage2D");
  });
  $("#vmVideo2D").click(function (e) {
    viewMore("video2d", mi, $("#tabVideo2D #txtSearchMore").val(), "#tblVideo2D");
  });
  $("#vmHistoryRender").click(function (e) {
    let len = 10;
    appRender.getSearchRender(mhis_render, len, !0);
    mhis_render += len;
  });
  $("#vmHistoryUpload").click(function (e) {
    let len = 10;
    appRender.getSearchUpload(mhis_upload, len, !0);
    mhis_upload += len;
  });
  function viewMore(type, current, len, table) {
    $(".viewmore i").html(" Loading...");
    $.ajax({
      url: linkApi + "/api/get_search_" + type,
      method: "get",
      data: {
        token: token,
        offset: parseInt(current),
        limit: parseInt(len),
        keyword: "",
        reload: getCurrenISOTime(),
      },
      success: function (a) {
        console.log(`Đã lấy thêm ${len} dữ liệu ${type}`);
        console.log(a);
        // Tăng lượt viewmore của các loại
        len = parseInt(len);
        switch (type) {
          case "audio":
            ma += len;
            break;
          case "video":
            mv += len;
            break;
          case "effect":
            me += len;
            break;
          case "logo":
            ml += len;
            break;
          case "image":
            mi += len;
            break;
          case "image2d":
            mi2d += len;
            break;
          case "video2d":
            m2 += len;
            break;
          case "video2ds":
            m2 += len;
            break;
        }
        if (a.status == 200) {
          let data = a.data;
          // lstAllAudio = data;
          if (data.length > 0) {
            let html = ``;
            for (let i = 0; i < data.length; i++) {
              let file = link13000 + data[i].upload_file;
              if (file.includes(link13000)) {
                file = file.replace(link13000, linkTest);
              }
              switch (type) {
                case "audio":
                  html += ` <tr id="${data[i].id}">
                              <td>
                                <div class="checkbox">
                                  <label>
                                    <input class="export_selected" type="checkbox" id="export_selected">
                                    ${data[i].id} - ${data[i].title}
                                  </label>
                                </div>
                                <audio preload="none" class="playerViewmore" controls>
                                  <source src="${file}" type="audio/mp3">
                                </audio>
                              </td>
                            </tr>`;
                  break;
                case "video":
                  html += `<li id="${data[i].id}">
                            <div class="checkbox">
                              <label>
                                <input class="export_selected" type="checkbox" id="export_selected">
                                ${data[i].id} - ${data[i].title}
                              </label>
                            </div>
                            <video preload="metadata" controls playsinline><source src="${data[i].file}#t=0.1"></source></video>
                          </li>`;
                  break;
                case "image2d":
                case "image":
                  html += `<li id="${data[i].id}">
                            <div class="checkbox">
                              <label>
                                <input class="export_selected" type="checkbox" id="export_selected">
                                ${data[i].id} - ${data[i].title}
                                <img class="lazy" data-src="${data[i].file}" />
                              </label>
                            </div>
                          </li>`;
                  break;
                case "video2d":
                default:
                  html += `<li id="${data[i].id}">
                            <div class="checkbox">
                              <label>
                                <input class="export_selected" type="checkbox" id="export_selected">
                                ${data[i].id} - ${data[i].title} <br />
                                </label>
                            </div>
                            <video preload="metadata" playsinline class="player2D" controls><source src="${file}#t=0.1" type="video/mp4"></source></video>
                          </li>`;
                  break;
              }
            }
            $(`${table}`).append(html);
            switch (type) {
              case "video": 
              case "audio":
                const players = Array.from(document.querySelectorAll(".playerViewmore")).map((p) => new Plyr(p, { controls }));
                break;
              case "image": lazyLoading();break;
              case "audio": break;
            }
           
            hcShowToast(`Success`, `Load ${len}, received ${data.length}`, `success`);
            $(".viewmore i").html(" More");
          } else {
            hcShowToast(`Info`, `No data found`, `success`);
          }
        } else {
          // debugger;
          console.log(`Can't get ${type} data from server`);
        }
      },
      error: function (xhr) {
        hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
      },
    });
  }
  /*=====================================#end View More ============================================*/
  function SaveAudioToCategory(id = 0, name = "") {
    let obj = lstCollection.audios;
    if (lstCollectionHomePage.audios && lstCollectionHomePage.audios.length > 0) {
      obj = lstCollectionHomePage.audios;
    }
    if (obj.length <= 0 || name == "-- Choose an item --") {
      hcShowToast(`Warning`, `Please Select anudio`, `warning`);
      return;
    }
    let data_ajax = {
      token: token,
      id: id,
      name: name,
      title: name,
      audios: obj,
    };
    console.log(`Call API SaveAudioToCategory`);
    console.log(data_ajax);
    $.ajax({
      url: linkApi + "/api/catelog_audio/add_audio_to_catelog",
      method: "post",
      data: { obj: data_ajax },
      success: function (a) {
        console.log(`Data received`);
        console.log(a);
        if (a.status == 200) {
          appRender.getSelectAudio();
          hcShowToast(`Success`, `Add to category successfull `, `success`);
          initlstCollectionHomePage();
        } else {
          hcShowToast(`Error`, `Add to category failed`, `error`);
        }
      },
      error: function (xhr) {
        hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
      },
    });
    //$(".export_selected").prop("checked", false);
    //lstCollection.audios
    //$(`#tabAudio #count_selected`).html("List audio");
  }
  /*=====================================#end Add SaveAudioToCategory ============================================*/
  function SaveVideoToCategory(id = 0, name = "") {
    let obj = lstCollection.videos;
    if (lstCollectionHomePage.videos && lstCollectionHomePage.videos.length > 0) {
      obj = lstCollectionHomePage.videos;
    }
    if (obj.length <= 0 || name == "-- Choose an item --") {
      hcShowToast(`Warning`, `Please select video`, `warning`);
      return;
    }
    let data_ajax = {
      token: token,
      id: id,
      name: name,
      title: name,
      videos: obj,
    };
    console.log(`Call API SaveVideoToCategory`);
    console.log(data_ajax);
    // return;
    $.ajax({
      url: linkApi + "/api/catelog_video/add_video_to_catelog",
      method: "post",
      data: { obj: data_ajax },
      success: function (a) {
        console.log(`Data received`);
        console.log(a);
        if (a.status == 200) {
          appRender.getSelectVideo();
          hcShowToast(`Success`, `Add to category successfull `, `success`);
          initlstCollectionHomePage();a
        } else {
          hcShowToast(`Error`, `Add to category failed`, `error`);
        }
      },
      error: function (xhr) {
        hcShowToast("API Error", JSON.stringify(xhr), "error", 3000);
      },
    });
    //$(".export_selected").prop("checked", false);
  }
  /*=====================================#end Add SaveAudioToCategory ============================================*/

  $("#slAudioCate").change(function () {
    // if (lstCollection && lstCollection.audios.length <= 0) {
    //   $("#btnSearchAudio").trigger("click");
    // }
  });
  $("#slVideoCate").change(function () {
    // if (lstCollection && lstCollection.videos.length <= 0) {
    //   $("#btnSearchVideo").trigger("click");
    // }
  });
  // $("#btnslAudioCate").click(function () {
  //   appRender.searchAudio(" ", 0, 50, !1);
  // });
  // $("#btnslVideoCate").click(function () {
  //   appRender.searchVideo(" ", 0, 50, !1);
  // });
  // goda
  /*=====================================#end slVideoCate ============================================*/
  $("#btnAddAudio").click(function () {
    let id = parseInt($("#slAudioCate option:selected").val());
    let title = $("#slAudioCate option:selected").html();
    SaveAudioToCategory(id, title);
  });
  $("#btnAddVideo").click(function () {
    let id = parseInt($("#slVideoCate option:selected").val());
    let title = $("#slVideoCate option:selected").html();
    SaveVideoToCategory(id, title);
  });
  // Homepage add to cate
  $("#btnslFilterByCateAudio").click(function () {
    let id = parseInt($("#slFilterByCateAudio option:selected").val());
    let title = $("#slFilterByCateAudio option:selected").html();
    SaveAudioToCategory(id, title);
    $(`input[type="checkbox"]`).prop("checked", false);
  });
  $("#btnslFilterByCateVideo").click(function () {
    let id = parseInt($("#slFilterByCateVideo option:selected").val());
    let title = $("#slFilterByCateVideo option:selected").html();
    SaveVideoToCategory(id, title);
    $(`input[type="checkbox"]`).prop("checked", false);
  });
  /*=====================================#end btnAddVideo ============================================*/
  $("#btnRLRenderedVideo").click(function () {
    appRender.getSearchRender();
    changeDoneClass($(this));
  });
  function checkNew(dateupdated) {
    let today = new Date().toISOString().slice(0, 10);
    let diffInMs = new Date(today) - new Date(dateupdated);
    let diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays <= 7 ? `new` : "";
  }
  /*=====================================#end btnRLRenderedVideo ============================================*/
  function lazyLoading(){
    console.log('Start Lazy loading...');
    $("img.lazy").Lazy({
      // defaultImage: 'assets/images/404.jpg',
      defaultImage: 'assets/images/loading.gif',
      placeholder: 'assets/images/loading.gif',
      effect: "fadeIn",
    }).removeClass('lazy').addClass('lazyloaded');
  }
}); // End document ready
