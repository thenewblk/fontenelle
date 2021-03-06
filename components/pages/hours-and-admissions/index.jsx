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

  componentDidMount: function () { },

  componentWillReceiveProps: function () { },

  render: function() {
    var self = this;

    return (
        <div>
          <div className="egg_wrap static">
            <div className="fb_wrapper main_wrapper">
              <div className="centered_content bd_members">
                <div className="ha_columns">
                  <div>
                    <h3>HOURS</h3>
                    <p><b>The Fontenelle Forest Nature Center is open 8 AM – 5 PM daily. Raptor Woodland Refuge opens daily at 10 a.m.</b></p>
                    <p>Trails open sunrise to sunset for Fontenelle Forest members (with a keyless access FOB) and visitors entering during regular Nature Center hours.</p>
                    <p>*Keyless Access Fobs are issued by request during business hours at Visitor Services and require a refundable $10 deposit.</p>
                    <p>FF Closure Policy for Inclement Weather: All of FF properties are closed when Omaha Public Schools cancels classes.</p>
                  </div>
                  <div>
                    <h3>ADMISSION</h3>
                    <p><b>Free for FF Members - Become a member today!</b>
                      <br/>$11.00 per adult (18+)
                      <br/>$10.00 per senior (62+)
                      <br/>$8.00 per child/student (2-17)
                      <br/>Free for children under age 2
                    </p>
                    <p>Purchase admission online. <a className="notwhiteeither" href="https://8913.blackbaudhosting.com/8913/tickets?tab=3&txobjid=1b87ef14-b89d-4a5c-803f-79124cc2bcd8" target="_blank">Click here</a></p>
                    <p>Parking is free and available on a first-come, first-served basis. Please pay your admission and pick up a trail map at the Visitor Services Desk.</p>
                    <p>Fontenelle Forest's properties are tobacco-free.</p>
                  </div>
                  <div>
                    <h3>GROUP RATES</h3>
                    <p>Fontenelle Forest is a great place to spend an entire day with a group of people of any age! We can host groups of any size. Reservations are not required; however, if your group needs any special accomodations, please call prior to your arrival.</p>
                    <p>Group Rate Policy
                      <br/>Groups with a minimum of 12 people can receive $1 off the regular admission price when:
                      <br/>- Payment is made at the time of arrival
                      <br/>- One payment is made for the entire group
                      <br/>Please keep in mind that people arriving later than the group will be charged full admission.</p>
                    <p>For questions about bringing your group to Fontenelle Forest, please contact Visitor Services at (402) 731-3140.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
    )
  }
});
