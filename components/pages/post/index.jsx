var React = require('react'),
    request = require('superagent'),
    moment = require('moment'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var Footer = require('../../common/footer.jsx');

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],
  getInitialState: function() {
    return {
      post: {}
    };
  },

  componentDidMount: function () {
    var self = this;
    self.loadPost();
  },

  componentWillReceiveProps: function () {
    var self = this;
    self.loadPost();
  },

  loadPost: function(){
    var self = this;

    console.log("loadPost name: " + self.getParams().name);

    request
      .get('http://fontenelle.flywheelsites.com/wp-json/posts')
      .query('filter[name]='+ self.getParams().name)
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end(function(err, res) {
        if (res.ok) {
          var post = res.body;

          self.setState({
            title: post[0].title,
            featured_image: post[0].featured_image,
            content: post[0].content,
            date: post[0].date
          });

        } else {
          console.log('Oh no! error ' + res.text);
        }
          }.bind(self));
  },

  render: function() {
    var self = this;
    var title = self.state.title;
    var content = self.state.content;
    var date = moment(self.state.date).format("dddd, MMMM Do YYYY");
    var featured_image = self.state.featured_image;
    if (featured_image){
      var image_style = {
        backgroundImage: 'url('+featured_image.guid+')'
      };
    }

    return (
      <div>
        <div className="egg_wrap fb_container fb_top post_container">
          { featured_image ?
          <div className="featured_image" style={image_style}>
            <h1 className="marker" dangerouslySetInnerHTML={{__html: title}}></h1>
            <div className="image_overlay" ></div>
          </div> : null }
        </div>
        <div className="egg_wrap post_wrapper">
          <div className='main_wrapper'>
            <p className="date">{date}</p>
            <div className='post_content' dangerouslySetInnerHTML={{__html: content}}></div>
            <div className="postclear"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
});
