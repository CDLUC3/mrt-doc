$(document).ready(function(){
  $("#testfiles").on("change", function(){
    var sel = $("#testfiles option:selected");
    var fname = sel.val();
    $.ajax({
      url: fname,
      success: function(data){
        $("#checkm").val(data);
      }
    });
  });
});

function parse() {
  var cv = new CheckmValidator();
  cv.parse();
}

async function runit(){
  var [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  $("#checkm").val(contents);
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

  getIndex(key) {
    for(var i=0; i<this.fields.length; i++) {
      if (this.fields[i].fname.toLowerCase() == key.toLowerCase()) {
        return i;
      }
    }
    return 0;
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
      console.log(m);
      if (m) {
        this.profileName = m[1];
        this.profileType = ProfileType.instance(this.profileName);
        console.log(this.profileType);
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
      console.log(this.prefixes);
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

  checkDataRowStructure(row, fname) {
    var t = new CheckmTest(fname + " - structure");
    if (row.length == this.fields.length) {
      this.data.push(row);
      t.pass();
    } else if (row.length == this.fields.length - 1) {
      t.warn();
      t.setMessage("Blank field added to end of record");
      row.push("");
      this.data.push(row);
    } else {
      t.error();
      t.setMessage("Bad field count: " + row.length);
    }
    this.validation_checks.push(t);  
  }

  checkDataRowContent(row, fname) {
    var t = new CheckmTest(fname + " - content");
    var failed_checks = [];
    for(var i=0; i < this.fields.length; i++) {
      var f = this.fields[i];
      if (!f.validate_data(row[i])) {
        failed_checks.push(f.fname);       
      }
    }
    if (failed_checks.length == 0) {
      t.pass();
    } else {
      t.error();
      t.setMessage("Invalid fields: " + failed_checks.join(", "));
    }
    this.validation_checks.push(t);  
    if (this.profileType == ProfileType.CONTAINER_BATCH) {
      var t = new CheckmTest(fname + " - profile checks");
      var m = fname.match(/.*\.(tar|zip|tar\.gz|bz2)$/i); 
      if (m) {
        t.pass();
        t.setMessage(m[1] + ": Filename is a zip, tar, tar.gz or bz2");
      } else {
        t.error();
        t.setMessage("Filename must be a zip, tar, tar.gz or bz2");
      }
      this.validation_checks.push(t);  
    } else if (this.profileType == ProfileType.BATCH) {
      t = new CheckmTest(fname + " - content");
      var m = fname.match(/.*\.(checkm)$/i);
      if (m) {
        t.pass();
        t.setMessage(m[1] + ": Filename is a checkm");
      } else {
        t.error();
        t.setMessage("Filename must be a checkm");
      }
      this.validation_checks.push(t);  
    } 
  }

  checkData() {
    var re = /^#%eof$/g;
    var dr = 0;
    for(var line = this.getNotLine(re); line != null; line = this.getNotLine(re)) {
      dr++;
      if (line.match(/^#%.*/)) continue;
      if (line.match(/^\s*$/)) continue;
      var row = line.split(/\s*\|\s*/);
      var fname = row[this.getIndex(Field.FILENAME.fname)];
      this.checkDataRowStructure(row, fname);
      this.checkDataRowContent(row, fname);
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

class Field {
  static FILEURL = new Field("nfo:fileurl", true, null);
  static HASHALG = new Field("nfo:hashalgorithm", false, /^(md5|sha256)$/);
  static HASHVAL = new Field("nfo:hashvalue", false, /^[a-z0-9]{32,32}([a-z0-9]{32,32})?$/);
  static FILESIZE = new Field("nfo:filesize", false, /^\d+$/);
  static FILEMOD = new Field("nfo:filelastmodified", false, null);
  static FILENAME = new Field("nfo:filename", true, null);
  //this field is referenced in some Merritt code, but it is not actively used
  //static NIE_MIMETYPE = new Field("nie:mimetype");
  static MIMETYPE = new Field("mrt:mimetype", false, null);
  static PRIMID = new Field("mrt:primaryidentifier", false, null);
  static LOCID = new Field("mrt:localidentifier", false, null);
  static CREATOR = new Field("mrt:creator", false, null);
  static TITLE = new Field("mrt:title", false, null);
  static DATE = new Field("mrt:date", false, null);
  static NA = new Field("na:na", false, null);

  constructor(fname, required, regex) {
    this.required = required;
    this.regex = regex;
    var m = fname.match(/^(\w+):(\w+)$/);
    if (m) {
      this.fname = fname;
      this.namespace = m[1];
      this.name = m[2];  
    }
  }

  validate_data(data) {
    if (data == null || data == "") {
      if (this.required) {
        return false;
      }
    } else if (this.regex) {
      return (data.match(this.regex));
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