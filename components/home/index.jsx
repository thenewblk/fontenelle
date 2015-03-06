var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

require('velocity-animate/velocity.ui');

var poster_image;
var Main = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function() {
    return { pre_count: 0 };
  },


  componentDidMount: function () {
    var self = this;
    poster_image = new Image();
    poster_image.onload = self.onLoad;
    poster_image.src = "/img/loop_one.jpg";
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

  render: function() {
    var self = this;

    if (self.state.loaded == true) {
      return (
        <video id="video-background" className="video-wrap" poster="/img/loop_one.jpg" autoPlay muted="muted" loop>
          <source src="/videos/loop_one.webm" type="video/webm" />
        </video>
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
