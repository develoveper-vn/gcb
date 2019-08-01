((ko) => {
  class App {
    constructor() {
      this.input = ko.observable("");
      
      this.feature = ko.pureComputed(() => this.branch('feature'), this);
      this.hotfix = ko.pureComputed(() => this.branch("hotfix"), this);
      this.release = ko.pureComputed(() => this.branch("release"), this);

      this.featureCmd = ko.pureComputed(() => this.command('feature'), this);
      this.hotfixCmd = ko.pureComputed(() => this.command("hotfix"), this);
      this.releaseCmd = ko.pureComputed(() => this.command("release"), this);
    }

    branch(flow) {
      return flow + "/" + kebabCase(this.input());
    }

    command(flow) {
      return "git checkout -b " + this.branch(flow);
    }

  }

  ko.applyBindings(new App());

  const clipboard = new ClipboardJS('button.copy');
  clipboard.on("success", ({text}) => {    
    let msg = "branch copied!";
    if (!text || text.trim().length === 0) {
      msg = "Damn!!!";
    } else if (text.startsWith("git checkout -b")) {
      msg = "command copied!";
    }

    Toastify({
      text: msg,
      duration: 3000
    }).showToast();
  });

})(window.ko);