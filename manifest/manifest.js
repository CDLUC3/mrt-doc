const TAB_WIZARD = 0;
const TAB_TEMPLATE = 1;
const TAB_URL = 2;
const TAB_CSV = 3;
const TAB_CHECKM = 4;
const TAB_STRUCT = 5;
const TAB_DATA = 6;
const TAB_DOWNLOAD = 7;

function getParams(){
  var queries = {};
  if (document.location.search == "") {
    return queries;
  }
  $.each(document.location.search.substr(1).split('&'),function(c,q){
    var i = q.split('=');
    queries[i[0].toString()] = i[1].toString();
  });
  return queries;
}

$(document).ready(function(){
  $("#accordion").accordion({heightStyle: "content", active: TAB_WIZARD, collapsible: true});
  if ("unittest" in getParams()) {
    $("p.unittest").show();
  }
  wizard_set();
  $("input.wizopt").on("click", function(){
    wizard_set();
  });
  $("#testfiles").on("change", function(){
    var sel = $("#testfiles option:selected");
    var fname = sel.val();
    var result = sel.attr("result");
    if (result == "pass") {
      result = "This checkm file will be parsed successfully."
    } else if (result == "" || result == null) {
      result = "N/A"
    }
    $("#result").val(fname+": "+result);
    setDownloadName(fname);
    $.ajax({
      url: fname,
      success: function(data){
        $("#checkm").val(data);
      }
    });
  });


  $("#testcsvs").on("change", function(){
    var sel = $("#testcsvs option:selected");
    var fname = sel.val();
    setDownloadName(fname);
    $.ajax({
      url: fname,
      success: function(data){
        $("#csv").val(data);
      }
    });
  });
});

function wizard_set() {
  $("div.tab, h2.tab, select.unittest, div.checkm_results, fieldset.result").hide();
  $("div.checkm_def").show();
  var v = $("input.wizopt:checked").val();
  var tab = TAB_WIZARD;
  if (v == null) {
    return; 
  }  
  
  if (v == "rad_unittest" ) {
    $("select.unittest, div.tab_checkm, h2.tab_checkm, fieldset.result").show();
    tab = TAB_CHECKM;
  } else if (v == "rad_unittest_csv") {
    $("div.tab, h2.tab, select.unittest, fieldset.result").show();
    tab = TAB_CSV;
  } else {
    $("div.tab_checkm, h2.tab_checkm").show();
    tab = TAB_CHECKM;
    if (v != 'rad_checkm') {
      $("div.tab_csv, h2.tab_csv").show();
      tab = TAB_CSV;
    }
    if (v == 'rad_url_list') {
      $("div.tab_url, h2.tab_url").show();
      tab = TAB_URL;
    }
     if (v == 'rad_csv_teplate') {
      $("div.tab_csv_template, h2.tab_csv_template").show();
      tab = TAB_TEMPLATE;
    }
  }
  $("#accordion").accordion("destroy").accordion({heightStyle: "content", active: tab, collapsible: true});
}

function setDownloadName(fname) {
  var m = fname.match(/(\/|^)([^\/]+)\.[^\/\.]+$/)
  if (m) {
    $("#download-data").attr("download", m[2] + ".checkm");
  } else {
    $("#download-data").attr("download", "merritt.checkm");
  }
}

function parse() {
  var cv = new CheckmValidator();
  var datav = cv.parse();
  var tab = ($("#analysis tr.Error").is("*")) ? TAB_STRUCT : TAB_DATA;
  $("div.checkm_results").show();
  $("#accordion").accordion("option", "active", tab);
}

async function runLoadCheck(){
  var [fileHandle] = await window.showOpenFilePicker();
  setDownloadName(fileHandle.name);
  const file = await fileHandle.getFile();
  const contents = await file.text();
  $("#checkm").val(contents);
}

async function loadCsv(){
  var [fileHandle] = await window.showOpenFilePicker();
  setDownloadName(fileHandle.name);
  const file = await fileHandle.getFile();
  const contents = await file.text();
  $("#csv").val(contents);
}

function parseCsv(){
  var csv2checkm = new CsvToCheckm($("#csv").val());
  $("#checkm").val(csv2checkm.buf);
  $("#accordion").accordion("option", "active", TAB_CHECKM);
}

function parseUrls(){
  var sel = $("input.profile:checked").val();
  var levels = $("#pathlevels").val();
  var cols = [Field.FILEURL.fname,Field.FILENAME.fname];
  var buf = Field.FILEURL.fname;
  if (sel != ProfileType.INGEST.name) {
    cols.push(Field.TITLE.fname);
  }
  buf = cols.join(",");
  for(const line of $("#urls").val().split("\n")) {
    buf = buf + "\n" + line;
    try {
      var url = new URL(line);
      var arr = url.pathname.substring(1).split("/");
      var start = arr.length - 1 - levels >= 0 ? arr.length - 1 - levels : 0;
      buf = buf + "," + arr.splice(start).join("/");
    } catch(e) {
      console.log(e);
    }
  }
  $("#csv").val(buf);
  setDownloadName("merritt.checkm");
  $("#accordion").accordion("option", "active", TAB_CSV);
}

class CheckmValidator {
  getData() {
    return $("#checkm").val();
  }
  createAnalysisTable() {
    $("#analysis").empty();
    var table = $("<table/>").appendTo("#analysis");
    var thead = $("<thead/>").appendTo(table); 
    CheckmTest.tr_head().appendTo(thead).addClass("header");
    return $("<tbody/>").appendTo(table);
  }

  createDataTable(checkmFile) {
    $("#data").empty();
    var table = $("<table/>").appendTo("#data");
    var thead = $("<thead/>").appendTo(table); 
    checkmFile.data_tr_head().appendTo(thead).addClass("header");
    return $("<tbody/>").appendTo(table);
  }

  parse() {
    var tbody = this.createAnalysisTable();
    var checkmFile = new Checkm(this.getData());
    checkmFile.validation_checks.forEach(test => test.tr().appendTo(tbody));
    tbody = this.createDataTable(checkmFile);
    checkmFile.data_tr(tbody);
    this.show_counts(checkmFile);
    //https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    var encodedUri = "data:text/plain," + encodeURIComponent($("#checkm").val());  
    $("#download-data").attr("href", encodedUri).text("Download " + $("#download-data").attr("download"));
    return checkmFile.showDataTableView;
  }
  
  show_counts(checkmFile) {
    $("output.objcount,output.filecount").val("");
    for(const t of checkmFile.validation_checks) {
      if (t.status == TestStatus.ERROR) {
        $("output.objcount").val("NO OBJECTS will be created");    
        return;
      }
    }
    $("output.objcount").val(checkmFile.count_obj + " object(s) to be created");    
    if (checkmFile.count_file > 0) {
      $("output.filecount").show().val("; " + checkmFile.count_file + " file(s)");
    }

  }
}

