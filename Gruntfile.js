const path = require('path');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-bookmarklet-wrapper');
  grunt.loadNpmTasks('grunt-html-build');

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    htmlbuild: {
      dist: {
        src: 'src/index.html',
        dest: '',
      },
    },
  });

  grunt.registerTask('bookmarklet_preprocessor', '', function() {
    const files = grunt.file.expand({ filter: "isFile", cwd: "src" }, ["*.js"]);
    let bookmarklets = {};
    let bw_files = {};

    files.forEach(function (filename) {
      const label = path.basename(filename, '.js');
      bookmarklets[label] = {
        target: path.join('tmp', filename),
        source: path.join('src', filename)
      };
      bw_files[bookmarklets[label]['target']] = bookmarklets[label]['source'];
    });

    grunt.config.set(['bookmarklets'], bookmarklets);
    grunt.config.set(['bookmarklet_wrapper', 'dist', 'files'], bw_files);
  });

  grunt.registerTask('bookmarklet_processor', '', function() {
    links = [];
    const isMarkdown = path.extname(grunt.config.get(['htmlbuild', 'dist', 'src'])).toLowerCase() === '.md';
    Object.keys(grunt.config.get(['bookmarklets'])).forEach(function (label) {
      const filecontent = grunt.file.read(grunt.config.get(['bookmarklets'])[label]['target']);
      links.push(
        isMarkdown
          ? '[' + label + '](' + filecontent + ')'
          : '<a href="' + filecontent + '">' + label + '</a>'
      );
    });

    if (links.length) {
      if (isMarkdown) {
        grunt.config.set(['htmlbuild', 'dist', 'options', 'data', 'links'], ' * ' + links.join('\n\n * '));
      }
      else {
        grunt.config.set(['htmlbuild', 'dist', 'options', 'data', 'links'], '<ul><li>' + links.join('</li><li>') + '</li></ul>');
      }
    }
  });


  grunt.registerTask('default', ['bookmarklet_preprocessor', 'bookmarklet_wrapper', 'bookmarklet_processor', 'htmlbuild']);
};
