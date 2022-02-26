$(document).ready(function(){
  $("#accordion").accordion({heightStyle: "content", active: 2});
  $("#testfiles").on("change", function(){
    var sel = $("#testfiles option:selected");
    var fname = sel.val();
    $.ajax({
      url: fname,
      success: function(data){
        $("#checkm").val(data);
        $("#accordion").accordion("option", "active", 2);
      }
    });
  });
});

function parse() {
  var cv = new CheckmValidator();
  cv.parse();
  $("#accordion").accordion("option", "active", 3);
}

async function runLoadCheck(){
  var [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  $("#checkm").val(contents);
}

class CsvToCheckm {
  constructor(contents) {
    this.arr = parseCSV(contents);
    this.fields = this.arr.length > 0 ? this.arr[0] : [];
    this.checkm = false;
    this.container = false;
    this.single_file = false;
    this.buf = "";
    this.filecol = this.file_col();
    this.batch = this.is_batch();
    this.analyzeRows();
    var profile = this.get_profile();
    if (profile == "") {
      this.append("Profile Type Could Not be Determined\n\n" + contents);
      this.append(this.checkm + " " + this.container + " " + this.single_file + "\n");
      this.append(contents);
    } else {
      this.appendHeaders(profile);
      this.processRows();
      this.appendFooters();  
    }
  }

  file_col() {
    for(var i=0; i < this.fields.length; i++) {
      if (this.fields[i].toLowerCase() == Field.FILENAME.fname.toLowerCase()) {
        return i;
      }
    }
    return -1;
  }

  is_batch() {
    for(var fname of this.fields){
      if (fname == Field.PRIMID.fname) {
        return true;
      }
      if (fname == Field.LOCID.fname) {
        return true;
      }
      if (fname == Field.TITLE.fname) {
        return true;
      }
      if (fname == Field.CREATOR.fname) {
        return true;
      }
    }
    return false;
  }

  get_filename(r) {
    if (this.filecol >= 0) {
      if (this.filecol < r.length) {
        return r[this.filecol];
      }
    }
    return "";
  }

  test_filename(s) {
    if (s.match(/\.checkm$/i)) {
      this.checkm = true;
    } else if (s.match(/\.(zip|tar|tar\.gz|bz2)$/i)) {
      this.container = true;
    } else if (s.match(/./)) {
      this.single_file = true;
    }
  }

  append(s) {
    this.buf = this.buf + s;
  }

  analyzeRows() {
    for(var i=1; i < this.arr.length; i++) {
      this.test_filename(this.get_filename(this.arr[i]));
    }  
  }
  appendHeaders(p) {
    this.append("#%checkm_0.7\n");
    this.append("#%profile | http://uc3.cdlib.org/registry/ingest/manifest/" + p + "\n");
    this.append("#%prefix | mrt: | http://merritt.cdlib.org/terms#\n");
    this.append("#%prefix | nfo: | http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#\n");
    this.append("#%fields | " + this.fields.join(" | ") + "\n");
  }

  appendFooters() {
    this.append("#%eof\n");
  }
  get_profile() {
    var types = 0;
    if (this.single_file) types++;
    if (this.container) types++;
    if (this.checkm) types++;

    if (types != 1) {
      return "";
    }

    if (this.batch) {
      if (this.single_file) {
        return "mrt-single-file-batch-manifest";
      } 
      if (this.checkm) {
        return "mrt-batch-manifest";
      } 
      if (this.container) {
        return "mrt-container-batch-manifest";
      } 
    }
    return "mrt-ingest-manifest";
  }
  processRows() {
    for(var i=1; i < this.arr.length; i++) {
      this.append(this.arr[i].join(" | ") + "\n");
    }  
  }
}
async function runCsv(){
  var [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  var csv2checkm = new CsvToCheckm(contents);
  $("#checkm").val(csv2checkm.buf);
  $("#accordion").accordion("option", "active", 2);
}

function prefix(buf) {

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
  }  
}

class Checkm {
  constructor(rawdata) {
    this.validation_checks = [];
    this.rawdata = rawdata;
    this.checkEncoding();
    this.lines = this.getLines();
    this.checkHeader();
    this.profileName = "";
    this.profileType = null;
    this.checkProfile();
    this.prefixes = {};
    this.checkPrefixes();
    this.fields = [];
    this.checkFields();
    this.data = [];
    this.checkData();
    this.checkEof();
    this.checkTerminalNewline();
  }

  checkEncoding() {
    var t = new CheckmTest("Check file encoding");
    t.pass();
    for(var i=0; i<this.rawdata.length; i++) {
      if (this.rawdata.codePointAt(i) == 65533) {
        t.error();
        t.setMessage("Replacement character fount at position " + i);
      }
    }
    this.validation_checks.push(t);
  }

  getLines() {
    var d = this.rawdata + " ";
    return d.replaceAll(/^\s*/g, '')
      .split("\n"); 
  }

  getLine(regex) {
    if (this.lines.length > 0) {
      if (this.lines[0].match(regex)) {
        return this.lines.shift();
      }
    }
  }

  getNotLine(regex) {
    if (this.lines.length > 0) {
      if (!this.lines[0].match(regex)) {
        return this.lines.shift();
      }
    }
  }

  checkHeader() {
    var t = new CheckmTest("Look for checkm declaration");
    if (this.getLine(/^#%checkm_0.7$/g)) {
      t.pass();
    } else {
      t.error();
      t.setMessage("#%checkm_0.7 not found at top of file");
    }
    this.validation_checks.push(t);
  }

  checkEof() {
    var t = new CheckmTest("Look for eof");
    if (this.getLine(/^#%eof\s*$/g)) {
      t.pass();
    } else {
      t.error();
      t.setMessage("#%eof not found at end of file");
    }
    this.validation_checks.push(t);
  }

  checkTerminalNewline() {
    var t = new CheckmTest("Look for terminal newline");
    if (this.getLine(/^\s*$/g)) {
      t.pass();
    } else {
      t.error();
      t.setMessage("terminal newline not found at end of file");
    }
    this.validation_checks.push(t);
  }

  checkProfile() {
    var t = new CheckmTest("Look for profile declaration");
    var line = this.getLine(/^#%profile \| (.*)$/g);
    if (line) {
      var m = line.match(/^#%profile \| http:\/\/uc3\.cdlib\.org\/registry\/ingest\/manifest\/(.*)$/);
      if (m) {
        this.profileName = m[1];
        this.profileType = ProfileType.instance(this.profileName);
        if (this.profileType) {
          t.pass();
          t.setMessage(this.profileName);
        } else {
          t.error();
          t.setMessage("Invalid profile name: [" + this.profileName + "]");  
        }
      } else {
        t.error();
        t.setMessage("Invalid url for profile")
      }
    } else {
      t.error();
      t.setMessage("Profile declaration not found")
    }
    this.validation_checks.push(t);
  }

  checkPrefixes() {
    var re = /^#%prefix \| (.*)$/g;
    for(var line = this.getLine(re); line != null; line = this.getLine(re)) {
      this.checkPrefixLine(line);
    }
    for(const p of Prefix.required_prefixes()) {
      var t = new CheckmTest("Look for required prefix: " + p.prefix);
      if (this.prefixes[p.prefix]) {
        if (this.prefixes[p.prefix] == p.uri) {
          t.pass();
        } else {
          t.error();
          t.setMessage("Expected uri: " + p.uri)
        }
      } else {
        t.error();
        t.setMessage("Prefix not found in manifest");
      }
      this.validation_checks.push(t);  
    }
  }

  checkPrefixLine(line) {
    var t = new CheckmTest("Validate prefix line");
    var re = /^#%prefix \| ([^\s:\|]+): \| ([^\s\|]+)$/;
    var m = line.match(re);
    if (m) {
      var pre = new Prefix(m[1], m[2]);
      this.prefixes[pre.prefix] = pre.uri;
      t.setLabel("Validate prefix line: " + pre.prefix);
      t.pass();
      t.setMessage(pre.uri);
    } else {
      t.error();
      t.setMessage("Improperly formatted prefix line: " + line);
    }
    this.validation_checks.push(t);
  }

  checkFields() {
    var t = new CheckmTest("Look for fields declaration");
    var re = /^#%fields \| (.*)$/;
    var line = this.getLine(re);
    if (line) {
      var m = line.match(re);
      if (m) {
        var fmap = {};
        for(const fname of m[1].split(/\s*\|\s*/)) {
          this.fields.push(Field.instance(fname));
          fmap[fname.toLowerCase()] = true;
        }

        var fail = [];
        for(const f of Field.required_fields()) {
          if (!fmap[f.fname.toLowerCase()]) {
            fail.push(f.fname.toLowerCase());
          }
        }
        if (fail.length == 0) {
          t.pass();
          t.setMessage(this.fields.length + " found");
          for(const f of this.fields) {
            this.checkField(f);
          }
        } else {
          t.error();
          t.setMessage("Required fields not found: " + fail);
        }
      }
    } else {
      t.error();
      t.setMessage("Fields header not found: " + line);
    }
    this.validation_checks.push(t);
  }

  checkField(field) {
    var t = new CheckmTest("Check field name format: " + field.fname);
    if (field.valid()) {
      if (this.prefixes[field.namespace]) {
        if (field.known()) {
          t.pass()
        } else {
          t.error();
          t.setMessage("Field not known");
        }
      } else {
        t.error();
        t.setMessage("Field prefix not defined");
      }
    } else {
      t.error();
      t.setMessage("Improper field name")
    }
    this.validation_checks.push(t);
  }

  checkData() {
    var re = /^#%eof$/g;
    var dr = 0;
    for(var line = this.getNotLine(re); line != null; line = this.getNotLine(re)) {
      dr++;
      if (line.match(/^#%.*/)) continue;
      if (line.match(/^\s*$/)) continue;
      var row = line.split(/\s*\|\s*/);
      this.data.push(row);
      var drc = new DataRowContent(this, row, dr);
      drc.checkContent();
    }
  }

  data_tr(tbody) {
    for(const r of this.data) {
      var tr = $("<tr/>").appendTo(tbody);
      for(const c of r) {
        $("<td/>").text(c).appendTo(tr);
      }
    }
  }

  data_tr_head() {
    var tr = $("<tr/>");
    for(const f of this.fields) {
      $("<th/>").text(f.fname).appendTo(tr);
    }
    return tr;        
  }

}

class DataRowContent {
  constructor(checkm, row, num) {
    this.checkm = checkm;
    this.fields = checkm.fields ? checkm.fields : [];
    this.row = row;
    this.num = num;

    var t = new CheckmTest("Check structure for data row: " + this.rowLabel());
    if (row.length > this.fields.length) {
      t.error();
      t.setMessage("Too many fields found: "+ row.length);
    } else if (row.length < this.fields.length) {
      t.warn();
      t.setMessage("Record padded, too few fields found: "+ row.length);
      for(var i=row.length; i<this.checkm.fields.length; i++) {
        row.push("");
      } 
    } else {
      t.pass();
    }
    this.checkm.validation_checks.push(t);
  }

  rowLabel() {
    return "Row "+ this.num + ": " + this.getValue(Field.FILENAME);
  }

  checkContent() {
    for(var i=0; i < this.row.length; i++) {
      if (i < this.fields.length) {
        var field = this.fields[i];
        var t = new CheckmTest("Check data for row: " + this.rowLabel());
        if (!field.validate_data(this, this.row[i], t)) {
          this.checkm.validation_checks.push(t);
        }  
      }
    } 
  }

  getIndex(key) {
    for(var i=0; i<this.fields.length; i++) {
      if (this.fields[i].fname.toLowerCase() == key.fname.toLowerCase()) {
        return i;
      }
    }
    return -1;
  }

  getValue(key, defVal) {
    var i = this.getIndex(key);
    if (i == -1 || i >= this.row.length) {
      return defVal;
    }
    return this.row[i];
  }

}

class Field {
  static FILEURL = new Field("nfo:fileurl").setRequired(true).setValidateFxn(
    function(cdr, v, t) {
      try {
        var url = new URL(v);
        if (!url.protocol.match(/^(http|https):$/)) {
          t.error();
          t.setMessage("Invalid protocol " + url.protocol);
          return false;  
        }
        //https://stackoverflow.com/a/49849482/3846548
        var res = v.match(/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g);
        if (res == null) {
          t.error();
          t.setMessage("Bad url ");
          return false;  
        }
      } catch(e) {
        t.error();
        t.setMessage("Invalid URL " + e.toString());
        return false;
      }
      return true;
    }
  );
  static HASHALG = new Field("nfo:hashalgorithm").setRegex(/^(md5|sha256)$/, "allowed values: md5 or sha256");
  static HASHVAL = new Field("nfo:hashvalue").setValidateFxn(
    function(cdr, v, t) {
      var alg = cdr.getValue(Field.HASHALG);
      if (alg == "md5") {
        if (v.match(/^[a-z0-9]{32,32}$/)) {
          return true;
        } else {
          t.error();
          t.setMessage("hashval must be 32 alphanumeric values");
          return false;
        }
      } else if (alg == "sha256") {
        if (v.match(/^[a-z0-9]{64,64}$/)) {
          return true;
        } else {
          t.error();
          t.setMessage("hashval must be 64 alphanumeric values");
          return false;
        }
      }
      return true;
    }
  );
  static FILESIZE = new Field("nfo:filesize").setRegex(/^\d+$/, "must be a number");
  static FILEMOD = new Field("nfo:filelastmodified");
  static FILENAME = new Field("nfo:filename").setRequired(true).setValidateFxn(
    function(cdr, v, t) {
      if (cdr.checkm.profileType == ProfileType.CONTAINER_BATCH) {
        var m = v.match(/.*\.(tar|zip|tar\.gz|bz2)$/i); 
        if (m) {
          t.pass();
          t.setMessage(m[1] + ": Filename is a zip, tar, tar.gz or bz2");
        } else {
          t.error();
          t.setMessage("Filename must be a zip, tar, tar.gz or bz2");
          return false;
        }
      } else if (cdr.checkm.profileType == ProfileType.BATCH) {
        var m = v.match(/.*\.(checkm)$/i);
        if (m) {
          t.pass();
          t.setMessage(m[1] + ": Filename is a checkm");
        } else {
          t.error();
          t.setMessage("Filename must be a checkm");
          return false;
        }
      }
      return true; 
    }
  )

  //this field is referenced in some Merritt code, but it is not actively used
  //static NIE_MIMETYPE = new Field("nie:mimetype");
  static MIMETYPE = new Field("mrt:mimetype");
  static PRIMID = new Field("mrt:primaryidentifier").setRegex(/^ark:\/\d+\/[a-z][a-z0-9]+$/, 'Must be a valid ark');
  static LOCID = new Field("mrt:localidentifier");
  static CREATOR = new Field("mrt:creator");
  static TITLE = new Field("mrt:title");
  static DATE = new Field("mrt:date");
  static NA = new Field("na:na");

  constructor(fname) {
    this.required = false;
    this.regex = null;
    this.usage = "";
    var m = fname.match(/^(\w+):(\w+)$/);
    if (m) {
      this.fname = fname;
      this.namespace = m[1];
      this.name = m[2];  
    }
  }

  setRequired(b) {
    this.required = b;
    return this;
  }

  setRegex(regex, usage) {
    this.regex = regex;
    this.usage = usage;
    return this;
  }

  setValidateFxn(f) {
    this.validate_fxn = f;
    return this;
  }

  validate_data = function(cdr, data, t) {
    if (data == null || data == "") {
      if (this.required) {
        t.error();
        t.setMessage("Field is required");
        return false;
      }
    } else if (this.validate_fxn) {
      return this.validate_fxn(cdr, data, t);
    } else if (this.regex) {
      if (!data.match(this.regex)) {
        t.error();
        t.setMessage(this.usage);
        return false;
      }
    }
    return true;
  }

  required() {
    return this.required;
  }

  valid() {
    return this.namespace != null && this.name != null;
  }

  static instance(name) {
    for(const f of Field.known_fields()) {
      if (name.toLowerCase() == f.fname.toLowerCase()) {
        return f;
      }
    }
    return Field.NA;
  }

  static known_fields() {
    return [
      Field.FILEURL,
      Field.HASHALG,
      Field.HASHVAL,
      Field.FILESIZE,
      Field.FILEMOD,
      Field.FILENAME,
      //Field.NIE_MIMETYPE,
      Field.MIMETYPE,
      Field.PRIMID,
      Field.LOCID,
      Field.CREATOR,
      Field.TITLE,
      Field.DATE
    ];
  }

  static required_fields() {
    return [
      Field.FILEURL,
      Field.FILENAME
    ];
  }

  known() {
    for(const f of Field.known_fields()) {
      if (f.namespace == this.namespace.toLowerCase() && f.name == this.name.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
}
class Prefix {
  static MRT = new Prefix("mrt", "http://merritt.cdlib.org/terms#");
  static NFO = new Prefix("nfo", "http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#");
  static NIE = new Prefix("nie", "http://www.semanticdesktop.org/ontologies/2007/03/22/nie#");

  constructor(prefix, uri) {
    this.prefix = prefix;
    this.uri = uri;
  }

  static required_prefixes() {
    return [
      Prefix.MRT,
      Prefix.NFO
    ]
  }

}

class ProfileType {
  // Create new instances of the same class as static attributes
  static INGEST = new ProfileType("mrt-ingest-manifest");
  //the following 2 types are referenced in some Merritt code, but they do not seem to be actively used
  //static OBJECT = new ProfileType("mrt-object-manifest");
  //static ADD = new ProfileType("mrt-add-manifest");
  static BATCH = new ProfileType("mrt-batch-manifest");
  static SFBATCH = new ProfileType("mrt-single-file-batch-manifest");
  static CONTAINER_BATCH = new ProfileType("mrt-container-batch-manifest");

  static vals() {
    return [
      ProfileType.INGEST, 
      //ProfileType.OBJECT, 
      //ProfileType.ADD, 
      ProfileType.BATCH, 
      ProfileType.SFBATCH, 
      ProfileType.CONTAINER_BATCH
    ];
  }

  constructor(name) {
    this.name = name;
  }

  static instance(key) {
    for(const p of ProfileType.vals()) {
      if (p.name == key) return p;
    }
    return null;
  }
}

class TestStatus {
  // Create new instances of the same class as static attributes
  static SKIP = new TestStatus("Skip");
  static PASS = new TestStatus("Pass");
  static WARN = new TestStatus("Warn");
  static ERROR = new TestStatus("Error");

  constructor(name) {
    this.name = name;
  }

  name() {
    return this.name;
  }

  static ordered_vals() {
    return [
      TestStatus.SKIP, 
      TestStatus.PASS, 
      TestStatus.WARN, 
      TestStatus.ERROR
    ];
  }
}

class CheckmTest {
    constructor(label) {
        this.label = label;
        this.setStatus(TestStatus.SKIP);
        this.message = '';
    }

    skip() {
      return this.setStatus(TestStatus.SKIP);
    }
    pass() {
      return this.setStatus(TestStatus.PASS);
    }
    warn() {
      return this.setStatus(TestStatus.WARN);
    }
    error() {
      return this.setStatus(TestStatus.ERROR);
    }

    setStatus(status) {
        this.status = status;
        return this.status;
    }

    setLabel(label) {
      this.label = label;
    }

    setMessage(message) {
        this.message = message;
    }
    label() {
        return this.label;
    }
    status() {
        return this.status;
    }
    message() {
        return this.message;
    }
    tr() {
        var name = this.status.name;
        var tr = $("<tr/>").addClass(name);
        $("<th/>").text(this.label).appendTo(tr);
        $("<td/>").text(name).appendTo(tr);
        $("<td/>").text(this.message).appendTo(tr);
        return tr;
    }

    static tr_head() {
        var tr = $("<tr/>");
        $("<th/>").text("Test").appendTo(tr);
        $("<th/>").text("Status").appendTo(tr);
        $("<th/>").text("Note").appendTo(tr);
        return tr;        
    }
}

class RegexTest extends CheckmTest {
  constructor(label, regex) {
    super(label);
    this.regex = regex;
  }

  runTest(checkm) {
    this.error();
    checkm.forEach(v => {
      if (v.match(this.regex)) {
        this.pass();
        return false;
      }
    });
  }
}