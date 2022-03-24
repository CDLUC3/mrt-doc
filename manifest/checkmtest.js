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