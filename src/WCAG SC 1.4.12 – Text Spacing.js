var elems = document.querySelectorAll('*');
var classIsInClassString = function (className, classValue) {
  return classValue.split(' ').filter(function (item) {
    return item;
  }).indexOf(className.trim()) > -1;
};

document.querySelector('html').style.removeProperty('font-size');

for (let index = 0; index < elems.length; index++) {
  var el = elems[index];

  // Add properties based on element node name.
  var tag = ['p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  if (tag.indexOf(el.nodeName.toLowerCase()) > -1) {
    el.style.setProperty('margin-bottom', '2em', 'important');
  }
  else {
    // Add props based on tag AND a CSS class.
    var tagAndClass = {
      'div': [
        'form-item__description',
        'form-item__error-message',
        'fieldset__description',
        'fieldset__error-message',
        'messages'
      ]
    };
    Object.keys(tagAndClass).forEach(function (tagAndClassTag) {
      if (tagAndClassTag.indexOf(el.nodeName.toLowerCase()) > -1) {
        tagAndClass[tagAndClassTag].forEach(function (classToFind) {
          if (classIsInClassString(classToFind, el.classList.value)) {
            el.style.setProperty('margin-bottom', '4em', 'important');
          }
        });
      }
    });
  }

  el.style.setProperty('line-height', '1.5', 'important');
  el.style.setProperty('letter-spacing', '0.12em', 'important');
  el.style.setProperty('word-spacing', '0.16em', 'important');
}
