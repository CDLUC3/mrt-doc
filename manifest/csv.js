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
            return ProfileType.SFBATCH.name;
          } 
          if (this.checkm) {
            return ProfileType.BATCH.name;
          } 
          if (this.container) {
            return ProfileType.CONTAINER_BATCH.name;
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
          return ProfileType.SFBATCH.name;
        }
      }
      return ProfileType.INGEST.name;
    }
    processRows() {
      for(var i=1; i < this.arr.length; i++) {
        this.append(this.arr[i].join(" | ") + "\n");
      }  
    }
  }
  