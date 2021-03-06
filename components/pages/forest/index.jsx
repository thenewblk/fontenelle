var React = require('react'),
    request = require('superagent'),
    util = require('util'),
    Velocity = require('velocity-animate/velocity'),
    InlineSVG = require('react-inlinesvg'),
    Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var ScrollMagic = require('scrollmagic');
var load_image = [];

var photogallery = require('../../common/fall.json');
var acorngallery = require('../../common/littleexplorers.json');

var Footer = require('../../common/footer.jsx');

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var Main = React.createClass({
  mixins: [ Router.State, Navigation, SetIntervalMixin ],
  getInitialState: function() {
    return {
      duration: 750,
      drawer: [],
      photogallery: shuffleArray(photogallery),
      acorngallery: shuffleArray(acorngallery),
      hover: '',
      area: '',
      left: 0,
      right: null,
      pre_count: 0,
      load_images: [
        "/img/loop_one.jpg",
        "/img/forest/forest-tearjerker.jpg",
        "/img/forest/forest-kids-video.jpg",
        "/img/forest/neale-woods.jpg",
        "/img/forest/bird2.png",
        '/img/forest/leaf-left-hex_a04e23.png',
        '/img/forest/leaf-right-hex_a04e23.png',
        "/img/eggshell.jpg"
      ],
      percent_loaded: 0,
      acornLeft: 0,
      windowWidth: window.innerWidth,
      videoOne: false,
      videoTwo: false,
      arrow_class: false
    };
  },

  componentDidMount: function () {
    var self = this;

    window.addEventListener('resize', self.handleResize);

    var load_images = self.state.load_images;
    for (var image in load_images) {
      var tmp_image = new Image();
      tmp_image.onload = self.onLoad;
      tmp_image.src = load_images[image];
    }

    self.setInterval(function() { self.setState({arrow_class: !self.state.arrow_class}); }, 500);

  },


  componentDidUpdate: function (prevProps, prevState) {
    var self  = this;

    if (prevProps.params != self.props.params){
      self.scrollThing(self.props.params.scroll);
    }
  },

  onLoad: function() {
    var self = this;

    var tmp_pre_count = self.state.pre_count;
    tmp_pre_count++;

    if (tmp_pre_count == self.state.load_images.length) {

      self.setState({pre_count: tmp_pre_count, percent_loaded: 100});
      setTimeout(function() { self.setState({loaded: true}); }, 150);

      setTimeout(function() {
        if (self.getParams().scroll) {
          self.scrollThing(self.getParams().scroll)
        }
      }, 350);

    } else {

      var percent_loaded = (tmp_pre_count / self.state.load_images.length ) * 100;
      self.setState({pre_count: tmp_pre_count, percent_loaded: percent_loaded});

    }
  },

  handleResize: function(e) {
    var self = this;
    if(self.state.right == 0){
      self.setState({
        windowWidth: window.innerWidth,
        right: 0,
        acornRight: 0,
      });
    } else {
      self.setState({
        windowWidth: window.innerWidth,
        left: 0,
        acornLeft: 0,
      });
    }
  },

  hoverClass: function(index){
    this.setState({hover: index});
  },

  hoverLeave: function(){
    this.setState({hover: ''});
  },

  reset: function(){
    var self = this;
    self.setState({ drawer: [], area: '' });
    self.scrollThing("map_wrap");
  },

  natureCenter: function(){
    var self = this;

    var drawer = [
      {
        title: "The Nature Center",
        description: "This 25,000 square foot building is home to classrooms, rotating exhibits, and our main offices. Stop by the front desk to grab a map and check the ranger board for the latest on wildlife activity.",
        image: "/img/map_photos/small/nature-center.jpg"
      },
      {
        title: "Acorn Acres",
        description: "Located just outside of the Nature Center, this natural playscape offers children a unique place for unstructured play and outdoor learning.",
        image: "/img/map_photos/small/acorn-acres.jpg"
      },
      {
        title: "Habitat Hollow",
        description: "This short, level trail is a great option when you want a short jaunt off the boardwalk.",
        image: "/img/map_photos/small/habitat-hollow.jpg"
      },
      {
        title: "Riverview Boardwalk",
        description: "Recommended for all first time visitors, the wooden boardwalk’s three interconnected loops make for a pleasant, mud-free hike in any weather. This barrier-free trail is also well suited to baby strollers.",
        image: "/img/map_photos/small/river-boardwalk.jpg"
      }
    ];
    var drawer_overview = {
        title: "Overview",
        description: "With a total of 3.4 miles, this group includes a one-mile boardwalk and various difficulties of trails through the woods. There is also a trail that runs along Childs Hollow through the wetland area to a view of the river. These provide several opportunities to see our oak woodland restoration relatively up close.",
    };

    self.setState({ drawer: drawer, area: 'natureCenter', drawer_overview: drawer_overview });
    self.scrollThing("map_wrap");
  },


  greatMarsh: function(){
    var self = this;

    var drawer = [
      {
        title: "Trailheads at the Wetlands Learning Center",
        description: "With five trailheads nearby, the Wetlands Learning Center is a great spot to park and while you discover a new trail.",
        image: "/img/map_photos/small/trailheads.jpg"
      },
      {
        title: "Gifford Memorial Boardwalk",
        description: "This level, barrier-free trail takes you on a half mile journey through wetland and cottonwoods to the observation blind.",
        image: "/img/map_photos/small/gifford memorial boardwalk.jpg"
      },
      {
        title: "Observation Blind",
        description: "Looks out over the Great Marsh, which is a “river scar” marking a former channel of the Missouri.",
        image: "/img/map_photos/small/observation-blind.jpg"
      }
    ];
    var drawer_overview = {
        title: "Overview",
        description: "Walk along our Great Marsh, or take the level boardwalk out to our bird blind. If you’re up for a longer hike, head out to Hidden Lake on the mostly level trail.",
    };

    self.setState({ drawer: drawer, area: 'greatMarsh', drawer_overview: drawer_overview });
    self.scrollThing("map_wrap");
  },

  northernFloodplains: function(){
    var self = this;

    var drawer = [
      {
        title: "Camp Gifford",
        description: "A young Henry Fonda spent time with other scouts at Camp Gifford. You can still see concrete bunkhouse foundations from the Stream Trail.",
        image: "/img/map_photos/small/camp_gifford.jpg"
      },
      {
        title: "Stream Trail",
        description: "Hike along the stream where you can see beavers, frogs, and other wildlife.",
        image: "/img/map_photos/small/stream-trail.jpg"
      },
      {
        title: "Cottonwood Trail",
        description: "Explore giant cottonwood trees on this level trail that crosses the floodplain.",
        image: "/img/map_photos/small/cottonwood-trail.jpg"
      }
    ];
    var drawer_overview = {
        title: "Overview",
        description: "Mostly flat, sandy trails wind through the northern part of our floodplain, with the Missouri Trail featuring wonderful views of the river. Since this is a wetland, the area can often be muddy or have some standing water.",
    };

    self.setState({ drawer: drawer, area: 'northernFloodplains', drawer_overview: drawer_overview });
    self.scrollThing("map_wrap");
  },

  northernUplands: function(){
    var self = this;

    var drawer = [
      {
        title: "Earth Lodges",
        description: "Along the ridges of Oak Trail and Hawthorn Trail you can find depressions that mark 1,000 year-old sites of Native American earth lodges.",
        image: "/img/map_photos/small/earth_lodge.jpg"
      },
      {
        title: "Scenic, ridge-top Oak Trail",
        description: "A bit over one mile long with plenty of vertical travel, Oak Trail can give you a workout. It follows a ridge with scenic views and 250 year-old bur oak trees.",
        image: "/img/map_photos/small/oak-trail.jpg"
      },
      {
        title: "Child’s MIll",
        description: "In the 1850s, Charles Childs owned a large section of Fontenelle Forest. His and other logging operations left trails throughout the forest, some of which eventually became the trails we hike today.",
        image: "/img/map_photos/small/nature-center.jpg"
      }
    ];
    var drawer_overview = {
        title: "Overview",
        description: "North of Camp Gifford Road, this section containing 2.5 miles of undulating trails through our upland forest is an exceptionally tranquil place to enjoy nature. These mostly have moderate slope, with a few steep slopes along the way.",
    };

    self.setState({ drawer: drawer, area: 'northernUplands', drawer_overview: drawer_overview });
    self.scrollThing("map_wrap");
  },

  southernUplands: function(){
    var self = this;

    var drawer_overview = {
        title: "Overview",
        description: "Full of cues from Bellevue, Nebraska’s storied history, these moderate-to-steep trails take you on an amazing journey. Pick up a History brochure at the front desk—and travel back in time.",
    };

    var drawer = [
      {
        title: "Mormon Hollow",
        description: "Follow a deep ravine along traces of a Mormon pioneer trail first blazed in the summer of 1846.",
        image: "/img/map_photos/small/mormon-hollow.jpg"
      },
      {
        title: "Springs and streams",
        description: "Find plenty of serene springs and picturesque miniature waterfalls along the Mormon Hollow trail.",
        image: "/img/map_photos/small/springsandstreams.jpg"
      },
      {
        title: "History Trail",
        description: "Follow a self-guided tour of fifteen historic locations throughout Fontenelle Forest.",
        image: "/img/map_photos/small/history-trail.jpg"
      }
    ];

    self.setState({ drawer: drawer, area: 'southernUplands', drawer_overview: drawer_overview });
    self.scrollThing("map_wrap");
  },

  moveLeft: function(){
    var self = this;
    self.props.transition('slide-back');
    self.transitionTo('programs');
    setTimeout(function() { self.props.transition('default'); }, 300);
  },


  moveRight: function(){
    var self = this;
    self.props.transition('slide-forward');
    self.transitionTo('natural-resources');
    setTimeout(function() { self.props.transition('default'); }, 300);
  },

  toggleVideoOne: function(){
    this.setState({videoOne: !this.state.videoOne});
  },

  toggleVideoTwo: function(){
    this.setState({videoTwo: !this.state.videoTwo});
  },

  galleryRight: function(){
    var self = this;
    var gallery_width = Math.ceil(self.state.photogallery.length/2) * 450;

    var window_width = self.state.windowWidth;
    var left = self.state.left;

    if (window_width < (gallery_width - (left+ 450))) {
      self.setState({left: self.state.left + 450});
    } else {
      self.setState({right: 0});
    }
  },

  galleryLeft: function(){
    var self = this;
    var left = self.state.left;
    var gallery_width = Math.ceil(self.state.photogallery.length/2) * 450;

    var window_width = self.state.windowWidth;

    if (left > 0) {
      self.setState({left: self.state.left + -450, right: null});
    }
  },


  acornRight: function(){
    var self = this;
    var gallery_width = Math.ceil(self.state.acorngallery.length/2) * 450;

    var window_width = self.state.windowWidth;
    var acornLeft = self.state.acornLeft;

    if (window_width <= (gallery_width - acornLeft)) {
      self.setState({acornLeft: acornLeft + 450});
    }
  },

  acornLeft: function(){
    var self = this;
    var acornLeft = self.state.acornLeft;

    if (acornLeft > 0) {
      self.setState({acornLeft: acornLeft + -450});
    }
  },

  topScroll: function(){
    this.scrollThing('page');
  },

  mapHoverEnter: function(index){
    this.setState({hover: index});
  },

  mapHoverLeave: function(){
    this.setState({hover: ''});
  },

  scrollThing: function(thing){
    var self = this;
    var controller = self.props.controller
    if (thing) {
      controller.scrollTo("#"+thing);
    } else {
      controller.scrollTo(0);
    }
  },

  render: function() {
    var self = this;
    var loadStyle = {
      width: self.state.percent_loaded + "%"
    }
    var arrow_class = self.state.arrow_class;

    if (self.state.loaded == true) {

      var drawer = self.state.drawer.map(function(object, index) {
        var item_style = {
          backgroundImage: "url("+object.image+")",
        };
        return (
          <li className={"drawer_item big_"+index}>
            <div className="drawer_image" style={item_style}></div>
            <div className="drawer_content">
              <h3 className="marker">{object.title}</h3>
              <p>{object.description}</p>
            </div>
          </li>
        )
      });

      var drawer_overview = self.state.drawer_overview;

      var photogallery = self.state.photogallery.map(function(object, index) {
        var photoStyles = {
          backgroundImage: 'url('+object.image + ')',
        }
        return (
          <div key={index} className="photo" style={photoStyles} >
            <div className="description_container">
              <div className="description">
                <h4 className="name"><a href={object.link} target="_blank">{object.name}</a></h4>
                <p>{object.description}</p>
              </div>
            </div>
          </div>
        )
      });

      var acorngallery = self.state.acorngallery.map(function(object, index) {
        var photoStyles = {
          backgroundImage: 'url('+object.image + ')',
        }
        return (
          <div key={index} className="photo" style={photoStyles} >
            <div className="description_container">
              <div className="description">
                <h4 className="name">{object.name}</h4>
                <p>{object.description}</p>
              </div>
            </div>
          </div>
        )
      });

      if (self.state.right == 0 ){
        var photogalleryStyles = {
          width: Math.ceil(photogallery.length/2) * 450 +"px",
          right: "0px",

        };
      } else {
        var photogalleryStyles = {
          width: Math.ceil(photogallery.length/2) * 450 +"px",
          left: "-" + self.state.left + "px"
        };
      }

      var gallery_width = Math.ceil(self.state.acorngallery.length/2) * 450;

      var window_width = self.state.windowWidth;
      var acornLeft = self.state.acornLeft;
      if (window_width <= (gallery_width)){
        var acornClass="acorns medium";
        var acorngalleryStyles = {
          width: Math.ceil(acorngallery.length/2) * 450 +"px",
          marginLeft: "-" + self.state.acornLeft + "px"
        };
      } else {
        var acornClass="acorns wide";
        var acorngalleryStyles = {
          width: Math.ceil(acorngallery.length/2) * 450 +"px",
          marginLeft: "auto",
          marginRight: "auto",
          position: 'relative'
        };
      }

      var map_class = "map_wrapper";

      if (self.state.drawer.length) {
        map_class = map_class + " open";
      }
      var drawer_styles;

      if (self.state.area.length) {
        map_class = map_class + " " + self.state.area;

        if  ( self.state.area == 'natureCenter' ) {
          drawer_styles = {
            backgroundImage: 'url(/img/forest/nature-center.jpg)'
          }
        }
        if  ( self.state.area == 'northernFloodplains' ) {
          drawer_styles = {
            backgroundImage: 'url(/img/forest/northern-floodplain.jpg)'
          }
        }
        if  ( self.state.area == 'northernUplands' ) {
          drawer_styles = {
            backgroundImage: 'url(/img/forest/northern-upland.jpg)'
          }
        }
        if  ( self.state.area == 'southernUplands' ) {
          drawer_styles = {
            backgroundImage: 'url(/img/forest/southern-upland.jpg)'
          }
        }
        if  ( self.state.area == 'greatMarsh' ) {
          drawer_styles = {
            backgroundImage: 'url(/img/forest/great-marsh.jpg)'
          }
        }

      }

      if (self.state.hover.length) {
        map_class = map_class + " " + self.state.hover;
      }

      var videoOne = self.state.videoOne;
      var videoTwo = self.state.videoTwo;

      var videoOne_style = {
        backgroundImage: 'url(/img/forest/forest-tearjerker.jpg)'
      }
      var videoTwo_style = {
        backgroundImage: 'url(/img/forest/forest-kids-video.jpg)'
      }

      return (
        <div className="page forest_page">
          <div className="page_wrapper">
             <div className="page_container" id="page" style={loadStyle}>
              <div className="egg_wrap">
                <div className="quiet_wild_container main_wrapper">
                  <div className="quiet_wild">
                    <img src="/img/forest/bird2.png" />
                  </div>
                  <div className="quiet_wild copy_container">
                    <h2 className="marker">The Quiet Wild</h2>
                    <p>For over a century, thousands of families have experienced the quiet wild of Nebraska's Fontenelle Forest and Neale Woods–hiking, playing and exploring our 26 miles of maintained trails and 2,000 acres of upland and lowland forests, native prairies, wetlands, lakes and waterways. Each visit is its own unique adventure, its own story, its own memory to share.</p>
                    <img className="bottom_vine" src="/img/bottom_vine.svg" />
                  </div>
                </div>
              </div>

              <div className="tearjerker_video cf" style={videoOne_style}>
                <div className="tearjerker video_overlay"></div>
                <div className="tearjerker_wrapper">

                  { videoOne ?
                    <div className="centered_content wide">
                      <span className="video_close" onClick={self.toggleVideoOne}>×</span>
                      <div className='embed-container'><iframe src='https://www.youtube.com/embed/Qxh3eSZlUeM?autoplay=1' frameBorder='0' allowFullScreen></iframe></div>
                    </div>
                  :
                    <div className="centered_content">
                      <h2 className="marker">A Room All to Myself</h2>
                      <p>Push pause on the texting and clicking, just for a moment, and come out to the forest. Move your feet, breathe in the fresh air, explore. And watch what happens.</p>
                      <div className="play_button_wrapper">
                        <svg className="left_leaf" x="0px" y="0px" viewBox="0 0 260.993 56.185" enable-background="new 0 0 260.993 56.185">
                        	<g>
                        		<path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M260.803,21.789c0,0-78.218-9.995-105.16-7.822
                        			s-60.945,10.559-78.327,9.689c-17.382-0.869-22.814-0.76-31.287-9.234c0,0-5.377-7.985,0-13.362"/>
                        		<path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M53.94,23.206c0,0-15.081,8.055-31.798,5.843
                        			C9.377,27.36,5.802,21.1,3.118,16.14C19.968,21.712,36.564,5.83,53.94,23.206z"/>
                        		<path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M83.509,23.874
                        			c-30.635,0.978-39.172,2.019-50.516,13.362c0,0-7.199,10.689,0,17.888"/>
                        		<path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M52.548,23.222c0,0-12.167-3.259-26.942-1.086
                        			c-12.962,1.906-20.641-4.563-20.641-4.563"/>
                        	</g>
                        </svg>


                        <svg onClick={self.toggleVideoOne} className="video_play play_button forest" x="0px" y="0px" viewBox="0 0 76 76" >
                        	<g>
                            <circle className="circle" cx="38" cy="38" r="36.5"/>
                            <path className="triangle" d="M31.3,38.2c0,0-2.8,4.4-2.8,12.4c0,7.5-1.6,10-1.6,10.7c0,1.2,0.8,2,2,1.4S53.2,45,58.6,39.6
                        			c0,0,0.6-0.6,0.6-1.4V38c0-0.6-0.2-1.1-0.6-1.4c-4.7-4.7-28.7-22.4-29.7-23.1c-0.8-0.6-2-0.4-2,1.4c0,0.7,1.6,3.2,1.6,10.7
                        			C28.6,33.6,31.3,38.2,31.3,38.2z"/>
                        	</g>
                        </svg>

                        <svg className="right_leaf" x="0px" y="0px" viewBox="0 0 260.993 56.185" enable-background="new 0 0 260.993 56.185" >
                          <g>
                            <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M0.19,21.789c0,0,78.218-9.995,105.16-7.822
                              s60.945,10.559,78.327,9.689c17.382-0.869,22.814-0.76,31.287-9.234c0,0,5.377-7.985,0-13.362"/>
                            <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M207.053,23.206c0,0,15.081,8.055,31.798,5.843
                              c12.766-1.689,16.34-7.949,19.024-12.909C241.025,21.712,224.429,5.83,207.053,23.206z"/>
                            <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M177.484,23.874
                              c30.635,0.978,39.172,2.019,50.516,13.362c0,0,7.199,10.689,0,17.888"/>
                            <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M208.445,23.222c0,0,12.167-3.259,26.942-1.086
                              c12.962,1.906,20.641-4.563,20.641-4.563"/>
                          </g>
                        </svg>
                      </div>

                    </div>
                  }

                </div>
              </div>

              <div id="fauna" className="photogallery_header">
                <div className="main_wrapper centered_content">
                  <h3 className="marker">Fauna and Flora</h3>
                  <p>A National Natural Landmark and a National Historic District, as designated by the United State Department of Interior, Fontenelle is home to over 600 unique species of plants and animals. </p>
                </div>
              </div>

              <div className="photogallery_wrapper">
                { (self.state.left == 0 ) ? null :
                  <svg onClick={self.galleryLeft} className="arrow_circle orange shadow left_arrow left gallery_button" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    <g className="arrow" >
                      <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                        c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                        C23.6,24.3,22.6,25.9,22.6,25.9z" />
                      <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
                    </g>
                  </svg>
                }
                { (self.state.right == 0 ) ? null :
                  <svg onClick={self.galleryRight} className="arrow_circle orange shadow right_arrow right gallery_button" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    <g className="arrow" >
                      <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                      c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                      C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                      <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    </g>
                  </svg>
                }
                <div className="photogallery" style={photogalleryStyles} >
                  {photogallery}
                </div>
              </div>

              <div className="egg_wrap padded" id="trails">
                <div className={ map_class } id="map_wrap">
                  { drawer.length ?
                    <div className="drawer" style={drawer_styles}>
                      <div className="orange_overlay"></div>

                      <svg onClick={self.reset} className="arrow_circle orange shadow shadow left_arrow left reset_button" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                        <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                        <g className="arrow" >
                          <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                            c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                            C23.6,24.3,22.6,25.9,22.6,25.9z" />
                          <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
                        </g>
                      </svg>

                      <div className="drawer_overview">
                        <h3 className="marker">{drawer_overview.title}</h3>
                        <p>{drawer_overview.description}</p>
                      </div>
                      <ul>
                        {drawer}
                      </ul>
                    </div>
                  :
                    <div className="map_content">
                      <div className="copy_container">
                        <h2 className="marker color">Trails</h2>
                        <p>Walking our trails is an experience unlike any other in the Omaha metro area. In a single afternoon, you’ll encounter a range of vastly different ecosystems, from deciduous forest to oak savanna, prairie, and wetlands.</p>
                        <img className="bottom_vine" src="/img/bottom_vine.svg" />
                      </div>
                      <div className="trail_map_container">
                        <svg className="trailmap" x="0px" y="0px" viewBox="30.5 169.7 513.3 437.4" enable-background="new 30.5 169.7 513.3 437.4">
                        	<g id="map-elements">
                        		<g id="Misouri_River_Bottom">
                        			<g opacity="0.2">
                        				<g>
                        					<path fill="#075FAE" d="M426.6,532.2C426.6,532.2,426.6,532.1,426.6,532.2C426.6,532.1,426.6,532.2,426.6,532.2L426.6,532.2z"/>
                        					<path fill="#075FAE" d="M478,447.7L478,447.7L478,447.7z"/>
                        					<path fill="#075FAE" d="M542.3,438.2c-0.5-0.2-1.1-0.4-1.5-0.5c-0.6-0.7-1.1-1.1-1.5-1.5c-0.5-0.4-0.9-1-1.4-1.2
                        						c-2.3-1-2.3-0.9-4,1c-0.3,0.3-0.5,0.4-0.8,0.2c-0.1,0.1-0.4,0.3-0.5,0.2c-0.7-0.5-1.4-0.2-2.1-0.2c-0.9,0.5-1.7,0.9-2.5,1.4
                        						c-0.2-0.3-0.4-0.5-0.6-0.7c-1,0.5-1.4,0.5-2.3,1.3c-0.9,0.8-1.7,1.9-2.5,2.9c-0.4,0.5-0.5,1.5,0.1,1.3c-1.2,0.3-2.3,0.7-3.5,1.3
                        						c-2.3,1.2-4.3,3-6.2,4.8c-2.8,2.6-5.5,5.2-7.9,8.1c-0.7,0.8-1.3,1.6-2.1,2.3c-0.7,0.5-1.4,1-2.1,1.5c-1.9,1.4-3.3,3.4-4.7,5.2
                        						c-6.1,8.1-11.6,16.8-18.1,24.6c-1,1.1-2.6,2-1.9,4c-1.9,2.2-3.9,4.4-5.8,6.5h-0.9c-0.3,0.6-0.7,1.1-1,1.7
                        						c-1.4,2.7-3.6,5.7-4.3,8.7c-0.1,0.3-0.1,0.7-0.3,0.9c-0.1,0.3-0.3,0.7-0.5,0.9c-1.3,1.9-2.5,3.8-3.8,5.6
                        						c-0.9,1.2-1.7,2.4-2.6,3.6c-0.1,0.1-0.1,0.3-0.1,0.4c0.3-0.3,0.7-0.5,1.1-0.8c-0.1,0.3-0.1,0.5-0.2,0.8c-1.1,2.4-1.8,5-2.6,7.5
                        						c-0.1,0.3-0.1,0.5-0.2,0.8c-0.5,2.1-1.9,3.6-3,5.5c-0.3,0.7-0.6,1.4-0.9,2.2c-0.3,1.1-0.2,2.5-0.7,3.5c-0.3,0.5-0.3,1.1-0.5,1.5
                        						c-0.5,0.7-0.3,1.5-0.7,2.2c-4,7-5.7,14.6-8.8,21.9c-0.6,1.5-1.7,2.8-1.9,4.4c-0.1,0.6-0.1,1.3-0.3,1.9c-0.1-0.1-0.2-0.3-0.3-0.4
                        						c-0.5,0.9-0.7,2-0.5,3c0.1,0.4,0.2,0.8,0.1,1.2c-0.3,1.7-1.2,3.3-2,4.8c-0.3-0.5-0.7-0.7-0.8-1.1c-0.7-1.2-1.4-2.3-2.6-3.2
                        						c-0.3-0.2-0.5-0.5-0.6-0.7c0,0,0-0.1-0.1-0.1l0,0l-5.2-11.5c-0.3-4.5-1.2-8-1.2-12.5c0.1-3.3,0.4-6.6,1.1-9.9c0.7-3,3-6.3,3-9.3
                        						c0-0.1,0.1-0.2,0.2-0.3c0.2-0.5,0.3-0.9,0.5-1.4c-0.3-0.1-0.4-0.1-0.7-0.2c1.1-1.3,1.1-3.4,3-4c0.1-0.1,0.1-0.2,0.3-0.3
                        						c1.3-1.4,2.6-2.8,3.8-4.2c1.2-1.5,1.5-3.1,2.1-4.9c1.3-4.4,2.7-8.7,4-13.2c1.1-3.8,2.3-7.4,3.4-11.2c0.6-2.1,1.3-4.1,2.1-6
                        						c1.5-3.2,3.7-6,5.8-8.7c2-2.5,4-5.1,6-7.7c1.3-1.7,2.6-3.3,4-4.8c1.5-1.5,3.1-3,4.7-4.4c2.6-3.3,6.8-6,9.9-8.8
                        						c3-2.6,6-5.2,9.1-7.9c1.3-1.1,2.7-2.2,4-3.4c0.6-0.5,1.1-1.3,1.5-2c0.5-0.9,0.7-1.8,1.1-2.8c-0.3-0.4-0.5-0.7-0.9-1.2
                        						c-0.5,0.4-0.8,0.9-1.3,1.1c-1,0.7-2.1,1.2-3.2,1.8c-0.3,0.1-0.5,0.3-0.7,0.5c-0.5,0.5-1.1,1-1.7,1.5c-2.3,2-5,3.5-7.4,5.3
                        						c-2.8,2.1-5.2,4.7-7.6,7.2c-11.1,11.5-21.7,23-30,36.8c-1.7,2.8-2.8,5.8-3.6,8.9c-0.1,0.4-0.1,0.9-0.1,1.3
                        						c0.4,0.3,0.7,0.5,1,0.6c-1.1,4.4-2.5,8.9-4.2,13.2c-0.8,2.2-1.7,4.4-2.6,6.6c-0.7,1.6-3,4.6-1.3,5.7c-0.1,1.1-1.6,3-2.6,3.4
                        						c0-0.3-0.1-0.5-0.3-0.7c-0.3,0.7-0.7,1.5-0.9,2.3c0.3-0.3,0.7-0.7,1.1-0.9c0,1.5-0.7,6.8-2.9,7c0.5,1.1-0.2,2.2-0.7,3.2
                        						c-2.1,3.7-3.1,7.9-2.9,12.1c0,0.3,0,0.5,0.1,0.8c0.1,0.2,0.3,0.4,0.4,0.6c0.7,0.9,0.9,2.3,0.4,3.4c0-0.8-0.3-1.5-0.9-2.1
                        						c0.4,0.3,0.2,2.3,0.3,2.8c0.3,1.5,1,2.9,1.5,4.3c0.5,1.3,1.4,7.3,6.3,14.7c0,0,0,0,0.1,0c0.1,0.2,0.2,0.5,0.3,0.7
                        						c0.5,0.9,2.7,3.4,2.7,4.4c0.5,0.7,0.9,1.3,1.3,2c0.1,0.3,0.3,0.7,0.1,1.1c-0.7,2.2-2.2,4.9-1.7,7.2c0.1,0.5,0.3,1.1,0.4,1.7
                        						c0.5,2.1-2.6,9.9-0.5,11.3c3.7,2.3,10.7-3.5,15.1-4.2c1.2-0.2,5.3,1.4,6.4,0.9c3.6-2,4.4-4.7,4.8-8.8c0.5-4.6,1-9.1,1.7-13.7
                        						c0.3-2.1,0.5-4.8,1.2-6.8c0.5-1.3,2.2-2.2,2.1-3.8c-0.3-3.3,1.4-6.2,2.6-9.1c0.1-0.3,0.2-0.5,0.2-0.7c0-0.2-0.1-0.4-0.1-0.6
                        						c-0.1-0.2,0.9-4.4,0.7-4.3c0.5-0.4,0.9-0.8,1.3-1.2c0.1-0.3,0.1-0.8,0.3-1c0.7-0.8,1.1-1.8,1.5-2.8c2.9-6,5-12.4,7.8-18.5
                        						c1.7-3.6,3.4-7.2,5.2-10.8c1.5-2.8,2.9-7,5.1-9.4c1.1-1.2,1.9-2.7,2.7-4.2c0.5-0.9,0.7-1.9,1.1-3.4c0.3-0.5,1-1.3,1.4-2.2
                        						c1.4-3.8,5.4-7.7,8.5-10.2c3.7-2.9,6.7-6,9.8-9.5c2.3-2.6,4.6-5.3,7.5-7.3c2.9-2.1,5.8-3.4,8-6.4c0.6-0.8,1.3-1.1,2.1-1.5
                        						c1.5-0.6,3-1,4.1-2.3c0.5-0.5,1.1-0.9,1.6-1.5c0.3-0.4,0.5-0.9,0.7-1.5s0.1-1.1,0.1-1.7c0.1-0.2,0.3-0.3,0.4-0.5
                        						c0.1-0.3,0-0.6,0-0.7c0.6-0.1,1.2-0.1,1.5-0.3c0.5-0.4,0.9-1,1.4-1.5c0.3-0.2,0.5-0.3,0.8-0.5v-0.7c0.7-0.7,1.2-1.2,1.7-1.7
                        						c0-1.3-0.1-2.5,0-3.7s0.2-2.5,0.3-3.6c0.4,0,0.7-0.1,0.7-0.1C544.5,443.5,543.9,440.9,542.3,438.2z M429.1,530.9
                        						c0,0.1,0.1,0.2,0.1,0.2c-0.1,0.1-0.2,0.1-0.3,0.2c0-0.1-0.1-0.1-0.1-0.2C428.9,531,429,530.9,429.1,530.9z M422.8,547.8
                        						c-0.1-0.1-0.1-0.1-0.2-0.1c0.1-0.1,0.1-0.1,0.1-0.1C422.8,547.6,422.8,547.7,422.8,547.8C422.8,547.8,422.8,547.8,422.8,547.8z
                        						 M437.9,575.5c-0.1-0.1-0.1-0.1-0.2-0.1c0.1-0.1,0.1-0.1,0.2-0.1c0,0,0.1,0.1,0.1,0.1C438,575.4,438,575.5,437.9,575.5z
                        						 M462.2,570.8c0.2-0.5,0.3-0.9,0.5-1.2c0.1,0.1,0.3,0.1,0.3,0.2C463,570.2,463.2,570.7,462.2,570.8z M467.1,554.1
                        						c-0.1-0.1-0.1-0.1-0.2-0.1c0.1-0.1,0.2-0.2,0.3-0.3C467.2,553.8,467.2,554,467.1,554.1z M498.9,463.5c0.1,0.2,0.1,0.5,0.1,0.7
                        						C498.6,464,498.6,463.8,498.9,463.5z M522.7,442c0.1-0.1,0.1-0.3,0.2-0.5c0.1,0.1,0.1,0.1,0.1,0.1
                        						C522.9,441.8,522.8,441.9,522.7,442z M532.1,463.9c0.3,0.1,0.7,0.1,0.9,0.1C532.7,464.7,532.4,464.6,532.1,463.9z M533.1,464.1
                        						c0-0.2,0-0.4,0.1-0.7C533.5,463.7,533.5,463.7,533.1,464.1z M539,456.5L539,456.5c0.1,0.1,0.2,0.1,0.3,0.3
                        						C539.2,456.6,539,456.6,539,456.5z M539,436.5c-0.1-0.1-0.1-0.1-0.1-0.2c0.1-0.1,0.3-0.1,0.4-0.2
                        						C539.2,436.2,539,436.4,539,436.5z"/>
                        					<polygon fill="#075FAE" points="437.4,508.6 437.5,508.8 437.4,508.8 				"/>
                        					<path fill="#075FAE" d="M437.4,509.4L437.4,509.4C437.4,509.4,437.3,509.4,437.4,509.4C437.3,509.4,437.4,509.4,437.4,509.4z"/>
                        					<path fill="#075FAE" d="M437,511C437,511,437,511.1,437,511l-0.1,0.1C436.8,511,436.9,511,437,511z"/>
                        					<polygon fill="#075FAE" points="431.9,522.3 431.8,522.4 431.7,522.3 				"/>
                        					<path fill="#075FAE" d="M430.7,526.2L430.7,526.2v0.1C430.7,526.3,430.7,526.2,430.7,526.2z"/>
                        					<path fill="#075FAE" d="M429.2,529.8L429.2,529.8L429.2,529.8C429.1,529.7,429.2,529.7,429.2,529.8z"/>
                        					<path fill="#075FAE" d="M421.7,552.9L421.7,552.9L421.7,552.9L421.7,552.9L421.7,552.9z"/>
                        					<path fill="#075FAE" d="M422.7,549L422.7,549L422.7,549L422.7,549L422.7,549z"/>
                        					<path fill="#075FAE" d="M423.4,545c0-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.1-0.1,0.2-0.1c0,0.1,0.1,0.1,0.1,0.1
                        						C423.5,544.9,423.4,544.9,423.4,545z"/>
                        				</g>
                        			</g>
                        		</g>
                        		<g id="Missouri_River_-_Top">
                        			<g opacity="0.2">
                        				<g>
                        					<path fill="#075FAE" d="M373.8,179.6c0-0.2,0.1-0.3,0.1-0.5c-0.3-0.1-0.5-0.1-0.7-0.1c-0.1,0.1-0.3,0.3-0.3,0.4
                        						c-0.1,0.1-0.3,0.3-0.4,0.3c-0.4,0-0.7-0.1-1.1-0.1c0.1,0.3,0.2,0.5,0.3,0.7c-1,0.4-1,0.4-2.2-0.1c-0.2,0.4-0.3,0.8-0.5,1.3
                        						c0.2,0.1,0.4,0.1,0.6,0.3c-0.1,0.1-0.1,0.2-0.1,0.3c-0.9,0.1-1.9,0.1-3,0.2c-0.5,0.3-1.1,0.6-1.9,1c-0.4-0.2-0.9-0.5-1.4-0.7
                        						c0.1,0.5,0.2,0.9,0.3,1.3c-0.9,0.1-0.9,0.1-1.5-0.5c-0.3,0.1-0.6,0.2-1,0.3V183c-0.3,0.2-0.5,0.3-0.7,0.5
                        						c-0.7-0.2-1.2-0.3-1.6-0.5c-1.1,0.5-1.9,1-2.6,1.3c-1.5,0.4-3.2,0.1-4.2,1.4c-0.1,0.1-0.1,0.1-0.2,0.1l0,0
                        						c-0.4-0.2-0.8-0.4-1.3-0.6c-0.3,0.7-0.5,1.3-0.8,1.9c-0.6-0.5-0.9,0.3-1.3,0.5c-0.1-0.1-0.2-0.3-0.4-0.7
                        						c-0.2,1.3-1.1,1.3-1.9,1.7c-0.3,0.1-0.5,0.2-0.8,0.3c-1.9,0.7-3.8,1.4-5.8,2.1c-0.3,0.1-0.6,0.3-0.9,0c-1,0.1-1.5,1-2.3,1.5
                        						c-2.3,1.6-4.6,3.5-7.4,4.4c-1.2,0.4-2.3,0.9-3.6,1.2c-2.6,0.5-5,1.4-7.4,2.3c-1.4,0.5-2.8,1.1-4.2,1.7c-2.2,0.9-4.4,1.7-6.7,2.5
                        						c-1.5,0.5-3,1-4.4,1.5c-1,0.3-2,0.7-3.1,1.1c0,0.1,0,0.1,0,0.2c0.3,0.1,0.7,0.3,1.1,0.5c0.6-0.9,1.3-1.5,2.3-0.9
                        						c0.1-0.1,0.1-0.2,0.1-0.3c0.1-0.1,0.3-0.2,0.5-0.3c0.3,0.1,0.6,0.3,1.1,0.5c-0.3,0.1-0.5,0.2-0.6,0.3c0.1,0.7-0.6,0.9-0.5,1.5
                        						c-0.3,0-0.7,0.1-0.9,0.1c-0.1,0.5-0.3,1-0.3,1.5c-0.4-0.1-0.4-0.5-0.4-0.8c-0.4,0.1-0.7,0.2-0.5,0.7l0,0
                        						c0.1,0.5,0.1,0.5-0.5,0.6c0,0.2,0.1,0.3,0.1,0.5c0.1,0,0.2,0.1,0.3,0.1c-0.2,0.3-0.3,0.4-0.6,0.1c-0.5,0.1-1.1-0.3-1.7,0.1
                        						c0.6,0.5,1.6,0.7,1.5,1.8c-1.7,0.5-3.1-0.8-4.5-0.9c-0.3,0.1-0.4,0.2-0.5,0.3c-0.1-0.3-0.1-0.5-0.2-0.8
                        						c-0.3,0.1-0.5,0.3-0.8,0.4c-0.1-0.3-0.3-0.5-0.5-0.7c-1.1,0.1-2.3,0-3.2-0.8c-0.4,0-0.7,0.1-1,0.1c-0.5,0-0.9-0.1-1.3,0
                        						c-1.5,0.4-2.9,0.8-4.3,1.3c-2.2,0.7-4.4,1.5-6.8,2c-1.5,0.3-3.1,0.7-4.7,0.9c-2,0.4-4.1,0.9-6.1,1.3c-1.9,0.5-3.8,0.9-5.7,1.4
                        						c-0.6,0.2-1.2,0.3-1.9,0.3c-2.3,0-4.7,0.1-7-0.2c-1.2-0.2-2.5-0.3-3.7-0.4c-1.6-0.1-3.2-0.3-4.8-0.3c-1.9,0-3.8,0.1-5.8,0.1
                        						c-1.3,0-2.8,0-4.1,0.1c-2.2,0.1-4.4,0.3-6.7,0.4c-1.3,0.1-2.5,0-3.8,0c0.1,0.3,0.2,0.5,0.3,0.7c0.5,0.3,0.9,0.2,1.4-0.1
                        						l-0.9-0.3v-0.1c0.4,0,0.8,0.1,1.3,0.1c0.1,0.9,0.1,1.8,0.2,2.5c-0.3,0.3-0.5,0.6-0.9,0.9c-0.1-0.2-0.3-0.4-0.4-0.5
                        						c-0.1,0.1-0.3,0.3-0.4,0.3c-0.3-0.1-0.6-0.3-0.9-0.4c0.1,0.5,0.3,0.9-0.4,1.1c-0.1-0.3-0.3-0.7-0.4-0.9
                        						c-0.1,0.1-0.3,0.1-0.5,0.1c-0.3-0.1-0.5-0.3-0.8-0.5c0,0.3,0.1,0.5,0.1,0.7c-0.3,0.1-0.7,0.2-1.1,0.3v-0.7
                        						c-0.3,0.1-0.5,0.1-0.7,0.2c-0.3-0.2-0.7-0.4-0.9-0.6c0-0.2-0.1-0.4-0.1-0.7c-0.9,0.1-1.7,0.2-2.8,0.3c-0.2-0.1-0.5-0.3-0.8-0.5
                        						c-0.2,0.1-0.5,0.2-0.7,0.3c-0.1-0.2-0.2-0.4-0.3-0.6c-0.3,0.1-0.6,0.1-1,0.3c0.2,0.2,0.3,0.3,0.5,0.5c-0.5,0.1-0.9-0.1-1.3-0.1
                        						c-0.5-0.1-1-0.1-1.5-0.1v0.3c-0.5,0-1-0.1-1.5-0.1c-0.1-0.1-0.1-0.2-0.1-0.3c-0.2,0.1-0.4,0.1-0.6,0.3c-0.2-0.3-0.4-0.5-0.7-0.8
                        						c0.4-0.1,0.7-0.3,1.1-0.2c0.5,0.1,0.7-0.1,0.8-0.5c-4,0.4-7.6,1.1-8.5,1.7h0.5c-0.3,0.7-0.9,0.3-1.5,0.3
                        						c0.1-0.1,0.1-0.3,0.1-0.4c-0.2,0-0.5,0-0.7,0.1c-1.1,0.5-2.4,0.4-3.6,0.4c-1.6,0-3.2,0-4.8,0c-0.4,0-0.7-0.1-1.1-0.1
                        						c-1.8-0.2-3.6-0.5-5.4-0.5c-1.9-0.1-4,0.1-5.9,0.1c-0.3,0-0.7,0.1-0.9,0.5c0.1,0.1,0.2,0.1,0.4,0.1c-0.1,0.3-0.1,0.5-0.2,0.7
                        						c-0.3,0.1-0.7,0.3-0.9,0.4c-0.2-0.4,0.5-0.7,0.1-1c0.1-0.1,0.3-0.1,0.5-0.2c-0.1-0.1-0.1-0.3-0.1-0.4c-0.5,0.1-1,0.1-1.5,0.1
                        						c-2.4,0-4.8,0-7.2,0c-1.8,0-3.6-0.2-5.3-0.5c-1.1-0.2-2.3-0.3-3.5-0.4c-2.3-0.1-4.6-0.1-6.9-0.2c-2.8-0.1-5.7-0.1-8.5-0.3
                        						c-1.4-0.1-2.8-0.1-4.2-0.3c-2.3-0.3-4.6-0.8-6.8-1.2c-0.7-0.1-1.3-0.2-2-0.3c0.1,0.9,0.7,0.3,1,0.5c0.1,0.9,0.1,0.9,0.8,0.8
                        						c0.2-0.1,0.3-0.1,0.5-0.3l0,0c0-0.1-0.1-0.2-0.1-0.3c0.2,0.1,0.3,0.1,0.5,0.1l0,0c0.5,0.1,1,0.3,1.3,0.7
                        						c0.1-0.1,0.1-0.3,0.1-0.4c0.1,0,0.1,0,0.1,0.1c0,0.1-0.1,0.2-0.1,0.3c0.1,0,0.2,0.1,0.3,0.1c-0.1,0.1-0.3,0.1-0.3,0.1
                        						c0.1,0.3,0.1,0.5,0.1,0.7c-0.5,0.1-0.9,0.7-1.5,0.2c-0.1,0.1-0.1,0.2-0.1,0.3c-0.7-0.1-1.3-0.3-1.9-0.5
                        						c-0.3-0.1-0.7-0.1-0.7,0.4c-0.6-0.3-0.9-1-1.7-0.9c-1,0.1-1.9-0.3-2.9-0.7c0-0.3-0.1-0.5-0.1-0.7c0.2-0.1,0.3-0.1,0.5-0.2
                        						c-0.1-0.2-0.3-0.3-0.4-0.5l0.1-0.1c0.3,0.1,0.7,0.3,1.1,0.5c-0.1-0.3-0.1-0.5-0.1-0.7c-0.4-0.1-0.8-0.2-1-0.3
                        						c-0.5,0.3-0.9,0.6-1.3,0.9c-0.3-0.4-0.5-0.7-0.7-1.1c-1.6-0.5-3.3-0.9-4.8-1.5c-1.4-0.5-2.8-1.1-4.2-1.6
                        						c-0.9-0.3-1.7-0.6-2.6-0.9l0,0c-0.1,0-0.1,0-0.3,0l0,0c-0.2-0.1-0.5-0.1-0.7-0.2c-0.1,0.1-0.2,0.2-0.3,0.4
                        						c0.3,0.3,0.3,0.9,1,0.9c0-0.2,0-0.4-0.1-0.7c0.3,0.3,0.5,0.5,0.8,0.7c0.1-0.2,0.1-0.3,0.1-0.5c0.5,0.3,0.9,0.6,1.2,0.8
                        						c1.6,0.3,3,0.6,4.2,1.7c0.1-0.1,0.2-0.2,0.3-0.3c0.1,0.2,0.2,0.3,0.4,0.5c-0.4,0.4-0.8,0.7-1.2,1.1c-0.5-0.3-0.9-0.5-1.2-0.6
                        						c-0.3,0-0.7,0.1-0.9,0s-0.3-0.4-0.7-0.7c0.1,0.5,0.1,0.9,0.1,1.2c-0.7,0.3-1.4-0.4-2.1-0.2c0.1-0.2,0.1-0.4,0.1-0.3
                        						c-0.1-0.4-0.1-0.6-0.1-0.7c-0.1,0.1-0.3,0.3-0.5,0.4c-0.1,0.1-0.1,0.1-0.2,0.1c-0.1-0.2-0.3-0.3-0.4-0.5c-0.2,0-0.4,0.1-0.6,0.1
                        						c-0.4-0.5-1-0.7-1.6-0.7c-0.2,0-0.4-0.2-0.5-0.3v-1.1h-1.1c0.2-0.3,0.4-0.5,0.6-0.8c-0.1-0.1-0.1-0.1-0.2-0.2
                        						c-0.2,0-0.3-0.1-0.5-0.1c-0.1,0.3-0.1,0.5-0.3,0.7c-0.1-0.1-0.2-0.1-0.2-0.1c-0.1-0.3-0.3-0.5-0.3-0.7c-0.4,0.2-0.9,0.3-1.1,0.5
                        						c-0.6,0.5-1.2,0.5-1.9,0.1c-0.9-0.5-1.9-1-2.8-1.5c-0.1-0.1-0.3-0.1-0.5-0.1c-0.3-0.1-0.7-0.1-1.1-0.2c0-1.1-1.3-1-1.4-1.7
                        						c-0.4,0-0.7-0.1-1-0.1c0-0.1,0-0.3,0-0.5c-0.7,0.3-0.9-0.5-1.5-0.5c0.4,0.5,0.7,0.9,1.1,1.3c-0.5-0.3-1.1-0.5-1.7-0.7v-0.9
                        						c-0.3-0.2-0.7-0.4-1-0.6c-0.2,0.1-0.4,0.3-0.7,0.4l0,0c-0.1,0-0.2,0-0.2-0.1c-0.3-0.7-0.7-1.1-1.3-1.5c-0.2-0.1-0.3-0.4-0.5-0.7
                        						c0.1-0.1,0.3-0.2,0.4-0.3c0.1,0.2,0.3,0.4,0.5,0.7c0.3-0.2,0.4-0.3,0.5-0.5c0.4,0.5,0.9,0.5,1.5,0.3c-0.1-0.1-0.1-0.2-0.2-0.3
                        						c-1.3-0.5-2.5-1.1-3.8-1.6c-0.3-0.1-0.5,0-0.9,0l0,0c-0.4-0.3-0.7-0.6-1.1-0.9c-0.8-0.5-1.7-0.9-2.6-1.5c-1-0.7-2-1.5-3.4-1.5
                        						c0.1-0.2,0.1-0.5-0.2-0.5s-0.7-0.1-1-0.2c-0.1-0.1-0.2-0.2-0.3-0.3c-0.2,0.2-0.4,0.3-0.5,0.5c-0.3-0.1-0.5-0.1-0.7-0.2l0,0
                        						c-0.4-0.3-0.9-0.6-1.3-0.9c0.1-0.1,0.1-0.3,0.2-0.5c-0.7-0.1-1.4-0.1-1.9-0.6c-0.1-0.1-0.3-0.1-0.5-0.1
                        						c-0.1-0.2-0.1-0.5-0.2-0.7c-0.3-0.3-0.7-0.5-1.1-0.8c-0.4,0.1-0.8-0.1-0.8-0.7c0.2-0.2,0.4-0.3,0.5-0.5
                        						c-0.1-0.1-0.1-0.1-0.1-0.2c-0.3,0.1-0.6,0.2-0.9,0.3c-0.3,0.1-0.5,0.4-0.8,0.7c0-0.4-0.1-0.7-0.1-1c-0.4,0-0.7-0.1-0.9-0.5
                        						c0.3-0.1,0.6-0.1,0.6-0.6c0-0.1,0.1-0.3,0.2-0.5c0.2-0.3,0.4-0.5,0.7-0.9c-0.3-0.2-0.7-0.3-1-0.5c-0.1-0.2-0.2-0.5-0.3-0.7
                        						c-0.6-0.7-1.2-1.3-1.9-1.9c-0.2-0.2-0.5-0.3-0.7-0.4c-0.1-0.8-0.5-1.4-1.1-2c-1.5-1.9-3-3.8-4.4-5.7c-0.5-0.7-1.2-1.2-1.8-1.9
                        						l0,0c-0.5-0.5-0.9-1.1-1.3-1.6l0,0c-0.1,0.1-0.2,0.1-0.3,0.1c0.1-0.1,0.1-0.2,0.1-0.3l0,0c-0.7-1.2-1.5-2.2-3-2.7
                        						c-0.1-0.2-0.1-0.4-0.2-0.6c-1.1-0.1-1.7-0.9-1.9-1.9c-1.5-0.9-3-1.7-4.2-2.1c-2.6-0.9-3.7-1.1-5.8-0.5c-2.1,0.5-4,1.8-5.4,3.2
                        						c-0.1,0.1-0.3,0.3-0.3,0.3c0,0.1-0.1,0.1-0.1,0.2c-0.3,0.5-0.5,0.9-0.8,1.4c-0.1,0.2-0.3,0.7-0.3,0.9c-0.1,0.5-0.3,1.1-0.4,1.7
                        						c0,0.1,0,0.3,0,0.4c0,0.7,0,1.3,0,1.9c0,0.2,0,0.3,0,0.3c0,0.1,0.1,0.2,0.1,0.4c0.1,0.7,0.3,1.3,0.5,2c0.2,0.6,0.4,1.2,0.7,1.9
                        						c0.1,0.1,0.3,0.1,0.4,0.1c0.1,0.7,0.7,0.8,0.9,1.3c0.4,0.9,0.9,1.9,1.3,2.8c0.5,0.3,0.9,0.5,1.4,0.7c-0.1,0.2-0.1,0.4-0.1,0.5
                        						c0.3,0.1,0.5,0.2,0.7,0.4c1.3,1.5,2.8,2.8,3.9,4.4c0.4,0.6,1.2,1,1.7,1.6c0.8,0.9,2,1.5,2.7,2.5c0.1,0.2,0.3,0.3,0.5,0.4
                        						c0.4,0.3,0.8,0.5,1.2,0.8c1.9,1.3,3.8,2.6,5.7,3.9c1.3,0.9,2.8,1.9,4,3c0.8,0.7,1.3,1.7,2.2,2.5c0.4,0.3,0.7,0.9,1.1,1.3
                        						c0.5,0.5,1,1.1,1.5,1.5c1.1,0.7,2.3,1.2,3.4,1.9c0.3,0.2,0.6,0.5,1,0.8c0.1,0,0.2-0.1,0.5-0.2c0.5,0.6,1.2,0.8,2,0.7
                        						s1.6-0.3,2.3-0.2c0.4,0.1,1.1-0.1,1.3,0.5c0.4,0.3,0.8,0.7,1.1,0.9c0.3-0.1,0.5-0.2,0.8-0.3c-0.1,0.3-0.1,0.5-0.3,0.9
                        						c0.3-0.3,0.5-0.5,0.7-0.6c0.3,0.3,0.5,0.7,0.3,1.1c-0.2-0.1-0.4-0.2-0.7-0.3c-0.1,0.1-0.2,0.3-0.4,0.5c0.5,0.1,1.1,0.1,1.1,0.8
                        						c-0.1,0-0.3,0-0.5,0c0.3,0.4,0.5,0.9,0.8,1.3c0.1,0,0.2,0,0.3,0c0.1,0.6,0.5,0.9,1,1.1c1.7,1.2,3.5,2.3,5.2,3.4
                        						c1.4,0.8,2.7,1.9,4.4,1.9c0.1,0,0.3,0.1,0.4,0.1c2.2,0.9,4.4,1.8,6.6,2.9c2.1,1,4.2,1.1,6.4,0.7c0.6-0.1,1.3-0.2,1.9,0
                        						c1,0.3,2,0.9,3,1.4c0.9,0.5,1.9,1.1,2.9,1.6c1.3,0.7,2.8,1.3,4.1,1.9c0.2,0.1,0.4,0.2,0.7,0.2c0.3,0.1,0.5-0.1,0.5-0.6
                        						c-0.5,0.1-1.1,0.3-1.4-0.3l0,0c-0.1-0.1-0.3-0.3-0.4-0.4c0.1,0,0.3-0.1,0.4-0.1l0,0c0.5-0.3,0.9-0.5,1.4-0.8
                        						c-0.1,0.2-0.1,0.4-0.1,0.6c0.5,0.1,0.9,0.3,1.3,0.5c0.2-0.2,0.4-0.5,0.6-0.7c0.2,0.1,0.5,0.2,0.7,0.3c0.3,0.3,0.7,0.5,1.2,0.4
                        						c0.1,0,0.3,0.1,0.4,0.2l0,0c0.3-0.1,0.5-0.1,0.5,0.2c-0.1,0-0.3,0-0.5,0l0,0c-0.1,0-0.1,0-0.3,0l0,0c-0.1,0.1-0.3,0.1-0.4,0.1
                        						c0.7,0.7,1.5,0.6,2.2,0.3c0.1,0.3,0.1,0.5,0.2,0.7c1.9,0.6,3.8,1,5.6,1.7c1.8,0.7,3.6,1.1,5.6,1.6l0,0c0.4,0.1,0.7,0.2,1.1,0.4
                        						c0.1-0.1,0.1-0.3,0.3-0.4c1.6,0.2,3.3,0.4,4.9,0.7c1.1,0.2,2.3,0.1,3.4,0c1.3-0.1,2.4-0.5,3.4-1.3c0.3-0.2,0.8-0.3,1.1-0.3
                        						c1.2,0,2.4,0.1,3.6,0.1c1.1,0.1,2.3,0.1,3.5,0.1c1.4,0,2.8,0.2,4.2,0.5c2.8,0.5,5.4,1.5,8.2,1.9c0.5,0.1,1.1,0.1,1.6,0.1
                        						c2.7-0.1,5.3,0.3,7.9,0.6c1.5,0.2,3.2,0.1,4.8,0.1c0.5,0,1.1-0.3,1.8-0.5c0.3-0.3,0.9-0.5,1.5-0.5c0.4,0,0.8-0.1,1.2-0.3
                        						c0.8-0.2,1.5-0.3,2.2,0.3c0.2,0.2,0.5,0.2,0.5,0.3c0.8-0.3,1.5-0.5,2.1-0.8c0.1-0.1,0.3-0.1,0.3-0.1c1.1-1.1,2.3-0.7,3.6-0.5
                        						c0.6,0.1,1.3,0.5,1.8,0.3c1.1-0.3,2.2,0.1,3.2-0.4c0.3-0.2,0.8-0.1,1.3-0.3c0.4-0.7,1.1-0.9,2-0.9c0.8,0,1.5,0,2.3,0.1
                        						c0.3-0.1,0.5-0.1,0.7-0.2c2.9-0.7,5.8-1.2,8.7-1.3c0.5,0,1-0.1,1.5-0.1c0.9-0.1,1.8-0.3,2.7-0.3c3,0.1,5.8-0.3,8.8-0.4
                        						c0.8,0,1.5-0.1,2.3-0.1c0.3,0,0.5,0,0.8,0c3-0.4,6-0.9,9.1-1.1c4.6-0.4,9.3-0.5,13.8,0.3c1.4-0.3,2.8,0.1,4.1,0.2
                        						c1.9,0.3,3.7,0.8,5.5,1.1c1.1,0.2,2.3,0.4,3.5,0.3c2-0.2,4-0.5,5.7-0.8c0.7-0.6,1.3-1,1.9-1.5c0.3-0.3,0.7-0.5,1.1-0.3
                        						c1.5,0.3,3,0.2,4.5,0c0.3-0.1,0.7-0.1,1,0c0.9,0.4,1.9,0,2.6-0.4c1.3-0.9,2.8-1.1,4.3-0.9c0.5,0.1,1.1,0,1.7,0
                        						c0.4-0.1,0.8-0.2,1.3-0.3c-0.2-0.2-0.3-0.3-0.5-0.5c0.6,0.2,0.8-0.6,1.3-0.2l0,0c0.3-0.2,0.8-0.3,1.1-0.5c0.5-0.5,1-0.9,1.7-0.9
                        						c0.3-0.1,0.6-0.4,0.8-0.5c2.3-0.3,4.5-0.5,6.6-1.1c2.2-0.5,4.5-1,6.7-1.5c2.2-0.6,4.3-1.4,6.4-2.3c0.1-0.6,0.2-1.1,0.3-1.5
                        						c0.9-0.3,1.9-0.7,2.8-1c0.4-0.1,0.9-0.3,1.2-0.2c0.5,0.2,0.9,0,1.3,0c1.7,0.1,2.7-0.9,3.7-1.9c0.9-0.9,1.6-1.9,2.8-2.5
                        						c0.1-0.1,0.2-0.1,0.3-0.2c0.7-1.1,1.9-1.7,3-2.3c2.6-1.6,5.2-3,7.9-4.6c1-0.6,2.1-1.1,2.9-2.1c-0.5,0.1-0.9,0.3-1.3,0.4
                        						c0.1-0.3,0.3-0.5,0.3-0.7c-0.3-0.5-0.5-0.8-0.8-1.2l0,0c0.2-0.3,0.5-0.5,0.6-0.7c0.3,0,0.5,0.1,0.7,0.1
                        						c-0.1-0.6,0.5-0.9,0.7-1.3c0.5-0.9,1.1-0.9,2-0.9c0.9,0,1.7-0.2,2.9-0.3c0.1,0.1,0.3,0.3,0.5,0.7c-0.1,0.2-0.1,0.4-0.2,0.5
                        						c0.4-0.1,0.8-0.2,1.1-0.5c0.9-0.7,1.7-1.6,2.6-2.5c0,0.5,0.1,0.8,0.1,1.3c0.6-0.5,1-0.9,1.4-1.3l0,0c0.7-0.2,1.1-0.8,1.5-1.4
                        						c0.5-0.7,1.1-1.4,1.7-2.1c0.4-0.5,0.8-0.9,1.1-1.4c0.8-0.7,1.8-1.3,2.8-1.9c0.5-0.4,0.9-0.9,1.6-1.5c0.3-0.3,0.9-0.6,1.4-1.1
                        						c1.3-1.2,2.5-2.6,4-3.6c0.3-0.1,0.4-0.5,0.6-0.7c-0.1,0-0.2-0.1-0.3-0.1c0.2-0.1,0.3-0.1,0.3-0.1l0,0c0.1,0,0.1,0,0.3,0l0,0
                        						c0.7-0.3,0.8-0.9,1.1-1.5c0.3-0.4,0.7-0.9,0.9-1.2c-0.1-0.3-0.2-0.5-0.2-0.5c0.3-0.3,0.6-0.7,0.9-1c-0.1-0.5,0-0.9,0.1-1.3
                        						c0.3-0.7,0.7-1.4,1-2.1C374.4,180.2,374.3,180.1,373.8,179.6z M71.1,191.2c0.2,0.3,0.3,0.3,0.3,0.3c-0.1,0.3-0.1,0.7-0.2,1.1
                        						C70.7,192.1,71.1,191.8,71.1,191.2z M71.5,193.3c-0.1,0.1-0.3,0.3-0.4,0.4c-0.1-0.1-0.1-0.1-0.1-0.2
                        						C71.2,193.5,71.4,193.4,71.5,193.3z M71.1,194.9c0.2-0.4,0.3-0.6,0.5-1.1c0.1,0.5,0.1,0.7,0.2,0.9
                        						C71.7,194.7,71.5,194.8,71.1,194.9z M72.3,214l-0.2-0.3l0.3,0.2L72.3,214z M78.5,200.8c0.1-0.3,0.1-0.5,0.1-0.6
                        						c0.1,0,0.2,0.1,0.4,0.1C78.9,200.4,78.8,200.5,78.5,200.8z M81.2,200.7l-0.2-0.1c0.1-0.1,0.3-0.3,0.4-0.4
                        						C81.3,200.4,81.3,200.6,81.2,200.7z M81.9,218.5c-0.1-0.1-0.2-0.3-0.3-0.5c0.1,0.1,0.3,0.2,0.5,0.3L81.9,218.5z M82.3,201.2
                        						c-0.1-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.2-0.1,0.3-0.2C82.4,201,82.3,201.1,82.3,201.2z M82.3,220.2c0.1-0.1,0.1-0.2,0.2-0.3
                        						c0.1,0.1,0.1,0.1,0.1,0.1C82.5,220.1,82.4,220.2,82.3,220.2z M84.9,203c0.4-0.4,0.5-0.4,0.8-0.1C85.5,202.9,85.2,203,84.9,203z
                        						 M87.8,205.1c0.9,0,0.4,0.7,0.7,0.9C87.8,205.9,88,205.5,87.8,205.1z M89.4,206c-0.4-0.5-0.7-0.9-1.1-1.5
                        						c0.5,0.1,0.9,0.1,1.2,0.2c0.3,0.6,0.9,0.3,1.3,0.5c0.1,0.3,0.1,0.6,0.1,1C90.5,206.2,89.9,206.1,89.4,206z M94.6,209.2
                        						c-0.4-0.1-0.9-0.1-1.1-0.6c0.4,0.1,0.8,0.3,1.2,0.3C94.7,209.1,94.7,209.1,94.6,209.2z M97.1,210.8c-0.1-0.1-0.1-0.2-0.2-0.3
                        						c0.1,0.1,0.2,0.1,0.3,0.2C97.2,210.7,97.2,210.8,97.1,210.8z M107.4,215.3c-0.1,0-0.2,0-0.3,0c0-0.1,0-0.1,0-0.3
                        						c0.1,0,0.2,0,0.3,0.1C107.4,215.1,107.4,215.2,107.4,215.3z M108.6,214.9c-0.2-0.1-0.4-0.1-0.6-0.1c0-0.1,0-0.1,0.1-0.2
                        						c0.2,0.1,0.4,0.1,0.6,0.1C108.6,214.8,108.6,214.9,108.6,214.9z M111,216.6c0.2-0.1,0.3-0.2,0.5-0.3c0.1,0.3,0.3,0.6,0.5,1
                        						C111.5,217.3,111.2,217.1,111,216.6z M112.3,217.6c0.3,0,0.6-0.1,0.8-0.1C112.8,217.9,112.8,217.9,112.3,217.6z M115.5,217.9
                        						c0.5-0.1,0.7,0,0.7,0.3C116.1,218.1,115.9,218,115.5,217.9z M118.5,220.4c0-0.1,0-0.1,0-0.1c0.1,0,0.2,0,0.3-0.1v0.2H118.5z
                        						 M119.6,216.7l0.3,0.2c0,0.1-0.1,0.1-0.1,0.2l-0.4-0.1C119.6,216.9,119.6,216.8,119.6,216.7z M119.9,233.7
                        						c0.1-0.4,0.2-0.7,0.6-0.6c0.3,0,0.5,0.3,0.5,0.6C120.7,233.4,120.3,233.4,119.9,233.7z M123.8,219.3l-0.4-0.5l0.1-0.1
                        						c0.1,0.1,0.3,0.3,0.5,0.5C123.9,219.1,123.9,219.2,123.8,219.3z M129.4,220.8c-0.1,0.1-0.1,0.3-0.1,0.4
                        						c-0.1,0.1-0.3,0.1-0.5,0.2C128.9,220.9,128.9,220.9,129.4,220.8z M128.6,223c0,0.1,0,0.1,0,0.3c-0.1,0-0.2,0-0.3-0.1
                        						c0-0.1,0-0.1,0-0.2C128.4,223,128.5,223,128.6,223z M127.9,220.9c-0.2,0.1-0.4,0.1-0.7,0.1c-0.1-0.2-0.1-0.4-0.2-0.5
                        						C127.4,220.5,127.8,220.4,127.9,220.9z M127,221.6c0.1,0,0.2,0.1,0.4,0.1c-0.2,0.1-0.3,0.1-0.4,0.1
                        						C127,221.8,127,221.7,127,221.6z M126.3,220c0.1,0.2,0.1,0.5,0.1,0.8c-0.4-0.1-0.7-0.2-1.1-0.3C125.5,219.9,125.9,220,126.3,220
                        						z M126.5,222.4l-0.1,0.4c-0.1,0-0.1-0.1-0.2-0.1c0.1-0.1,0.1-0.3,0.1-0.4C126.3,222.4,126.4,222.4,126.5,222.4z M124.8,219.3
                        						l-0.2-0.1c0.1-0.1,0.3-0.3,0.4-0.3c0.1,0.1,0.1,0.1,0.1,0.1C125,219,124.9,219.1,124.8,219.3z M129,235.5
                        						c-0.2,0.6-0.8,1-1.3,0.8c-0.8-0.2-1.5-0.5-2.6-0.8c0.9-0.3,1.7-0.3,2.3,0.1c0,0.1,0,0.2,0,0.3h0.5c0-0.2-0.1-0.4-0.1-0.6
                        						c0.1,0.1,0.3,0.2,0.5,0.3c0.1-0.1,0.3-0.3,0.5-0.4C129,235.3,129,235.5,129,235.5z M129.5,223.2c-0.1-0.3-0.3-0.7-0.5-1.1
                        						c0.1,0,0.3-0.1,0.6-0.1C129.6,222.5,130.2,222.8,129.5,223.2z M129.7,235.3c0-0.1,0.1-0.1,0.1-0.1l0.4,0.2
                        						C130,235.3,129.9,235.3,129.7,235.3z M129.5,221.4c0.4-0.2,0.7-0.2,0.9,0.3C129.9,221.9,129.7,221.7,129.5,221.4z M130.6,221.2
                        						c0.3,0,0.7-0.3,0.8,0.3C131.1,221.6,130.8,221.4,130.6,221.2z M132.8,221.6c0.1,0.1,0.1,0.2,0.2,0.3l-0.1,0.1
                        						c-0.1-0.1-0.2-0.1-0.3-0.1C132.7,221.8,132.7,221.7,132.8,221.6z M132.7,236.5c0.3-0.2,0.6-0.1,0.9,0.2
                        						C133.2,236.9,132.9,236.9,132.7,236.5z M136.3,220.2c0-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.2-0.1,0.3-0.2c0.1,0.1,0.1,0.1,0.1,0.1
                        						C136.6,220.1,136.5,220.2,136.3,220.2z M139.5,221.3c-0.1-0.1-0.2-0.1-0.3-0.1c0-0.1,0.1-0.1,0.1-0.2c0.1,0.1,0.2,0.1,0.3,0.1
                        						C139.6,221.2,139.5,221.2,139.5,221.3z M139.6,220.2c0.1-0.1,0.1-0.1,0.1-0.1c0.1,0.1,0.1,0.2,0.2,0.3
                        						C139.8,220.4,139.8,220.3,139.6,220.2z M151.6,222.1c0.1,0.1,0.3,0.1,0.4,0.1c0,0.1-0.1,0.1-0.1,0.2c-0.1-0.1-0.3-0.1-0.4-0.1
                        						C151.6,222.2,151.6,222.1,151.6,222.1z M150,221c0.1,0.1,0.3,0.3,0.4,0.4c-0.1,0.1-0.1,0.1-0.1,0.2l-0.5-0.3
                        						C149.9,221.1,150,221,150,221z M149.4,220.8c0,0.2,0.1,0.4,0.1,0.7c-0.6-0.1-1.1-0.2-1.7-0.3c0-0.1,0-0.1,0-0.2
                        						C148.4,221,148.9,221,149.4,220.8z M146.7,220.8c-0.4,0.1-0.4,0.1-0.6-0.3C146.3,220.6,146.5,220.7,146.7,220.8z M144.3,220.9
                        						c0,0.1,0,0.3,0,0.5c-0.2-0.1-0.5-0.3-0.7-0.4C143.9,220.9,144.1,220.9,144.3,220.9z M143.3,220.6c0.1,0.1,0.2,0.2,0.3,0.3
                        						c-0.2,0-0.3,0.1-0.7,0.1C143.1,220.8,143.3,220.7,143.3,220.6z M143,223.3c-0.1-0.1-0.1-0.2-0.2-0.3c0.1-0.1,0.1-0.1,0.1-0.1
                        						c0.1,0.1,0.2,0.1,0.3,0.3C143.1,223.2,143.1,223.2,143,223.3z M145,223c-0.5,0.1-0.9,0.3-1.3,0.5c0.1-0.5-0.3-1.1,0.5-1.3
                        						l0.2-0.7c0.1,0,0.3,0,0.5,0c-0.1,0.1-0.1,0.3-0.2,0.5c0.5,0,0.7,0.3,0.9,0.8c-0.3-0.1-0.3-0.1-0.5-0.1
                        						C145,222.7,145,222.8,145,223z M145.5,223.8l-0.1-0.1c0.1-0.1,0.2-0.2,0.3-0.3l0.1,0.2C145.7,223.7,145.6,223.8,145.5,223.8z
                        						 M146.4,224c-0.1-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.2-0.1,0.3-0.2C146.5,223.8,146.5,223.9,146.4,224z M147.3,225.2
                        						c-0.1-0.1-0.3-0.3-0.4-0.3c0.1-0.1,0.1-0.1,0.2-0.2c0.1,0.1,0.2,0.3,0.3,0.5C147.4,225.1,147.3,225.1,147.3,225.2z M149.2,225.6
                        						c0.3-0.3,0.6-0.5,0.9-0.8c0.1,0.1,0.1,0.1,0.2,0.1c0.1,0.1,0.1,0.1,0.1,0.3C150.1,225.5,149.8,226,149.2,225.6z M151.4,223.9
                        						c-0.1,0.5-0.4,0.3-0.7,0.2l0,0c-0.2,0.1-0.5,0.1-0.7,0.2c0,0.1,0,0.3,0,0.5c-0.7,0.1-1.3,0.3-1.9,0.5l-0.1-0.1
                        						c0.3-0.2,0.6-0.4,0.9-0.6c0.3-0.3,0.6-0.6,0-1c-0.1,0.2-0.1,0.3-0.2,0.5c-0.1-0.1-0.3-0.1-0.3-0.1c-0.1,0.3-0.3,0.5-0.5,0.9
                        						c-0.1,0-0.1,0-0.1-0.1l0.1-0.8c-0.2,0.1-0.5,0.2-0.6,0.3c-0.2-0.2-0.3-0.3-0.5-0.5l0,0l0,0l0,0l0,0c-0.2-0.2-0.4-0.4-0.7-0.7
                        						c0.3-0.1,0.6-0.2,0.9-0.3c-0.7-0.3-1-0.9-1.5-1.3c0.7-0.4,1,0.2,1.5,0.5c0.1-0.1,0.1-0.3,0.1-0.3c0.1,0.3,0.3,0.7,0.5,1
                        						c0.2-0.1,0.3-0.2,0.5-0.3l0,0c0.3-0.2,0.6-0.4,0.9-0.7c0.3,0.3,0.5,0.6,0.7,0.9c0.1-0.2,0.3-0.3,0.4-0.5
                        						c0.4-0.1,0.8-0.2,1.2-0.3c0.1,0.4,0.1,0.8,0.2,1.3c0.9-0.5,1.1,0.4,1.7,0.9C152.3,224.1,151.8,224.1,151.4,223.9z M153.4,224
                        						c0-0.1-0.1-0.1-0.1-0.1c0.2-0.1,0.4-0.1,0.6-0.3c0,0.1,0.1,0.2,0.1,0.3C153.8,223.8,153.6,223.9,153.4,224z M169.9,222.3
                        						c-0.4,0.5-0.9,0.5-1.3,0C169,222,169.4,222.3,169.9,222.3z M163.9,225.7c-0.1,0-0.1,0-0.1-0.1c0-0.1,0.1-0.3,0.1-0.4
                        						c0.1,0,0.1,0,0.1,0.1C164,225.5,163.9,225.7,163.9,225.7z M163.9,222.6h0.9C164.5,223,164.5,223,163.9,222.6z M165.7,222.2v0.5
                        						c-0.1,0-0.1,0-0.1,0c-0.1-0.1-0.1-0.3-0.1-0.5C165.5,222.2,165.6,222.2,165.7,222.2z M165.8,226.1c-0.1-0.1-0.2-0.1-0.3-0.2
                        						c0-0.1,0.1-0.1,0.1-0.1c0.1,0.1,0.2,0.1,0.3,0.2C165.8,226,165.8,226.1,165.8,226.1z M168,225.4l0.1-0.3l0.1,0.3
                        						C168.1,225.4,168,225.4,168,225.4z M168,222.7c-0.6,0.1-1.1,0.1-1.7,0.2c0.2-0.4,0.3-0.8,0.5-1.1c0.5,0.2,1.1,0.3,1.6,0.5
                        						C168.2,222.4,168.1,222.6,168,222.7z M169.2,224.6c-0.1,0.1-0.1,0.3-0.2,0.5c-0.3-0.3-0.4-0.5-0.6-0.8c0.3-0.2,0.6-0.3,0.9-0.5
                        						c0.1,0.1,0.3,0.2,0.3,0.3C169.5,224.2,169.4,224.4,169.2,224.6L169.2,224.6z M170,224.2c-0.1-0.1-0.2-0.1-0.3-0.1
                        						c0.1,0,0.2-0.1,0.3-0.1C170,224.1,170,224.2,170,224.2z M170.4,223.8c-0.1-0.1-0.1-0.3-0.1-0.3c0.1,0,0.1-0.1,0.2-0.1
                        						c0.1,0.1,0.1,0.3,0.1,0.3C170.4,223.7,170.4,223.7,170.4,223.8z M171.2,224.2c0.1,0,0.1-0.1,0.2-0.1c0.1,0.1,0.1,0.3,0.1,0.5
                        						C171.4,224.4,171.2,224.2,171.2,224.2z M171.5,224.6c0.4,0,0.7,0.1,0.9,0.4C172.1,224.9,171.8,224.7,171.5,224.6z M170.5,222.7
                        						c-0.2,0-0.4-0.3-0.6-0.4c0.5-0.6,0.5-0.6,1.2-0.1c0.1-0.1,0.2-0.3,0.4-0.5c0.2,0.3,0.3,0.5,0.5,0.7c0.2-0.2,0.1-0.7,0.5-0.5
                        						c0.2,0.3,0.3,0.5,0.5,0.9C172.2,222.7,171.3,222.8,170.5,222.7z M173.5,222.5c-0.1-0.3-0.1-0.5-0.1-0.7c0.2,0.1,0.3,0.2,0.6,0.3
                        						C173.7,222.3,173.7,222.4,173.5,222.5z M177.3,222.9c0.1-0.5,0.3-0.3,0.7,0H177.3z M200.8,221.5c0.3-0.3,0.4-0.5,0.6-0.9
                        						C201.6,221.2,201.4,221.4,200.8,221.5z M203.1,221.1c-0.1-0.1-0.1-0.3-0.3-0.5C203.3,220.5,203.4,220.7,203.1,221.1z M205.5,221
                        						c-0.1,0.1-0.3,0.1-0.5,0.2c-0.1-0.3-0.1-0.5-0.1-0.7c0.5,0.3,0.6-0.3,1-0.4c0.1,0.4,0.3,0.8,0.4,1.5
                        						C205.9,221.3,205.7,221.2,205.5,221z M227.1,221c-0.3,0-0.7,0.1-1.2,0.1v-1c-0.3,0.3-0.4,0.5-0.7,0.9v-1.7
                        						c0.3,0.1,0.5,0.3,0.8,0.4c0-0.1,0.1-0.3,0-0.3c-0.3-0.3-0.5-0.5-0.7-0.8c0.6,0.2,1.2,0.2,1.8,0l0,0c0.5,0.5,1.1,0.4,1.7,0.1
                        						c0.3,0.6-0.1,0.9-0.3,1.3c-0.4,0.1-0.7,0.2-1.1,0.3C227.3,220.5,227.2,220.8,227.1,221z M228.2,221.8c-0.2-0.3-0.3-0.5-0.5-0.7
                        						c0.1-0.1,0.1-0.1,0.1-0.1c0.2,0.1,0.4,0.3,0.6,0.5C228.4,221.5,228.3,221.6,228.2,221.8z M233,221.2c0.1,0,0.3,0,0.5,0
                        						c0.1,0.1,0.1,0.3,0.2,0.5C233.2,221.8,233.1,221.5,233,221.2z M233.5,221.2c-0.1-0.3-0.1-0.5,0.4-0.4
                        						C233.7,221,233.6,221,233.5,221.2z M233.3,219.1c0.5,0.3,0.5,0.3,0.2,0.9c-0.1-0.3-0.3-0.5-0.7-0.2l0,0l0,0l0,0l0,0
                        						c-0.3,0.5,0.1,0.9,0.2,1.3c-0.5-0.1-0.9-0.3-1.3-0.5c-0.1,0.1-0.1,0.1-0.2,0.2c0.1,0.1,0.3,0.3,0.4,0.5
                        						c-0.4,0.1-0.7,0.1-1.1,0.3c-0.1-0.1-0.3-0.2-0.4-0.4c-0.1,0.1-0.2,0.2-0.3,0.3c0.3,0.3,0.1,0.4-0.2,0.5c0-0.1,0-0.1,0-0.2
                        						c-0.3,0.1-0.6,0.1-0.8,0.1c-0.2-0.2-0.4-0.4-0.5-0.5c0.1-0.1,0.1-0.3,0.3-0.5c0.3,0.1,0.5,0.1,0.7,0.1c0.2,0,0.5-0.1,0.7-0.2
                        						c-0.3-0.1-0.5-0.2-0.8-0.3c0.5-0.3-0.1-0.6-0.1-0.9c0.3-0.2,0.7-0.3,0.9-0.5c-0.1-0.1-0.2-0.1-0.5-0.3c0.3-0.1,0.5-0.1,0.7-0.1
                        						h0.2c0.3-0.1,0.7-0.1,0.9-0.1c0.5-0.1,0.7,0.1,0.9,0.6c0.3-0.3,0.5-0.6,0.9-1.1c0.2,0.4,0.3,0.6,0.4,0.8
                        						C233.6,218.7,233.4,218.7,233.3,219.1z M234,218.9c0.3-0.1,0.7-0.3,1,0.1c-0.1,0.1-0.1,0.3-0.1,0.5c-0.1,0.1-0.2,0.1-0.3,0.2
                        						c-0.1-0.1-0.1-0.3-0.2-0.5C234.2,219.2,234,219.2,234,218.9z M234.3,221.5c0-0.3-0.1-0.6-0.1-1c0.2-0.1,0.4-0.1,0.6-0.3
                        						c0,0.3,0,0.6,0,0.9c0.1-0.1,0.3-0.1,0.4-0.1C235.2,221.6,235.2,221.6,234.3,221.5z M236.9,219.3c-0.1-0.1-0.2-0.1-0.3-0.3
                        						c0.1-0.1,0.1-0.1,0.1-0.1c0.1,0.1,0.2,0.1,0.3,0.3C237,219.2,236.9,219.2,236.9,219.3z M237.3,221.2c-0.1,0-0.1-0.1-0.1-0.1
                        						c0.1-0.1,0.1-0.3,0.2-0.3c0.1,0.1,0.1,0.1,0.2,0.1C237.5,221,237.4,221.2,237.3,221.2z M243.8,219.3c0.1-0.1,0.1-0.3,0.3-0.6
                        						c0.1,0.3,0.1,0.5,0.1,0.6C244,219.3,243.9,219.3,243.8,219.3z M284.2,214c-1.3,0.2-2.5,0.4-3.8,0.6c-0.1,0-0.3,0-0.5,0.1
                        						c0.5-1.1,1-1.3,2-0.9c0.1-0.1,0.2-0.3,0.3-0.5c0.6,0.2,1.1,0.1,1.4-0.4c0.4,0.1,0.8,0.3,1.3,0.5
                        						C284.8,213.7,284.6,214,284.2,214z M303.6,208.6c0.3-0.5,0.3-0.5,0.7,0.1C304,208.6,303.8,208.6,303.6,208.6z M312.2,203.8
                        						c-0.1-0.3-0.2-0.5,0.3-0.7C312.4,203.4,312.3,203.6,312.2,203.8z M314.8,204.3c-0.1-0.1-0.1-0.1-0.1-0.2l0.7-0.5
                        						c0.1,0.1,0.1,0.1,0.1,0.1C315.2,203.9,315,204,314.8,204.3z M331.4,197.5c0.4-0.3,0.8-0.5,1.1-0.7
                        						C332.4,197.7,332.3,197.7,331.4,197.5z M333.5,196.7c-0.1-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.1-0.2,0.3-0.3c0.1,0.1,0.1,0.1,0.1,0.2
                        						L333.5,196.7z M351.4,186.2c-0.1,0-0.1-0.1-0.1-0.1c0.1-0.1,0.2-0.2,0.3-0.3C351.4,185.9,351.4,186.1,351.4,186.2z"/>
                        					<path fill="#075FAE" d="M131.9,219.1c0-0.1,0-0.1,0-0.1C131.9,219.1,131.9,219.1,131.9,219.1L131.9,219.1z"/>
                        					<path fill="#075FAE" d="M92.1,205.8L92.1,205.8c0,0.1-0.1,0.2-0.2,0.3C92,206,92,205.9,92.1,205.8z"/>
                        					<path fill="#075FAE" d="M66,186.5L66,186.5c-0.1-0.1-0.1-0.1,0-0.1C66,186.5,66,186.5,66,186.5C66,186.5,66,186.5,66,186.5z"/>
                        					<path fill="#075FAE" d="M67.9,188.2c-0.1-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.1c0,0,0.1,0,0.1,0.1
                        						C68,188.1,68,188.1,67.9,188.2z"/>
                        					<path fill="#075FAE" d="M70.4,191.6c0-0.1,0-0.1,0.1-0.1h0.1c0,0.1,0,0.1,0.1,0.1C70.5,191.6,70.4,191.6,70.4,191.6z"/>
                        					<path fill="#075FAE" d="M73.5,196.3c0-0.1,0-0.1,0-0.1h0.1C73.5,196.3,73.5,196.3,73.5,196.3z"/>
                        					<path fill="#075FAE" d="M77,199.2L77,199.2C77,199.1,77,199.1,77,199.2C77.1,199.2,77.1,199.2,77,199.2z"/>
                        					<path fill="#075FAE" d="M79.8,215.9C79.8,215.8,79.7,215.8,79.8,215.9C79.7,215.8,79.8,215.8,79.8,215.9
                        						C79.8,215.8,79.8,215.8,79.8,215.9C79.8,215.8,79.8,215.8,79.8,215.9z"/>
                        					<path fill="#075FAE" d="M80.2,216.4c-0.1,0-0.1-0.1-0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.1C80.2,216.3,80.3,216.3,80.2,216.4
                        						L80.2,216.4z"/>
                        					<path fill="#075FAE" d="M84.3,202.6C84.3,202.6,84.3,202.6,84.3,202.6C84.3,202.5,84.3,202.5,84.3,202.6
                        						C84.3,202.5,84.4,202.5,84.3,202.6L84.3,202.6z"/>
                        					<path fill="#075FAE" d="M86.8,205.7L86.8,205.7c-0.1-0.1-0.1-0.1,0-0.1C86.8,205.6,86.8,205.7,86.8,205.7
                        						C86.8,205.7,86.8,205.7,86.8,205.7z"/>
                        					<path fill="#075FAE" d="M86.8,204.5c-0.1,0-0.1,0-0.3,0v-0.1C86.6,204.4,86.8,204.4,86.8,204.5
                        						C86.8,204.4,86.8,204.5,86.8,204.5z"/>
                        					<path fill="#075FAE" d="M86.8,204C86.8,204,86.8,203.9,86.8,204C86.8,203.9,86.8,203.9,86.8,204C86.8,203.9,86.9,203.9,86.8,204
                        						C86.9,204,86.9,204,86.8,204z"/>
                        					<polygon fill="#075FAE" points="91.7,207.5 91.7,207.6 91.6,207.6 				"/>
                        					<path fill="#075FAE" d="M91.7,208.5C91.6,208.5,91.6,208.5,91.7,208.5C91.6,208.5,91.7,208.5,91.7,208.5
                        						C91.7,208.5,91.7,208.5,91.7,208.5L91.7,208.5z"/>
                        					<path fill="#075FAE" d="M92.7,208.5c0-0.1,0-0.1,0-0.1h0.1C92.7,208.3,92.7,208.4,92.7,208.5z"/>
                        					<path fill="#075FAE" d="M93.5,210.2c-0.1,0-0.1,0.1-0.1,0.1v-0.1C93.5,210.2,93.5,210.1,93.5,210.2L93.5,210.2z"/>
                        					<path fill="#075FAE" d="M98.1,210.8c-0.1,0-0.1-0.1-0.1-0.1c0,0,0-0.1,0.1-0.1c0.1,0,0.1,0,0.2,0
                        						C98.2,210.7,98.1,210.8,98.1,210.8z"/>
                        					<path fill="#075FAE" d="M101.9,213.3L101.9,213.3c-0.1-0.1,0-0.2,0.1-0.2c0.1,0.1,0.1,0.1,0.1,0.1
                        						C102,213.2,101.9,213.3,101.9,213.3z"/>
                        					<path fill="#075FAE" d="M102.5,213.4C102.5,213.4,102.5,213.4,102.5,213.4C102.5,213.4,102.5,213.4,102.5,213.4L102.5,213.4
                        						L102.5,213.4z"/>
                        					<path fill="#075FAE" d="M105.8,214.5c-0.1,0-0.1-0.1-0.1-0.1c0-0.1,0.1-0.1,0.1-0.1c0.1,0,0.1,0.1,0.2,0.1
                        						C105.9,214.3,105.9,214.4,105.8,214.5z"/>
                        					<path fill="#075FAE" d="M106.3,214.1c0-0.1,0-0.1,0-0.1C106.3,214,106.4,214,106.3,214.1C106.4,214.1,106.3,214.1,106.3,214.1z"
                        						/>
                        					<path fill="#075FAE" d="M107,213.9c0-0.1,0-0.1,0-0.1C107.1,213.8,107.1,213.8,107,213.9C107.1,213.8,107,213.9,107,213.9z"/>
                        					<path fill="#075FAE" d="M108.5,216.1C108.5,216.1,108.5,216,108.5,216.1C108.5,216,108.6,216,108.5,216.1L108.5,216.1z"/>
                        					<path fill="#075FAE" d="M110.4,216.5L110.4,216.5L110.4,216.5C110.4,216.5,110.4,216.5,110.4,216.5
                        						C110.4,216.5,110.4,216.5,110.4,216.5z"/>
                        					<path fill="#075FAE" d="M113.5,218.2c-0.1,0-0.1-0.1-0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.1C113.6,218.1,113.6,218.1,113.5,218.2
                        						C113.6,218.1,113.5,218.2,113.5,218.2z"/>
                        					<polygon fill="#075FAE" points="115.4,218.5 115.3,218.5 115.4,218.5 				"/>
                        					<path fill="#075FAE" d="M116.1,219.4C116.1,219.4,116.1,219.3,116.1,219.4c0-0.1,0-0.1,0.1-0.1
                        						C116.2,219.3,116.2,219.3,116.1,219.4C116.2,219.3,116.1,219.3,116.1,219.4z"/>
                        					<polygon fill="#075FAE" points="121.5,232.7 121.4,232.6 121.6,232.6 				"/>
                        					<path fill="#075FAE" d="M121.6,218.5L121.6,218.5L121.6,218.5C121.5,218.5,121.6,218.5,121.6,218.5L121.6,218.5z"/>
                        					<path fill="#075FAE" d="M121.8,217.3c-0.1-0.1-0.1-0.1-0.1-0.1l0.1-0.1C121.8,217.2,121.8,217.2,121.8,217.3
                        						C121.9,217.3,121.8,217.3,121.8,217.3z"/>
                        					<path fill="#075FAE" d="M122.1,218.7L122.1,218.7c0.1-0.1,0.2,0,0.2,0c-0.1,0.1-0.1,0.1-0.1,0.1
                        						C122.2,218.7,122.2,218.7,122.1,218.7z"/>
                        					<path fill="#075FAE" d="M122.3,221.1C122.3,221.1,122.4,221.1,122.3,221.1c0.1,0.1,0.1,0.1,0.1,0.1h-0.1
                        						C122.3,221.2,122.3,221.1,122.3,221.1z"/>
                        					<path fill="#075FAE" d="M122.5,233.7c-0.1,0-0.1-0.1-0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.1C122.5,233.6,122.5,233.6,122.5,233.7
                        						C122.5,233.7,122.5,233.8,122.5,233.7z"/>
                        					<path fill="#075FAE" d="M122.4,219.5L122.4,219.5c0-0.1,0.1-0.1,0.1,0C122.5,219.5,122.5,219.5,122.4,219.5z"/>
                        					<path fill="#075FAE" d="M123,219c-0.1,0-0.1,0-0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.1c0.1,0.1,0.1,0.1,0.1,0.1
                        						C123.1,218.9,123,219,123,219z"/>
                        					<path fill="#075FAE" d="M128.5,220.6C128.5,220.6,128.5,220.7,128.5,220.6v0.1C128.4,220.8,128.4,220.7,128.5,220.6
                        						C128.4,220.7,128.5,220.6,128.5,220.6z"/>
                        					<path fill="#075FAE" d="M128.1,221.6c-0.1,0.1-0.1,0.1-0.1,0.1c0-0.1-0.1-0.1-0.1-0.1l0.1-0.1C128,221.6,128,221.6,128.1,221.6z
                        						"/>
                        					<path fill="#075FAE" d="M125.4,219.4C125.4,219.4,125.5,219.4,125.4,219.4C125.5,219.5,125.4,219.5,125.4,219.4L125.4,219.4
                        						C125.3,219.4,125.4,219.4,125.4,219.4z"/>
                        					<path fill="#075FAE" d="M124.1,220.4c-0.1,0-0.1,0-0.1-0.1s0.1-0.1,0.1-0.2c0.1,0,0.1,0.1,0.1,0.1
                        						C124.1,220.2,124.1,220.4,124.1,220.4z"/>
                        					<path fill="#075FAE" d="M124.9,235.3c0-0.1,0-0.1,0-0.2C125,235.1,125,235.2,124.9,235.3C125,235.3,125,235.3,124.9,235.3z"/>
                        					<path fill="#075FAE" d="M129.1,236.8c-0.1,0-0.1-0.1-0.1-0.1c0-0.1,0.1-0.1,0.1-0.1c0.1,0,0.1,0.1,0.2,0.1
                        						C129.2,236.7,129.1,236.7,129.1,236.8z"/>
                        					<path fill="#075FAE" d="M130.1,222.6c0-0.1,0-0.1,0.1-0.1c0.1,0,0.1,0.1,0.2,0.1c0,0.1-0.1,0.1-0.1,0.1
                        						C130.2,222.6,130.1,222.6,130.1,222.6z"/>
                        					<path fill="#075FAE" d="M130.4,236.6c-0.1-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.1l0.1,0.1
                        						C130.4,236.5,130.4,236.5,130.4,236.6z"/>
                        					<path fill="#075FAE" d="M132,221.4c0.1,0.1,0.1,0.1,0.1,0.1c-0.1,0.1-0.1,0.1-0.1,0.1l-0.1-0.1C132,221.6,132,221.5,132,221.4z"
                        						/>
                        					<path fill="#075FAE" d="M131.1,236.3c-0.1-0.1-0.1-0.1-0.1-0.1l0.1-0.1c0.1,0,0.1,0.1,0.2,0.1
                        						C131.2,236.2,131.2,236.3,131.1,236.3z"/>
                        					<path fill="#075FAE" d="M131.5,222.4L131.5,222.4c0-0.1,0.1-0.1,0.1-0.2c0,0,0,0.1,0.1,0.1C131.6,222.4,131.6,222.4,131.5,222.4
                        						z"/>
                        					<path fill="#075FAE" d="M132,235.6c-0.1,0-0.1-0.1-0.1-0.1c0,0,0-0.1,0.1-0.1c0.1,0,0.1,0,0.2,0
                        						C132.1,235.5,132.1,235.5,132,235.6z"/>
                        					<path fill="#075FAE" d="M132.3,237c-0.1,0-0.1-0.1-0.1-0.1v-0.1C132.2,236.9,132.3,236.9,132.3,237
                        						C132.3,236.9,132.3,237,132.3,237z"/>
                        					<path fill="#075FAE" d="M136.3,221.7L136.3,221.7c0-0.1,0-0.1,0.1-0.2l0.1,0.1C136.3,221.6,136.3,221.6,136.3,221.7z"/>
                        					<path fill="#075FAE" d="M152.5,222.2L152.5,222.2v0.1C152.5,222.3,152.5,222.2,152.5,222.2z"/>
                        					<path fill="#075FAE" d="M138.4,220.2c-0.1-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.1l0.1,0.1
                        						C138.4,220,138.4,220.1,138.4,220.2z"/>
                        					<path fill="#075FAE" d="M138.8,221C138.8,221,138.7,221,138.8,221C138.7,220.9,138.7,220.9,138.8,221L138.8,221L138.8,221z"/>
                        					<path fill="#075FAE" d="M141.2,220.6c0-0.1,0-0.1,0-0.1C141.2,220.4,141.3,220.4,141.2,220.6
                        						C141.3,220.5,141.2,220.5,141.2,220.6z"/>
                        					<path fill="#075FAE" d="M141.9,220.6c-0.1-0.1-0.1-0.1-0.1-0.1l0.1-0.1C141.9,220.4,141.9,220.4,141.9,220.6
                        						C142,220.5,141.9,220.5,141.9,220.6z"/>
                        					<path fill="#075FAE" d="M142.3,221.1L142.3,221.1L142.3,221.1C142.3,221,142.3,221,142.3,221.1C142.3,221,142.3,221,142.3,221.1
                        						z"/>
                        					<path fill="#075FAE" d="M142.6,222.2c-0.1,0-0.1-0.1-0.1-0.1c0-0.1,0.1-0.1,0.1-0.1l0.1,0.1
                        						C142.6,222.1,142.6,222.1,142.6,222.2z"/>
                        					<path fill="#075FAE" d="M145.2,223.2c-0.1-0.1-0.1-0.2-0.2-0.3C145.1,223,145.2,223.1,145.2,223.2
                        						C145.3,223.2,145.3,223.2,145.2,223.2z"/>
                        					<path fill="#075FAE" d="M145.7,224.4L145.7,224.4L145.7,224.4C145.7,224.4,145.7,224.4,145.7,224.4z"/>
                        					<path fill="#075FAE" d="M151.6,226.1L151.6,226.1L151.6,226.1C151.6,226,151.6,226,151.6,226.1
                        						C151.6,226.1,151.6,226.1,151.6,226.1z"/>
                        					<path fill="#075FAE" d="M169,223.3h-0.3v-0.1L169,223.3L169,223.3z"/>
                        					<path fill="#075FAE" d="M162.6,225.7L162.6,225.7L162.6,225.7C162.6,225.6,162.6,225.6,162.6,225.7
                        						C162.7,225.6,162.7,225.7,162.6,225.7z"/>
                        					<path fill="#075FAE" d="M165.7,224.4C165.7,224.4,165.7,224.4,165.7,224.4c0.1-0.1,0.1-0.1,0.1-0.1v0.1
                        						C165.9,224.4,165.8,224.4,165.7,224.4z"/>
                        					<polygon fill="#075FAE" points="167.2,223.3 167.1,223.4 167.1,223.2 				"/>
                        					<path fill="#075FAE" d="M166.3,224.8c0.1-0.1,0.1-0.2,0.2-0.3l0.1,0.1C166.4,224.7,166.3,224.7,166.3,224.8z"/>
                        					<path fill="#075FAE" d="M166.9,224L166.9,224L166.9,224C166.9,224,166.9,224,166.9,224z"/>
                        					<path fill="#075FAE" d="M167.2,225.3c-0.1-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.1l0.1,0.1
                        						C167.3,225.3,167.2,225.3,167.2,225.3z"/>
                        					<path fill="#075FAE" d="M168,226.3c0-0.1-0.1-0.1-0.1-0.1l0.1-0.1c0.1,0,0.1,0,0.1,0.1C168.1,226.1,168.1,226.2,168,226.3z"/>
                        					<path fill="#075FAE" d="M168.1,225c0.1-0.1,0.1-0.2,0.2-0.3l0.1,0.1C168.3,224.9,168.2,224.9,168.1,225z"/>
                        					<path fill="#075FAE" d="M169.6,226.7L169.6,226.7c-0.1-0.1,0-0.1,0-0.1h0.1C169.7,226.6,169.6,226.6,169.6,226.7z"/>
                        					<polygon fill="#075FAE" points="169.8,225.3 169.7,225.3 169.8,225.3 				"/>
                        					<path fill="#075FAE" d="M171.5,226.1L171.5,226.1L171.5,226.1L171.5,226.1L171.5,226.1z"/>
                        					<path fill="#075FAE" d="M173.6,224.4c-0.1-0.1-0.1-0.1-0.1-0.1h0.1C173.6,224.3,173.7,224.4,173.6,224.4
                        						C173.7,224.4,173.6,224.4,173.6,224.4z"/>
                        					<path fill="#075FAE" d="M177.7,222c-0.1,0-0.1,0-0.1,0v-0.1C177.6,222,177.7,222,177.7,222z"/>
                        					<path fill="#075FAE" d="M179,222.2c-0.1-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.1l0.1,0.1
                        						C179.1,222.1,179.1,222.1,179,222.2z"/>
                        					<polygon fill="#075FAE" points="226.1,221.8 226.1,221.8 226.1,221.9 				"/>
                        					<polygon fill="#075FAE" points="228.4,222.6 228.3,222.5 228.4,222.5 				"/>
                        					<path fill="#075FAE" d="M230.4,222.6c0-0.1-0.1-0.1-0.1-0.1l0.1-0.1c0.1,0,0.1,0.1,0.1,0.1C230.4,222.6,230.4,222.6,230.4,222.6
                        						z"/>
                        					<path fill="#075FAE" d="M236.1,218.5C236,218.5,236,218.5,236.1,218.5C236.1,218.5,236.1,218.5,236.1,218.5
                        						C236.1,218.5,236.1,218.5,236.1,218.5z"/>
                        					<path fill="#075FAE" d="M236.9,220.6c-0.1-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.1l0.1,0.1
                        						C237,220.5,236.9,220.6,236.9,220.6z"/>
                        					<polygon fill="#075FAE" points="238.2,221.2 238.1,221.1 238.3,221.1 				"/>
                        					<path fill="#075FAE" d="M238.6,220.4C238.6,220.4,238.7,220.4,238.6,220.4c0.1-0.1,0.1,0,0.2,0c-0.1,0.1-0.1,0.1-0.1,0.1
                        						C238.7,220.5,238.7,220.4,238.6,220.4z"/>
                        					<path fill="#075FAE" d="M238.9,221.9L238.9,221.9C238.8,221.8,238.8,221.8,238.9,221.9L238.9,221.9L238.9,221.9z"/>
                        					<path fill="#075FAE" d="M243.5,220.6c0-0.1-0.1-0.1-0.1-0.2l0.1-0.1c0.1,0,0.1,0.1,0.1,0.1S243.6,220.6,243.5,220.6z"/>
                        					<path fill="#075FAE" d="M243.6,219.6L243.6,219.6c0-0.1,0.1-0.2,0.2-0.3C243.7,219.4,243.6,219.6,243.6,219.6z"/>
                        					<polygon fill="#075FAE" points="245.2,218.5 245.1,218.5 245.2,218.5 				"/>
                        					<polygon fill="#075FAE" points="279.4,214.2 279.3,214.2 279.4,214.2 				"/>
                        					<polygon fill="#075FAE" points="310,206.3 310.1,206.3 310.1,206.3 				"/>
                        					<path fill="#075FAE" d="M309.9,204.3L309.9,204.3c0-0.1,0.1-0.2,0.2-0.3C310.1,204.2,310,204.3,309.9,204.3z"/>
                        					<path fill="#075FAE" d="M342.3,207.3L342.3,207.3c0.1,0,0.2,0.1,0.3,0.2C342.4,207.3,342.4,207.3,342.3,207.3z"/>
                        					<path fill="#075FAE" d="M347.8,204C347.8,204,347.8,203.9,347.8,204C347.8,203.9,347.8,203.9,347.8,204
                        						C347.9,204,347.9,204,347.8,204z"/>
                        					<path fill="#075FAE" d="M350.3,186.4L350.3,186.4C350.2,186.3,350.3,186.3,350.3,186.4C350.3,186.3,350.3,186.3,350.3,186.4
                        						C350.3,186.4,350.3,186.4,350.3,186.4z"/>
                        					<path fill="#075FAE" d="M354.1,202.5C354.1,202.5,354,202.5,354.1,202.5L354.1,202.5L354.1,202.5
                        						C354.1,202.4,354.1,202.5,354.1,202.5z"/>
                        					<path fill="#075FAE" d="M354.8,202.2L354.8,202.2c0.1,0,0.2,0.1,0.3,0.2C355,202.4,354.9,202.3,354.8,202.2z"/>
                        					<path fill="#075FAE" d="M72.2,192.2L72.2,192.2L72.2,192.2L72.2,192.2z"/>
                        					<path fill="#075FAE" d="M72.2,192.2C72.2,192.2,72.2,192.2,72.2,192.2C72.2,192.2,72.2,192.2,72.2,192.2z"/>
                        					<path fill="#075FAE" d="M78.6,200.2C78.6,200.2,78.5,200.1,78.6,200.2L78.6,200.2z"/>
                        					<path fill="#075FAE" d="M119.8,233.7L119.8,233.7L119.8,233.7z"/>
                        					<path fill="#075FAE" d="M119.8,233.8L119.8,233.8L119.8,233.8z"/>
                        					<path fill="#075FAE" d="M124.9,235.1L124.9,235.1C124.9,235.1,124.9,235.1,124.9,235.1C124.9,235.1,124.9,235.1,124.9,235.1z"/>
                        					<path fill="#075FAE" d="M124.9,235L124.9,235L124.9,235z"/>
                        					<path fill="#075FAE" d="M144.3,220.9L144.3,220.9L144.3,220.9L144.3,220.9z"/>
                        					<path fill="#075FAE" d="M229.4,220.4L229.4,220.4L229.4,220.4L229.4,220.4L229.4,220.4z"/>
                        					<path fill="#075FAE" d="M225.3,218.6L225.3,218.6L225.3,218.6L225.3,218.6z"/>
                        					<path fill="#075FAE" d="M225.3,218.6L225.3,218.6L225.3,218.6z"/>
                        					<path fill="#075FAE" d="M229.9,222.1L229.9,222.1C229.8,222.2,229.8,222.2,229.9,222.1z"/>
                        					<path fill="#075FAE" d="M233.5,220C233.4,220.2,233.4,220.1,233.5,220L233.5,220z"/>
                        					<path fill="#075FAE" d="M233.5,220.1C233.5,220.1,233.5,220.2,233.5,220.1L233.5,220.1z"/>
                        					<path fill="#075FAE" d="M234.9,220.2C234.9,220.2,235,220.2,234.9,220.2C235,220.2,234.9,220.2,234.9,220.2z"/>
                        					<path fill="#075FAE" d="M242.2,221.4C242.2,221.4,242.2,221.3,242.2,221.4C242.2,221.4,242.2,221.4,242.2,221.4
                        						C242.2,221.4,242.2,221.4,242.2,221.4C242.2,221.4,242.2,221.4,242.2,221.4z"/>
                        					<path fill="#075FAE" d="M204.3,221L204.3,221C204.3,220.9,204.3,220.9,204.3,221C204.4,221,204.4,221,204.3,221
                        						C204.4,221,204.3,221,204.3,221z"/>
                        					<path fill="#075FAE" d="M137.3,221.2L137.3,221.2C137.3,221.1,137.3,221.1,137.3,221.2S137.3,221.2,137.3,221.2
                        						C137.2,221.2,137.2,221.2,137.3,221.2z"/>
                        					<path fill="#075FAE" d="M119.7,232.8C119.7,232.8,119.7,232.7,119.7,232.8L119.7,232.8C119.7,232.8,119.7,232.8,119.7,232.8
                        						C119.6,232.8,119.7,232.8,119.7,232.8z"/>
                        					<path fill="#075FAE" d="M123.1,220.5C123.1,220.4,123.1,220.4,123.1,220.5C123.1,220.4,123.1,220.4,123.1,220.5
                        						C123.1,220.5,123.1,220.6,123.1,220.5C123.1,220.5,123.1,220.5,123.1,220.5z"/>
                        					<path fill="#075FAE" d="M120.2,217.9L120.2,217.9C120.2,217.9,120.2,217.9,120.2,217.9S120.2,218,120.2,217.9
                        						C120.1,218,120.1,218,120.2,217.9z"/>
                        					<path fill="#075FAE" d="M120.8,218.2L120.8,218.2C120.8,218.2,120.8,218.2,120.8,218.2C120.8,218.1,120.8,218.1,120.8,218.2
                        						C120.8,218.1,120.8,218.1,120.8,218.2z"/>
                        					<path fill="#075FAE" d="M245.4,219.1C245.5,219.1,245.6,219,245.4,219.1C245.5,219,245.5,219,245.4,219.1
                        						C245.4,219.1,245.4,219.1,245.4,219.1C245.3,219.1,245.4,219.1,245.4,219.1z"/>
                        					<path fill="#075FAE" d="M93,209.3C93.1,209.3,93.2,209.2,93,209.3C93.1,209.2,93.1,209.2,93,209.3C93,209.3,93,209.4,93,209.3
                        						C93,209.4,93,209.3,93,209.3z"/>
                        					<path fill="#075FAE" d="M119,217.7C119,217.7,119.1,217.6,119,217.7C119.1,217.5,119,217.7,119,217.7
                        						C119,217.7,119,217.8,119,217.7C119,217.8,119,217.7,119,217.7z"/>
                        					<path fill="#075FAE" d="M109.2,215.9C109.2,215.9,109.2,215.9,109.2,215.9C109.2,215.9,109.2,215.9,109.2,215.9
                        						C109.2,216,109.2,216.1,109.2,215.9C109.3,216.1,109.2,216,109.2,215.9z"/>
                        					<path fill="#075FAE" d="M279.3,215.7C279.4,215.7,279.4,215.9,279.3,215.7C279.5,215.8,279.4,215.7,279.3,215.7
                        						S279.2,215.6,279.3,215.7C279.2,215.6,279.3,215.7,279.3,215.7z"/>
                        					<path fill="#075FAE" d="M70.2,193.1C70.3,193,70.4,193,70.2,193.1C70.4,193,70.2,193,70.2,193.1
                        						C70.2,193.1,70.2,193.2,70.2,193.1C70.2,193.1,70.2,193.1,70.2,193.1z"/>
                        					<path fill="#075FAE" d="M123.3,219.7C123.5,219.6,123.4,219.6,123.3,219.7C123.4,219.7,123.5,219.7,123.3,219.7z"/>
                        					<path fill="#075FAE" d="M360.1,180.8c0,0.2,0.1,0.4,0.1,0.6c-0.5,0.1-1.2-0.5-1.4,0.3c-0.3-0.3-0.7-0.6-0.9-0.9
                        						c-0.3,0.2-0.5,0.4-0.7,0.5c-0.4-0.1-0.8-0.2-1.2-0.3c0,0.1-0.1,0.1-0.1,0.2c0.1,0.1,0.2,0.2,0.3,0.3c-0.3,0.1-0.5,0.1-0.8,0.3
                        						c-0.1-0.3-0.2-0.5-0.3-0.7c-1.2-0.1-1.4,0.1-1.7,1.9c-0.2-0.1-0.4-0.1-0.6-0.1c-0.3,0.2-0.5,0.4-0.9,0.7
                        						c-0.3-0.2-0.5-0.3-0.9-0.5c-0.1,0.1-0.1,0.3-0.1,0.4c0.1,0.5-0.1,0.8-0.6,0.9c-0.4,0.1-0.9,0-1.3,0.2c-0.3,0.2-0.6,0.7-0.9,1.1
                        						c-0.7-0.4-1.5,0.1-2.3,0.3c-0.3,0.1-0.5,0.7-0.7,1.1c-0.3-0.1-0.7-0.1-1.3-0.3c1.2-0.9,2.3-1.7,3.4-2.4c1.7-1.1,3.4-2.4,5.2-3.4
                        						c1.9-1.1,3.9-1.8,6-2.2c0.3-0.1,0.5-0.3,0.7-0.3c0.3-0.1,0.6-0.2,0.9-0.1c0.8,0.3,1.4-0.1,1.9-0.5c0.5-0.5,0.9-0.8,1.5-0.4
                        						c0.5-0.3,0.8-0.5,1.2-0.7c-0.3,0.7,0.2,1.7-0.7,2.1c-0.6,0.3-1.3,0.3-1.9,0.2c-0.5,0.3-0.9,0.7-1.4,1.1c0.2,0.2,0.4,0.4,0.6,0.7
                        						C360.8,180.9,360.5,180.8,360.1,180.8c-0.1-0.3-0.2-0.5-0.3-0.9c-0.3,0.3-0.4,0.5-0.6,0.7C359.6,180.6,359.9,180.7,360.1,180.8z
                        						 M352.4,182.4L352.4,182.4C352.4,182.4,352.4,182.4,352.4,182.4C352.3,182.3,352.2,182.2,352.4,182.4
                        						C352.2,182.3,352.3,182.3,352.4,182.4z M351.8,183.1L351.8,183.1C351.8,183,351.8,183.1,351.8,183.1S351.8,183.1,351.8,183.1z"
                        						/>
                        					<path fill="#075FAE" d="M221.6,220.9c-0.3-0.4-0.5-0.7-0.9-1.1c-0.2,0.3-0.3,0.4-0.4,0.5c-0.3-0.1-0.7-0.2-1.1-0.3
                        						c-0.1-0.1,0.5-0.7-0.1-0.8c0-0.1,0-0.1,0-0.3l0.1-0.1c0,0,0,0.1-0.1,0.1l-0.1,0.1c0,0.1,0.1,0.1,0.1,0.1
                        						c-0.2,0.2-0.4,0.5-0.7,0.7c-0.3-0.5-0.7-0.9-0.9-1.4c0.6-0.3,2.6-0.4,4.4-0.2c-0.4,0.6-0.9,0-1.4,0.2c-0.1,0.2-0.3,0.4-0.4,0.7
                        						c0.4,0.1,0.7,0.1,1.1,0.1l0,0c0.2,0.3,0.3,0.5,0.6,0.9c0.2-0.4,0.3-0.6,0.5-0.9c0.3-0.2,0.7,0.5,1,0.1c0.1,0.1,0.3,0.2,0.4,0.3
                        						l0,0c-0.9,0.4-0.9,0.4-1,1.2C222.4,221,222,221,221.6,220.9L221.6,220.9z M218.6,218.6c-0.1,0-0.1-0.1-0.1-0.1
                        						c0,0.1,0,0.1,0,0.1l0.1,0.1C218.5,218.7,218.5,218.6,218.6,218.6z"/>
                        					<path fill="#075FAE" d="M105.1,212.7c0.1-0.6-0.3-1.3,0.5-1.8c0,0.7-0.1,1.3-0.1,1.9c-0.3,0.1-0.6,0.3-0.9,0.5
                        						c-0.7-0.2-0.7-0.6-0.5-1.1c0.6-0.1,0.4,0.4,0.6,0.7C104.8,212.8,104.9,212.8,105.1,212.7z"/>
                        					<path fill="#075FAE" d="M366.4,175c-0.6,0.5-0.9,1.3-2.1,0.9c0.4-0.6,0.9-1,1.5-1.5C366,174.6,366.2,174.8,366.4,175z"/>
                        					<path fill="#075FAE" d="M94.4,206.5c0.9,0.1,1.7,0.5,2.6,1.1c-0.9-0.2-1.7-0.5-2.6,0.1C94.3,207.2,94.3,206.9,94.4,206.5
                        						L94.4,206.5z"/>
                        					<path fill="#075FAE" d="M109.4,212.5c0,0.1-0.1,0.2-0.1,0.3c0.1,0.7,0.1,0.7-0.6,0.6l0,0c-0.1-0.1-0.1-0.1-0.3-0.3l0,0
                        						c-0.1-0.3-0.3-0.6-0.5-0.9l0,0c0.3-0.1,0.5-0.1,0.7-0.2C109,212.2,109.2,212.4,109.4,212.5L109.4,212.5z M108.9,212.6
                        						c0,0.1,0,0.1,0,0.1V212.6C108.9,212.7,108.9,212.6,108.9,212.6z"/>
                        					<path fill="#075FAE" d="M107.6,211.8c-0.5,0.1-0.9,0.3-1.5,0.5c0.3-0.3,0.3-0.5,0.5-0.7c-0.3-0.1-0.5-0.1-0.8-0.2
                        						C106.6,210.9,107.1,211.6,107.6,211.8z"/>
                        					<path fill="#075FAE" d="M223.9,220c0.2,0.1,0.3,0.3,0.6,0.5c-0.5,0.3-0.7,0.6-1.1,0.9l0,0c0-0.2,0-0.5,0-0.7l0.1-0.1
                        						c0,0,0,0.1-0.1,0.1c-0.1-0.1-0.2-0.1-0.4-0.1C223.4,220.4,223.7,220.2,223.9,220L223.9,220z"/>
                        					<path fill="#075FAE" d="M212.1,219.3c0-0.1-0.1-0.2-0.1-0.4c0.9-0.2,1.9-0.6,2.8-0.1l0,0C213.9,219,213,219.1,212.1,219.3
                        						L212.1,219.3z"/>
                        					<path fill="#075FAE" d="M343,187.6c0,0.2,0.1,0.4,0.1,0.5c-0.5,0.3-0.9,0.5-1.4,0.7C341.8,188.3,341.8,188.3,343,187.6
                        						L343,187.6z"/>
                        					<path fill="#075FAE" d="M211.3,218.9c-0.7,0.8-1.5,0.3-2.2,0.6c0-0.1-0.1-0.2-0.1-0.3C209.7,219.1,210.4,219,211.3,218.9z"/>
                        					<path fill="#075FAE" d="M362.4,179.9c0.3-0.1,0.5-0.1,0.7-0.1c0.2,0,0.5,0,0.8,0.1c-0.3,0.3-0.5,0.5-0.7,0.7
                        						C362.9,180.2,362.6,180,362.4,179.9C362.4,179.8,362.4,179.9,362.4,179.9z"/>
                        					<path fill="#075FAE" d="M109.9,214.3c0.1-0.1,0.3-0.3,0.5-0.5l0,0c0.1,0.1,0.3,0.1,0.5,0.2c-0.3,0.3-0.6,0.6-1,1.1
                        						C109.8,214.7,109.9,214.5,109.9,214.3L109.9,214.3z"/>
                        					<path fill="#075FAE" d="M111.2,212.9c-0.3,0.3-0.7,0.4-1.1,0.2l0,0C110.5,212.5,110.6,212.5,111.2,212.9L111.2,212.9z"/>
                        					<path fill="#075FAE" d="M74.1,194c0.1,0,0.3-0.1,0.4-0.1c0.1,0,0.2,0.1,0.5,0.3c-0.5,0.3-0.9,0.7-1.3,0.1l0,0
                        						C73.8,194.2,73.9,194.1,74.1,194L74.1,194z"/>
                        					<path fill="#075FAE" d="M73.6,194.3c-0.6-0.1-0.3-0.4-0.1-0.7c0.4,0,0.5,0.2,0.6,0.5l0,0C73.9,194.1,73.8,194.2,73.6,194.3
                        						L73.6,194.3z"/>
                        					<path fill="#075FAE" d="M129,218c0.3,0.1,0.5,0.1,0.8,0.2c0,0.1,0,0.1-0.1,0.2c-0.3-0.1-0.5-0.1-0.8-0.1
                        						C129,218.2,129,218.1,129,218z"/>
                        					<path fill="#075FAE" d="M352.4,184.3c-0.3,0-0.5,0.1-0.9,0.1c0-0.1,0-0.1,0-0.3c0.3,0,0.5-0.1,0.9-0.1
                        						C352.4,184.1,352.4,184.2,352.4,184.3z"/>
                        					<path fill="#075FAE" d="M77.8,197.5c0.1,0.3,0.1,0.5,0.3,0.9C77.6,197.9,77.6,197.9,77.8,197.5z"/>
                        					<path fill="#075FAE" d="M78.6,198.8c0-0.3,0-0.5,0.1-0.9c0.3,0.3,0.4,0.4,0.6,0.6C79,198.6,78.8,198.7,78.6,198.8L78.6,198.8z"
                        						/>
                        					<path fill="#075FAE" d="M338.5,190.8c0.2-0.2,0.5-0.4,0.7-0.6C339.1,190.8,338.8,190.8,338.5,190.8L338.5,190.8z"/>
                        					<path fill="#075FAE" d="M99.8,210.7c-0.1-0.3-0.3-0.4-0.4-0.6C100,210.2,100,210.2,99.8,210.7z"/>
                        					<path fill="#075FAE" d="M369.3,174.2c-0.3,0.3-0.5,0.3-0.8,0C368.7,173.8,369,174.1,369.3,174.2L369.3,174.2z"/>
                        					<path fill="#075FAE" d="M297.9,212.6c-0.1-0.1-0.3-0.3-0.5-0.5C298.1,212.1,298.1,212.1,297.9,212.6z"/>
                        					<path fill="#075FAE" d="M367.4,173.9c0,0.1,0,0.3,0,0.5l0,0c-0.3,0-0.5-0.1-0.7-0.1c0-0.1,0-0.1,0-0.2
                        						C366.9,174.1,367.2,174,367.4,173.9C367.5,173.9,367.4,173.9,367.4,173.9z"/>
                        					<path fill="#075FAE" d="M363.8,176.9c-0.1,0.1-0.3,0.1-0.5,0.2c0-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.1-0.2,0.3-0.2
                        						c0.1,0,0.2,0,0.3,0C363.8,176.8,363.8,176.8,363.8,176.9z"/>
                        					<path fill="#075FAE" d="M298.3,208.7c-0.1,0.1-0.3,0.2-0.4,0.3c-0.1-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.3-0.3,0.3-0.4
                        						C298.1,208.5,298.2,208.6,298.3,208.7z"/>
                        					<path fill="#075FAE" d="M258.7,236.1c0.1,0,0.1-0.1,0.1-0.1c-0.3-0.3-0.5-0.2-0.7-0.1C258.3,235.9,258.5,236,258.7,236.1z"/>
                        					<path fill="#075FAE" d="M80.4,199.3c-0.1,0.1-0.3,0.2-0.5,0.3c-0.1-0.1-0.1-0.1-0.1-0.1c0.1-0.1,0.3-0.2,0.4-0.3
                        						C80.3,199.2,80.4,199.2,80.4,199.3z"/>
                        					<path fill="#075FAE" d="M128.4,218.1c-0.2,0-0.4-0.1-0.5-0.1c0-0.1,0-0.1,0-0.2c0.2,0,0.3,0.1,0.5,0.1
                        						C128.4,218,128.4,218.1,128.4,218.1z"/>
                        					<path fill="#075FAE" d="M133.2,219.1c0.1,0.1,0.1,0.3,0.2,0.6c-0.3-0.2-0.5-0.3-0.7-0.4l0,0C132.9,219.3,133,219.1,133.2,219.1
                        						C133.1,219.1,133.2,219.1,133.2,219.1z"/>
                        					<path fill="#075FAE" d="M217.3,219.4c0.1,0.1,0.2,0.1,0.3,0.1c0,0-0.1,0.1-0.1,0.2c-0.1-0.1-0.2-0.1-0.3-0.1
                        						C217.2,219.6,217.2,219.5,217.3,219.4z"/>
                        					<path fill="#075FAE" d="M103.7,212.1c-0.1,0.1-0.3,0.1-0.4,0.2c-0.1-0.1-0.1-0.1-0.1-0.2c0.1-0.1,0.3-0.2,0.4-0.3
                        						C103.6,212,103.7,212,103.7,212.1z"/>
                        					<path fill="#075FAE" d="M110.1,213.2c0.1,0.2,0.1,0.5,0.2,0.7l0,0C109.8,213.8,109.8,213.5,110.1,213.2L110.1,213.2z"/>
                        					<path fill="#075FAE" d="M362.4,179.8c-0.1,0.2-0.3,0.4-0.5,0.5C361.9,180,362.1,179.9,362.4,179.8
                        						C362.4,179.9,362.4,179.8,362.4,179.8z"/>
                        					<path fill="#075FAE" d="M349,186.2c-0.1,0.1-0.3,0.3-0.3,0.3c-0.1-0.1-0.1-0.1-0.2-0.2c0.1-0.1,0.2-0.3,0.3-0.4
                        						C348.8,186,348.9,186.1,349,186.2z"/>
                        					<path fill="#075FAE" d="M215.3,218.6c0.3-0.1,0.5-0.2,0.9-0.3c0,0.1,0,0.2,0.1,0.3C215.9,218.6,215.6,218.6,215.3,218.6
                        						L215.3,218.6z"/>
                        					<path fill="#075FAE" d="M344.3,187.9c-0.1,0.1-0.3,0.3-0.3,0.3c-0.1-0.1-0.1-0.1-0.1-0.2c0.1-0.1,0.3-0.3,0.4-0.3
                        						C344.2,187.7,344.2,187.8,344.3,187.9z"/>
                        					<path fill="#075FAE" d="M75.3,195c-0.1-0.1-0.1-0.2-0.2-0.3c0.1-0.1,0.1-0.1,0.1-0.1c0.1,0.1,0.2,0.1,0.3,0.3
                        						C75.3,194.9,75.3,195,75.3,195z"/>
                        					<path fill="#075FAE" d="M345.5,208.1c-0.2,0.1-0.5,0.3-0.7,0.5l0,0C345,208.5,345.3,208.3,345.5,208.1L345.5,208.1z"/>
                        					<path fill="#075FAE" d="M111.9,215.7c0,0.1-0.1,0.1-0.1,0.2c-0.1,0-0.1-0.1-0.1-0.1c0-0.1,0.1-0.1,0.1-0.1
                        						C111.7,215.6,111.8,215.6,111.9,215.7z"/>
                        					<path fill="#075FAE" d="M370.8,179.6c0,0.2,0.1,0.4,0.1,0.6c-0.1,0-0.1,0-0.2,0C370.7,180,370.8,179.8,370.8,179.6
                        						C370.9,179.6,370.8,179.6,370.8,179.6z"/>
                        					<path fill="#075FAE" d="M132.7,219.8c0.1,0.1,0.2,0.1,0.3,0.2c0,0.1-0.1,0.1-0.1,0.1c-0.1-0.1-0.3-0.1-0.3-0.2
                        						C132.7,220,132.7,219.9,132.7,219.8z"/>
                        					<path fill="#075FAE" d="M356.9,182.2c-0.1-0.1-0.1-0.2-0.3-0.5c0.3,0.1,0.3,0.2,0.5,0.3C357,182,356.9,182.1,356.9,182.2z"/>
                        					<path fill="#075FAE" d="M218.1,220.5c-0.1-0.1-0.1-0.2-0.1-0.3c0.1,0,0.1-0.1,0.1-0.1c0.1,0.1,0.1,0.3,0.1,0.3
                        						C218.1,220.5,218.1,220.5,218.1,220.5z"/>
                        					<path fill="#075FAE" d="M109.4,212.5c0.1-0.1,0.3-0.1,0.5-0.2c0,0.1,0,0.1,0,0.2C109.8,212.5,109.6,212.5,109.4,212.5
                        						L109.4,212.5z"/>
                        					<path fill="#075FAE" d="M75.3,195.9c0-0.1,0-0.3,0-0.3c0.1,0,0.1,0,0.1,0c0,0.1,0,0.3,0,0.3C75.4,195.9,75.3,195.9,75.3,195.9z"
                        						/>
                        					<path fill="#075FAE" d="M122,236.3C122.1,236.4,122.1,236.3,122,236.3C122.1,236.3,122.1,236.3,122,236.3z"/>
                        					<path fill="#075FAE" d="M76.2,197c0.1-0.1,0.1-0.2,0.2-0.3l0.1,0.1C76.3,196.8,76.2,196.9,76.2,197
                        						C76.2,196.9,76.2,197,76.2,197z"/>
                        					<path fill="#075FAE" d="M119.9,235.7c0.1,0,0.3,0.1,0.5,0.1c0,0.1-0.1,0.1-0.1,0.1C120.2,235.9,120.1,235.8,119.9,235.7
                        						L119.9,235.7z"/>
                        					<path fill="#075FAE" d="M365.9,179.2c-0.1-0.1-0.1-0.1-0.1-0.1l0.1-0.1C365.9,179.1,365.9,179.1,365.9,179.2
                        						C365.9,179.2,365.9,179.2,365.9,179.2z"/>
                        					<path fill="#075FAE" d="M117.6,217.1c-0.1-0.1-0.3-0.1-0.4-0.1c0-0.1,0.1-0.1,0.1-0.1C117.4,216.9,117.6,216.9,117.6,217.1
                        						L117.6,217.1z"/>
                        					<path fill="#075FAE" d="M117.9,234.2c0.1,0,0.2,0.1,0.3,0.1c-0.1,0.1-0.2,0.3-0.3,0.3l0,0C117.9,234.4,117.9,234.3,117.9,234.2
                        						L117.9,234.2z"/>
                        					<path fill="#075FAE" d="M119.9,235.7c-0.1-0.1-0.3-0.1-0.4-0.2c0.1-0.1,0.1-0.1,0.1-0.1C119.8,235.5,119.8,235.7,119.9,235.7
                        						L119.9,235.7z"/>
                        					<path fill="#075FAE" d="M99,209.7c-0.1,0.1-0.1,0.1-0.1,0.1c0-0.1-0.1-0.1-0.1-0.1l0.1-0.1C98.9,209.6,99,209.7,99,209.7z"/>
                        					<path fill="#075FAE" d="M115.3,215.3L115.3,215.3c0,0.1,0,0.2-0.1,0.2l-0.1-0.1C115.3,215.4,115.3,215.3,115.3,215.3z"/>
                        					<path fill="#075FAE" d="M72.7,195.1c0-0.1,0.1-0.3,0.1-0.5c0.1,0,0.1,0.1,0.1,0.1C72.9,194.9,72.8,195,72.7,195.1L72.7,195.1z"
                        						/>
                        					<path fill="#075FAE" d="M371.3,179.6c-0.1,0-0.3,0-0.5,0l0,0c0.1-0.1,0.2-0.2,0.3-0.3C371.1,179.4,371.2,179.6,371.3,179.6
                        						L371.3,179.6z"/>
                        					<path fill="#075FAE" d="M367.4,174.4c0.1,0.1,0.3,0.1,0.4,0.1c0,0.1-0.1,0.1-0.1,0.1C367.6,174.6,367.5,174.5,367.4,174.4
                        						C367.5,174.4,367.4,174.4,367.4,174.4z"/>
                        					<path fill="#075FAE" d="M362.2,182.4c-0.1,0.1-0.1,0.3-0.1,0.4c-0.1,0-0.1-0.1-0.1-0.1C362,182.6,362.1,182.4,362.2,182.4
                        						L362.2,182.4z"/>
                        					<path fill="#075FAE" d="M133.4,220.5c0,0.1,0,0.3,0,0.5l0,0C133.2,220.8,133.1,220.6,133.4,220.5L133.4,220.5z"/>
                        					<path fill="#075FAE" d="M75.9,197.4c0.1-0.1,0.1-0.3,0.2-0.5l0,0C76,197.1,76,197.3,75.9,197.4L75.9,197.4z"/>
                        					<path fill="#075FAE" d="M360.7,181.8C360.6,181.8,360.6,181.8,360.7,181.8L360.7,181.8C360.5,181.8,360.6,181.8,360.7,181.8z"/>
                        					<path fill="#075FAE" d="M76.3,196.2L76.3,196.2L76.3,196.2L76.3,196.2C76.4,196.2,76.4,196.2,76.3,196.2z"/>
                        					<path fill="#075FAE" d="M79.3,199.2C79.3,199.2,79.3,199.2,79.3,199.2C79.2,199.2,79.3,199.2,79.3,199.2
                        						C79.3,199.2,79.4,199.2,79.3,199.2C79.4,199.2,79.4,199.2,79.3,199.2z"/>
                        					<path fill="#075FAE" d="M354.5,183C354.4,183,354.4,183,354.5,183L354.5,183C354.4,182.9,354.4,182.9,354.5,183z"/>
                        					<path fill="#075FAE" d="M112.6,215C112.5,215.1,112.5,215.1,112.6,215C112.5,215.1,112.5,215,112.6,215L112.6,215
                        						C112.5,214.9,112.5,215,112.6,215z"/>
                        					<path fill="#075FAE" d="M78.8,215.9C78.8,215.9,78.7,216,78.8,215.9C78.7,215.9,78.8,215.9,78.8,215.9
                        						C78.9,215.9,78.8,215.9,78.8,215.9z"/>
                        					<path fill="#075FAE" d="M346.2,207.7c-0.1,0.1-0.3,0.1-0.5,0.2l0,0C345.9,207.9,346,207.7,346.2,207.7L346.2,207.7z"/>
                        					<path fill="#075FAE" d="M298.4,207.8L298.4,207.8c-0.1,0.1-0.1,0.1-0.1,0C298.3,207.8,298.3,207.8,298.4,207.8z"/>
                        					<path fill="#075FAE" d="M101.5,209.8C101.5,209.9,101.5,209.9,101.5,209.8C101.5,209.9,101.5,209.9,101.5,209.8L101.5,209.8
                        						C101.5,209.8,101.5,209.8,101.5,209.8z"/>
                        					<path fill="#075FAE" d="M121.1,236.1L121.1,236.1c-0.1,0.1-0.1,0.1-0.1,0C121,236.1,121.1,236.1,121.1,236.1z"/>
                        					<path fill="#075FAE" d="M104.3,211.2C104.2,211.2,104.2,211.2,104.3,211.2L104.3,211.2C104.2,211.2,104.2,211.2,104.3,211.2z"/>
                        					<path fill="#075FAE" d="M100.4,211.4L100.4,211.4c-0.1,0.1-0.1,0.1-0.1,0C100.3,211.4,100.3,211.4,100.4,211.4z"/>
                        					<path fill="#075FAE" d="M100.7,210C100.7,210,100.6,210,100.7,210C100.6,210,100.6,210,100.7,210
                        						C100.6,210,100.6,209.9,100.7,210C100.6,210,100.7,210,100.7,210z"/>
                        					<path fill="#075FAE" d="M344.4,208.8c0.1-0.1,0.3-0.1,0.5-0.2l0,0C344.7,208.7,344.5,208.7,344.4,208.8L344.4,208.8z"/>
                        					<path fill="#075FAE" d="M213.2,219.5L213.2,219.5C213.1,219.4,213.2,219.4,213.2,219.5C213.2,219.4,213.2,219.4,213.2,219.5
                        						C213.2,219.5,213.2,219.5,213.2,219.5z"/>
                        					<path fill="#075FAE" d="M123.4,236.6c-0.1,0-0.1,0-0.1,0v-0.1C123.3,236.5,123.3,236.5,123.4,236.6z"/>
                        					<path fill="#075FAE" d="M223.9,219.8C224,219.7,224,219.6,223.9,219.8C224.1,219.6,224,219.7,223.9,219.8L223.9,219.8z"/>
                        					<polygon fill="#075FAE" points="131.3,220 131.3,219.9 131.4,219.9 				"/>
                        					<path fill="#075FAE" d="M364.6,179.4C364.6,179.4,364.6,179.4,364.6,179.4C364.6,179.5,364.6,179.4,364.6,179.4
                        						C364.6,179.4,364.6,179.4,364.6,179.4C364.6,179.4,364.6,179.4,364.6,179.4z"/>
                        					<path fill="#075FAE" d="M216.8,218.5C216.8,218.5,216.8,218.5,216.8,218.5c0.1-0.1,0.1-0.1,0.1-0.1v0.1
                        						C216.9,218.5,216.9,218.5,216.8,218.5z"/>
                        					<polygon fill="#075FAE" points="341,189.1 341,189.2 340.9,189.1 				"/>
                        					<path fill="#075FAE" d="M343,187.6C343,187.6,343,187.5,343,187.6C343,187.5,343,187.6,343,187.6L343,187.6z"/>
                        					<path fill="#075FAE" d="M370.1,188.5c-0.1,0.1-0.1,0.1-0.2,0.2l0,0c0-0.1,0-0.1,0-0.3l0,0C370,188.5,370.1,188.5,370.1,188.5
                        						L370.1,188.5z"/>
                        					<path fill="#075FAE" d="M338.2,191c0.1-0.1,0.1-0.1,0.2-0.2l0,0C338.4,190.9,338.3,191,338.2,191L338.2,191z"/>
                        					<path fill="#075FAE" d="M362.2,182.4C362.2,182.4,362.2,182.3,362.2,182.4L362.2,182.4L362.2,182.4z"/>
                        					<path fill="#075FAE" d="M60.4,177.8c0.1,0.1,0.1,0.1,0.2,0.2l0,0C60.5,177.9,60.4,177.9,60.4,177.8L60.4,177.8z"/>
                        					<path fill="#075FAE" d="M369.9,178.5C369.9,178.5,369.9,178.4,369.9,178.5C369.9,178.4,369.9,178.5,369.9,178.5L369.9,178.5z"/>
                        					<path fill="#075FAE" d="M369.9,178.5C369.9,178.5,369.9,178.5,369.9,178.5C369.9,178.5,369.9,178.5,369.9,178.5L369.9,178.5z"/>
                        					<path fill="#075FAE" d="M367.5,173.9C367.5,173.9,367.5,173.9,367.5,173.9C367.5,173.9,367.5,173.9,367.5,173.9
                        						C367.4,173.9,367.5,173.9,367.5,173.9z"/>
                        					<path fill="#075FAE" d="M369.3,174.2C369.3,174.2,369.3,174.1,369.3,174.2C369.3,174.1,369.3,174.1,369.3,174.2L369.3,174.2z"/>
                        					<path fill="#075FAE" d="M362.4,181.4C362.4,181.4,362.4,181.4,362.4,181.4C362.4,181.4,362.4,181.4,362.4,181.4L362.4,181.4z"/>
                        					<path fill="#075FAE" d="M362.4,181.4C362.4,181.4,362.4,181.5,362.4,181.4C362.4,181.5,362.4,181.5,362.4,181.4L362.4,181.4z"/>
                        					<path fill="#075FAE" d="M81.2,218.9C81.2,218.9,81.1,218.9,81.2,218.9C81.1,218.8,81.1,218.9,81.2,218.9L81.2,218.9z"/>
                        					<path fill="#075FAE" d="M215.3,218.6c-0.1,0.1-0.1,0.1-0.2,0.2l0,0C215.1,218.8,215.2,218.7,215.3,218.6L215.3,218.6z"/>
                        					<path fill="#075FAE" d="M113.5,215.5C113.5,215.5,113.5,215.4,113.5,215.5C113.6,215.4,113.5,215.4,113.5,215.5L113.5,215.5z"/>
                        					<path fill="#075FAE" d="M113.5,215.5C113.5,215.5,113.5,215.5,113.5,215.5C113.5,215.5,113.5,215.5,113.5,215.5L113.5,215.5z"/>
                        					<path fill="#075FAE" d="M113.1,216.4C113.1,216.4,113.1,216.3,113.1,216.4C113.1,216.3,113.1,216.3,113.1,216.4L113.1,216.4z"/>
                        					<path fill="#075FAE" d="M117.6,217.1C117.6,217.1,117.7,217.1,117.6,217.1C117.7,217.1,117.7,217.1,117.6,217.1L117.6,217.1z"/>
                        					<path fill="#075FAE" d="M216.4,219.8C216.4,219.8,216.4,219.7,216.4,219.8C216.5,219.8,216.4,219.8,216.4,219.8L216.4,219.8z"/>
                        					<path fill="#075FAE" d="M134.7,220c-0.1-0.1-0.1-0.1-0.2-0.2l0,0c0.1,0,0.1,0,0.3,0l0,0C134.7,219.9,134.7,220,134.7,220
                        						L134.7,220z"/>
                        					<path fill="#075FAE" d="M210.3,220C210.3,220,210.3,220,210.3,220C210.3,220,210.3,220,210.3,220C210.2,220,210.3,220,210.3,220
                        						z"/>
                        					<path fill="#075FAE" d="M216.4,219.8C216.4,219.8,216.4,219.8,216.4,219.8C216.4,219.8,216.4,219.8,216.4,219.8L216.4,219.8z"/>
                        					<path fill="#075FAE" d="M223.9,219.8c0,0.1,0,0.1,0,0.3l0,0c-0.1-0.1-0.1-0.1-0.2-0.2l0,0C223.8,219.8,223.9,219.8,223.9,219.8
                        						L223.9,219.8z"/>
                        					<path fill="#075FAE" d="M210.2,220C210.2,220,210.2,220.1,210.2,220C210.2,220.1,210.2,220,210.2,220
                        						C210.3,220,210.2,220,210.2,220z"/>
                        					<path fill="#075FAE" d="M133.4,220.5C133.4,220.5,133.4,220.4,133.4,220.5C133.4,220.4,133.4,220.4,133.4,220.5L133.4,220.5z"/>
                        					<path fill="#075FAE" d="M215.1,218.9c-0.1,0-0.1,0-0.2,0l0,0C214.9,218.9,215,218.9,215.1,218.9L215.1,218.9z"/>
                        					<path fill="#075FAE" d="M222.8,218.9C222.8,218.9,222.8,218.9,222.8,218.9C222.8,218.9,222.8,218.9,222.8,218.9L222.8,218.9z"/>
                        					<path fill="#075FAE" d="M221.2,219.3C221.2,219.3,221.2,219.3,221.2,219.3C221.2,219.3,221.2,219.3,221.2,219.3L221.2,219.3z"/>
                        					<path fill="#075FAE" d="M212.1,219.3C212.1,219.3,212.1,219.4,212.1,219.3C212,219.3,212,219.3,212.1,219.3L212.1,219.3z"/>
                        					<path fill="#075FAE" d="M343.9,207.9C343.9,207.9,343.9,207.9,343.9,207.9C344,207.9,344,207.9,343.9,207.9L343.9,207.9z"/>
                        					<path fill="#075FAE" d="M343.9,207.9C343.9,207.9,343.9,208,343.9,207.9C343.9,207.9,343.9,207.9,343.9,207.9L343.9,207.9z"/>
                        					<path fill="#075FAE" d="M345.5,208.1c0.1-0.1,0.1-0.1,0.2-0.2l0,0C345.6,208,345.6,208.1,345.5,208.1L345.5,208.1z"/>
                        					<path fill="#075FAE" d="M96.4,208.6C96.4,208.6,96.4,208.6,96.4,208.6L96.4,208.6L96.4,208.6z"/>
                        					<path fill="#075FAE" d="M96.4,208.6C96.4,208.6,96.5,208.6,96.4,208.6C96.5,208.6,96.5,208.6,96.4,208.6L96.4,208.6z"/>
                        					<path fill="#075FAE" d="M97.4,209.6C97.4,209.6,97.4,209.5,97.4,209.6C97.4,209.5,97.4,209.5,97.4,209.6
                        						C97.4,209.5,97.4,209.6,97.4,209.6z"/>
                        					<path fill="#075FAE" d="M301.3,209.6C301.3,209.6,301.3,209.5,301.3,209.6C301.3,209.5,301.3,209.5,301.3,209.6
                        						C301.3,209.5,301.3,209.6,301.3,209.6z"/>
                        					<path fill="#075FAE" d="M349.9,205.4C349.9,205.4,349.9,205.5,349.9,205.4C349.8,205.5,349.9,205.5,349.9,205.4L349.9,205.4z"/>
                        					<path fill="#075FAE" d="M343.9,206.8C343.9,206.8,344,206.8,343.9,206.8C344,206.8,344,206.8,343.9,206.8L343.9,206.8z"/>
                        					<path fill="#075FAE" d="M303.6,207.2C303.6,207.2,303.5,207.2,303.6,207.2C303.5,207.2,303.5,207.2,303.6,207.2
                        						C303.6,207.3,303.6,207.2,303.6,207.2z"/>
                        					<path fill="#075FAE" d="M346.7,207.3C346.7,207.3,346.7,207.2,346.7,207.3C346.7,207.2,346.7,207.2,346.7,207.3
                        						C346.7,207.2,346.7,207.3,346.7,207.3z"/>
                        					<path fill="#075FAE" d="M346.7,207.2c-0.1,0.1-0.1,0.1-0.2,0.2l0,0C346.5,207.4,346.6,207.3,346.7,207.2
                        						C346.7,207.3,346.7,207.2,346.7,207.2z"/>
                        					<path fill="#075FAE" d="M346.2,207.7c0.1-0.1,0.1-0.1,0.2-0.2l0,0C346.4,207.5,346.3,207.6,346.2,207.7L346.2,207.7z"/>
                        					<path fill="#075FAE" d="M106.7,212.7C106.7,212.7,106.7,212.6,106.7,212.7L106.7,212.7L106.7,212.7z"/>
                        					<path fill="#075FAE" d="M106.7,212.7C106.7,212.7,106.7,212.8,106.7,212.7C106.7,212.8,106.7,212.7,106.7,212.7L106.7,212.7z"/>
                        					<path fill="#075FAE" d="M111.2,213c0.1,0.1,0.1,0.1,0.2,0.2l0,0C111.4,213.1,111.3,213,111.2,213L111.2,213z"/>
                        					<path fill="#075FAE" d="M112.2,213.4c0.1,0,0.1,0,0.2,0l0,0C112.3,213.4,112.3,213.4,112.2,213.4L112.2,213.4z"/>
                        					<path fill="#075FAE" d="M109.9,214.3C109.9,214.3,109.8,214.3,109.9,214.3C109.8,214.2,109.8,214.3,109.9,214.3L109.9,214.3z"/>
                        					<path fill="#075FAE" d="M111.2,214.8C111.2,214.8,111.2,214.8,111.2,214.8C111.2,214.7,111.2,214.7,111.2,214.8L111.2,214.8z"/>
                        					<path fill="#075FAE" d="M111.2,214.8C111.2,214.8,111.3,214.8,111.2,214.8C111.3,214.8,111.3,214.8,111.2,214.8L111.2,214.8z"/>
                        					<path fill="#075FAE" d="M300.1,210.2C300.1,210.2,300.1,210.2,300.1,210.2C300.1,210.2,300.1,210.2,300.1,210.2L300.1,210.2z"/>
                        					<path fill="#075FAE" d="M300.1,210.2C300.1,210.2,300.1,210.3,300.1,210.2C300.1,210.2,300.1,210.2,300.1,210.2L300.1,210.2z"/>
                        					<path fill="#075FAE" d="M300.8,210.2C300.8,210.2,300.8,210.3,300.8,210.2C300.8,210.2,300.8,210.2,300.8,210.2L300.8,210.2z"/>
                        					<path fill="#075FAE" d="M300.1,211.6c0.1-0.1,0.1-0.1,0.2-0.2l0,0C300.3,211.4,300.2,211.5,300.1,211.6L300.1,211.6z"/>
                        					<path fill="#075FAE" d="M108.1,212.2C108.1,212.2,108,212.2,108.1,212.2C108,212.2,108,212.2,108.1,212.2L108.1,212.2z"/>
                        					<path fill="#075FAE" d="M294.8,232.3C294.8,232.3,294.8,232.4,294.8,232.3C294.8,232.4,294.8,232.4,294.8,232.3
                        						C294.9,232.3,294.8,232.3,294.8,232.3z"/>
                        					<path fill="#075FAE" d="M123.1,234.9c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0,0.1,0,0.1,0,0.3l0,0C123.3,234.9,123.2,234.9,123.1,234.9
                        						L123.1,234.9z"/>
                        					<path fill="#075FAE" d="M199.1,221.2C199.1,221.2,199.1,221.1,199.1,221.2C199.1,221.1,199.1,221.1,199.1,221.2L199.1,221.2z"/>
                        					<path fill="#075FAE" d="M221.6,220.9C221.6,220.9,221.6,221,221.6,220.9C221.6,221,221.6,221,221.6,220.9L221.6,220.9z"/>
                        					<path fill="#075FAE" d="M176.5,221.6c0.1,0,0.1,0,0.2,0l0,0C176.7,221.6,176.5,221.6,176.5,221.6L176.5,221.6z"/>
                        					<path fill="#075FAE" d="M231,220.7c0-0.4,0-0.7,0-1.1l0,0c0.3-0.1,0.6-0.3,0.7,0.2l0,0C231.2,219.8,231.2,220.4,231,220.7
                        						L231,220.7z"/>
                        					<path fill="#075FAE" d="M231.7,219.8c0.1,0,0.2-0.1,0.6-0.2c-0.3,0.3-0.5,0.5-0.6,0.6l0,0C231.7,220.1,231.7,220,231.7,219.8
                        						C231.7,219.8,231.7,219.8,231.7,219.8z"/>
                        					<path fill="#075FAE" d="M231.7,220.7c-0.1,0-0.1,0-0.3,0l0,0c0.1-0.1,0.1-0.3,0.2-0.5l0,0C231.7,220.4,231.7,220.6,231.7,220.7z
                        						"/>
                        					<path fill="#075FAE" d="M231.4,220.7c0,0.1,0,0.1,0,0.3c-0.1-0.1-0.3-0.1-0.5-0.3l0,0C231.2,220.7,231.3,220.7,231.4,220.7
                        						L231.4,220.7z"/>
                        					<path fill="#075FAE" d="M230.6,218.6c0.1,0,0.1,0,0.3,0c-0.1,0.1-0.1,0.1-0.3,0.3C230.6,218.8,230.6,218.7,230.6,218.6z"/>
                        					<path fill="#075FAE" d="M231,219.6C231,219.6,231,219.6,231,219.6C231,219.6,231,219.6,231,219.6L231,219.6z"/>
                        					<path fill="#075FAE" d="M230.3,219.1c0.1-0.1,0.1-0.1,0.3-0.3C230.5,218.9,230.4,219,230.3,219.1z"/>
                        					<path fill="#075FAE" d="M232.6,219.1C232.6,219.1,232.6,219.1,232.6,219.1C232.6,219.1,232.6,219.1,232.6,219.1
                        						C232.6,219.1,232.6,219.1,232.6,219.1z"/>
                        					<path fill="#075FAE" d="M233.3,219.1C233.3,219.1,233.3,219.1,233.3,219.1C233.2,219.1,233.3,219.1,233.3,219.1L233.3,219.1z"/>
                        					<path fill="#075FAE" d="M230.1,221.6c-0.1,0.1-0.1,0.1-0.3,0.3C230,221.8,230,221.7,230.1,221.6z"/>
                        					<path fill="#075FAE" d="M149.4,222.5c0.6,0.1,1.2,0.3,1.8,0.5c-0.5,0.2-0.9,0.5-1.4,0.7c0.1-0.1,0.1-0.3,0.2-0.5
                        						C149.6,223.2,149.3,223,149.4,222.5z"/>
                        					<path fill="#075FAE" d="M147.8,222.3c0.2,0,0.5,0,0.7,0c0.1,0.3,0.2,0.5,0.3,0.7c-0.1,0.1-0.3,0.1-0.3,0.1
                        						C148.2,222.8,148,222.6,147.8,222.3L147.8,222.3z"/>
                        					<path fill="#075FAE" d="M149.8,223.6c0.1,0.2,0.1,0.5,0.2,0.7C149.8,224.2,149.4,224,149.8,223.6z"/>
                        					<path fill="#075FAE" d="M147.8,223.9C147.8,223.9,147.8,223.8,147.8,223.9C147.8,223.8,147.8,223.8,147.8,223.9L147.8,223.9z"/>
                        					<path fill="#075FAE" d="M227.6,219.8c-0.1,0-0.3,0.1-0.3,0.1c0.1-0.1,0.1-0.2,0.1-0.3l0,0C227.4,219.6,227.5,219.7,227.6,219.8
                        						C227.6,219.8,227.6,219.8,227.6,219.8z"/>
                        					<path fill="#075FAE" d="M226.6,220.4L226.6,220.4c0.1,0.1,0.1,0.1,0,0.1C226.5,220.5,226.5,220.4,226.6,220.4z"/>
                        					<path fill="#075FAE" d="M227.6,219.6c0.1,0,0.2,0.1,0.4,0.1c-0.2,0.1-0.3,0.1-0.4,0.1l0,0C227.6,219.7,227.6,219.6,227.6,219.6
                        						L227.6,219.6z"/>
                        					<path fill="#075FAE" d="M226.6,219.9C226.7,219.9,226.7,219.9,226.6,219.9C226.7,219.8,226.7,219.8,226.6,219.9L226.6,219.9
                        						C226.7,220,226.7,220,226.6,219.9z"/>
                        					<path fill="#075FAE" d="M227.3,219.6c0.1,0,0.1,0,0.2,0l0,0C227.5,219.6,227.4,219.6,227.3,219.6L227.3,219.6z"/>
                        					<path fill="#075FAE" d="M151.4,223.9C151.3,223.8,151.2,223.8,151.4,223.9C151.2,223.8,151.3,223.8,151.4,223.9L151.4,223.9z"/>
                        					<path fill="#075FAE" d="M150.7,224.1C150.7,224.1,150.6,224.1,150.7,224.1C150.6,224.1,150.7,224.1,150.7,224.1L150.7,224.1z"/>
                        					<path fill="#075FAE" d="M144.1,222c0.1-0.1,0.3-0.1,0.5-0.2C144.5,222.1,144.5,222.4,144.1,222z"/>
                        					<path fill="#075FAE" d="M145,222.5C145,222.5,144.9,222.5,145,222.5C145,222.5,145,222.5,145,222.5L145,222.5z"/>
                        					<path fill="#075FAE" d="M234.9,221.2C234.9,221.2,234.9,221.2,234.9,221.2C234.9,221.2,234.9,221.2,234.9,221.2L234.9,221.2z"/>
                        					<path fill="#075FAE" d="M169.2,224.6C169.2,224.6,169.2,224.6,169.2,224.6C169.2,224.5,169.2,224.6,169.2,224.6L169.2,224.6z"/>
                        					<path fill="#075FAE" d="M234.5,219.1C234.5,219.1,234.5,219,234.5,219.1C234.5,219,234.5,219.1,234.5,219.1L234.5,219.1z"/>
                        				</g>
                        			</g>
                        		</g>
                        		<g id="Great_Marsh">
                        			<path opacity="0.2" fill="#075FAE" enable-background="new    " d="M473,361.2c-0.1,0.3-0.3,0.5-0.3,0.7c0.1,0.9,0.9,0.9,1.5,1.1
                        				c-0.3,1.9-1.4,3.2-2.8,4.3c-0.1,0.1-0.1,0.1-0.2,0.2c-1.4,1.9-3.5,3-5.5,4c-2.1,1.1-4.2,2.3-6.4,3.6c-0.7,0.4-1.5,0.6-2.3,1
                        				c-1,0.5-1.9,1.1-3,1.6c-1.7,0.9-3.4,1.7-5,2.5c-2.5,1.3-4.6,3.2-6.6,5.2c-1.6,1.7-3.6,3-5.5,4.4c-2,1.4-4,2.8-5.5,4.7
                        				c-0.4,0.5-0.8,0.9-1.3,1.3l-0.1,0.1c0,0,0-0.1,0.1-0.1c0.2,0,0.4,0,0.6,0l0,0c0,0.2,0,0.3,0,0.6c-1-0.1-1.8,0.3-2.5,0.9
                        				c-0.1,0.1-0.3,0.3-0.5,0.3c-2.2,0.7-3.7,2.5-5.5,3.8c-1,0.7-1.9,1.5-2.9,2.2c-0.9,0.5-1.7,1.1-2.7,1.4c-1.7,0.7-3.2,1.6-4.7,2.6
                        				l0,0c-1.1-0.2-1.7,0.5-2.5,1l0,0c-0.2,0.1-0.5,0.1-0.6,0.2c-0.3,0.7-0.7,1.2-1.5,0.9c-0.1-0.1-0.4,0.1-0.5,0.3
                        				c-1.3,1.6-3.3,2.3-4.9,3.6c-1.9,1.5-4.2,2.1-6.5,3c-2.3,0.7-4.6,1.5-6.6,2.7c-0.9,0.5-1.9,0.8-2.8,1.3c-0.7,0.4-1.5,0.9-2.1,1.3
                        				c-0.7,0.5-0.7,1.2-0.5,1.9c0.6,2.4,0.2,4.8,0.1,7.2c-0.1,1.9,0.9,3.4,2.8,3.8c1.9-0.8,3.9-1.6,5.9-2.5c0.3-0.1,0.5-0.3,0.9-0.5
                        				c1.2-0.7,2.3-1.4,3.6-2c1.1-0.5,2.1-0.9,3.2-1.3c0.3-0.1,0.6-0.2,1-0.3c0.1,0.3,0.3,0.6,0.3,0.9c0.3-0.1,0.6-0.1,0.9-0.1
                        				c-0.1,0.8-0.6,1.2-1.1,1.6c-1.2,1.1-2.5,1.9-4,2.5c-1.1,0.5-1.8,1.3-2.7,2c-1,0.8-2,1.7-3,2.5c-0.9,0.8-1.7,1.6-2.3,2.1
                        				c0,1.5,0,2.7-0.1,3.8c-0.1,1.3,0.2,2.6,0.8,3.8c0.1,0.3,0.3,0.6,0.3,1.1c-0.3-0.5-0.6-0.9-0.9-1.3c-0.1,0.1-0.1,0.1-0.3,0.1
                        				c0.7,1.4,1.4,2.9,2.1,4.3c0.4,0.7,1.1,1.4,0.5,2.2c0.5,0.9,1.3,0.7,1.8,0.7c1.3,0.1,1.4,0.1,2,1.4l0,0c0,0.2,0,0.4,0.1,0.6l0,0
                        				c1.1,1.5,2.2,3.1,4,4c1.1-0.8,2-1.5,3.1-2.3c0.8-0.5,1.7-1,2.5-1.5c1.1-0.6,2.2-1.2,3.3-1.8c0.2-0.1,0.5-0.3,0.6-0.3
                        				c1.1,0.3,1.7-0.5,2.6-0.9c1.7-0.8,3.5-1.6,5.2-2.4c1.9-0.9,3.9-1.7,5.8-2.5c0.1-0.1,0.3-0.1,0.3-0.2c1.1-0.9,2.2-1.7,3.3-2.5
                        				c1.1-0.8,2.3-0.9,3.6-1c0.3-0.1,0.7,0,1,0c0,0.1,0,0.2,0,0.3c-0.1,0.1-0.2,0.2-0.3,0.3c-0.2,0.1-0.5,0.2-0.9,0.5
                        				c0.7,0.1,0.8-0.1,0.9-0.5c0.1-0.1,0.2-0.2,0.3-0.3l0.1-0.1c0-0.1-0.1-0.1-0.1-0.2c0.1-0.2,0.3-0.5,0.5-0.8c0.2,0.4,0.4,0.7,0.6,1
                        				c0.4-0.1,0.8-0.1,1.3-0.3c-0.3,0.9-0.6,1.8-0.9,2.6c0.1,0.1,0.1,0.1,0.2,0.1c-0.3,0.2-0.7,0.4-1.1,0.6c-0.6,0.4-1.3,0.8-1.9,1.2
                        				c-0.1,0.1-0.3,0.3-0.5,0.3c-1.7,0.7-3.2,1.8-4.8,2.9c-0.6,0.4-1.2,0.7-1.9,1c-2.3,0.9-4.1,2.6-6.2,3.8c-1,0.5-1.9,1.1-2.9,1.7
                        				c-1.1,0.6-2.1,1.1-3.2,1.7c-0.7,0.4-1.4,0.7-2.1,1.2c-0.5,0.4-1.1,0.9-1.5,1.4c-1,1.4-1.9,2.9-2.9,4.4c-0.1,0.2-0.3,0.5-0.3,0.8
                        				c-0.3,1.1-0.3,1.1-1.6,1.1c0,0.3-0.1,0.6,0,0.9c0.1,0.6-0.3,1-0.7,1.5c-1.1,1.3-2.8,1.7-4.3,2.1c-0.5,0.1-1.1,0.1-1.5-0.2
                        				c-0.9-0.6-1.9-1.1-2.2-2.3c-0.1-0.2-0.1-0.3-0.3-0.5c-1.3-1.7-2.6-3.3-3.9-5c-0.4-0.5-0.8-1.1-1.1-1.6c-1-1.9-1.9-3.8-3.1-5.7
                        				c-1-1.7-1.7-3.6-2.3-5.4c-0.1-0.2-0.1-0.4-0.1-0.5c0.3-1.2-0.1-2.3-0.3-3.5c-0.1-0.5-0.1-0.9-0.3-1.3c-0.8-1.4-1.6-2.8-2.5-4.2
                        				c-0.5-0.7-0.9-1.5-1.5-2.2c-0.2-0.3-0.4-0.7-0.7-0.9c-2.4-2.1-3.9-4.8-4.6-7.9c-0.5-2.2-0.9-4.5-1.3-6.8c-0.1-0.9-0.4-1.7-0.4-2.6
                        				c0-1.1,0.2-2.1,0.4-3.2c0.1-0.5,0.2-1,0.3-1.7c0.3-0.2,0.7-0.6,1.1-0.9c1.1-0.7,2.2-1.4,3.2-2.3c0.6-0.5,1.4-0.7,2.1-1
                        				c0.8-0.3,1.6-0.5,2.1-1.3c0.1-0.3,0.5-0.5,0.7-0.6c1.7-0.5,2.9-1.9,4.6-3.1c-1-0.3-1.7-0.5-2.7-0.7c1.3-1.8,2.4-3.6,4.6-4.2
                        				c0.6-0.1,1.1-0.7,1.7-1.1c1-0.8,2-1.7,3-2.5c0.5-0.4,1.1-0.7,1.6-1.1c1.2-0.8,2.4-1.5,3.7-2.3c0.7-0.4,1.3-0.8,2-1.2l0,0
                        				c1.2-0.7,2.4-1.3,3.6-1.9l0,0c0.3-0.2,0.7-0.4,1.1-0.7l0,0c1.9-1.1,4-2.1,6.2-2.7c0.2-0.1,0.4-0.2,0.6-0.3
                        				c1.2-0.9,2.3-1.9,3.6-2.7c0.8-0.5,1.6-0.9,2.5-1.3c3-1,5.8-2.4,8.5-4.2c2.8-1.8,5.6-3.6,8.8-4.7c0.8-0.3,1.5-0.7,2.3-1.1
                        				c1.8-0.9,3.6-1.8,5.4-2.7c0.5-0.3,0.9-0.5,1.3-1c0.5-0.7,1.3-1.3,2.3-1.6c0.5-0.2,0.9-0.5,1.4-0.9c0.7-0.5,1.3-0.9,1.9-1.3
                        				c1.1-0.7,2.3-1.3,3.5-1.8c1-0.5,2.1-0.8,3.1-1.2c1.2-0.5,2.4-1,3.6-1.6c2-1.1,4-1.8,6.3-1.7c0.4,0,0.8,0,1.1-0.1
                        				c1.2-0.5,2.4-0.3,3.4-0.1C470.6,362.5,471.8,361.8,473,361.2L473,361.2z M388.5,406c0.1-0.1,0.2-0.2,0.3-0.3l0.1-0.1
                        				c0,0.1,0,0.1-0.1,0.1C388.7,405.8,388.6,406,388.5,406C388.5,406.1,388.5,406.1,388.5,406C388.5,406.1,388.5,406.1,388.5,406z
                        				 M390.9,404L390.9,404C390.9,403.9,390.9,403.9,390.9,404S390.9,404,390.9,404C390.9,404,390.9,404,390.9,404z M386.6,407.8
                        				c-0.1,0.1-0.2,0.2-0.3,0.3s-0.2,0.2-0.3,0.3l-0.1,0.1l0.1-0.1c0.1-0.1,0.2-0.2,0.3-0.3S386.5,408,386.6,407.8c0-0.1,0-0.1,0.1-0.1
                        				C386.6,407.8,386.6,407.8,386.6,407.8z M385.3,409.1L385.3,409.1C385.2,409.1,385.2,409.1,385.3,409.1c0-0.1,0-0.1,0.1-0.1
                        				C385.3,409,385.3,409.1,385.3,409.1z M383.8,407.8c-0.1,0.1-0.2,0.3-0.3,0.4c0.1,0,0.1,0.1,0.2,0.1
                        				C383.7,408,383.7,407.9,383.8,407.8s0.1-0.2,0.3-0.3c0.1-0.1,0.2-0.3,0.3-0.4c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0.1-0.1,0.3-0.1,0.5
                        				C384,407.6,383.9,407.6,383.8,407.8z M385.2,407.1c0.3,0,0.5,0,0.9,0.1C385.6,406.5,385.4,406.6,385.2,407.1
                        				c-0.1,0.1-0.2,0.3-0.3,0.4c0.1,0,0.1,0.1,0.2,0.1C385,407.4,385.1,407.2,385.2,407.1z M427.3,446.8c0,0.1,0,0.1,0.1,0.1
                        				c0.1-0.1,0.1-0.1,0.2-0.1c0,0,0-0.1-0.1-0.1C427.4,446.8,427.4,446.8,427.3,446.8z M384.7,408.7L384.7,408.7
                        				C384.7,408.7,384.7,408.7,384.7,408.7C384.8,408.7,384.7,408.7,384.7,408.7z M384,408.9L384,408.9L384,408.9L384,408.9
                        				C384,408.9,384,408.9,384,408.9z M387.7,406.8L387.7,406.8C387.7,406.8,387.7,406.8,387.7,406.8S387.7,406.8,387.7,406.8z
                        				 M426.5,447.2l0.1,0.1v-0.1L426.5,447.2z"/>
                        		</g>
                        		<g id="Northern_Burlington_Railroad">
                        			<g>
                        				<path fill="none" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        					M32.4,190.5c0,0,41.1,55.6,124.5,55.4c18.7-0.1,38.2-1.1,55,0.7c31.7,3.6,88.3,72.9,88.3,72.9s54.4,76.4,70.2,115.6
                        					s37.5,82.3,43.1,166.6"/>

                        					<line fill="none" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="33.3" y1="197.5" x2="39.2" y2="192.2"/>

                        					<line fill="none" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="89" y1="236.7" x2="92.1" y2="229.5"/>

                        					<line fill="none" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="175.1" y1="250.2" x2="175.1" y2="242.3"/>

                        					<line fill="none" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="251.2" y1="274.2" x2="257" y2="268.7"/>

                        					<line fill="none" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="301.6" y1="328.6" x2="308.2" y2="324.2"/>

                        					<line fill="none" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="340.1" y1="387.1" x2="346.7" y2="382.8"/>

                        					<line fill="none" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="374.7" y1="456" x2="382" y2="453"/>

                        					<line fill="none" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="398.3" y1="526.4" x2="405.8" y2="523.9"/>

                        					<line fill="none" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="409.3" y1="598.1" x2="417.2" y2="598.1"/>
                        			</g>
                        		</g>
                            <g id="North">
                                <g>
                                    <g enableBackground="new    ">
                                        <path fill="#999999 " d="M415.4,294.7c0-0.1,0.1-0.2,0.2-0.2h2.4c0.2,0,0.2,0.1,0.3,0.2l2.1,8.1h0.1v-8.1c0-0.1,0.1-0.2,0.2-0.2
                                            h1.8c0.1,0,0.2,0.1,0.2,0.2v12.5c0,0.1-0.1,0.2-0.2,0.2h-2.3c-0.2,0-0.2-0.1-0.3-0.2l-2.2-8.1h-0.1v8.1c0,0.1-0.1,0.2-0.2,0.2
                                            h-1.8c-0.1,0-0.2-0.1-0.2-0.2V294.7z"/>
                                    </g>
                                    <path fill="#999999 " d="M419.5,281.6c0,0,1,0.7,2.9,0.7c1.7,0,2.3,0.4,2.5,0.4c0.3,0,0.5-0.2,0.3-0.5c-0.1-0.3-4.2-5.6-5.4-6.9
                                        c0,0-0.1-0.1-0.3-0.1h-0.1c-0.1,0-0.3,0.1-0.3,0.1c-1.1,1.1-5.2,6.6-5.4,6.9c-0.1,0.2-0.1,0.5,0.3,0.5c0.2,0,0.7-0.4,2.5-0.4
                                        C418.4,282.2,419.5,281.6,419.5,281.6z"/>

                                    <circle fill="none" stroke="#D1D2D1 " strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" cx="419.4" cy="300.6" r="14.8"/>
                                </g>
                            </g>
                        		<g id="Nature_Center">
                        			<path fill="#999999" d="M100.4,288l-3.6-3.6c-0.1-0.1-0.1-0.1-0.2-0.1s-0.1,0-0.2,0.1l-3.6,3.6c-0.1,0.1-0.1,0.1-0.1,0.2
                        				s0,0.1,0.1,0.2c0.1,0.1,0.1,0.1,0.2,0.1l0,0c0.1,0,0.1,0,0.8,0v3.5c0,0.1,0.1,0.3,0.3,0.3h4.8c0.1,0,0.3-0.1,0.3-0.3v-3.5
                        				c0.5,0,0.5,0,1,0l0,0c0.1,0,0.2-0.1,0.3-0.2C100.6,288.2,100.5,288.1,100.4,288z"/>
                        		</g>

                        			<path id="road_1_" fill="none" stroke="#D0D0D1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M320.8,353.5c0,0,19.5,0.8,25.1,0.5c5.6-0.3,22.2-1.4,27.5-0.1"/>
                        	</g>
                        	<g id="south-floodplain" onMouseEnter={self.hoverClass.bind(self,'greatMarsh')} onMouseLeave={self.hoverLeave}>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M367.8,411.9c6.9-3.1,10.7-9.7,10.7-9.7s5.8-8.8,20-13.8c17.3-6,27.6-12.8,27.6-12.8l15.4-11.3c0,0,1.8-3.1,2.9-4.3
                        			s8.5,1.5,13.5,0.9c5.1-0.6,12.2-5.2,12.2-5.2s2.3,0.3,4.2,0.2c1.9-0.1,5.4-2.8,11.2-1.1c5.8,1.7-2.4,11-2.4,11l-9.1,10.9
                        			c0,0-8.5,6.6-7.8,12.6c0.6,6,5.4,18.5,5.4,18.5s1.5,2.9,0,10c-1.5,7.1,0.3,7.9,0.3,7.9s7.1,1.6,7.8,4.3c0.8,2.8,0.8,6.9,0.8,6.9"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M393.2,518.6c2.9-2.8,10.3-7.2,10.3-7.2s1.8,1.1,2.5,0.3s0.8-0.9,2.3-0.9c1.6,0.1,3.1-0.4,2.8-2.1c-0.3-1.6-2.2-3.6-0.2-5.8
                        			c2.1-2.2,5.5-1,5.5-1s2.2,3,4.4,3.7c1.6,0.5,3.9,0,5.1-1.9c0,0,8.2-17.6,8.6-18.7c0.4-1.1,2.2-2.9,3-3.6c0.8-0.7,5.9-4.8,5.7-5.9
                        			c-0.2-1.1,1.9-2.9,2.1-3.3s3.4-5.1,3.8-6.2c0.3-1.1,6.4-2.8,8.5-5.2c2.1-2.3,2.7-9.6,4.7-11c2-1.4,15-11.6,21-14.1
                        			c6-2.6,9.6-6.6,9.6-6.6s2.5-3.8,0-6.4c-2.5-2.6-7.5-5.2-8.3-8.9c-0.8-3.7,3.7-10.4,3.7-10.4s0.9-6.9,0.3-9.5
                        			c-0.6-2.6,3.1-13.5,3.1-13.5s3.6-6.3,1.6-9.6c-2-3.3-8-7.6-8-7.6"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M350.6,353.8c0,0,2.4,4.9,2.4,5.9c0,1,5.7,8.8,5.7,8.8s5.9,17.2,6,19.3c0.2,2.1,2.4,4,2.4,4"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M369.2,411.4c0,0,0.9-3.1-0.3-5.3c-1.2-2.2-0.3-6.6-0.3-6.6s-2.3-5.9-1-8.8c1.3-2.9,0.9-8.1,1.1-12.1c0.3-4-0.7-10.8,4.1-12.8"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M373.5,353.9c-0.6,2.8-1.2,10.1-0.6,11.3s0.4,4.1,8.9,7.2c8.5,3.1,15.9,6.9,16.9,7c1,0.1,7,1.1,14.1-0.4c4.3-0.9,8.3-0.6,8.3-0.6"
                        			/>
                        	</g>
                        	<g id="south-uplands" onMouseEnter={self.hoverClass.bind(self,'southernUplands')} onMouseLeave={self.hoverLeave}>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M360.9,415.8c0,0-1.3,1.9-1.3,5.6c0,0,0.6,6.4-3.4,12.1c-0.8,1.2,1.3,15,1,16.4s-10.2,7.4-10.4,11.3s4.8,8.4,5.4,11.1
                        			s2.7,4.7,0.6,7.1s-2.6,2.5-3.9,4.9c0,0-5.3-0.3-8.7,5.9c-3.4,6.1-3.3,11.6-3.3,11.6s3.6,14.3,3.6,16.7c0,2.4-0.3,8.5,2.2,11
                        			c2.5,2.5,7.6,5.9,8.4,7.9c0.8,2.1,1.8,5.9,4.3,5.8s2.4-2.1,4.4-1.1s4,1.2,5.5,0.1s1.5,1.3,2.3,1.3s2.8-1.4,3.4-4.7
                        			c0.3-1.5,2.8-0.7,2.8-0.7s1-2.2,1.9-1.6c0.9,0.6,0.5,3.4,1.8,3.4s2.4,0.4,2.7-3c0.3-3.4,0.5-4.4,2.8-4.9s10.9,3,12.2-5.3
                        			c0.3-1.6-5.1-5.2-2.2-7.9"/>
                        		<g>
                        			<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        				M339.6,515.9c-0.9,0.2-3-0.2-4.7-1.6c-1.7-1.5-3.6-2.2-3.9-2.3c-0.3-0.2-2.7-0.8-2.8-4.5c-0.2-3.7,0.9-9.8,0.2-13.3
                        				s-1.1-9.1,1.6-12.8c2.7-3.6,3.7-6.2,3.9-7.8c0.2-1.6,2.9-8.1,2.8-8.8c-0.1-0.7,1.6-13.6,1.4-15.5c-0.2-1.9,0.9-2.8,1.4-3.4
                        				s0.9-1.7,1.4-5s8.6-10.7,8.6-10.7s0.8-3.5,2.6-6c1.8-2.4,5.9-7.7,16-12.2"/>
                        			<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        				M329.2,510.8c0,0-3-2.1-6.8-2.7"/>
                        			<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        				M379.6,539.5c0,0,2.8,1.5,4.6-0.9"/>
                        			<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        				M392,531.9c0,0,1.4-3.2-0.3-5.9c-1.7-2.8-4.1,0.3-4.1,0.3s-4.7,3.4-9.1,1.5c-4.4-2-1-4.5-1-4.5s1.3-2.4,3-2.8
                        				c1.7-0.3,4.5-3.6,4.1-6.6c-0.3-3-0.8-4.4,0.1-5.4c0.9-1-1-2.4-1.8-5.6c-0.8-3.2-0.7-4.6,0.3-5.5c0.9-0.9,1.3-3.4-3.2-1
                        				c-4.5,2.4,0.3,7.8,0.3,7.8s1.6,3.5-2.6,3.4c-4.1-0.1-6.5,3.2-8.4,1.9c-1.9-1.3-2-2.4-1.9-3.4s-2.3-5-2.6-5.1
                        				c-0.3-0.1,0-2.8-0.9-5.7s-1-3.9-0.9-4.7s-6.8-6.8-14.9-6.1"/>
                        		</g>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M321.6,357.8c-1.7,2.5-4.4,5.8-2.6,6.7c1.8,0.9,4.7-2.2,4.7-2.2s1.9-0.5,1.2,2.2c-0.8,2.7-0.8,12.2-0.1,13.6
                        			c0.6,1.4,0.8,10.3,1.3,11.9c0.5,1.6,6.9,9.3,5.2,15.3c-1.7,5.9-9.2,11.1-9.2,11.1s-8.5,0.9-8.9,4.3c-0.4,3.4,3.8,5.6,3.8,5.6
                        			s-0.1,12.9,2.6,19.4c2.7,6.5,1.6,8.8,1.6,8.8s-3.9,1.3-3.8,4.1c0.1,2.8-5.4,8.8-5.4,8.8s-1.2,0.6,2.7,5.2c2.6,4.4,5,5.9,7.1,7.8
                        			c2.1,1.8,6.6,2.7,6.6,2.7"/>
                        	</g>
                        	<g id="north-uplands" onMouseEnter={self.hoverClass.bind(self,'northernUplands')} onMouseLeave={self.hoverLeave}>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M240.2,264.1c0,0,2.7-0.7,3.2,1.1c0,0,0.9,3.6-0.1,8.6c-1,5-2.3,8.4-0.5,10.9s5.9,0.1,5.9,0.1l2.8-2.4c0,0,2.5-2,4.1-1.2
                        			c1.6,0.8,2.4,2.4,2.8,8.2c0.3,5.8-0.8,9.4-0.1,12.9c0.7,3.5-2.5,5.9-1.3,11.7s0.6,8.5,0.6,8.5s0.3,6.2,4.2,10.5
                        			c3.9,4.3,0.9,11.1,0.9,11.1s-1.6,2.8,1.3,8.5c2.9,5.8,1.9,12.5,1.9,12.5s2.5,3.4,4.6,4c2.1,0.6,7.3-0.6,7.3-0.6l9.1-13.5
                        			c0,0-0.6-3.1,3.2-4.6c0.2-0.1,0.4-0.1,0.6-0.2c2.5-0.8,0.5-11.1,0.5-11.1s0-4.9,2.3-4.9s1.7,3.9,4.1,5s11.4,3.1,14.5,5.6
                        			c3.1,2.5,7.6,3.1,8,5.9c0.4,2.8,3.2,4.5,1.6,7"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M280.8,282.4c0,0-5.7,2.4-5.9,6.2c-0.3,3.8,0.2,5.5-0.2,6.2s-4.2,1.5-4.3,8.6c-0.1,7.2-2.2,12.3-2.2,12.6c0,0.3-0.5,7.9,3.1,14.1
                        			s1.8,11.8,1.8,11.8s-2.6,5.5-1.7,8.8c0.9,3.3,0.9,6.8,0.9,6.8s2.2,2.9,2.6,3.2s1.5,6.4,0.7,7.9"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M270.5,369.2c0,0-1.4,2.3-0.5,5.6c0.9,3.3,3.7,6.5,3.9,10.9s-1.4,5.3,1.4,5.8s5.4,0.5,5.4,1.9c0,1.4-0.4,2.8-4.5,4.4
                        			c-4.1,1.6-6.5-0.2-7.4,2.2c-0.9,2.4,0.2,9-3.4,10.4c-3.5,1.5-6.5,0-6.5,0L244.9,392c0,0-6.9-12.2-11-11.1c-4.1,1.1-4.3,5-4.3,5
                        			s-0.2,3-1.9,3.7s-1.1,4.3-1.1,4.3s-0.9,3.5-3.5,4.4"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M258.1,409.6c0,0-0.1,3.4-2.2,4.1s-1.7,2.8-3.6,2.1c-1.9-0.8-3.6,1.1-4.9-0.1c-1.3-1.2-4.9-4.5-7.9-9.9"/>
                        	</g>
                        	<g id="nature-center" onMouseEnter={self.hoverClass.bind(self,"natureCenter")} onMouseLeave={self.hoverLeave}>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M159.4,295.4c0,0,2.4,1.7,5,1s5.2-3.4,5.2-3.4s1.6-1.2,1.8,2.2c0.2,2.9,1.3,5.2,2.5,5.9c0,0,1.3,1.2,5.5,1.3
                        			c4.2,0.1,4.9,3.1,4.9,3.1s1.6,4.8,4.7,5.3c3.2,0.5,4.2,0.3,5.8,2.3c1.6,2.1,2.3,4.7,4.2,4.3c1.9-0.4,1.8-5.3,1.8-5.3l0.6-12.2
                        			c0,0-4.7-6.9-4.1-8.9c0.7-2,4.6-4,4.6-4l3.3-4.5c0,0-3.2-3.6-2.4-8c0.8-4.4,4.9-8.4,4.9-8.4s3,1.3,5.6,0.2s6.6-4.4,6.6-4.4
                        			s5.9,0.9,8.4-2.8c2.5-3.7,2.8,4.9,2.8,4.9s-0.4,4.6-4.8,5.1c-0.9,0.1-2,3.5-2,3.5s3.2-0.6,4.3-0.3c1.1,0.3,5.9,0.2,7.5-2
                        			s2.8-6,4.8-6.7"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M177.3,256.8c0,0,0.5,3.3,3.9,3.8c3.4,0.5,4.1,1.3,4.1,1.3s2.2,1.1,0.1,5.3s-3.9,6-2.9,8.6c0.9,2.6,4.7,0.3,4.7,0.3l2.1-4
                        			c0,0,2.2-1.4,2.2,1c-0.1,2.4-0.9,10,0.5,12.4s5.3,5.7,5.3,5.7"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M103.8,290.8c2.7,0.4,6.5-0.6,8.7-1.9c2.2-1.2,7.8-7,9.1-10.1"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M113.4,288.4c0,0,1,4.3,4,5.8"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M149.4,282.7c0.1,0.8,2.1,3.3,2.1,4.3c0,1-3.9,3.8-3.9,3.8l-5,2.2l-1.5,3.3c0,0-0.9,1.8,0.8,2.9l3.1,2.5c0.9,4.4-0.5,5.3-1.2,5.9
                        			c-0.7,0.6-3,1.7-6.1,1c-3.8-0.8-6.9-5.1-6.9-5.1l-2.3-0.4c0,0-0.9-4-3.6-3.7c-2.7,0.3-12.3-2.1-10.2-3.7c2.1-1.6,7.2-1.9,7.2-1.9
                        			s3.2-0.3,5.1-1.3s5.3-1,5.3-1l0.2-2.8c0,0,1.7-2.5,5.6-3.2c3.9-0.7,6.2-3.5,6.2-3.5l3.7,0.4c0,0,4.3-0.9,5.9-1.8
                        			c1.6-0.9,3.6,0,3.6,0l0.9-1.6c0,0,1.6,0.9,2.5,0.6c0.9-0.3,3.5-3.4,6.5-3.4"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M143.6,307.7l-7.4-9.1c0,0-1.3-1.5-1.3-2.4c0,0-0.9-3.5-2.6-5"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M116.3,285.8c0,0,2.5-0.4,4.7,0.4c2.4,0.8,7.2,2.5,11,2.2"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M125.5,287.5l0.2-8.1c0,0-0.4-1.3-1-1.4c-0.6-0.2-3.7,1.3-5.3-0.4c-1.6-1.6-2-7.5-2-7.5l-0.4-7.4c0,0-1.3-1.6-1.3-2.3
                        			s1.2-1.3,1.2-1.3s-1-4.2-0.8-5.6s2.2-3.8,2.9-4.2c0.7-0.4,1.9,1.4,2.1,2.2s0.1,2.8-0.3,4.3c0,0-0.6,4,0.9,6.5
                        			c0.4,0.7-0.7,4.9,0,7.2c0,0,0.5,1.5,2.4,1.5"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M125.5,285.3c-1.4-1.3-4.1-2.7-5.8-3.3"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M125.7,278.5l1.2-1.5c0,0,2.6,2,2.8,2.8s0.3,3,0.3,3.5c0,0.7,0.6,0.8,1.2,0.1l2.4-2.9c0,0,0.3-3.4,0.6-3.9c0.4-0.5,4-2.5,5.1-5.3
                        			c0,0,0.9-1.3,0.2-7.6c0,0-1-5.5-0.3-7c0.7-1.4,4.9-2.4,4.9-2.4s1,1.3,1.9,1.4c0.9,0,2.2,1.5,2.5,2s5.1-0.2,6.6-1.2s2.3-0.2,2.3-0.2
                        			s2.3,1.8,1.3,4.9c-0.9,3.1-6.1,3.5-6.1,3.5"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M126.6,276.9c0,0-3.4-4.7-1.9-6.6c1.5-2,4.2,2.7,4.2,2.7s1.1,0.6,3.7-0.4s4.6-1.8,8-1.6c3.4,0.2,7.8,2.4,8.9,2.8
                        			c1.1,0.4,3.8,1.6,2.5-1c-1.3-2.6-2.3-3.3-1.6-5.9c0.7-2.5,2.3-2.2,2.3-2.2s1.8,2.4,3.3,2.9c1.6,0.5,4.2,0.3,5.1-0.7
                        			c0,0,0.1-2.1,1.1-2.3c0.9-0.3,3.6-1.1,3.9-1.8c0.3-0.7,2.4-4.6,2.4-4.6s6.8,0.1,8.4-1.8"/>
                        		<path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                        			M147.6,290.8l6,5.7c0,0,1.8,1.9,4.8-0.4c3-2.3,4.5-1.7,4.5-1.7s1.6-0.4,0.5-4.3c-1-3.9,1.8-8.4,1.8-8.4l2.2-2.7
                        			c0,0-0.1-3.2,1.6-4.4s4.7-5.8,4.8-7.1s3.1-4.7,3.1-4.7s0.3-2,0.5-6c0.1-2.3,1.8-3.8,1.8-3.8l0.3-7.2l1.3-2.2"/>
                        	</g>
                          <g id="north-floodplain" onMouseEnter={self.hoverClass.bind(self,'northernFloodplains')} onMouseLeave={self.hoverLeave}>
                            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                              M241,263.7c2-0.7,8.4-3.8,12-10.5c3.6-6.7,15.2-6.4,15.2-6.4l7.9-0.5c0,0,5.5,0.3,7.8-1.4c2.2-1.7,6.6,0,6.6,0l3.3-1.7
                              c0,0,4.7,2.1,7.2,2.1s12.2-0.2,16.6-1.4c4.3-1.2,7.9-1.7,12.8-1c4.8,0.7,7.1-0.5,7.9-1s6.2-0.9,6,1.9c-0.2,2.8,1.6,5.3,0.3,6.7
                              c-1.2,1.4-4.8,10.5-1.6,13.5c3.3,2.9,4.7,12.1,4,16.2s-2.8,17.1-2.8,17.1l-2.6,17.6c0,0-0.7,7.4-0.5,8.3c0.2,0.9-2.1,8.1-0.2,13.8
                              c1.9,5.7,9.7,17,9.7,17"/>
                            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                              M241.5,263.3c0,0,8.3-2.2,13.5-0.5c5.2,1.7,9.7,3.4,12.7,2.2s1.6,1.3,3.5,1.8c1.9,0.5,9.9,2,9.9,2s11,2.7,12.5,3.3
                              c1.5,0.6,13.3,3.7,15.1,3.5s5.4,0.1,6.1,1.2c0.7,1.1,2.8,4.4,4.5,3.7s3.5,1,4,1.3c0.4,0.3,2.8,0.5,5.3-1.8s6.3,1.7,11.1,1.7
                              s7.2-0.6,7.2-0.6"/>
                            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                              M265.2,265.6c0,0,2.3,5.9,9,10.4s5.9,5.9,5.9,5.9s0.6,1.6,9.7,4.4c0,0,1.9,1.2,2.2,1.8c0.3,0.6,1.6,0.8,1.9-0.9
                              c0.4-1.7,3.4-2.6,3.4-2.6l2.2-2.2c0,0,2.8-1,3.1,0.6c0.3,1.7-0.5,7.4,8,12.8c8.5,5.4,15.8,6.6,15.8,6.6s4,1.6,4.1,4
                              s1.3,3.2,1.3,3.2s1.7,13.5,8.9,14.9c0,0,4,0.8,11.5,0s5.3,6.2,5.3,6.2s1.3,2.3,7,2.2c5.7-0.1,7.4,4.7,7.4,4.7s-0.3,6.6,0.9,7.9
                              c1.2,1.3,1.3,5.6,0.6,8.4"/>
                          </g>

                        </svg>
                      </div>
                    </div>
                  }

                  <div className="nav_area">
                    <div className="nav_menu">
                      <p className={ self.state.area == 'natureCenter' ? "map_button natureCenter active " : "map_button natureCenter" } onClick={self.natureCenter} onMouseEnter={self.hoverClass.bind(self,"natureCenter")} onMouseLeave={self.hoverLeave}>Visitor Center Area</p>
                      <p className={ self.state.area == 'northernFloodplains' ? "map_button northernFloodplains active" : "map_button northernFloodplains" } onClick={self.northernFloodplains} onMouseEnter={self.hoverClass.bind(self,'northernFloodplains')} onMouseLeave={self.hoverLeave}>Northern Floodplains </p>
                      <p className={ self.state.area == 'northernUplands' ? "map_button northernUplands active" : "map_button northernUplands" } onClick={self.northernUplands} onMouseEnter={self.hoverClass.bind(self,'northernUplands')} onMouseLeave={self.hoverLeave}>Northern Uplands</p>
                      <p className={ self.state.area == 'southernUplands' ? "map_button southernUplands active" : "map_button southernUplands" } onClick={self.southernUplands} onMouseEnter={self.hoverClass.bind(self,'southernUplands')} onMouseLeave={self.hoverLeave}>Southern Uplands</p>
                      <p className={ self.state.area == 'greatMarsh' ? "map_button greatMarsh active" : "map_button greatMarsh" } onClick={self.greatMarsh} onMouseEnter={self.hoverClass.bind(self,'greatMarsh')} onMouseLeave={self.hoverLeave}>Southern Floodplain</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="egg_wrap bpadded">
                <div className="image_container">
                  <h2 className="marker color">Other Locations</h2>
                  <div className="prop_container">
                    <div className="property" style={ {backgroundImage: 'url(/img/forest/neale-woods.jpg)'} } >
                      <h3 className="marker">NEALE WOODS</h3>
                      <p>Located ten minutes north of downtown Omaha, Neale Woods Nature Center is a 550-acre area that includes more than nine miles of walking trails which wind through forested ravines and tallgrass prairies.</p>
                    </div>
                    <div className="property" style={ {backgroundImage: 'url(/img/forest/raptor-center.jpg)' }}>
                      <h3 className="marker">Raptor Rehabilitation Center</h3>
                      <p>A team of volunteers provides emergency treatment for injured and sick birds at the Fontenelle Forest Raptor Rehabilitation Center, located near Lincoln. Because we minimize human contact, the center has limited access to visitors.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="young" className="tearjerker_video" style={videoTwo_style}>
                <div className="tearjerker video_overlay"></div>
                <div className="tearjerker_wrapper">
                  { videoTwo ?
                    <div className="centered_content wide">
                      <span className="video_close" onClick={self.toggleVideoTwo}>×</span>
                      <div className='embed-container'><iframe src='https://www.youtube.com/embed/LEkB-HvzAuw?autoplay=1' frameBorder='0' allowFullScreen></iframe></div>
                    </div>
                  :
                    <span>
                      <div className="centered_content explorers">
                        <h2 className="marker">for your favorite <br /> little explorers</h2>
                        <p>A place where boisterous enthusiasm, outdoor physical activity, and creative play reign supreme.</p>
                      </div>
                      <div className="centered_content explorers_bottom">
                        <div className="play_button_wrapper">
                          <svg className="left_leaf" x="0px" y="0px" viewBox="0 0 260.993 56.185" enable-background="new 0 0 260.993 56.185">
                            <g>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M260.803,21.789c0,0-78.218-9.995-105.16-7.822
                                s-60.945,10.559-78.327,9.689c-17.382-0.869-22.814-0.76-31.287-9.234c0,0-5.377-7.985,0-13.362"/>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M53.94,23.206c0,0-15.081,8.055-31.798,5.843
                                C9.377,27.36,5.802,21.1,3.118,16.14C19.968,21.712,36.564,5.83,53.94,23.206z"/>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M83.509,23.874
                                c-30.635,0.978-39.172,2.019-50.516,13.362c0,0-7.199,10.689,0,17.888"/>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M52.548,23.222c0,0-12.167-3.259-26.942-1.086
                                c-12.962,1.906-20.641-4.563-20.641-4.563"/>
                            </g>
                          </svg>

                          <svg onClick={self.toggleVideoTwo} className="video_play play_button forest" x="0px" y="0px" viewBox="0 0 76 76" >
                            <g>
                              <circle className="circle" cx="38" cy="38" r="36.5"/>
                              <path className="triangle" d="M31.3,38.2c0,0-2.8,4.4-2.8,12.4c0,7.5-1.6,10-1.6,10.7c0,1.2,0.8,2,2,1.4S53.2,45,58.6,39.6
                                c0,0,0.6-0.6,0.6-1.4V38c0-0.6-0.2-1.1-0.6-1.4c-4.7-4.7-28.7-22.4-29.7-23.1c-0.8-0.6-2-0.4-2,1.4c0,0.7,1.6,3.2,1.6,10.7
                                C28.6,33.6,31.3,38.2,31.3,38.2z"/>
                            </g>
                          </svg>

                          <svg className="right_leaf" x="0px" y="0px" viewBox="0 0 260.993 56.185" enable-background="new 0 0 260.993 56.185" >
                            <g>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M0.19,21.789c0,0,78.218-9.995,105.16-7.822
                                s60.945,10.559,78.327,9.689c17.382-0.869,22.814-0.76,31.287-9.234c0,0,5.377-7.985,0-13.362"/>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M207.053,23.206c0,0,15.081,8.055,31.798,5.843
                                c12.766-1.689,16.34-7.949,19.024-12.909C241.025,21.712,224.429,5.83,207.053,23.206z"/>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M177.484,23.874
                                c30.635,0.978,39.172,2.019,50.516,13.362c0,0,7.199,10.689,0,17.888"/>
                              <path fill="none" stroke="#FFFFFF" strokeWidth="3" strokeMiterLimit="10" d="M208.445,23.222c0,0,12.167-3.259,26.942-1.086
                                c12.962,1.906,20.641-4.563,20.641-4.563"/>
                            </g>
                          </svg>
                        </div>

                      </div>
                    </span>
                  }
                </div>
              </div>

              <div className="egg_wrap">
                <div className={"photogallery_wrapper " + acornClass} >
                  <svg onClick={self.acornLeft} className="arrow_circle orange shadow left_arrow left gallery_button" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    <g className="arrow" >
                      <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                        c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                        C23.6,24.3,22.6,25.9,22.6,25.9z" />
                      <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
                    </g>
                  </svg>

                  <svg onClick={self.acornRight} className="arrow_circle orange shadow right_arrow right gallery_button" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    <g className="arrow" >
                      <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                      c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                      C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                      <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    </g>
                  </svg>

                  <div className="photogallery" style={acorngalleryStyles} >
                    {acorngallery}
                  </div>
                </div>
              </div>

              <div className="egg_wrap">
                <div className="image_container">
                  <div className="backyard">
                    <h2 className="marker color">In Our Backyard</h2>
                    <p>Conveniently located off Hwy 75 and just minutes from downtown Omaha, Fontenelle Forest is a quiet gem right in our backyard.</p>
                  </div>
                  <img src="/img/forest/skyline_orange.jpg" />
                </div>
              </div>

              <div className="egg_wrap cf">
                <div className="main_wrapper bottom_nav">
                  <span className="prev_page" onClick={self.moveLeft}>
                    <svg className="arrow_circle black left_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    	<g className="arrow" >
                    		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                    			c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                    			C23.6,24.3,22.6,25.9,22.6,25.9z" />
                    		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
                    	</g>
                    </svg>
                    Programs</span>
                  <span className="next_page" onClick={self.moveRight}>Natural Resources
                    <svg className="arrow_circle black right_arrow" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
                    	<path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
                    	<g className="arrow" >
                    		<path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M29.4,25.9c0,0-1,1.6-1,4.4c0,2.6-0.6,3.5-0.6,3.8c0,0.4,0.3,0.7,0.7,0.5s8.6-6.2,10.5-8.1
                    		c0,0,0.2-0.2,0.2-0.5v-0.1c0-0.2-0.1-0.4-0.2-0.5c-1.7-1.7-10.1-7.9-10.5-8.1c-0.3-0.2-0.7-0.1-0.7,0.5c0,0.3,0.6,1.1,0.6,3.8
                    		C28.4,24.3,29.4,25.9,29.4,25.9z"/>
                    		<line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="27.8" y1="25.9" x2="12.7" y2="25.9"/>
                    	</g>
                    </svg>
                  </span>
                </div>
              </div>
             <Footer />
            </div>
          </div>
          <div className='video-container'>
            <video id="video-background" className="video-wrap" poster="/img/loop_one.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_one.webm" type="video/webm" />
            </video>
            <div className="content_container">
              <div className="video_overlay"></div>
              <div className="content_wrapper">
                <div className="hero_content">
                  <h1 className="hero_header">INTO THE WOODS</h1>
                  <h3 className="hero_subheader marker">each visit is its own unique adventure</h3>
                  <div className="hero_textured_color">
                    <p>To explore, discover, look, and listen: the tools to create your own path in the forest, including an interactive trail map and wildlife photo gallery.</p>
                  </div>
                  <div className="hero_icon_wrap">
                    <span className="line left_line"></span>
                    <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/forest/icon_forest.svg" onClick={self.topScroll} />
                    <span className="line right_line"></span>
                  </div>
                </div>
                <h2 className="hero_page_title">FOREST</h2>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="page forest_page preloading">
          <div className="page_wrapper">
            <div className="page_container" id="page" style={loadStyle}>
            </div>
          </div>

          <div className='video-container'>
            <video id="video-background" className="video-wrap" poster="/img/loop_one.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_one.webm" type="video/webm" />
            </video>
            <div className="content_container">
              <div className="video_overlay"></div>
              <div className="content_wrapper">
                <div className="hero_content">
                  <h1 className="hero_header">INTO THE WOODS</h1>
                  <h3 className="hero_subheader marker">each visit is its own unique adventure</h3>
                  <div className="hero_textured_color" >
                    <p>To explore, discover, look, and listen: the tools to create your own path in the forest, including an interactive trail map and wildlife photo gallery.</p>
                  </div>
                  <div className="hero_icon_wrap">
                    <span className="line left_line"></span>
                    <img className={ arrow_class ? "hero_icon up" : "hero_icon" } src="/img/forest/icon_forest.svg" />
                    <span className="line right_line"></span>
                  </div>
                </div>
                <h2 className="hero_page_title">FOREST</h2>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
});

module.exports = Main;
