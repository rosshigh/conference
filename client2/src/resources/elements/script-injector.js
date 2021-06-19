1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
import {bindingMode, customElement, bindable, noView} from "aurelia-framework";
 
@noView()
@customElement('scriptinjector')
export class scriptinjector {
 
  @bindable url;
  @bindable isAsync;
  @bindable({defaultBindingMode: bindingMode.oneWay}) scripttag;
 
  attached() {
    if (this.url) {
      this.scripttag = document.createElement('script');
      if (this.isAsync) {
        this.scripttag.async = true;
      }
      this.scripttag.setAttribute('src', this.url);
      this.scripttag.setAttribute('data-sdk-integration-source', "button-factory");
      document.body.appendChild(this.scripttag);
    }
  }
 
  detached() {
    if (this.scripttag) {
      this.scripttag.remove();
    }
  }
}