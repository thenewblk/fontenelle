var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Velocity = require('velocity-animate/velocity');
var InlineSVG = require('react-inlinesvg');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var Footer = require('../../common/footer.jsx');

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],

  componentDidMount: function () {
    var self  = this;

    setTimeout(function() {
      if (self.getParams().scroll) {
        self.scrollThing(self.getParams().scroll)
      }
    }, 350);
  },

  componentDidUpdate: function (prevProps, prevState) {
    var self  = this;

    if (prevProps.params != self.props.params){
      self.scrollThing(self.props.params.scroll);
    }
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

  componentWillReceiveProps: function () {},

  render: function() {
    var self = this;

    return (
      <div className="egg_wrap">
        <div className="gi_video">
          <div id="donate" className="donate video_overlay"></div>
          <div className="gi_wrapper">
            <div className="centered_content">
              <img className="arrow_gi" src="/img/get-involved/arrow_donate-01.svg" />
            </div>
          </div>
        </div>
        <div className="egg_wrap donate_container">
          <div className="gi_wrapper main_wrapper">
            <div className="centered_content donate">
              <h2 className="marker">DONATE</h2>
              <p>It is because of our many generous donors that we are able to offer such a breadth and depth of conservation initiatives, educational activities, and other programs in the forest. Your tax-deductible gifts will go toward ongoing stewardship of over 2,000 acres of natural land and programs that benefit over 80,000 visitors each year.</p>
              <img className="gi_break" src="/img/conservation/divider_bottom_grey.png" />
              <div className="element_contain">
                <a className="gi_button marker" href="https://8913.blackbaudhosting.com/8913/Online" target="_blank">Donate</a>
              </div>
            </div>
          </div>
        </div>

        <div className="gi_video">
          <div id="membership" className="join video_overlay"></div>
          <div className="gi_wrapper">
            <div className="centered_content">
              <img className="arrow_gi" src="/img/get-involved/arrow_join-01.svg" />
            </div>
          </div>
        </div>
        <div className="egg_wrap join_container">
          <div className="gi_wrapper main_wrapper">
            <div className="centered_content join">
              <h2 className="marker">JOIN</h2>
              <p>Become a Fontenelle Forest member today and over 2,000 acres of land will become your backyard to explore as often as you like. Your whole family will enjoy weekly programming, special events, educational classes, and unique encounters that bring a new adventure with every visit.</p>
              <img className="gi_break" src="/img/conservation/divider_bottom_grey.png" />
              <div className="element_contain">
                <a className="gi_button marker" href="https://8913.blackbaudhosting.com/8913/Membership" target="_blank">Join or Renew Membership</a>
                <a className="gi_button marker" href="https://8913.blackbaudhosting.com/8913/Membership" target="_blank">Purchase Gift Membership</a>
              </div>
            </div>
            <div className="centered_content join">
              <h3>MEMBERSHIP BENEFITS</h3>
              <hr />
              <div className="element_contain">
                <ul>
                  <li>Free admission to Fontenelle Forest Nature Center and Neale Woods for 12 months</li>
                  <li>26 miles of marked trails within the extraordinary Loess Hills</li>
                  <li>Two wheelchair accessible boardwalks with Missouri River and wetland views</li>
                  <li>Diverse ecosystems, hidden lakes, and rare wildflowers</li>
                  <li>A premier birding location with over 246 recorded species</li>
                  <li>Family-friendly exhibits and Acorn Acres, a forest playscape with nine exploration areas</li>
                  <li>Habitat Hollow for indoor play and learning</li>
                </ul>
                <ul>
                  <li>Unique entertainment options: critter encounters, guided hikes, children's programs</li>
                  <li>Members-only events and other programming</li>
                  <li>10% discount at The Gift Shop at Fontenelle Forest</li>
                  <li>Subscription to Fontenelle Forest's newsletter "The Leaflet"</li>
                  <li>Free or discounted admission to over 180 nature centers nationwide through <a className="notwhite" href="http://natctr.org/professional-services/reciprocal-program.html" target="_blank">ANCA</a></li>
                  <li>Every time you visit, two of your guests can receive 1/2 priced admission</li>
                  <li>Discounts on Winter and Summer Camps</li>
                  <li>Access to trails before and after hours</li>
                </ul>
              </div>
              <hr />
              <div className="gi_pricing">
                <h3 className="element_spread"><span>MEMBERSHIP<br/></span><span>PRICE</span></h3>
                <ul>
                  <li><span>Individual<br/><em>One Adult</em></span><span>$45</span></li>
                  <li><span>Two Individuals<br/><em>Two adults living in the same household</em></span><span>$55</span></li>
                  <li><span>Household<br/><em>Two adults living in the same household, children, or grandchildren (under age 18)</em></span><span>$65</span></li>
                  <li><span>Plus-One<br/><em>Upgrade any membership with ‘Plus One’ to bring a guest for free every time you visit the Forest</em></span><span>$25</span></li>
                </ul>
              </div>
              <div className="gi_pricing">
                <h3 className="element_spread"><span>BECOME A PATRON<br/></span><span>PRICE</span></h3>
                <ul>
                  <li><span>Patron<br/><em>ADDITIONAL BENEFITS: 4 guest passes, 15% gift shop discount</em></span><span>$150-249</span></li>
                  <li><span>Supporting Patron<br/><em>ADDITIONAL BENEFITS: 10 guest passes, 20% gift shop discount</em></span><span>$250-499</span></li>
                  <li><span>Sustaining Patron<br/><em>ADDITIONAL BENEFITS: 10 guest passes, 25% gift shop discount</em></span><span>$500-999</span></li>
                  <li><span>Distinguished Patron<br/><em>ADDITIONAL BENEFITS: 20 guest passes, 30% gift shop discount</em></span><span>$1,000-2,499</span></li>
                  <li><span>Benefactor<br/><em>ADDITIONAL BENEFITS: 20 guest passes, 35% gift shop discount</em></span><span>$2,500+</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="gi_video">
          <div id="volunteer" className="volunteer video_overlay"></div>
          <div className="gi_wrapper">
            <div className="centered_content">
              <img className="arrow_gi" src="/img/get-involved/arrow_volunteer-01.svg" />
            </div>
          </div>
        </div>

        <div className="egg_wrap volunteer_container">
          <div className="gi_wrapper main_wrapper">
            <div className="centered_content volunteer">
              <h2 className="marker">VOLUNTEER</h2>
              <p>Our dedicated volunteers are vital to our ongoing educational programs, land stewardship, special events, administration, and many other areas. When you give your time, you are strengthening our ability to preserve historically and ecologically significant land while educating the public about our natural world. We welcome volunteers of all backgrounds and experience levels.</p>
              <img className="gi_break" src="/img/conservation/divider_bottom_grey.png" />
            </div>
            <div className="centered_content volunteer">
              <h3>QUALIFICATIONS</h3>
              <hr />
              <ul>
                <li>Be at least 16 years old (unless you are applying for Teen Naturalist Trainee)</li>
                <li>Commitment of four hours per month</li>
                <li>Commitment of at least six months</li>
                <li>Attend an orientation session</li>
                <li>Sign a waiver/release form</li>
              </ul>
              <hr />
              <div className="element_contain">
                <a className="gi_button marker" href="mailto:info@fontenelleforest.org" target="_blank">Contact us to learn more about volunteer opportunities</a>
              </div>
            </div>
          </div>
        </div>

        <div className="gi_video guild_video">
          <div id="guild" className="guild video_overlay"></div>
          <div className="gi_wrapper">
          </div>
        </div>
        <div className="egg_wrap guild_container">
          <div className="gi_wrapper main_wrapper">
            <div className="centered_content guild">
              <h2 className="marker">The  Guild</h2>
              <p>The Fontenelle Forest Guild is a volunteer group dedicated to preserving Fontenelle Forest's properties and promoting its educational initiatives. Established in 1969, the Guild plays a vital role in advancing and supporting  the Forest’s mission.</p>
              <img className="gi_break" src="/img/conservation/divider_bottom_grey.png" />
            </div>
            <div className="centered_content guild">
              <h3>Guild Board Executive Committee &amp; Event Chairs 2018</h3>
              <hr />
              <div className="element_contain">
                <div className="gi_half">
                  <h4>EXECUTIVE COMMITTEE</h4>
                  <ul>
                    <li>President – Brittni Redding</li>
                    <li>President Elect – Jenny Doyle</li>
                    <li>Vice President Membership – Amy Henderson</li>
                    <li>Vice President Education – Carol Teggart</li>
                    <li>Vice President Technology – Jen Rogers</li>
                    <li>Vice President Public Relations – Gina Ladd</li>
                    <li>Corresponding Secretary – Kelli Hawkins</li>
                    <li>Recording Secretary – Kati Cramer</li>
                    <li>Treasurer – Debbie Stalnaker</li>
                    <li>Advisor/Nominating – Adrienne Petsic</li>
                  </ul>
                </div>

                <div className="gi_half">
                  <h4>GUILD BOARD MEMBERS</h4>
                  <ul>
                    <li>Leigh Andres</li>
                    <li>Tara Arnold</li>
                    <li>Kelly Bartusek</li>
                    <li>Allison Bickford</li>
                    <li>Beth Boone</li>
                    <li>Megan Gilligan</li>
                    <li>Brittany Deupree</li>
                    <li>Carla DeVelder</li>
                    <li>Sarah Harr</li>
                    <li>Catherine Harrington</li>
                    <li>Kareen Hickman</li>
                    <li>Bret Jaros</li>
                    <li>Megan Jarosz</li>
                    <li>Kelly Jeffreys</li>
                    <li>Michelle Kankousky</li>
                    <li>Megan King</li>
                    <li>Andrea Kinnan</li> 
                    <li>Cassie Kohl</li> 
                    <li>Julie Kuntze</li> 
                    <li>Gina Ladd</li> 
                    <li>Andrea Marshall</li> 
                    <li>Gina McDevitt</li> 
                    <li>Sarah Newman</li> 
                    <li>Meghan Oakes</li> 
                    <li>Mindell Rethwisch</li> 
                    <li>Megan Ringenberg</li> 
                    <li>Anne Rogers</li> 
                    <li>Carrie Strovers</li> 
                    <li>Kari Tauber</li> 
                    <li>Cindy Vaccaro</li>
                    <li>Amy Miller</li>
                  </ul>
                </div>
              </div>

              <hr />

              <div className="element_contain">
                <a className="gi_button marker" href="http://www.fontenelleforest.org/post/fontenelle-forest-guild" target="_blank">Join the Guild</a>
              </div>

            </div>
            <div className="centered_content guild" id="feather">
              <h2 className="marker">Feather Our Nest</h2>
              <p>Every year, Feather Our Nest bolsters our commitment to inspiring current and future generations to care for the natural world. Presented by the Fontenelle Forest Guild, the event solidifies funding for the following year’s educational programs, which can be a real difference maker. As it stands now, over 40,000 children explore the wonders of the forest here each year, experiences that would otherwise not likely have been possible.</p>
            </div>
            <div className="element_contain guild">
              <Link className="gi_button marker" to="/post/feather-our-nest" >Read about this year’s Feather Our Nest</Link>
            </div>
            <div className="centered_content guild">
              <img className="gi_break" src="/img/conservation/divider_bottom_grey.png" />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
});
