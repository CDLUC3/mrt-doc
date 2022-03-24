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
        ProfileType.BATCH, 
        ProfileType.SFBATCH, 
        ProfileType.CONTAINER_BATCH
      ];
    }

    constructor(name) {
      this.name = name;
    }

    standard_fields() {
        if (this.name == ProfileType.INGEST.name) {
            return [
                Field.FILEURL,
                Field.HASHALG,
                Field.HASHVAL,
                Field.FILESIZE,
                Field.FILEMOD,
                Field.FILENAME,
                Field.MIMETYPE
            ];
        }
        return [
            Field.FILEURL,
            Field.HASHALG,
            Field.HASHVAL,
            Field.FILESIZE,
            Field.FILEMOD,
            Field.FILENAME,
            Field.PRIMID,
            Field.LOCID,
            Field.CREATOR,
            Field.TITLE,
            Field.DATE,
            Field.MIMETYPE
        ];
    }
  
    standard_field_list() {
        var arr = [];
        for(const f of this.standard_fields()) {
            arr.push(f.fname);
        }
        return arr.join(", ");
    }

    static instance(key) {
      for(const p of ProfileType.vals()) {
        if (p.name == key) return p;
      }
      return null;
    }
  }