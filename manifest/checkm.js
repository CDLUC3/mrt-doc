class Checkm {
    constructor(rawdata) {
      this.linenum = 0;
      this.warnPad = 0;
      this.filenames = {};
      this.validation_checks = [];
      this.rawdata = rawdata;
      this.checkEncoding();
      this.lines = this.getLines();
      this.checkHeader();
      this.profileName = "";
      this.profileType = null;
      this.showDataTableView = true;
      this.checkProfile();
      this.prefixes = {};
      this.checkPrefixes();
      this.fields = [];
      this.checkFields();
      this.data = [];
      this.data_css = [];
      this.count_obj = 0;
      this.count_file = 0;
      this.checkData();
      this.checkEof();
      this.checkTerminalNewline();
      this.checkExtraNewline();
    }

    checkFilename(fname) {
      var fn = (fname == null) ? "" : fname.toLowerCase();
      if (fn in this.filenames) {
        return false; 
      }
      this.filenames[fn] = true;
      return true;
    }
  
    warnPadding() {
      this.warnPad++;
      return this.warnPad < 5;
    }
  
    checkEncoding() {
      var t = new CheckmTest("Check file encoding");
      t.pass();
      var row = 1;
      var col = 1;
      for(var i=0; i<this.rawdata.length; i++) {
        col++;
        if (this.rawdata.codePointAt(i) == 10) {
          row++;
          col = 0;
        } else if (this.rawdata.codePointAt(i) == 65533) {
          t.error();
          t.setMessage("Replacement character found at row " + row + "/col " + col + " (position " + i + ")");
          this.showDataTableView = false;
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
          this.linenum++;
          return this.lines.shift();
        }
      }
    }

    getNextLine() {
      if (this.lines.length > 0) {
        this.linenum++;
        return this.lines.shift();
      }
    }
  
    getNotLine(regex) {
      if (this.lines.length > 0) {
        if (!this.lines[0].match(regex)) {
          this.linenum++;
          return this.lines.shift();
        }
      }
    }
  
    checkHeader() {
      var t = new CheckmTest("Look for checkm declaration");
      if (this.getLine(/^#%checkm_0.7$/g)) {
        t.pass();
      } else {
        t.warn();
        t.setMessage("#%checkm_0.7 not found at top of file");
        this.showDataTableView = false;
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
        this.showDataTableView = false;
      }
      this.validation_checks.push(t);
    }
  
    checkTerminalNewline() {
      var t = new CheckmTest("Look for terminal newline");
      if (this.getNextLine()) {
        t.pass();
      } else {
        t.warn();
        t.setMessage("terminal newline not found at end of file");
        this.showDataTableView = false;
      }
      this.validation_checks.push(t);
    }

    checkExtraNewline() {
        var t = new CheckmTest("Look for terminal newline");
        if (this.getNextLine()) {
          t.error();
          t.setMessage("Extra terminal newline found at end of file");
          this.showDataTableView = false;
        } else {
          t.pass();
          return;
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
            this.showDataTableView = false;
          }
        } else {
          t.error();
          t.setMessage("Invalid url for profile");
          this.showDataTableView = false;
        }
      } else {
        t.error();
        t.setMessage("Profile declaration not found");
        this.showDataTableView = false;
      }
      this.validation_checks.push(t);
    }
  
    checkPrefixes() {
      var re = /^#%prefix \| (.*)$/g;
      for(var line = this.getLine(re); line != null; line = this.getLine(re)) {
        this.checkPrefixLine(line);
      }
      for(const p of Prefix.required_prefixes()) {
        var t = new CheckmTest("Look for expected prefix: " + p.prefix);
        if (this.prefixes[p.prefix]) {
          if (this.prefixes[p.prefix] == p.uri) {
            t.pass();
          } else {
            t.warn();
            t.setMessage("Expected prefix uri: " + p.uri);
            this.showDataTableView = false;
          }
        } else {
          t.warn();
          t.setMessage("Prefix not found in manifest");
          this.showDataTableView = false;
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
        t.warn();
        t.setMessage("Improperly formatted prefix line: " + line);
        this.showDataTableView = false;
      }
      this.validation_checks.push(t);
    }

    checkFieldsArr(t, arr) {
        var fmap = {};
        for(const fname of arr) {
          var f = Field.instance(fname);
          this.fields.push(f);
          fmap[f.name_norm()] = true;
        }

        var fail = [];
        for(const f of this.profileType.standard_fields()) {
          if (!fmap[f.name_norm()]) {
            fail.push(f.name_norm());
          }
        }    
        if (fail.length > 0) {
          t.error();
          t.setMessage("Required fields not found: " + fail);
          this.showDataTableView = false;
          return;
        }
        if (this.fields.length > this.profileType.standard_fields().length) {
          t.error();
          t.setMessage("Incorrect number of fields defined for profileType - expected fields: " + this.profileType.standard_field_list(", "));
          this.showDataTableView = false;
          return;
        }
        var inorder = true;
        for (var i=0; i<this.fields.length; i++) {
          inorder = inorder && (this.fields[i].matches(this.profileType.standard_fields()[i].fname_norm())); 
        }
        if (!inorder) {
          t.error();
          t.setMessage("Fields in incorrect order for profileType - expected order: " + this.profileType.standard_field_list(", "));
        } else {
          t.pass();
          t.setMessage(this.fields.length + " found");
          for(const f of this.fields) {
            this.checkField(f);
          }
        }
    }

    checkFields() {
      var t = new CheckmTest("Look for fields declaration");
      var re = /^#%fields \| (.*)$/;
      var line = this.getLine(re);
      if (line) {
        var m = line.match(re);
        if (m) {
          if (this.profileType == null) {
            t.skip();
            t.setMessage("Profile type not found");
            this.showDataTableView = false;
            return;
          }
          this.checkFieldsArr(t, m[1].split(/\s*\|\s*/));
        }
      } else {
        t.warn();
        t.setMessage("Fields header not found: " + line);
        this.fields = this.profileType ? this.profileType.standard_fields() : [];
      }
      this.validation_checks.push(t);
    }
  
    checkField(field) {
      var t = new CheckmTest("Check field name format: " + field.fname);
      if (field.valid()) {
        if (field.known()) {
            t.pass();
            return;
        } else {
            t.error();
            t.setMessage("Field not known");
            this.showDataTableView = false;
        }
      } else {
        t.error();
        t.setMessage("Improper field name")
      }
      this.validation_checks.push(t);
    }
  
    checkData() {
      var re = /^#%eof/g;
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
      for(var r = 0; r < this.data.length; r++) {
        var tr = $("<tr/>");
        var showRow = (r < 20);
        for(var c = 0; c < this.data[r].length; c++) {
          $("<td/>").addClass(this.data_css[r][c]).text(this.data[r][c]).appendTo(tr);
          if (this.data_css[r][c] != 'Pass') {
            showRow = true;
          }
        }
        if (showRow) {
          tr.appendTo(tbody);
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

    count_row() {
        if (this.profileType == ProfileType.INGEST) {
            this.count_obj = 1;
            this.count_file++;
        } else {
            this.count_obj++;
        }
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
        this.checkm.validation_checks.push(t);
      } else if (row.length < this.fields.length) {
        if (this.checkm.warnPadding()){
          t.warn();
          t.setMessage("Record padded, too few fields found: "+ row.length);
          for(var i=row.length; i<this.checkm.fields.length; i++) {
            row.push("");
          } 
          this.checkm.validation_checks.push(t);  
        }
      } else {
        t.pass();
      }
    }
  
    rowLabel() {
      return "Data Row "+ this.num +  " (line: " + this.checkm.linenum + "): " + this.getValue(Field.FILENAME, "");
    }
  
    checkContent() {
      var css_row = [];
      for(var i=0; i < this.row.length; i++) {
        if (i < this.fields.length) {
          var field = this.fields[i];
          var t = new CheckmTest("Check data for row: " + this.rowLabel());
          if (!field.validate_data(this, this.row[i], t)) {
            this.checkm.validation_checks.push(t);
            css_row.push(t.status.name);
          } else {
            css_row.push("Pass");
          }
        }
      } 
      this.checkm.count_row();
      this.checkm.data_css.push(css_row);
    }
  
    getIndex(key) {
      for(var i=0; i<this.fields.length; i++) {
        if (key.matches(this.fields[i].fname_norm())) {
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