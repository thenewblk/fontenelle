var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

require('velocity-animate/velocity.ui');

var classes_data = require('../../public/js/classes.json');

var ClassThing = React.createClass({
  render: function() {
    return (
      <div className="class">
        <h2>{this.props.name}</h2>
        <p>{this.props.age}</p>
        <p>{this.props.science_standards}</p>
        <p>{this.props.series}</p>
        <p>{this.props.duration}</p>
        <p>{this.props.description}</p>
      </div>
    )
  }
});

var ClassList = React.createClass({
  getInitialState: function() {
    return {classes: classes_data, current_classes: classes_data}
  },

  natureFilter: function(){
    var natureClasses = self.state.classes
  },
  render: function() {
    var self = this;
    var classes = self.state.current_classes.map(function(object) {

      return <ClassThing
        name={object.name}
        age={object.age}
        science_standards={object.science_standards}
        series={object.series}
        duration={object.duration}
        description={object.description}  />
    });
    return (
      <div className="classes">
        { classes }
      </div>
    )
  }
});

var poster_image;
var Main = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function() {
    return { pre_count: 0, classImage: "/img/education/class-1.jpg" };
  },


  componentDidMount: function () {
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_three.jpg";
  },

  componentWillReceiveProps: function () {
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_three.jpg";
  },


  onLoad: function() {
    var self = this;
    var tmp_pre_count = self.state.pre_count;
    tmp_pre_count++;
    if (tmp_pre_count == 1) {
      self.setState({loaded: true, pre_count: tmp_pre_count});
    } else {
      self.setState({pre_count: tmp_pre_count});
    }
  },

  toggleClass: function(){
    if (this.state.classImage == "/img/education/class-1.jpg") {
      this.setState({classImage: "/img/education/class-2.jpg"});
    } else {
      this.setState({classImage: "/img/education/class-1.jpg"});
    }
  },

  render: function() {
    var self = this;
    var classImage = self.state.classImage;

    if (self.state.loaded == true) {
      return (
        <div className="page">
          <div className='video-container'>
            <video id="video-background" className="video-wrap" poster="/img/loop_three.jpg" autoPlay muted="muted" loop>
              <source src="/videos/loop_four.mp4" type="video/mp4" />
            </video>
            <div className="content_container">
              <div className="content_wrapper">
                <h1>EDUCATION</h1>
                <img src="/img/education.png" />
              </div>
            </div>
          </div>
          <div className='page_container'>
            <div className='image_container'>
              <img src="/img/education/top.jpg" />
              <img src={classImage} onClick={self.toggleClass}/>
              <img src="/img/education/bottom.jpg" />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="preloader">
          <h1>Loading...</h1>
        </div>
      )
    }
  }
});

module.exports = Main;