$(function() {
  
    $('.prompt').html("root@dipsie:<span id='b'>~</span><span id='c'>% ");

  var term = new Terminal('#input-line .cmdline', '#container output');
  term.init();
  
});

var music = document.getElementById("music");

function togglePlay() {
  return music.paused ? music.play() : music.pause();
};

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  var foont = document.getElementById("lala");
  lala.style.fontSize = "50px";
}

var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);
};

var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);

  const CMDS_ = [
    'whoami', 'education', 'interests', 'love', 'evil', 'love', 'geekn\'t' ,'911', 'clear', 'help', 'music' 
  ];
  
  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function(e) {
    cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  //
  function inputTextClick_(e) {
    this.value = this.value;
  }

  //
  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }

  //
  function processNewCommand_(e) {

    if (e.keyCode == 9) { // tab
      e.preventDefault();
      // Implement tab suggest.
    } else if (e.keyCode == 13) { // enter
      // Save shell history.
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }

      // Duplicate current input and append to output section.
      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);

      if (this.value && this.value.trim()) {
        var args = this.value.split(' ').filter(function(val, i) {
          return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      switch (cmd) {
        case 'clear':
          output_.innerHTML = '';
          this.value = '';
          return;
         case 'help':
          var result = "<h5>Haha you got pranked, type \"911\" for help.</h5>";
          output(result);
          break;
        case 'music':
          togglePlay();
          break
        case '911':
          var result = "<h5>Help</h5><p><b>whoami</b>: who tf is Dipsie.<br><b>education</b>: display all my information about my education.<br><b>interests</b>: display all my interests.<br><b>love</b>: are you curious about my love?<br><b>contact</b>: say hi<br><b>evil</b>: gtfo pls I'm cute.<br><b>music</b>: pause or resume.<br><b>clear</b>: clear terminal.<br><b><i>geekn't</i>: </b>are you?<br><b>help</b>: display this menu.</p>";
          output(result);
          break;
        case 'education':
          var result = "<h5>Education</h5>"+"<h6>Just believe in peer learning, actually self taught since the age of 12. Just genius :)</h5>"+"<h5>Currently studying IT / software engineering at <a href='https://1337.ma'>1337</a></h6>";
          output(result);
          break;
        case 'geekn\'t':
          var result = "<a href='whoami.html'>Well thats sad to know \:P</a>";
          output(result);
          break;
        case 'evil':
          output('to be discussed later ...');
          break;
        case 'experience':
          var result = "<h5>Young but passionate</h5><h6>Come on I'm currently 20 years old, actually flexible at any theme</h4><br>I'm really interested into DevOps and SysAdmin.<br>2018 Moroccan Collegiate Programming Contest System Staff member<br>2018 Arab and Africa Collegiate Programming Contest System Staff member<br>Worked at KGB Hosting as a Technical Support Specialist<br><h2>The creator of spipaa7, and cancerdotexe</h6>";
          output(result);
          break;
        case 'interests': 
          var result = "<h5>Interests</h5><p>Algorithms, Data Structures, Problem Solving, Gaming , Football, Design, Communication, Photography, Internet of Things , Operating Systems, Cloud Computing , Geometry , Big Data , Volunteering, Traveling, Open Source Technologies...</p>";
          output(result);
          break;
        case 'contact':
          var result = "<h5>Contact</h5><h6>Email  ‏‏‎  ‏‏‎  ‏‏‎ ‏‏‎   : <a href='mailto:contact@dipsie.me'>contact@dipsie.me</a><br>Github ‏‏‎  ‏‏‎  ‏‏‎ : <a href='https://github.com/ymoustai'>Spipa7</a><br>Facebook  ‏‏‎ : <a href='https://www.facebook.com/Dipsiex70'>Dipsie</a><br>Instagram  : <a href='https://www.instagram.com/dipsiex70'>Dipsie</a></h6>";
          output(result);
          break;
        case 'whoami':
          var result = "<h5>Yassir Moustaine</h5><p>Developer, Designer, and Competitive Gamer</p><p>I am 20 years old. Currently living in Khouribga city. I am a student 1337 coding school under 42 school pedagogy in Khouribga, Morocco. I am interested in DevOps, data structures, computer security, new technologies, and communication theories. I am an open-source activist, because I'm a fan of peer learning pedagogy. I love sharing code, love, and knowledge. I love traveling because it is a creative way to share knowledge, to meet new people, and to discover new cultures. I love operating systems because they teach you the core of computers.</p>" + "<h3>Interests</h3><p>Algorithms, Data Structures, Problem Solving, Cyber Security , Volleyball, Literature, Communication, Photography, Internet of Things , Operating Systems, Cloud Computing , Geometry , Big Data , Volunteering, Traveling, Open Source Technologies...</p>"
          output(result);
          break;
        case 'love':
          output("<h5>404...<br>Just hard times for the moment.</h5>");
          break;
        case 'hamza':
            output("<h5>zindi9 cyka nahui mofo nigger   I confirm hes gay</h5>");
            break;
        default:
          if (cmd) {
            output(cmd + ': command not found');
          }
      };

      window.scrollTo(0, getDocHeight_());
      this.value = ''; // Clear/setup line for next input.
    }
  }

  //
  function formatColumns_(entries) {
    var maxName = entries[0].name;
    util.toArray(entries).forEach(function(entry, i) {
      if (entry.name.length > maxName.length) {
        maxName = entry.name;
      }
    });

    var height = entries.length <= 3 ?
        'height: ' + (entries.length * 15) + 'px;' : '';

    // 12px monospace font yields ~7px screen width.
    var colWidth = maxName.length * 7;

    return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'];
  }

  //
  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }

  // Cross-browser impl to get document's height.
  function getDocHeight_() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }

  //
  return {
    init: function() {
      output('<h2>Dipsie</h2><h3>Get to know me :)</h3><p>Enter "help" for more information.</p>');
    },
    output: output
  }
};
