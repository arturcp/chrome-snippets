
/*
  [Animista](https://animista.net/) is an amazing webpage where you
  can find css animations on demand.

  There is a huge list of animations and all you need to do to use
  them in your projects is to choose the one you like and grab
  the css code. As simple as that.

  This snippet takes all the codes from a category. For example,
  click on the `Basic` top menu and choose the scale-down
  subcategory. When you run this snippet, it will collect all
  scale-down animations and show them in a textarea at the end
  of the script. Copy and paste it in your projects and you are
  ready to go.
*/
var Downloader = {
  download: function() {
    var container = document.querySelectorAll('.frame.appear')[1],
        items = container.querySelectorAll('li a'),
        css = [],
        keyFrames = [],
        self = this;

    items.forEach(function(element, index) {
      setTimeout(function() {
        element.click();
        setTimeout(function() {
          var codeButton = document.querySelector('#btn-generate');
          codeButton.click();
          setTimeout(function() {
            if (document.querySelector('#code-anim-properties').value === '') {
              console.log('blank: ' + element.getAttribute('href'));
            } else {
              css.push(document.querySelector('#code-anim-properties').value);
            }

            if (document.querySelector('#code-anim-keyframes').value === '') {
              console.log('blank keyframe: ' + element.getAttribute('href'));
            } else {
              keyFrames.push(document.querySelector('#code-anim-keyframes').value);
            }

          }, 100);
        }, 100);
      }, (index + 1) * 800);
    });

    setTimeout(function() {
      console.log(css);
      console.log(css.length);

      console.log(keyFrames);
      console.log(keyFrames.length);

      self.formatResult({ css: css, keyFrames: keyFrames });
    }, (items.length) * 1000);
  },

  formatResult: function(content) {
    var result = '';
    content.css.forEach(function(attribute) {
      result += attribute + '\n';
    });
    result += '\n';

    content.keyFrames.forEach(function(attribute) {
      result += attribute + '\n';
    });
    this.showResult(result);
  },

  showResult: function(value) {
    const container = document.querySelector('body');
    const newdiv = document.createElement('div');
    const style = 'width: 99%; height: 805px; margin: 10px; background-color: #000; color: #fff; padding: 5px; margin-top: 65px';

    newdiv.innerHTML = "<textarea style='" + style + "' id='my-results'>" + value + "</textarea>";

    container.insertBefore(newdiv, container.firstChild);
  }
}

const url = window.location.hostname;
if (url === 'animista.net') {
  Downloader.download();
} else {
  alert('You are not on Animista.net');
}

