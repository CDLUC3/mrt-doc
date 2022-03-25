class CsvToCheckm {
    constructor(contents) {
      this.arr = parseCSV(contents);
      this.fields = this.arr.length > 0 ? this.arr[0] : [];
      this.input_cols = {};
      for(var i=0; i<this.fields.length; i++) {
          var f = Field.instance(this.fields[i]);
          this.input_cols[f.fname_norm()] = i;
      }
      this.checkm = false;
      this.container = false;
      this.single_file = false;
      this.buf = "";
      this.filecol = this.file_col();
      this.batch = this.is_batch();
      this.analyzeRows();
      this.profile = this.get_profile();
      if (this.profile == null) {
        this.append("Profile Type Could Not be Determined\n\n" + contents);
        this.append(this.checkm + " " + this.container + " " + this.single_file + "\n");
        this.append(contents);
      } else {
        this.appendHeaders();
        this.processRows();
        this.appendFooters();  
      }
    }
  
    file_col() {
      for(var i=0; i < this.fields.length; i++) {
        if (Field.FILENAME.matches(this.fields[i])) {
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
    appendHeaders() {
      this.append("#%checkm_0.7\n");
      this.append("#%profile | http://uc3.cdlib.org/registry/ingest/manifest/" + this.profile.name + "\n");
      this.append("#%prefix | mrt: | http://merritt.cdlib.org/terms#\n");
      this.append("#%prefix | nfo: | http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#\n");
      this.append("#%fields | " + this.profile.standard_field_list(" | ") + "\n");
    }
  
    appendFooters() {
      this.append("#%eof\n");
    }
  
    get_file_type_count() {
      var types = 0;
      if (this.single_file) types++;
      if (this.container) types++;
      if (this.checkm) types++;
      return types;
    }
  
    get_profile() {  
      if (this.batch) {
        if (this.get_file_type_count() == 1) {
          if (this.single_file) {
            return ProfileType.SFBATCH;
          } 
          if (this.checkm) {
            return ProfileType.BATCH;
          } 
          if (this.container) {
            return ProfileType.CONTAINER_BATCH;
          }   
        } else if (this.checkm) {
          alert("A checkm file was found in CSV file list.  \n\nIf a single checkm file is found, all files should be checkm files.")
          return "";
        } else {
          alert(
            "Container files and non-container files were found in the CSV file list. \n"+
            "If you proceed with the generated manifest, the container files will be deposited as content.  "+
            "The containers will not be expanded before ingest.\n\n"+
            "If you wish to unpack containers prior to ingest, the manifest must contain ONLY container files."
          )
          return ProfileType.SFBATCH;
        }
      }
      return ProfileType.INGEST;
    }

    processRows() {
      for(var i=1; i < this.arr.length; i++) {
        var row =[];
        for(const f of this.profile.standard_fields()) {
            var index = this.input_cols[f.fname_norm()];
            var val = "";
            if (index != null) {
                if (index < this.arr[i].length) {
                    val = this.arr[i][index];
                }
            }
            row.push(val);
        }
        this.append(row.join(" | ") + "\n");
      }  
    }
  }
  