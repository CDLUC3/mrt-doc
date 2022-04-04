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
    static HASHALG = new Field("nfo:hashalgorithm").setRegex(/^(md5|sha-256)$/i, "allowed values: md5 or sha-256");
    static HASHVAL = new Field("nfo:hashvalue").setValidateFxn(
      function(cdr, v, t) {
        var alg = cdr.getValue(Field.HASHALG, "").toLowerCase();
        if (alg == "md5") {
          if (v.match(/^[a-z0-9]{32,32}$/)) {
            return true;
          } else {
            t.error();
            t.setMessage("hashval must be 32 alphanumeric values");
            return false;
          }
        } else if (alg == "sha-256") {
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
    static FILENAME = new Field("nfo:filename").setValidateFxn(
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
        } else if (cdr.checkm.profileType == ProfileType.SFBATCH) {
          if (v.match(/.*\.(tar|zip|tar\.gz|bz2)$/i)) {
            t.warn();
            t.setMessage("Filename is a container.  It will be deposited as a single file");
            return false;
          } else if (v.match(/.*\.(checkm)$/i)) {
            t.error();
            t.setMessage("Filename is a checkm.  It will be deposited as a single file");
            return false;
          } else {
            t.pass();
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
      this.fname = fname;
      var m = fname.match(/^(\w+):(\w+)$/);
      if (m) {
        this.namespace = m[1];
        this.name = m[2];  
      }
    }
  
    matches(s) {
      if (!s) {
        return false;
      }
      if (s.toLowerCase() == this.fname.toLowerCase() || s.toLowerCase() == this.name.toLowerCase()) {
        return true;
      }
      var arr = s.split(":");
      if (arr.length == 2) {
        return (arr[1].toLowerCase() == this.fname.toLowerCase() || arr[1].toLowerCase() == this.name.toLowerCase());
      }
      return false;
    }
  
    fname_norm() {
      return this.fname ? this.fname.toLowerCase() : "";
    }

    name_norm() {
        return this.name ? this.name.toLowerCase() : "";
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
        //return this.namespace != null && this.name != null;
        return this.name != null;
    }
  
    static instance(name) {
      for(const f of Field.known_fields()) {
        if (f.matches(name)) {
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
        Field.FILEURL
      ];
    }
  
    known() {
      for(const f of Field.known_fields()) {
        if (f.matches(this.fname)) {
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